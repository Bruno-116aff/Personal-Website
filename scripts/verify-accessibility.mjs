import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const routes = [
  'index.html',
  'work/infrastructure-reliability/index.html',
  'work/operations-automation/index.html',
  'work/unified-platform/index.html',
  'work/account-automation/index.html',
  'cv/index.html',
];

const errors = [];

function headingLevels(html) {
  return [...html.matchAll(/<h([1-6])(?:\s[^>]*)?>/gi)].map((match) => Number(match[1]));
}

function contrastRatio(first, second) {
  const relativeLuminance = (hex) => {
    const channels = hex.match(/\w\w/g).map((channel) => Number.parseInt(channel, 16) / 255);
    const linear = channels.map((channel) => (
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    ));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };

  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

for (const route of routes) {
  const html = await readFile(resolve('dist', route), 'utf8');
  const headings = headingLevels(html);

  if (headings.filter((level) => level === 1).length !== 1) {
    errors.push(`${route}: expected exactly one H1`);
  }
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] > headings[index - 1] + 1) {
      errors.push(`${route}: heading level skips from H${headings[index - 1]} to H${headings[index]}`);
    }
  }
  if (!html.includes('class="skip-link" href="#main-content"')) {
    errors.push(`${route}: skip link is missing`);
  }
  if (!html.includes('<main id="main-content"')) {
    errors.push(`${route}: main landmark is missing`);
  }
  if (!/<nav[^>]*aria-label=/i.test(html)) {
    errors.push(`${route}: named navigation landmark is missing`);
  }
  if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) {
    errors.push(`${route}: image without alt text`);
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
  ['172033', 'ffffff', 'ink on surface'],
  ['475569', 'ffffff', 'muted text on surface'],
  ['475569', 'f1f5f9', 'placeholder text on muted surface'],
  ['1d4ed8', 'ffffff', 'focus/accent on surface'],
];
for (const [foreground, background, name] of contrastPairs) {
  if (contrastRatio(foreground, background) < 4.5) errors.push(`${name}: contrast is below 4.5:1`);
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: accessibility audit verified ${routes.length} generated routes`);
