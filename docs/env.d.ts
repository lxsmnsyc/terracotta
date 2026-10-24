/// <reference types="vite/client" />

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
