import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import App from './src/App';
import {
  getRouteMetadata,
  renderMetadataHead,
  type MetadataConfig,
} from './src/lib/metadata';
import { resolveSiteOrigin } from './src/lib/site-config';
import { notFoundRoute, publicSiteRoutes, routeHtmlPath } from './src/routes';

function sitemapXml(siteOrigin: string) {
  const entries = publicSiteRoutes
    .map(({ path }) => {
      const location = `${siteOrigin}${path === '/' ? '/' : path}`;
      return `  <url><loc>${location}</loc></url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function writeDiscoveryFiles(distDirectory: string, siteOrigin: string) {
  await Promise.all([
    fs.writeFile(resolve(distDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`),
    fs.writeFile(resolve(distDirectory, 'sitemap.xml'), sitemapXml(siteOrigin)),
  ]);
}

async function writePrerenderedRoutes(metadataConfig: MetadataConfig) {
  const distDirectory = resolve(process.cwd(), 'dist');
  const templatePath = resolve(distDirectory, 'index.html');
  const template = await fs.readFile(templatePath, 'utf8');

  for (const route of publicSiteRoutes) {
    const routeDirectory = resolve(distDirectory, routeHtmlPath(route), '..');
    const routeHtml = renderToString(
      createElement(App, {
        pathname: route.path,
        githubUrl: metadataConfig.githubUrl,
      }),
    );
    const htmlWithMetadata = template.replace(
      /<!-- site-metadata:start -->[\s\S]*?<!-- site-metadata:end -->/,
      renderMetadataHead(getRouteMetadata(route.path, metadataConfig), metadataConfig),
    );
    const html = htmlWithMetadata.replace(
      '<div id="root"></div>',
      `<div id="root">${routeHtml}</div>`,
    );

    await fs.mkdir(routeDirectory, { recursive: true });
    await fs.writeFile(resolve(routeDirectory, 'index.html'), html);
  }

  const notFoundRouteHtml = renderToString(
    createElement(App, {
      pathname: notFoundRoute.path,
      githubUrl: metadataConfig.githubUrl,
    }),
  );
  const notFoundHead = renderMetadataHead(
    getRouteMetadata(notFoundRoute.path, metadataConfig),
    metadataConfig,
  );
  const notFoundHtml = template
    .replace(
      /<!-- site-metadata:start -->[\s\S]*?<!-- site-metadata:end -->/,
      notFoundHead,
    )
    .replace('<div id="root"></div>', `<div id="root">${notFoundRouteHtml}</div>`);
  await fs.writeFile(resolve(distDirectory, '404.html'), notFoundHtml);

  await writeDiscoveryFiles(distDirectory, resolveSiteOrigin(metadataConfig.siteOrigin));
}

function prerenderRoutes(metadataConfig: MetadataConfig) {
  return {
    name: 'prerender-known-routes',
    apply: 'build' as const,
    closeBundle: () => writePrerenderedRoutes(metadataConfig),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const metadataConfig: MetadataConfig = {
    siteOrigin: resolveSiteOrigin(env.VITE_SITE_URL, { allowLocalHttp: mode === 'development' }),
    githubUrl: env.VITE_GITHUB_URL,
    linkedInUrl: env.VITE_LINKEDIN_URL,
  };

  return {
    plugins: [react(), prerenderRoutes(metadataConfig)],
  };
});
