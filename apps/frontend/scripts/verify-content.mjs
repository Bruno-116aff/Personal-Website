import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const roots = ['src', 'public', 'index.html', 'dist'];
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.mjs', '.ts', '.tsx']);
const bannedPatterns = [
  /innovative/i,
  /passionate/i,
  /cutting-edge/i,
  /results-driven/i,
  /highly motivated/i,
  /rockstar/i,
  /ninja/i,
  /10x developer/i,
  /coding is my passion/i,
  /farm|warming|purchased accounts|bought accounts|fake comments|fake likes|ban rate|detection evasion/i,
  /lorem ipsum|placeholder testimonial|TODO|FIXME/i,
  /[\u0400-\u04ff]/u,
];

async function filesUnder(root) {
  try {
    const entry = await readdir(root, { withFileTypes: true });
    const files = [];
    for (const item of entry) {
      const path = join(root, item.name);
      if (item.isDirectory()) files.push(...(await filesUnder(path)));
      else if (textExtensions.has(extname(item.name).toLowerCase())) files.push(path);
    }
    return files;
  } catch {
    return [];
  }
}

const files = [];
for (const root of roots) {
  const discovered = await filesUnder(root);
  if (discovered.length > 0) files.push(...discovered);
}

const errors = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const pattern of bannedPatterns) {
    if (pattern.test(content)) errors.push(`${file}: matched ${pattern}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: public content scan verified ${files.length} files`);
