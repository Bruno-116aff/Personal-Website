import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { publicSiteRoutes, routeHtmlPath, routePathFromHtmlPath } from '../src/routes';
import { getMetadataForRoute, getStructuredData } from '../src/lib/metadata';
import { resolveSiteOrigin } from '../src/lib/site-config';

type JsonObject = Record<string, any>;

const siteOrigin = resolveSiteOrigin(process.env.VITE_SITE_URL);
const routes = publicSiteRoutes.map((route) => ({
  ...route,
  file: routeHtmlPath(route),
  metadata: getMetadataForRoute(route, { siteOrigin }),
}));
const notFoundFile = resolve('dist', '404.html');
const requiredMarkers = [
  'property="og:type"',
  'property="og:site_name"',
  'property="og:title"',
  'property="og:description"',
  'property="og:url"',
  'property="og:image"',
  'property="og:image:alt"',
  'property="og:image:width"',
  'property="og:image:height"',
  'name="twitter:card"',
  'name="twitter:title"',
  'name="twitter:description"',
  'name="twitter:image"',
  'name="twitter:image:alt"',
  'type="application/ld+json"',
];
const minimumDescriptionLength = 80;
const maximumDescriptionLength = 160;

const approvedLinkedInUrl = 'https://www.linkedin.com/in/ivan-hubko-5a635b245';
const errors: string[] = [];
const titles = new Set<string>();
const descriptions = new Set<string>();

async function collectIndexFiles(directory: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectIndexFiles(absolutePath, relativePath)));
    } else if (entry.name === 'index.html') {
      files.push(relativePath);
    }
  }

  return files;
}

for (const route of routes) {
  const siteOrigin = new URL(route.metadata.canonicalUrl).origin;
  const approvedPersonId = `${siteOrigin}/#person`;
  const file = resolve('dist', route.file);
  let html: string;

  try {
    html = await readFile(file, 'utf8');
  } catch {
    errors.push(`${route.file}: generated file is missing`);
    continue;
  }

  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? '';
  const title = head.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  const description = head.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
  const jsonLdBlocks = [
    ...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
  ];
  const structuredData: JsonObject[] = jsonLdBlocks.flatMap((block) => {
    try {
      const parsed = JSON.parse(block[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      errors.push(`${route.file}: structured data is invalid JSON`);
      return [];
    }
  });

  if (!title) errors.push(`${route.file}: title is missing`);
  if (!description) errors.push(`${route.file}: description is missing`);
  if (description && description.length < minimumDescriptionLength) {
    errors.push(`${route.file}: description is too short`);
  }
  if (description && description.length > maximumDescriptionLength) {
    errors.push(`${route.file}: description is too long`);
  }
  if (description && title && description === title) {
    errors.push(`${route.file}: description must add route-specific context`);
  }
  if (canonical !== route.metadata.canonicalUrl) {
    errors.push(`${route.file}: canonical must be ${route.metadata.canonicalUrl}`);
  }
  for (const marker of requiredMarkers) {
    if (!head.includes(marker)) errors.push(`${route.file}: missing ${marker}`);
  }
  if (/VITE_GITHUB|VITE_GA4|undefined|localhost/i.test(head)) {
    errors.push(`${route.file}: contains an unconfigured metadata value`);
  }

  if (route.kind === 'case-study') {
    const article = structuredData.find((item) => item['@type'] === 'Article');
    const author = article?.author as JsonObject | undefined;
    const mainEntityOfPage = article?.mainEntityOfPage as JsonObject | undefined;
    const expectedHeadline = route.metadata.title.replace(' — Ivan Hubko', '');
    if (!article) errors.push(`${route.file}: Article structured data is missing`);
    else if (
      article.headline !== expectedHeadline ||
      article.url !== route.metadata.canonicalUrl ||
      article.image !== `${siteOrigin}${route.metadata.shareImagePath}` ||
      author?.['@type'] !== 'Person' ||
      author?.['@id'] !== approvedPersonId ||
      author?.name !== 'Ivan Hubko' ||
      author?.jobTitle !== 'Senior Backend Engineer & Tech Lead' ||
      mainEntityOfPage?.['@type'] !== 'WebPage' ||
      mainEntityOfPage?.['@id'] !== route.metadata.canonicalUrl ||
      mainEntityOfPage?.url !== route.metadata.canonicalUrl ||
      'datePublished' in article ||
      'dateModified' in article
    ) {
      errors.push(`${route.file}: Article structured data is incomplete`);
    }
  }

  const ogImage = head.match(/<meta property="og:image" content="([^"]*)"/i)?.[1];
  const ogSiteName = head.match(/<meta property="og:site_name" content="([^"]*)"/i)?.[1];
  const ogImageAlt = head.match(/<meta property="og:image:alt" content="([^"]*)"/i)?.[1];
  const twitterImage = head.match(/<meta name="twitter:image" content="([^"]*)"/i)?.[1];
  const twitterImageAlt = head.match(/<meta name="twitter:image:alt" content="([^"]*)"/i)?.[1];
  const expectedImage = `${siteOrigin}${route.metadata.shareImagePath}`;
  if (ogImage !== expectedImage || twitterImage !== expectedImage) {
    errors.push(`${route.file}: share image metadata is incorrect`);
  }
  if (
    ogSiteName !== 'Ivan Hubko' ||
    ogImageAlt !== route.metadata.shareImageAlt ||
    twitterImageAlt !== route.metadata.shareImageAlt
  ) {
    errors.push(`${route.file}: social image/site metadata is incorrect`);
  }

  const expectedStructuredData = getStructuredData(route.metadata);
  if (structuredData.length === 0 || expectedStructuredData.length === 0) {
    errors.push(`${route.file}: structured data is missing`);
  }
  if (route.kind === 'home') {
    const website = structuredData.find((item) => item['@type'] === 'WebSite');
    const person = structuredData.find((item) => item['@type'] === 'Person');
    if (!website || !person)
      errors.push(`${route.file}: WebSite or Person structured data is missing`);
    else if (
      person.jobTitle !== 'Senior Backend Engineer & Tech Lead' ||
      person['@id'] !== approvedPersonId ||
      !Array.isArray(person.sameAs) ||
      !person.sameAs.includes(approvedLinkedInUrl)
    ) {
      errors.push(`${route.file}: Person structured data is incomplete`);
    }
  }
  if (route.kind === 'cv' && !structuredData.some((item) => item['@type'] === 'WebPage')) {
    errors.push(`${route.file}: WebPage structured data is missing`);
  }
  if (title) titles.add(title);
  if (description) descriptions.add(description);
}

try {
  const notFoundHtml = await readFile(notFoundFile, 'utf8');
  const notFoundHead = notFoundHtml.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? '';
  if (!notFoundHead.includes('<meta name="robots" content="noindex, follow" />')) {
    errors.push('404.html: must use noindex, follow metadata');
  }
  if (!notFoundHead.includes('<title>Page not found — Ivan Hubko</title>')) {
    errors.push('404.html: not-found title is missing');
  }
  if (!notFoundHtml.includes('not-found-page')) {
    errors.push('404.html: branded not-found page is missing');
  }
} catch {
  errors.push('404.html: generated file is missing');
}

const expectedFiles = new Set(routes.map((route) => route.file));
try {
  const generatedFiles = await collectIndexFiles(resolve('dist'));
  for (const file of generatedFiles) {
    if (!expectedFiles.has(file)) errors.push(`${file}: unexpected generated public route`);
    if (
      routePathFromHtmlPath(file) &&
      !publicSiteRoutes.some((route) => route.path === routePathFromHtmlPath(file))
    ) {
      errors.push(`${file}: generated route is absent from the public route manifest`);
    }
  }
} catch {
  errors.push('dist: generated output is missing');
}

if (titles.size !== routes.length) errors.push('route titles are not unique');
if (descriptions.size !== routes.length) errors.push('route descriptions are not unique');

for (const staticFile of ['robots.txt', 'sitemap.xml']) {
  try {
    const content = await readFile(resolve('dist', staticFile), 'utf8');
    if (staticFile === 'sitemap.xml') {
      for (const route of routes) {
        if (!content.includes(`<loc>${route.metadata.canonicalUrl}</loc>`)) {
          errors.push(`sitemap.xml: missing ${route.metadata.canonicalUrl}`);
        }
      }
    }
  } catch {
    errors.push(`${staticFile}: generated file is missing`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: metadata verified for ${routes.length} generated routes`);
