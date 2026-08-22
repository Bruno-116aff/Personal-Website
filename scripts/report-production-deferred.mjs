console.error(
  'DEFERRED: live production verification requires deployment output, user-owned VPS/Docker/Traefik access, '
    + 'DNS resolution for ivan.hubko.me and production HTTP response access. '
    + 'Run npm run verify:production again after those inputs are available.',
);
process.exit(2);
