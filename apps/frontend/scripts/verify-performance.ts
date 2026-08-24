import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

import { publicSiteRoutes, routeHtmlPath } from '../src/routes';

const routes = publicSiteRoutes.map(routeHtmlPath);
const assetDirectory = resolve('dist', 'assets');
const errors: string[] = [];
const assets = await readdir(assetDirectory);
const javaScriptAssets = assets.filter((asset) => asset.endsWith('.js'));
const cssAssets = assets.filter((asset) => asset.endsWith('.css'));

async function gzipSize(file: string) {
  return gzipSync(await readFile(resolve(assetDirectory, file))).byteLength;
}

const totalJavaScriptGzipBytes = (await Promise.all(javaScriptAssets.map(gzipSize))).reduce((total, size) => total + size, 0);
const totalCssGzipBytes = (await Promise.all(cssAssets.map(gzipSize))).reduce((total, size) => total + size, 0);

if (totalJavaScriptGzipBytes > 75 * 1024) errors.push(`client JavaScript exceeds the 75 KiB gzip budget (${totalJavaScriptGzipBytes} bytes)`);
if (totalCssGzipBytes > 10 * 1024) errors.push(`CSS exceeds the 10 KiB gzip budget (${totalCssGzipBytes} bytes)`);

for (const route of routes) {
  const html = await readFile(resolve('dist', route), 'utf8');
  const prerenderedRoot = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i)?.[1] ?? '';
  if (prerenderedRoot.replace(/<[^>]+>/g, '').trim().length < 100) errors.push(`${route}: primary content is not meaningfully prerendered`);
  if (/<(?:video|canvas|iframe)\b/i.test(html)) errors.push(`${route}: contains a heavy visual runtime element`);
  if (/<img(?![^>]*(?:\bwidth=|\bheight=))[^>]*>/i.test(html)) errors.push(`${route}: image is missing explicit dimensions`);
  if (/@import\s+url\(|fonts\.(?:googleapis|gstatic)\.com/i.test(html)) errors.push(`${route}: requests a remote web font`);
}

const [styles, manifest] = await Promise.all([
  readFile('src/styles/index.css', 'utf8'),
  readFile('package.json', 'utf8'),
]);
if (/@import\s+url\(|fonts\.(?:googleapis|gstatic)\.com|https?:\/\/[^\s"')]+\.(?:woff2?|woff|ttf|otf)(?:\?|['")])/i.test(styles)) {
  errors.push('CSS requests a remote font');
}
if (!styles.includes('font-synthesis: none')) errors.push('CSS does not prevent synthetic font shifts');

const fontFaceBlocks = [...styles.matchAll(/@font-face\s*{([\s\S]*?)}/gi)].map((match) => match[1]);
const expectedFontFamilies = /font-family\s*:\s*["']?(?:Inter Tight|Inter|JetBrains Mono)/i;
for (const block of fontFaceBlocks) {
  if (!expectedFontFamilies.test(block)) errors.push('CSS enables an unapproved local font face');
  if (!/font-display\s*:\s*optional\s*;/i.test(block)) errors.push('local font face must use font-display: optional');
  const sources = [...block.matchAll(/url\(\s*["']?([^)"']+)["']?\s*\)/gi)].map((match) => match[1]);
  if (sources.length === 0 || sources.some((source) => !/\.woff2(?:\?|$)/i.test(source) || /^(?:https?:)?\/\//i.test(source))) {
    errors.push('local font faces must use local WOFF2 assets only');
  }
}

const darkContractActive = /--bg-base\s*:\s*#0A0B0F/i.test(styles);
if (darkContractActive) {
  const obsoleteLightTokens = ['#f8fafc', '#ffffff', '#f1f5f9', '#172033', '#475569', '#64748b', '#cbd5e1', '#1d4ed8', '#1e40af', '#dbeafe'];
  for (const token of obsoleteLightTokens) {
    if (styles.includes(token)) errors.push(`obsolete light token remains in dark CSS: ${token}`);
  }
}

const dependencies = Object.keys(JSON.parse(manifest).dependencies ?? {});
const allowedDependencies = new Set(['react', 'react-dom']);
if (dependencies.some((dependency) => !allowedDependencies.has(dependency))) errors.push('production dependencies include an unreviewed client library');

const shareAssets = await readdir(resolve('dist', 'images', 'share'));
for (const asset of shareAssets.filter((file) => file.endsWith('.png'))) {
  if ((await stat(resolve('dist', 'images', 'share', asset))).size === 0) errors.push(`share asset is empty: ${asset}`);
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(
  `PASS: performance audit verified ${routes.length} prerendered routes, `
    + `${Math.round(totalJavaScriptGzipBytes / 1024)} KiB JS gzip and `
    + `${Math.round(totalCssGzipBytes / 1024)} KiB CSS gzip`,
);
