const [checkName] = process.argv.slice(2);

if (!checkName) {
  console.error('Usage: node scripts/verify-deferred.mjs <check-name>');
  process.exit(1);
}

console.log(`DEFERRED: ${checkName} verification is owned by a later implementation task.`);
process.exit(2);
