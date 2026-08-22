import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

import { publicSiteRoutes } from '../apps/frontend/src/routes';

type RunResult = { code: number | null; stdout: string; stderr: string };

const isWindows = process.platform === 'win32';
const dockerCommand = isWindows ? 'docker.exe' : 'docker';
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const frontendPort = Number(process.env.PRODUCTION_VERIFY_FRONTEND_PORT ?? 18080);
const contactPort = Number(process.env.PRODUCTION_VERIFY_CONTACT_PORT ?? 13001);
const configuredFrontendUrl = process.env.PRODUCTION_VERIFY_FRONTEND_URL?.trim();
const configuredContactUrl = process.env.PRODUCTION_VERIFY_CONTACT_API_URL?.trim();
const localFrontendUrl = `http://127.0.0.1:${frontendPort}`;
const localContactUrl = `http://127.0.0.1:${contactPort}`;
const containerSuffix = `${process.pid}-${Date.now()}`;
const frontendContainer = `ivan-site-verify-frontend-${containerSuffix}`;
const contactContainer = `ivan-site-verify-contact-${containerSuffix}`;
const frontendImage = `ivan-site-verify-frontend:${containerSuffix}`;
const contactImage = `ivan-site-verify-contact:${containerSuffix}`;

const passes: string[] = [];
const failures: string[] = [];
const deferred: string[] = [];

function pass(message: string) {
  passes.push(message);
  console.log(`PASS: ${message}`);
}

function fail(message: string) {
  failures.push(message);
  console.error(`FAIL: ${message}`);
}

function defer(message: string) {
  deferred.push(message);
  console.log(`DEFERRED: ${message}`);
}

function run(command: string, args: string[], options: { cwd?: string } = {}) {
  return new Promise<RunResult>((resolveResult) => {
    const child = spawn(command, args, {
      cwd: rootDirectory,
      env: process.env,
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk) => { stdout += chunk; });
    child.stderr?.on('data', (chunk) => { stderr += chunk; });
    child.on('error', (error) => resolveResult({ code: null, stdout, stderr: `${stderr}${error.message}` }));
    child.on('close', (code) => resolveResult({ code, stdout, stderr }));
  });
}

function tail(value: string, limit = 1_500) {
  const output = value.trim();
  return output.length > limit ? output.slice(-limit) : output;
}

async function docker(args: string[]) {
  return run(dockerCommand, args);
}

async function dockerIsAvailable() {
  const result = await docker(['info', '--format', '{{.ServerVersion}}']);
  return result.code === 0;
}

async function startLocalRuntime(dataDirectory: string) {
  if (!(await dockerIsAvailable())) {
    defer('local production-like runtime requires a reachable Docker daemon; set PRODUCTION_VERIFY_FRONTEND_URL to inspect an existing runtime instead.');
    return null;
  }

  const frontendBuild = await docker([
    'build', '--tag', frontendImage,
    '--build-arg', `VITE_CONTACT_API_URL=${localContactUrl}/contact`,
    '--build-arg', `VITE_SITE_URL=${process.env.VITE_SITE_URL ?? ''}`,
    '--build-arg', `VITE_GA4_MEASUREMENT_ID=${process.env.VITE_GA4_MEASUREMENT_ID ?? 'G-HWWGVZNJ18'}`,
    '--build-arg', `VITE_GITHUB_URL=${process.env.VITE_GITHUB_URL ?? 'https://github.com/Bruno-116aff'}`,
    '--build-arg', 'VITE_LINKEDIN_URL=',
    'apps/frontend',
  ]);
  if (frontendBuild.code !== 0) {
    fail(`frontend production image build failed${frontendBuild.stderr ? `: ${tail(frontendBuild.stderr)}` : ''}`);
    return null;
  }
  pass('frontend production image built');

  const contactBuild = await docker(['build', '--tag', contactImage, 'apps/contact-api']);
  if (contactBuild.code !== 0) {
    fail(`contact API production image build failed${contactBuild.stderr ? `: ${tail(contactBuild.stderr)}` : ''}`);
    return null;
  }
  pass('contact API production image built');

  const prepareDataDirectory = await docker([
    'run', '--rm', '--user', 'root',
    '--volume', `${dataDirectory}:/data`,
    contactImage,
    'sh', '-c', 'chown 1000:1000 /data && chmod 770 /data && test "$(stat -c %u:%g /data)" = "1000:1000"',
  ]);
  if (prepareDataDirectory.code !== 0) {
    fail(`contact API data directory preparation failed${prepareDataDirectory.stderr ? `: ${tail(prepareDataDirectory.stderr)}` : ''}`);
    return null;
  }
  pass('contact API bind-mounted data directory prepared for node:node (1000:1000)');

  const contactRun = await docker([
    'run', '--detach', '--rm', '--name', contactContainer,
    '--publish', `${contactPort}:3001`,
    '--env', `CONTACT_ALLOWED_ORIGIN=${localFrontendUrl}`,
    '--env', 'CONTACT_DATABASE_PATH=/data/contact.sqlite',
    '--env', 'CONTACT_RATE_LIMIT_WINDOW_SECONDS=60',
    '--env', 'CONTACT_RATE_LIMIT_MAX_REQUESTS=5',
    '--volume', `${dataDirectory}:/data`,
    contactImage,
  ]);
  if (contactRun.code !== 0) {
    fail(`contact API production container failed to start${contactRun.stderr ? `: ${tail(contactRun.stderr)}` : ''}`);
    return null;
  }

  const frontendRun = await docker([
    'run', '--detach', '--rm', '--name', frontendContainer,
    '--publish', `${frontendPort}:8080`, frontendImage,
  ]);
  if (frontendRun.code !== 0) {
    fail(`frontend production container failed to start${frontendRun.stderr ? `: ${tail(frontendRun.stderr)}` : ''}`);
    await docker(['rm', '--force', contactContainer]);
    return null;
  }

  pass(`local production-like containers started on ${localFrontendUrl} and ${localContactUrl}`);
  return { frontendUrl: localFrontendUrl, contactUrl: localContactUrl, dataDirectory, local: true };
}

async function stopLocalRuntime() {
  await Promise.all([
    docker(['rm', '--force', frontendContainer]),
    docker(['rm', '--force', contactContainer]),
    docker(['image', 'rm', '--force', frontendImage]),
    docker(['image', 'rm', '--force', contactImage]),
  ]);
}

async function restoreLocalDataDirectoryAccess(dataDirectory: string) {
  const image = await docker(['image', 'inspect', contactImage]);
  if (image.code !== 0) return;

  const restore = await docker([
    'run', '--rm', '--user', 'root',
    '--volume', `${dataDirectory}:/data`,
    contactImage,
    'sh', '-c', 'chmod 777 /data',
  ]);
  if (restore.code !== 0) {
    console.error(`WARN: could not restore access to the temporary contact volume${restore.stderr ? `: ${tail(restore.stderr)}` : ''}`);
  }
}

async function request(baseUrl: string, pathname: string, options: RequestInit = {}) {
  return fetch(`${baseUrl.replace(/\/$/, '')}${pathname}`, { redirect: 'manual', ...options });
}

async function waitFor(baseUrl: string, pathname: string) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await request(baseUrl, pathname);
      if (response.status > 0) return response;
    } catch {
      // The container may still be booting.
    }
    await new Promise((resolveResult) => setTimeout(resolveResult, 500));
  }
  return null;
}

async function verifyFrontend(baseUrl: string, localRuntime: boolean) {
  const routes = publicSiteRoutes.map((route) => route.path);
  const firstResponse = await waitFor(baseUrl, '/');
  if (!firstResponse) {
    fail(`frontend runtime did not respond at ${baseUrl}`);
    return;
  }
  await firstResponse.text();

  for (const route of routes) {
    const response = await request(baseUrl, route);
    const body = await response.text();
    if (response.status !== 200) fail(`${route}: expected 200, received ${response.status}`);
    else if (!body.includes('<h1')) fail(`${route}: response does not contain prerendered primary content`);
    else pass(`${route}: direct route responds with prerendered HTML`);

    if (route !== '/') {
      const trailingSlash = await request(baseUrl, `${route}/`);
      const location = trailingSlash.headers.get('location');
      if (trailingSlash.status !== 301 || location !== route) fail(`${route}/: expected 301 redirect to ${route}, received ${trailingSlash.status} ${location ?? ''}`.trim());
      else pass(`${route}/: trailing slash redirects to ${route}`);
    }
  }

  const unknown = await request(baseUrl, '/not-a-registered-route');
  if (unknown.status !== 404) fail(`unknown route: expected 404, received ${unknown.status}`);
  else pass('unknown route returns the branded 404 response');

  for (const asset of ['/robots.txt', '/sitemap.xml', '/images/share/ivan-hubko.png']) {
    const response = await request(baseUrl, asset);
    if (response.status !== 200) fail(`${asset}: expected 200, received ${response.status}`);
    else pass(`${asset}: production asset responds`);
  }

  if (!localRuntime) {
    const requiredHeaders = ['strict-transport-security', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'content-security-policy'];
    const missingHeaders = requiredHeaders.filter((header) => !firstResponse.headers.get(header));
    if (missingHeaders.length > 0) fail(`configured runtime is missing required response headers: ${missingHeaders.join(', ')}`);
    else pass('configured runtime includes required response headers');
  }
}

async function verifyContactApi(baseUrl: string | undefined, frontendUrl: string) {
  if (!baseUrl) {
    defer('contact API checks require PRODUCTION_VERIFY_CONTACT_API_URL when an existing runtime is used.');
    return;
  }

  const origin = frontendUrl.replace(/\/$/, '');
  const preflight = await waitFor(baseUrl, '/contact');
  if (!preflight) {
    fail(`contact API did not respond at ${baseUrl}`);
    return;
  }

  const options = await request(baseUrl, '/contact', { method: 'OPTIONS', headers: { Origin: origin, 'Access-Control-Request-Method': 'POST' } });
  if (![200, 204].includes(options.status) || options.headers.get('access-control-allow-origin') !== origin) fail(`contact API CORS preflight failed: ${options.status} ${options.headers.get('access-control-allow-origin') ?? ''}`.trim());
  else pass('contact API responds with the configured CORS origin');

  const valid = await request(baseUrl, '/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ name: 'Production Check', email: 'check@example.com', message: 'Local production-like verification' }),
  });
  const validBody = await valid.json().catch(() => ({}));
  if (valid.status !== 201 || validBody.status !== 'accepted') fail(`contact API valid payload: expected 201 accepted, received ${valid.status}`);
  else if (valid.headers.get('access-control-allow-origin') !== origin) fail('contact API valid response is missing the configured CORS origin');
  else pass('contact API accepts a valid payload and returns the configured CORS origin');
}

async function restartAndVerifyContactData(runtime: {
  contactUrl?: string;
  dataDirectory?: string;
}) {
  if (!runtime.contactUrl || !runtime.dataDirectory) {
    defer('contact volume restart verification requires the local production-like runtime.');
    return;
  }

  const stop = await docker(['rm', '--force', contactContainer]);
  if (stop.code !== 0) {
    fail(`contact API restart preparation failed${stop.stderr ? `: ${tail(stop.stderr)}` : ''}`);
    return;
  }
  pass('contact API container stopped for persistence verification');

  const restart = await docker([
    'run', '--detach', '--rm', '--name', contactContainer,
    '--publish', `${contactPort}:3001`,
    '--env', `CONTACT_ALLOWED_ORIGIN=${localFrontendUrl}`,
    '--env', 'CONTACT_DATABASE_PATH=/data/contact.sqlite',
    '--env', 'CONTACT_RATE_LIMIT_WINDOW_SECONDS=60',
    '--env', 'CONTACT_RATE_LIMIT_MAX_REQUESTS=5',
    '--volume', `${runtime.dataDirectory}:/data`,
    contactImage,
  ]);
  if (restart.code !== 0) {
    fail(`contact API failed to restart with the existing data volume${restart.stderr ? `: ${tail(restart.stderr)}` : ''}`);
    return;
  }

  const response = await waitFor(runtime.contactUrl, '/contact');
  if (!response) {
    fail('contact API did not respond after restart');
    return;
  }

  const inspect = await docker([
    'exec', '--user', 'node', contactContainer,
    'node', '--input-type=commonjs', '-e',
    "const fs=require('node:fs'); const Database=require('better-sqlite3'); const files=['/data/contact.sqlite','/data/contact.sqlite-wal','/data/contact.sqlite-shm']; for (const file of files) { if (!fs.existsSync(file)) throw new Error(`missing ${file}`); fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK); } const db=new Database('/data/contact.sqlite',{readonly:true}); const row=db.prepare('SELECT COUNT(*) AS count FROM contact_submissions').get(); if (row.count < 1) throw new Error('persisted submission is missing'); db.close();",
  ]);
  if (inspect.code !== 0) {
    fail(`contact API data volume is not readable/writable after restart${inspect.stderr ? `: ${tail(inspect.stderr)}` : ''}`);
    return;
  }
  pass('contact submission, SQLite database, WAL and SHM files remain available after API restart');
}

async function main() {
  let runtime: { frontendUrl: string; contactUrl?: string; dataDirectory?: string; local: boolean } | null = null;
  let localRuntime = false;
  let localRuntimeAttempted = false;
  let localDataDirectory: string | undefined;

  try {
    if (configuredFrontendUrl) {
      runtime = { frontendUrl: configuredFrontendUrl, contactUrl: configuredContactUrl, local: false };
      pass(`using configured production-like frontend runtime ${configuredFrontendUrl}`);
    } else {
      localRuntimeAttempted = true;
      localDataDirectory = await mkdtemp(join(tmpdir(), 'ivan-contact-volume-'));
      runtime = await startLocalRuntime(localDataDirectory);
      localRuntime = Boolean(runtime?.local);
    }
    if (runtime) {
      await verifyFrontend(runtime.frontendUrl, localRuntime);
      await verifyContactApi(runtime.contactUrl, runtime.frontendUrl);
      if (runtime.local) await restartAndVerifyContactData(runtime);
    }
  } finally {
    if (localDataDirectory) await restoreLocalDataDirectoryAccess(localDataDirectory);
    if (localRuntimeAttempted) await stopLocalRuntime();
    if (localDataDirectory) await rm(localDataDirectory, { recursive: true, force: true });
  }

  console.log('\n=== PRODUCTION VERIFICATION SUMMARY ===');
  console.log(`PASS: ${passes.length}`);
  console.log(`DEFERRED: ${deferred.length}`);
  console.log(`FAIL: ${failures.length}`);
  if (failures.length > 0) process.exitCode = 1;
  else if (deferred.length > 0) process.exitCode = 2;
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
