import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { publicSiteRoutes, routeHtmlPath } from '../src/routes';

const routes = publicSiteRoutes.map(routeHtmlPath);
const errors: string[] = [];

function headingLevels(html: string) {
  return [...html.matchAll(/<h([1-6])(?:\s[^>]*)?>/gi)].map((match) => Number(match[1]));
}

function contrastRatio(first: string, second: string) {
  const relativeLuminance = (hex: string) => {
    const channels = hex.match(/\w\w/g)!.map((channel) => Number.parseInt(channel, 16) / 255);
    const linear = channels.map((channel) => (
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    ));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };

  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function currentPageLinks(html: string) {
  return [...html.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/gi)].map((match) => match[0]);
}

function honeypotMarkup(html: string) {
  return html.match(/<div\b[^>]*class="contact-form__honeypot"[^>]*>[\s\S]*?<\/div>/i)?.[0] ?? '';
}

for (const route of routes) {
  const html = await readFile(resolve('dist', route), 'utf8');
  const headings = headingLevels(html);
  const currentLinks = currentPageLinks(html);
  const honeypot = honeypotMarkup(html);
  const hasContactForm = /<form\b[^>]*class="contact-form"/i.test(html);

  if (headings.filter((level) => level === 1).length !== 1) errors.push(`${route}: expected exactly one H1`);
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] > headings[index - 1] + 1) {
      errors.push(`${route}: heading level skips from H${headings[index - 1]} to H${headings[index]}`);
    }
  }
  if (!html.includes('class="skip-link" href="#main-content"')) errors.push(`${route}: skip link is missing`);
  if (!html.includes('<main id="main-content"')) errors.push(`${route}: main landmark is missing`);
  if (!/<nav[^>]*aria-label=/i.test(html)) errors.push(`${route}: named navigation landmark is missing`);
  if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) errors.push(`${route}: image without alt text`);

  if (route === '/' && !currentLinks.some((link) => /href="\/"/.test(link))) {
    errors.push(`${route}: home navigation does not identify the current document`);
  }
  if (route === '/cv' && !currentLinks.some((link) => /href="\/cv"/.test(link))) {
    errors.push(`${route}: CV navigation does not identify the current document`);
  }
  if (route.startsWith('/work/') && currentLinks.length > 0) {
    errors.push(`${route}: cross-page work navigation incorrectly identifies the current document`);
  }

  if (hasContactForm) {
    if (!honeypot.includes('aria-hidden="true"') || !/\binert(?:="")?(?:\s|>)/i.test(honeypot)) {
      errors.push(`${route}: honeypot is not inert and hidden from assistive technology`);
    }
    for (const element of honeypot.matchAll(/<(?:a|button|input|select|textarea)\b[^>]*>/gi)) {
      if (!/\btabindex="-1"/i.test(element[0])) {
        errors.push(`${route}: honeypot contains a keyboard-focusable descendant`);
      }
    }
  }
}

const [css, contactForm] = await Promise.all([
  readFile('src/styles/index.css', 'utf8'),
  readFile('src/components/ContactForm.tsx', 'utf8'),
]);
for (const expectedStyle of [':focus-visible', 'outline: 3px solid var(--color-focus)', '@media (prefers-reduced-motion: reduce)']) {
  if (!css.includes(expectedStyle)) errors.push(`global accessibility style is missing: ${expectedStyle}`);
}
if (!contactForm.includes('aria-live=') || !contactForm.includes('aria-invalid=') || !contactForm.includes('aria-hidden="true"')) {
  errors.push('contact form accessibility wiring is incomplete');
}

const contrastPairs = [
  ['EDEEF1', '0A0B0F', 'primary text on graphite base'],
  ['8B92A3', '0A0B0F', 'secondary text on graphite base'],
  ['788191', '14161C', 'tertiary text on graphite surface'],
  ['8AA0FF', '0A0B0F', 'accent text on graphite base'],
  ['FFFFFF', '4A67E5', 'white text on primary control'],
  ['FFFFFF', '405FD5', 'white text on primary control hover'],
] as const;
for (const [foreground, background, name] of contrastPairs) {
  if (contrastRatio(foreground, background) < 4.5) errors.push(`${name}: contrast is below 4.5:1`);
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: accessibility audit verified ${routes.length} generated routes`);
