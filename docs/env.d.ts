/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** The site's origin, for absolute URLs in link previews. Set in vite.config.ts. */
  readonly SITE_URL: string;
}

interface DocHeadingShape {
  id: string;
  text: string;
  level: number;
}

type DocBlockShape =
  | { type: 'html'; html: string }
  | { type: 'demo'; id: string; title: string; code: string; caption: string };

interface DocModuleShape {
  slug: string;
  title: string;
  description: string;
  headings: DocHeadingShape[];
  hero?: Extract<DocBlockShape, { type: 'demo' }>;
  blocks: DocBlockShape[];
}

/** Compiled by `vite/markdown.ts`. */
declare module '*.md' {
  const doc: DocModuleShape;
  export default doc;
}

/** Built by `vite/markdown.ts` from `content/nav.json`. */
declare module 'virtual:content' {
  export interface NavEntry {
    slug: string;
    title: string;
    description: string;
  }

  export interface NavSection {
    title: string;
    entries: NavEntry[];
  }

  export const sections: NavSection[];
  export const pages: Record<string, (() => Promise<{ default: DocModuleShape }>) | undefined>;
}

/** Built by `vite/markdown.ts` for the search palette, and loaded on demand. */
declare module 'virtual:search-index' {
  export interface SearchPage {
    slug: string;
    section: string;
    title: string;
    description: string;
    headings: { id: string; text: string; snippet: string }[];
  }

  export const pages: SearchPage[];
}

/** Built by `vite/demos.ts` from the files in `src/demos`. */
declare module 'virtual:demo-registry' {
  import type { Component } from 'solid-js';

  export const demos: Record<string, (() => Promise<{ default: Component }>) | undefined>;
}

/** One module per file in `src/demos`, carrying its build-time highlighted source. */
declare module 'virtual:demo-source/*' {
  export const id: string;
  export const title: string;
  export const code: string;
}
