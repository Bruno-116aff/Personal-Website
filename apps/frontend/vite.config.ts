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
import { siteRoutes } from './src/routes';

const siteOrigin = 'https://ivan.hubko.me';

function sitemapXml() {
  const entries = siteRoutes
    .map(({ path }) => {
      const location = `${siteOrigin}${path === '/' ? '/' : path}`;
      return `  <url><loc>${location}</loc></url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function writeDiscoveryFiles(distDirectory: string) {
  await Promise.all([
    fs.writeFile(resolve(distDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`),
    fs.writeFile(resolve(distDirectory, 'sitemap.xml'), sitemapXml()),
  ]);
}

async function writePrerenderedRoutes(metadataConfig: MetadataConfig) {
  const distDirectory = resolve(process.cwd(), 'dist');
  const templatePath = resolve(distDirectory, 'index.html');
  const template = await fs.readFile(templatePath, 'utf8');

  for (const route of siteRoutes) {
    const routeDirectory = route.path === '/'
      ? distDirectory
      : resolve(distDirectory, route.path.slice(1));
    const routeHtml = renderToString(
      createElement(App, {
        pathname: route.path,
        githubUrl: metadataConfig.githubUrl,
      }),
    );
    const htmlWithMetadata = template.replace(
      /<!-- site-metadata:start -->[\s\S]*?<!-- site-metadata:end -->/,
      renderMetadataHead(getRouteMetadata(route.path), metadataConfig),
    );
    const html = htmlWithMetadata.replace(
      '<div id="root"></div>',
      `<div id="root">${routeHtml}</div>`,
    );

    await fs.mkdir(routeDirectory, { recursive: true });
    await fs.writeFile(resolve(routeDirectory, 'index.html'), html);
  }

  await writeDiscoveryFiles(distDirectory);
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
    githubUrl: env.VITE_GITHUB_URL,
    linkedInUrl: env.VITE_LINKEDIN_URL,
  };

  return {
    plugins: [react(), prerenderRoutes(metadataConfig)],
  };
});
