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
const SKILL = join(ROOT, 'plugin/skills/terracotta/SKILL.md');
const COMPONENTS = join(ROOT, 'packages/terracotta/src/components');

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

/** The `## Anatomy` sample, which is the component's shape with nothing else around it. */
const ANATOMY = /^## Anatomy\n+```tsx\n([\s\S]*?)```/m;

/** Where the generated catalogue goes in the skill. */
const CATALOGUE_START = '<!-- catalogue:start -->';
const CATALOGUE_END = '<!-- catalogue:end -->';

/**
 * Names a component folder exports and means for callers, which is everything
 * but the context objects and the tag constants it shares internally.
 */
async function exportsOf(dir) {
  const names = new Set();
  for (const entry of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isDirectory() || !/\.tsx?$/.test(entry.name)) {
      continue;
    }
    const source = await readFile(join(entry.parentPath ?? entry.path, entry.name), 'utf8');
    for (const [, name] of source.matchAll(
      /export\s+(?:async\s+)?(?:function|const|class)\s+(\w+)/g,
    )) {
      const internal = name.endsWith('Context') || /^[A-Z0-9_]+$/.test(name);
      if (!internal && /^([A-Z]|use[A-Z])/.test(name)) {
        names.add(name);
      }
    }
  }
  return names;
}

/**
 * The catalogue folded into the skill: each component's shape, taken from the
 * page that documents it, under the subpath it is imported from.
 *
 * It lives in the skill rather than the references because it is what an agent
 * needs before it opens anything, and it is generated because a hand-written
 * copy of two dozen component shapes is a copy that goes stale.
 */
async function buildCatalogue(pages) {
  const blocks = [];

  for (const [path, markdown] of [...pages].sort()) {
    if (!path.startsWith('components/')) {
      continue;
    }
    const slug = path.slice('components/'.length, -'.md'.length);
    const anatomy = ANATOMY.exec(markdown)?.[1];
    if (anatomy === undefined) {
      throw new Error(`${path} has no ## Anatomy block to build the catalogue from`);
    }

    const shown = new Set([...anatomy.matchAll(/<([A-Z]\w*)/g)].map(([, name]) => name));
    const rest = [...(await exportsOf(join(COMPONENTS, slug)))]
      .filter((name) => !shown.has(name))
      .sort();

    const lines = [`// terracotta/${slug}`, anatomy.trimEnd()];
    if (rest.length > 0) {
      lines.push(`// also exported: ${rest.join(', ')}`);
    }
    blocks.push(['```tsx', ...lines, '```'].join('\n'));
  }

  return blocks.join('\n\n');
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

const catalogue = await buildCatalogue(wanted);
const skill = await readFile(SKILL, 'utf8');
const start = skill.indexOf(CATALOGUE_START);
const end = skill.indexOf(CATALOGUE_END);
if (start < 0 || end < 0) {
  throw new Error(`SKILL.md is missing its ${CATALOGUE_START} / ${CATALOGUE_END} markers`);
}
const wantedSkill = `${skill.slice(0, start + CATALOGUE_START.length)}\n\n${catalogue}\n\n${skill.slice(end)}`;

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

  if (skill !== wantedSkill) {
    stale.push(relative(ROOT, SKILL));
  }

  if (stale.length > 0) {
    console.error(
      `The plugin's reference copy is out of date:\n${stale.map((path) => `  ${path}`).join('\n')}\n\nRun \`pnpm skill:sync\`.`,
    );
    process.exit(1);
  }
  console.log(`Plugin reference copy is current (${wanted.size} files).`);
} else {
  await writeFile(SKILL, wantedSkill);
  await rm(TARGET, { recursive: true, force: true });
  for (const [path, contents] of wanted) {
    const target = join(TARGET, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, BANNER + contents);
  }
  console.log(
    `Copied ${wanted.size} files into ${relative(ROOT, TARGET)}, and rebuilt the skill's catalogue.`,
  );
}
