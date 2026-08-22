import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { publicSiteRoutes, routeHtmlPath } from '../apps/frontend/src/routes';

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'infra/docker-compose.prod.yml',
  'infra/docker-compose.build.yml',
  'apps/frontend/Dockerfile',
  'apps/contact-api/Dockerfile',
  'apps/frontend/nginx.conf',
  'apps/frontend/public/site.webmanifest',
  'apps/frontend/public/favicon.svg',
  'apps/frontend/public/favicon-16.svg',
  'apps/frontend/public/favicon-32.svg',
  'apps/frontend/public/favicon-48.svg',
  'apps/frontend/public/favicon-180.svg',
  'apps/frontend/public/favicon-192.svg',
  'apps/frontend/public/favicon-512.svg',
  'infra/prepare-prod-data.sh',
  'scripts/deploy/release.sh',
  'scripts/deploy/rollback.sh',
  'scripts/deploy/smoke-test.sh',
];
const requiredComposeMarkers = [
  'ivan-site',
  'ivan-contact',
  'websecure',
  'traefik.docker.network=${TRAEFIK_NETWORK:-traffic_net}',
  'PathPrefix(`/api`)',
  'CONTACT_ALLOWED_ORIGIN: https://${SITE_HOST',
];
const requiredBuildMarkers = [
  'context: ../apps/frontend',
  'context: ../apps/contact-api',
  'dockerfile: Dockerfile',
];
const requiredContactRuntimeMarkers = [
  'FROM node:20-bookworm-slim AS build',
  'RUN npm ci',
  'RUN npm run build',
  'RUN npm prune --omit=dev',
  'COPY --from=build /app/node_modules ./node_modules',
  'COPY --from=build /app/dist ./dist',
  'RUN mkdir /data && chown node:node /data',
  'ENV CONTACT_DATABASE_PATH=/data/contact.sqlite',
  'USER node',
  'HEALTHCHECK',
  'CMD ["node", "dist/main.js"]',
];
const requiredContactComposeMarkers = [
  'CONTACT_DATABASE_PATH: /data/contact.sqlite',
  './data/prod/contact-api:/data',
];
const requiredContactDataMarkers = [
  'mkdir -p "$DATA_DIRECTORY"',
  'chown 1000:1000 "$DATA_DIRECTORY"',
  'chmod 770 "$DATA_DIRECTORY"',
  'data/prod/contact-api',
];
const requiredReleaseMarkers = [
  'compose pull "${SERVICES[@]}"',
  'compose up -d --no-deps --force-recreate',
  'FIRST_LAUNCH',
  'DEPLOY_FRONTEND',
  'DEPLOY_CONTACT_API',
  'wait_healthy',
];
const requiredRollbackMarkers = [
  'PREVIOUS_FRONTEND',
  'PREVIOUS_CONTACT_API',
  'compose up -d --no-deps --force-recreate',
];
const requiredSmokeMarkers = [
  "check_url '/'",
  "check_url '/cv'",
  "check_url '/robots.txt'",
  "check_url '/sitemap.xml'",
];
const requiredNginxMarkers = publicSiteRoutes.flatMap((route) => {
  const routeMarkers = [`location = ${route.path}`];
  if (route.path === '/') return [...routeMarkers, 'try_files /index.html =500'];
  return [
    ...routeMarkers,
    `try_files /${routeHtmlPath(route)} =404`,
    `location = ${route.path}/`,
    `return 301 ${route.path}`,
  ];
});
const requiredStaticMarkers = [
  'location = /robots.txt',
  'location = /sitemap.xml',
  'location = /site.webmanifest',
  'application/manifest+json',
  'location ~ ^/favicon(?:-[0-9]+)?\\.svg$',
  'max-age=86400',
  'absolute_redirect off;',
];

async function main() {
  const errors: string[] = [];
  const contents = new Map<string, string>();
  for (const file of requiredFiles) {
    try {
      contents.set(file, await readFile(resolve(rootDirectory, file), 'utf8'));
    } catch {
      errors.push(`missing deployment file: ${file}`);
    }
  }

  const compose = contents.get('infra/docker-compose.prod.yml') ?? '';
  const build = contents.get('infra/docker-compose.build.yml') ?? '';
  const nginx = contents.get('apps/frontend/nginx.conf') ?? '';
  const contactDockerfile = contents.get('apps/contact-api/Dockerfile') ?? '';
  const contactDataPreparation = contents.get('infra/prepare-prod-data.sh') ?? '';
  const releaseScript = contents.get('scripts/deploy/release.sh') ?? '';
  const rollbackScript = contents.get('scripts/deploy/rollback.sh') ?? '';
  const smokeScript = contents.get('scripts/deploy/smoke-test.sh') ?? '';
  for (const marker of requiredComposeMarkers) {
    if (!compose.includes(marker)) errors.push(`infra/docker-compose.prod.yml is missing: ${marker}`);
  }
  for (const marker of requiredBuildMarkers) {
    if (!build.includes(marker)) errors.push(`infra/docker-compose.build.yml is missing: ${marker}`);
  }
  for (const marker of requiredContactRuntimeMarkers) {
    if (!contactDockerfile.includes(marker)) errors.push(`apps/contact-api/Dockerfile is missing: ${marker}`);
  }
  for (const marker of requiredContactComposeMarkers) {
    if (!compose.includes(marker)) errors.push(`infra/docker-compose.prod.yml is missing: ${marker}`);
  }
  for (const marker of requiredContactDataMarkers) {
    if (!contactDataPreparation.includes(marker)) errors.push(`infra/prepare-prod-data.sh is missing: ${marker}`);
  }
  for (const marker of requiredReleaseMarkers) {
    if (!releaseScript.includes(marker)) errors.push(`scripts/deploy/release.sh is missing: ${marker}`);
  }
  for (const marker of requiredRollbackMarkers) {
    if (!rollbackScript.includes(marker)) errors.push(`scripts/deploy/rollback.sh is missing: ${marker}`);
  }
  for (const marker of requiredSmokeMarkers) {
    if (!smokeScript.includes(marker)) errors.push(`scripts/deploy/smoke-test.sh is missing: ${marker}`);
  }
  if (!contactDataPreparation.startsWith('#!/usr/bin/env sh')) {
    errors.push('infra/prepare-prod-data.sh must be a POSIX shell script');
  }
  for (const [file, contentsToCheck] of [
    ['scripts/deploy/release.sh', releaseScript],
    ['scripts/deploy/rollback.sh', rollbackScript],
    ['scripts/deploy/smoke-test.sh', smokeScript],
  ] as const) {
    if (!contentsToCheck.startsWith('#!/usr/bin/env bash')) {
      errors.push(`${file} must be a Bash script`);
    }
  }
  for (const marker of [...requiredNginxMarkers, ...requiredStaticMarkers]) {
    if (!nginx.includes(marker)) errors.push(`nginx route policy is missing: ${marker}`);
  }
  const hardcodedCredential = compose.split(/\r?\n/).some((line) => {
    const match = line.match(/^\s*(?:[A-Z_]*(?:PASSWORD|SECRET|TOKEN|API_KEY)[A-Z_]*):\s*(.*)$/i);
    const value = match?.[1]?.trim() ?? '';
    return Boolean(value) && !value.startsWith('${');
  });
  if (hardcodedCredential) {
    errors.push('infra/docker-compose.prod.yml contains a hardcoded credential-like value');
  }
  if (/ports:\s*\n\s*-\s*["']?\d+/i.test(compose)) {
    errors.push('production services must not publish host ports outside Traefik');
  }
  if (compose.includes('tls.certresolver=') || compose.includes('ivan-security')) {
    errors.push('production compose must use the server-owned minimal Traefik configuration');
  }
  if (compose.includes('ivan-home-redirect') || compose.includes('ivan-unregistered')) {
    errors.push('unregistered-host redirects must be configured on the server Traefik compose');
  }
  if (!compose.includes('external: true')) {
    errors.push('production services must join the server-owned external Traefik network');
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`FAIL: ${error}`);
    process.exit(1);
  }

  console.log('PASS: deployment files declare minimal server-owned Traefik routing and manifest-aligned canonical redirects');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
