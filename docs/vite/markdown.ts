import { promises as fs } from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import type { Plugin } from 'vite';
import { highlight } from './highlighter';

export const CONTENT_DIR = 'content';

const DEMO_BLOCK = /^:::(demo|hero)[ \t]+(\S+)[ \t]*\r?\n([\s\S]*?)^:::[ \t]*$/gm;

interface Segment {
  kind: 'markdown' | 'demo' | 'hero';
  text: string;
  demoId?: string;
}

const md = MarkdownIt({ html: true, linkify: true, typographer: false });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * `./accordion.md#anatomy` in `content/components/x.md` becomes
 * `/components/accordion#anatomy`. The content tree and the route tree are the
 * same shape, so one relative resolve covers every cross-link and the markdown
 * stays readable on its own.
 */
function resolveDocLink(fileSlugDir: string, href: string): string {
  if (!/\.md(#|$)/.test(href) || /^[a-z]+:/i.test(href)) {
    return href;
  }

  const [target = '', hash] = href.split('#');
  const resolved = path.posix
    .normalize(path.posix.join(fileSlugDir, target))
    .replace(/\.md$/, '')
    .replace(/(^|\/)README$/i, '');

  const trimmed = resolved.replace(/^\/+|\/+$/g, '');
  const route = trimmed ? `/${trimmed}` : '/';

  return hash ? `${route}#${hash}` : route;
}

function split(source: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;

  DEMO_BLOCK.lastIndex = 0;
  for (let match = DEMO_BLOCK.exec(source); match; match = DEMO_BLOCK.exec(source)) {
    if (match.index > cursor) {
      segments.push({ kind: 'markdown', text: source.slice(cursor, match.index) });
    }
    segments.push({
      kind: match[1] === 'hero' ? 'hero' : 'demo',
      demoId: match[2],
      text: match[3] ?? '',
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    segments.push({ kind: 'markdown', text: source.slice(cursor) });
  }
  return segments;
}

/** markdown-it's own token type, taken from the parser rather than a separate
 *  `@types` package that can drift from the installed version. */
type MdToken = ReturnType<typeof md.parse>[number];

function resolveInlineLinks(token: MdToken, slugDir: string): void {
  for (const child of token.children ?? []) {
    if (child.type !== 'link_open') {
      continue;
    }
    const href = child.attrGet('href');
    if (href) {
      child.attrSet('href', resolveDocLink(slugDir, String(href)));
    }
  }
}

interface Rendered {
  html: string;
  headings: { id: string; text: string; level: number }[];
  title?: string;
  description?: string;
}

async function render(text: string, slugDir: string, wantsMeta: boolean): Promise<Rendered> {
  const env = {};
  const tokens = md.parse(text, env);
  const headings: Rendered['headings'] = [];
  let title: string | undefined;
  let description: string | undefined;
  const drop = new Set<number>();

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (!token) {
      continue;
    }

    if (token.type === 'fence') {
      const lang = token.info.trim().split(/\s+/, 1)[0] ?? '';
      token.type = 'html_block';
      token.content = await highlight(token.content, lang || 'text');
      continue;
    }

    // Links are nested inside `inline` tokens, never at the block level.
    if (token.type === 'inline') {
      resolveInlineLinks(token, slugDir);
      continue;
    }

    if (token.type !== 'heading_open') {
      continue;
    }

    const inline = tokens[i + 1];
    const raw = inline?.content ?? '';
    const level = Number(token.tag.slice(1));

    if (level === 1) {
      // The page shell renders the title and lede itself, so they are lifted
      // out of the body instead of being rendered twice.
      if (wantsMeta && title === undefined) {
        title = raw;
        drop.add(i);
        drop.add(i + 1);
        drop.add(i + 2);

        const paragraph = tokens[i + 3];
        const lede = tokens[i + 4];
        if (paragraph?.type === 'paragraph_open' && lede) {
          // The lede is prose like any other: it carries links, code spans and
          // emphasis, so it is rendered rather than passed through as source.
          // It is lifted out of the body ahead of the main loop, so its links
          // are resolved here instead.
          resolveInlineLinks(lede, slugDir);
          description = md.renderer.renderInline(lede.children ?? [], md.options, env);
          drop.add(i + 3);
          drop.add(i + 4);
          drop.add(i + 5);
        }
      }
      continue;
    }

    if (level > 3) {
      continue;
    }

    const id = slugify(raw);
    token.attrSet('id', id);
    headings.push({ id, text: raw, level });
  }

  const kept = tokens.filter((_, index) => !drop.has(index));
  return { html: md.renderer.render(kept, md.options, env), headings, title, description };
}

export function markdownPlugin(): Plugin {
  let root = process.cwd();

  return {
    name: 'terracotta-docs:markdown',
    // Runs before Vite's JS pipeline so the module it emits is what gets parsed.
    enforce: 'pre',

    configResolved(config) {
      root = config.root;
    },

    async transform(_code, id) {
      if (!id.endsWith('.md')) {
        return undefined;
      }

      const relative = path.relative(path.join(root, CONTENT_DIR), id).split(path.sep).join('/');
      if (relative.startsWith('..')) {
        return undefined;
      }

      const source = await fs.readFile(id, 'utf8');
      const slug = relative.replace(/\.md$/, '');
      const slugDir = path.posix.dirname(slug);

      const imports: string[] = [];
      const blocks: string[] = [];
      const headings: Rendered['headings'] = [];
      let title = slug;
      let description = '';
      let first = true;

      let hero = 'undefined';

      for (const segment of split(source)) {
        if (segment.kind === 'demo' || segment.kind === 'hero') {
          const demoId = segment.demoId ?? '';
          const alias = `__demo${imports.length}`;
          imports.push(
            `import * as ${alias} from ${JSON.stringify(`virtual:demo-source/${demoId}`)};`,
          );

          const caption = segment.text.trim()
            ? (await render(segment.text, slugDir, false)).html
            : '';

          const block =
            `{ type: 'demo', id: ${alias}.id, title: ${alias}.title, ` +
            `code: ${alias}.code, caption: ${JSON.stringify(caption)} }`;

          if (segment.kind === 'hero') {
            hero = block;
          } else {
            blocks.push(block);
          }
          continue;
        }

        if (!segment.text.trim()) {
          continue;
        }

        const rendered = await render(segment.text, slugDir, first);
        if (first) {
          title = rendered.title ?? title;
          description = rendered.description ?? '';
          first = false;
        }
        headings.push(...rendered.headings);
        if (rendered.html.trim()) {
          blocks.push(`{ type: 'html', html: ${JSON.stringify(rendered.html)} }`);
        }
      }

      return {
        code: [
          ...imports,
          'export default {',
          `  slug: ${JSON.stringify(slug)},`,
          `  title: ${JSON.stringify(title)},`,
          `  description: ${JSON.stringify(description)},`,
          `  headings: ${JSON.stringify(headings)},`,
          `  hero: ${hero},`,
          `  blocks: [\n    ${blocks.join(',\n    ')}\n  ],`,
          '};',
        ].join('\n'),
        map: null,
      };
    },
  };
}

const CONTENT_ID = 'virtual:content';
const RESOLVED_CONTENT_ID = '\0' + CONTENT_ID;

interface NavSection {
  title: string;
  pages: string[];
}

/**
 * `nav.json` is hand-edited, so a typo there should fail the build with the
 * offending file named rather than produce a silently empty sidebar.
 */
function parseNav(raw: string, file: string): NavSection[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`${file} must contain an array of sections`);
  }

  return parsed.map((section: unknown, index: number) => {
    if (
      typeof section !== 'object' ||
      section === null ||
      !('title' in section) ||
      !('pages' in section)
    ) {
      throw new Error(`${file}: section ${index} needs a "title" string and a "pages" array`);
    }

    const { title, pages } = section;
    if (typeof title !== 'string' || !Array.isArray(pages)) {
      throw new Error(`${file}: section ${index} needs a "title" string and a "pages" array`);
    }

    return { title, pages: pages.map((page: unknown) => String(page)) };
  });
}

/**
 * Title and lede, read straight off the source. They are needed synchronously,
 * the sidebar lists them, and `<title>` must be registered before the SSR shell
 * flushes, so they cannot come from the page module, which loads on demand.
 */
function scanFrontMatter(source: string): { title?: string; description?: string } {
  const heading = /^#\s+(.+)$/m.exec(source);
  if (!heading?.[1]) {
    return {};
  }

  const rest = source.slice(heading.index + heading[0].length);

  for (const block of rest.split(/\n\s*\n/)) {
    const trimmed = block.trim();
    // Skip anything that is not running prose: headings, lists, tables, fences.
    if (!trimmed || /^[#>\-*|`]/.test(trimmed)) {
      continue;
    }

    return {
      title: heading[1].trim(),
      description: trimmed
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[`*_]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    };
  }

  return { title: heading[1].trim() };
}

/**
 * The sidebar needs every page's title but none of their bodies, so the index
 * is built from a cheap scan (nav order plus the first `# ` line) and the
 * bodies stay behind per-slug dynamic imports.
 */
export function contentIndexPlugin(): Plugin {
  let root = process.cwd();

  return {
    name: 'terracotta-docs:content-index',

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      return id === CONTENT_ID ? RESOLVED_CONTENT_ID : undefined;
    },

    async load(id) {
      if (id !== RESOLVED_CONTENT_ID) {
        return undefined;
      }

      const contentRoot = path.join(root, CONTENT_DIR);
      const navFile = path.join(contentRoot, 'nav.json');
      this.addWatchFile(navFile);

      const nav = parseNav(await fs.readFile(navFile, 'utf8'), navFile);
      const slugs = new Set<string>();
      const sections: string[] = [];

      for (const section of nav) {
        const entries: string[] = [];
        for (const slug of section.pages) {
          const file = path.join(contentRoot, `${slug}.md`);
          this.addWatchFile(file);

          let source: string;
          try {
            source = await fs.readFile(file, 'utf8');
          } catch {
            this.warn(`nav.json lists "${slug}" but ${CONTENT_DIR}/${slug}.md is missing`);
            continue;
          }

          const meta = scanFrontMatter(source);

          slugs.add(slug);
          entries.push(
            `{ slug: ${JSON.stringify(slug)}, title: ${JSON.stringify(meta.title ?? slug)}, ` +
              `description: ${JSON.stringify(meta.description ?? '')} }`,
          );
        }

        sections.push(
          `{ title: ${JSON.stringify(section.title)}, entries: [${entries.join(', ')}] }`,
        );
      }

      const pages = [...slugs]
        .map(
          (slug) =>
            `  ${JSON.stringify(slug)}: () => import(${JSON.stringify(
              `/${CONTENT_DIR}/${slug}.md`,
            )}),`,
        )
        .join('\n');

      return [
        `export const sections = [${sections.join(', ')}];`,
        `export const pages = {\n${pages}\n};`,
      ].join('\n');
    },

    hotUpdate({ file }) {
      if (!file.startsWith(path.join(root, CONTENT_DIR) + path.sep)) {
        return undefined;
      }
      const graph = this.environment.moduleGraph;
      const index = graph.getModuleById(RESOLVED_CONTENT_ID);
      if (index) {
        graph.invalidateModule(index);
      }
      return undefined;
    },
  };
}
