import { spawn } from 'node:child_process';

const groups = [
  {
    name: 'STATIC',
    checks: [
      'typecheck',
      'test',
      'build',
      'verify:frontend',
      'verify:accessibility',
      'verify:performance',
      'verify:content',
      'verify:meta',
      'lint',
      'format:check',
    ],
  },
  {
    name: 'PRODUCTION-LIKE',
    checks: ['verify:deployment'],
  },
  {
    name: 'LOCAL-PRODUCTION',
    checks: ['verify:production'],
  },
];

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';
const results = [];

function runCheck(check) {
  return new Promise((resolve) => {
    let child;
    try {
      const command = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : npmCommand;
      const args = isWindows ? ['/d', '/s', '/c', `${npmCommand} run ${check}`] : ['run', check];
      child = spawn(command, args, {
        cwd: process.cwd(),
        shell: false,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (error) {
      resolve({ check, status: 'FAIL', output: error.message });
      return;
    }
    let output = '';

    child.stdout.on('data', (chunk) => {
      output += chunk;
    });
    child.stderr.on('data', (chunk) => {
      output += chunk;
    });
    child.on('error', (error) => {
      resolve({ check, status: 'FAIL', output: error.message });
    });
    child.on('close', (code) => {
      const hasDeferredOutput = /(?:^|\n)\s*DEFERRED:\s*(?:[1-9]\d*|[A-Za-z])[^\r\n]*/i.test(
        output,
      );
      if (code === 0 && !hasDeferredOutput) {
        resolve({ check, status: 'PASS', output });
      } else if (check === 'verify:production' && hasDeferredOutput) {
        resolve({ check, status: 'DEFERRED', output });
      } else if (code === 0 && hasDeferredOutput) {
        resolve({
          check,
          status: 'FAIL',
          output: `${output}\nDEFERRED output was reported with a successful exit code.`,
        });
      } else {
        resolve({ check, status: 'FAIL', output: `${output}\nExit code: ${code}` });
      }
    });
  });
}

for (const group of groups) {
  console.log(`\n=== ${group.name} CHECKS ===`);
  for (const check of group.checks) {
    const result = await runCheck(check);
    results.push({ ...result, group: group.name });
    console.log(`\n[${result.status}] npm run ${check}`);
    if (result.output.trim()) console.log(result.output.trim());
  }
}

const failures = results.filter(({ status }) => status === 'FAIL');
const deferred = results.filter(({ status }) => status === 'DEFERRED');
const passed = results.filter(({ status }) => status === 'PASS');

console.log('\n=== VERIFICATION SUMMARY ===');
console.log(`PASS: ${passed.length}`);
console.log(`DEFERRED: ${deferred.length}`);
console.log(`FAIL: ${failures.length}`);

if (deferred.length > 0) {
  console.log('\nDeferred checks require explicit external follow-up:');
  for (const { check, output } of deferred) {
    const detail =
      output.match(/DEFERRED:\s*(?:[1-9]\d*|[A-Za-z])[^\n]*/i)?.[0] ??
      'DEFERRED without an actionable reason';
    console.log(`- npm run ${check}: ${detail}`);
  }
}

if (failures.length > 0) process.exitCode = 1;
else if (deferred.length > 0) process.exitCode = 2;
