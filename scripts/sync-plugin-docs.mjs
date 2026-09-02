/**
 * Copies `docs/` into the plugin's skill as its reference material, so the
 * plugin ships the same prose the repository maintains instead of a second
 * copy that drifts.
 *
 * The tree is mirrored rather than flattened, which keeps every relative link
 * inside the docs (`../states.md`, `./guides/rendering.md#async-content`)
 * resolving unchanged once copied.
 *
 * Run `node scripts/sync-plugin-docs.mjs` to refresh, or with `--check` to
 * fail when the copy is stale — the form to run in CI.
 */
import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = join(ROOT, 'docs');
const TARGET = join(ROOT, 'plugin/skills/terracotta/references');

const BANNER =
  '<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->\n\n';

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

async function read(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return undefined;
  }
}

const check = process.argv.includes('--check');
const sources = await collect(SOURCE);
const stale = [];

if (!check) {
  await rm(TARGET, { recursive: true, force: true });
}

for (const source of sources) {
  const target = join(TARGET, relative(SOURCE, source));
  const wanted = BANNER + (await readFile(source, 'utf8'));

  if (check) {
    if ((await read(target)) !== wanted) {
      stale.push(relative(ROOT, target));
    }
    continue;
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, wanted);
}

if (check) {
  // A file the docs no longer have is just as stale as one that changed.
  const copied = await collect(TARGET).catch(() => []);
  const expected = new Set(sources.map((source) => join(TARGET, relative(SOURCE, source))));
  for (const path of copied) {
    if (!expected.has(path)) {
      stale.push(relative(ROOT, path));
    }
  }

  if (stale.length > 0) {
    console.error(
      `The plugin's reference copy is out of date:\n${stale.map((path) => `  ${path}`).join('\n')}\n\nRun \`pnpm skill:sync\`.`,
    );
    process.exit(1);
  }
  console.log(`Plugin reference copy is current (${sources.length} files).`);
} else {
  console.log(`Copied ${sources.length} files into ${relative(ROOT, TARGET)}.`);
}
