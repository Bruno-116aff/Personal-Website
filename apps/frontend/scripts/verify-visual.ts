import { spawn, type ChildProcess } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { chromium } from 'playwright';

const frontendRoot = resolve(process.cwd());
const workspaceRoot = resolve(frontendRoot, '..', '..');
const referencePath = resolve(workspaceRoot, 'docs', 'style-reference.html');
const artifactDirectory = resolve(frontendRoot, 'artifacts', 'visual-review');
const port = Number(process.env.VISUAL_REVIEW_PORT ?? 4173);
const baseUrl = process.env.VISUAL_REVIEW_BASE_URL ?? `http://127.0.0.1:${port}`;
const startedServer = !process.env.VISUAL_REVIEW_BASE_URL;

const viewports = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

const liveRoutes = [
  '/',
  '/work/infrastructure-reliability',
  '/work/operations-automation',
  '/work/unified-platform',
  '/work/account-automation',
  '/cv',
  '/visual-review-missing-route',
] as const;

function commandName() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function waitForServer(url: string, child: ChildProcess | undefined) {
  return new Promise<void>((resolveReady, reject) => {
    const deadline = Date.now() + 30_000;
    const poll = async () => {
      if (child?.exitCode !== null && child?.exitCode !== undefined) {
        reject(new Error(`Vite exited before visual review started with code ${child.exitCode}`));
        return;
      }
      try {
        const response = await fetch(url);
        if (response.ok || response.status === 404) {
          resolveReady();
          return;
        }
      } catch {
        // The dev server is still starting.
      }
      if (Date.now() >= deadline) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(poll, 250);
    };
    void poll();
  });
}

function routeFileName(route: string) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '--');
}

const server = startedServer
  ? (() => {
      const args = ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)];
      if (process.platform === 'win32') {
        return spawn(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', `${commandName()} ${args.join(' ')}`], {
          cwd: frontendRoot,
          stdio: 'ignore',
          windowsHide: true,
        });
      }
      return spawn(commandName(), args, { cwd: frontendRoot, stdio: 'ignore' });
    })()
  : undefined;

const errors: string[] = [];

try {
  await mkdir(artifactDirectory, { recursive: true });
  await rm(artifactDirectory, { recursive: true, force: true });
  await mkdir(artifactDirectory, { recursive: true });
  await waitForServer(baseUrl, server);

  const browser = await chromium.launch();
  try {
    for (const viewport of viewports) {
      const referencePage = await browser.newPage({ viewport });
      await referencePage.goto(pathToFileURL(referencePath).href, { waitUntil: 'networkidle' });
      await referencePage.screenshot({
        path: resolve(artifactDirectory, `reference--${viewport.name}-${viewport.width}x${viewport.height}.png`),
        fullPage: true,
      });
      await referencePage.close();

      for (const route of liveRoutes) {
        const page = await browser.newPage({ viewport });
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
        if (response && response.status() >= 500) errors.push(`${route}: server returned ${response.status()}`);
        const overflow = await page.evaluate(() => ({
          body: document.body.scrollWidth,
          document: document.documentElement.scrollWidth,
          viewport: document.documentElement.clientWidth,
        }));
        if (Math.max(overflow.body, overflow.document) > overflow.viewport + 1) {
          errors.push(`${route} at ${viewport.width}px: horizontal overflow (${Math.max(overflow.body, overflow.document)}px > ${overflow.viewport}px)`);
        }
        await page.screenshot({
          path: resolve(artifactDirectory, `${routeFileName(route)}--${viewport.name}-${viewport.width}x${viewport.height}.png`),
          fullPage: true,
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
} finally {
  if (server && !server.killed) server.kill();
}

for (const route of ['reference', ...liveRoutes]) console.log(`CAPTURED: ${route} at ${viewports.length} viewports`);

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: visual review captured reference, ${liveRoutes.length - 1} public routes and 404 at 1440x960, 768x1024 and 390x844`);
