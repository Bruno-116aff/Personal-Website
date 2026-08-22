const [checkName] = process.argv.slice(2);

if (!checkName) {
  console.error('Usage: node scripts/verify-deferred.mjs <check-name>');
  process.exit(1);
}

console.error(
  `DEFERRED: ${checkName} verification requires deployment output, user-owned VPS/Docker/Traefik access, `
    + 'DNS resolution for ivan.hubko.me and production HTTP response access. '
    + `Run npm run verify:${checkName} again after those inputs are available.`,
);
process.exit(2);
