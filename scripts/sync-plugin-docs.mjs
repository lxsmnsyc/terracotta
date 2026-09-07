/**
 * Copies the documentation site's prose into the plugin's skill as its
 * reference material, so the plugin ships the same words the repository
 * maintains instead of a second copy that drifts.
 *
 * The source is `docs/content`, which is what the site compiles into pages.
 * The tree is mirrored rather than flattened, which keeps every relative link
 * inside the prose (`../states.md`, `./guides/rendering.md#async-content`)
 * resolving unchanged once copied.
 *
 * Two things are not a straight copy. The site embeds its live examples with
 * `:::demo` and `:::hero` directives, which mean nothing outside the site and
 * are dropped here. And the site's index is `nav.json`, read by the sidebar
 * rather than written as a page, so the reference tree gets a README generated
 * from it.
 *
 * Run `node scripts/sync-plugin-docs.mjs` to refresh, or with `--check` to
 * fail when the copy is stale, which is the form to run in CI.
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = join(ROOT, 'docs/content');
const TARGET = join(ROOT, 'plugin/skills/terracotta/references');

const BANNER =
  '<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->\n\n';

/** A directive block, from its opening line to the closing fence. */
const DEMO_BLOCK = /^:::(?:demo|hero)[ \t]+\S+[ \t]*\r?\n[\s\S]*?^:::[ \t]*\r?\n?/gm;

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

function withoutDemos(markdown) {
  return markdown.replace(DEMO_BLOCK, '').replace(/\n{3,}/g, '\n\n');
}

/** The page's own `# ` heading, which is what the site titles it with. */
function titleOf(markdown, slug) {
  return /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim() ?? slug;
}

async function buildIndex(pages) {
  const nav = JSON.parse(await readFile(join(SOURCE, 'nav.json'), 'utf8'));
  const lines = [
    '# Terracotta documentation',
    '',
    'Terracotta is a headless UI library for SolidJS. Each component gives you',
    'behaviour, keyboard handling and ARIA wiring. None of them give you styles.',
    '',
    '```bash',
    'npm i terracotta@next',
    '```',
    '',
    '```tsx',
    "import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';",
    '```',
    '',
  ];

  for (const section of nav) {
    lines.push(`## ${section.title}`, '');
    for (const slug of section.pages) {
      const page = pages.get(`${slug}.md`);
      if (page === undefined) {
        throw new Error(`nav.json lists ${slug}, which has no file in docs/content`);
      }
      lines.push(`- [${titleOf(page, slug)}](./${slug}.md)`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

const check = process.argv.includes('--check');
const sources = await collect(SOURCE);

/** Every file the plugin should end up with, keyed by its path under `references/`. */
const wanted = new Map();
for (const source of sources) {
  wanted.set(relative(SOURCE, source), withoutDemos(await readFile(source, 'utf8')));
}
wanted.set('README.md', await buildIndex(wanted));

if (check) {
  const stale = [];
  for (const [path, contents] of wanted) {
    if ((await read(join(TARGET, path))) !== BANNER + contents) {
      stale.push(relative(ROOT, join(TARGET, path)));
    }
  }

  // A file the docs no longer have is just as stale as one that changed.
  for (const path of await collect(TARGET).catch(() => [])) {
    if (!wanted.has(relative(TARGET, path))) {
      stale.push(relative(ROOT, path));
    }
  }

  if (stale.length > 0) {
    console.error(
      `The plugin's reference copy is out of date:\n${stale.map((path) => `  ${path}`).join('\n')}\n\nRun \`pnpm skill:sync\`.`,
    );
    process.exit(1);
  }
  console.log(`Plugin reference copy is current (${wanted.size} files).`);
} else {
  await rm(TARGET, { recursive: true, force: true });
  for (const [path, contents] of wanted) {
    const target = join(TARGET, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, BANNER + contents);
  }
  console.log(`Copied ${wanted.size} files into ${relative(ROOT, TARGET)}.`);
}
