import { type Highlighter, createHighlighter } from 'shiki';

const LANGS = [
  'tsx',
  'jsx',
  'typescript',
  'javascript',
  'css',
  'html',
  'json',
  'bash',
  'markdown',
  'diff',
];

const THEMES = { light: 'github-light', dark: 'github-dark' } as const;

let pending: Promise<Highlighter> | undefined;

async function get(): Promise<Highlighter> {
  pending ??= createHighlighter({
    themes: [THEMES.light, THEMES.dark],
    langs: LANGS,
  });
  return await pending;
}

/**
 * Both themes are emitted at once as `--shiki-light` / `--shiki-dark` custom
 * properties, so switching colour scheme is a CSS swap with no second render
 * and no highlighter in the browser bundle.
 */
export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await get();
  const resolved = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

  return highlighter.codeToHtml(code.replace(/\n$/, ''), {
    lang: resolved,
    themes: THEMES,
    defaultColor: false,
  });
}

export async function disposeHighlighter(): Promise<void> {
  if (!pending) {
    return;
  }
  const highlighter = await pending;
  highlighter.dispose();
  pending = undefined;
}
