import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const routes = [
  {
    file: 'index.html',
    canonical: 'https://ivan.hubko.me/',
    structuredType: 'homepage',
    shareImage: 'ivan-hubko.png',
  },
  {
    file: 'work/infrastructure-reliability/index.html',
    canonical: 'https://ivan.hubko.me/work/infrastructure-reliability',
    structuredType: 'article',
    shareImage: 'infrastructure-reliability.png',
  },
  {
    file: 'work/operations-automation/index.html',
    canonical: 'https://ivan.hubko.me/work/operations-automation',
    structuredType: 'article',
    shareImage: 'operations-automation.png',
  },
  {
    file: 'work/unified-platform/index.html',
    canonical: 'https://ivan.hubko.me/work/unified-platform',
    structuredType: 'article',
    shareImage: 'unified-platform.png',
  },
  {
    file: 'work/account-automation/index.html',
    canonical: 'https://ivan.hubko.me/work/account-automation',
    structuredType: 'article',
    shareImage: 'account-automation.png',
  },
  {
    file: 'cv/index.html',
    canonical: 'https://ivan.hubko.me/cv',
    structuredType: 'webpage',
    shareImage: 'curriculum-vitae.png',
  },
];

const approvedLinkedInUrl = 'https://www.linkedin.com/in/ivan-hubko-5a635b245';
const requiredMarkers = [
  'property="og:type"',
  'property="og:title"',
  'property="og:description"',
  'property="og:url"',
  'property="og:image"',
  'property="og:image:width"',
  'property="og:image:height"',
  'name="twitter:card"',
  'name="twitter:title"',
  'name="twitter:description"',
  'name="twitter:image"',
  'type="application/ld+json"',
];

const errors = [];
const titles = new Set();
const descriptions = new Set();

for (const route of routes) {
  const file = resolve('dist', route.file);
  let html;

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
  const jsonLdBlocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const structuredData = jsonLdBlocks.flatMap((block) => {
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
  if (canonical !== route.canonical) {
    errors.push(`${route.file}: canonical must be ${route.canonical}`);
  }
  for (const marker of requiredMarkers) {
    if (!head.includes(marker)) errors.push(`${route.file}: missing ${marker}`);
  }
  if (/github\.com|VITE_GITHUB|GA4|G-[A-Z0-9]+/i.test(head)) {
    errors.push(`${route.file}: contains an unconfigured metadata value`);
  }
  if (route.structuredType === 'article') {
    const article = structuredData.find((item) => item['@type'] === 'Article');
    const author = article?.author;
    if (!article) errors.push(`${route.file}: Article structured data is missing`);
    else if (
      article.url !== route.canonical
      || author?.['@type'] !== 'Person'
      || author?.name !== 'Ivan Hubko'
      || author?.jobTitle !== 'Senior Backend Engineer & Tech Lead'
    ) {
      errors.push(`${route.file}: Article structured data is incomplete`);
    }
  }
  const ogImage = head.match(/<meta property="og:image" content="([^"]*)"/i)?.[1];
  const twitterImage = head.match(/<meta name="twitter:image" content="([^"]*)"/i)?.[1];
  const expectedImage = `https://ivan.hubko.me/images/share/${route.shareImage}`;
  if (ogImage !== expectedImage || twitterImage !== expectedImage) {
    errors.push(`${route.file}: share image metadata is incorrect`);
  }
  if (route.structuredType === 'homepage') {
    const website = structuredData.find((item) => item['@type'] === 'WebSite');
    const person = structuredData.find((item) => item['@type'] === 'Person');
    if (!website || !person) errors.push(`${route.file}: WebSite or Person structured data is missing`);
    else if (
      person.jobTitle !== 'Senior Backend Engineer & Tech Lead'
      || !Array.isArray(person.sameAs)
      || !person.sameAs.includes(approvedLinkedInUrl)
    ) {
      errors.push(`${route.file}: Person structured data is incomplete`);
    }
  }
  if (route.structuredType === 'webpage' && !structuredData.some((item) => item['@type'] === 'WebPage')) {
    errors.push(`${route.file}: WebPage structured data is missing`);
  }
  if (title) titles.add(title);
  if (description) descriptions.add(description);
}

if (titles.size !== routes.length) errors.push('route titles are not unique');
if (descriptions.size !== routes.length) errors.push('route descriptions are not unique');

for (const staticFile of ['robots.txt', 'sitemap.xml']) {
  try {
    await readFile(resolve('dist', staticFile), 'utf8');
  } catch {
    errors.push(`${staticFile}: generated file is missing`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: metadata verified for ${routes.length} generated routes`);
