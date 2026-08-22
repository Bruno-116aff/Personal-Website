import { readFile } from 'node:fs/promises';

const requiredFiles = [
  'infra/docker-compose.prod.yml',
  'infra/docker-compose.build.yml',
  'apps/frontend/Dockerfile',
  'apps/contact-api/Dockerfile',
  'apps/frontend/nginx.conf',
];
const requiredComposeMarkers = [
  'ivan-site',
  'ivan-contact',
  'websecure',
  'tls.certresolver=',
  'stsSeconds=31536000',
  'contentTypeNosniff=true',
  'referrerPolicy=strict-origin-when-cross-origin',
  'permissionsPolicy=',
  'Content-Security-Policy=',
  'Path(`/api/contact`)',
  'ivan-bare',
  'ivan-unregistered',
  'CONTACT_ALLOWED_ORIGIN: https://${SITE_HOST',
];
const requiredBuildMarkers = [
  'context: ../apps/frontend',
  'context: ../apps/contact-api',
  'dockerfile: Dockerfile',
];
const requiredNginxLocations = [
  'location = /',
  'location = /cv',
  'location = /work/infrastructure-reliability',
  'location = /work/operations-automation',
  'location = /work/unified-platform',
  'location = /work/account-automation',
  'location = /robots.txt',
  'location = /sitemap.xml',
  'absolute_redirect off;',
  'return 301 /;',
];

const errors = [];
const contents = new Map();
for (const file of requiredFiles) {
  try {
    contents.set(file, await readFile(file, 'utf8'));
  } catch {
    errors.push(`missing deployment file: ${file}`);
  }
}

const compose = contents.get('infra/docker-compose.prod.yml') ?? '';
const build = contents.get('infra/docker-compose.build.yml') ?? '';
const nginx = contents.get('apps/frontend/nginx.conf') ?? '';
for (const marker of requiredComposeMarkers) {
  if (!compose.includes(marker)) errors.push(`infra/docker-compose.prod.yml is missing: ${marker}`);
}
for (const marker of requiredBuildMarkers) {
  if (!build.includes(marker)) errors.push(`infra/docker-compose.build.yml is missing: ${marker}`);
}
for (const location of requiredNginxLocations) {
  if (!nginx.includes(location)) errors.push(`nginx route policy is missing: ${location}`);
}
if (/^(?:\s*)(?:[A-Z_]*(?:PASSWORD|SECRET|TOKEN|API_KEY)[A-Z_]*):\s*(?!\$\{|$)/mi.test(compose)) {
  errors.push('infra/docker-compose.prod.yml contains a hardcoded credential-like value');
}
if (/ports:\s*\n\s*-\s*["']?\d+/i.test(compose)) {
  errors.push('production services must not publish host ports outside Traefik');
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log('PASS: deployment files declare secure Traefik routing, headers and canonical redirects');
