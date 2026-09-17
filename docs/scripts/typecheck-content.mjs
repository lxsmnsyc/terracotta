/**
 * Compiles the code samples in `content/` so the documentation cannot promise
 * something the library does not do.
 *
 * Only the self-contained ones are compiled: a fence that imports what it uses
 * is a module and can stand on its own. The rest are fragments written to be
 * read in place, referencing values the surrounding prose introduced, and there
 * is no honest way to compile them without inventing that context.
 *
 * The extracted files land in a scratch directory that is removed afterwards.
 * Pass `--keep` to leave them behind when a failure needs looking at.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE = fileURLToPath(new URL('..', import.meta.url));
const CONTENT = join(PACKAGE, 'content');
const SCRATCH = join(PACKAGE, '.content-typecheck');

const FENCE = /```tsx\n([\s\S]*?)```/g;
/** A fence that imports what it uses is a module rather than a quoted excerpt. */
const IMPORTS = /^import .* from /m;
/**
 * A top-level JSX expression means the fence is an excerpt: it is showing the
 * markup in place, standing in a component the prose has already described, and
 * leans on names that component would have. Those cannot compile alone however
 * many imports they open with.
 */
const LOOSE_MARKUP = /^</m;

async function collect(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(path)));
    } else if (entry.name.endsWith('.md')) {
      files.push(path);
    }
  }
  return files.sort();
}

await rm(SCRATCH, { recursive: true, force: true });

const extracted = [];
for (const source of await collect(CONTENT)) {
  const markdown = await readFile(source, 'utf8');
  const slug = relative(CONTENT, source).replace(/\.md$/, '').replace(/[/\\]/g, '-');
  let index = 0;

  for (const [, code] of markdown.matchAll(FENCE)) {
    index += 1;
    if (!IMPORTS.test(code) || LOOSE_MARKUP.test(code)) {
      continue;
    }
    const target = join(SCRATCH, `${slug}-${index}.tsx`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, code);
    extracted.push({ file: relative(PACKAGE, target), source: relative(PACKAGE, source), index });
  }
}

if (extracted.length === 0) {
  console.error('No self-contained samples found in content/. That is almost certainly a bug.');
  process.exit(1);
}

await writeFile(
  join(SCRATCH, 'tsconfig.json'),
  `${JSON.stringify(
    {
      extends: '../tsconfig.json',
      include: ['./*.tsx'],
      compilerOptions: {
        // A sample is written to be read, not to pass a linter: it may leave a
        // prop unused or a binding unread to keep the point visible.
        noUnusedLocals: false,
        noUnusedParameters: false,
        noUncheckedIndexedAccess: false,
        types: [],
      },
    },
    null,
    2,
  )}\n`,
);

const result = spawnSync(
  join(PACKAGE, '../node_modules/.bin/tsc'),
  ['--noEmit', '-p', relative(PACKAGE, join(SCRATCH, 'tsconfig.json'))],
  { cwd: PACKAGE, encoding: 'utf8' },
);

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();

if (result.status === 0) {
  if (!process.argv.includes('--keep')) {
    await rm(SCRATCH, { recursive: true, force: true });
  }
  console.log(`Compiled ${extracted.length} samples from content/.`);
} else {
  // Point back at the page rather than the scratch file the reader cannot find.
  const origins = new Map(
    extracted.map((item) => [item.file, `${item.source} (sample ${item.index})`]),
  );
  let report = output;
  for (const [file, origin] of origins) {
    report = report.split(file).join(origin);
  }
  console.error(report);
  console.error(`\nRe-run with --keep to inspect ${relative(PACKAGE, SCRATCH)}.`);
  process.exit(1);
}
