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
if (/@(?:import|font-face)\b/i.test(styles)) errors.push('CSS introduces a downloadable font');
if (!styles.includes('font-synthesis: none')) errors.push('CSS does not prevent synthetic font shifts');

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
