import type { Component } from 'solid-js';

export interface DocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * A page is a list of blocks rather than one HTML string. Demos have to become
 * real components, and splitting at compile time keeps the page from having to
 * find and hydrate placeholders inside an `innerHTML` blob.
 */
export type DocBlock =
  | { type: 'html'; html: string }
  | { type: 'demo'; id: string; title: string; code: string; caption: string };

export type DemoBlock = Extract<DocBlock, { type: 'demo' }>;

export interface DocModule {
  slug: string;
  title: string;
  /** Rendered HTML — the lede is prose, with links and code spans in it. */
  description: string;
  headings: DocHeading[];
  /**
   * The one demo that shows what the component *is*, rendered directly under
   * the page's opening paragraph so the thing itself comes before any prose
   * about it.
   */
  hero?: DemoBlock;
  blocks: DocBlock[];
}

export interface DemoSource {
  id: string;
  title: string;
  /** Shiki output, already highlighted at build time. */
  code: string;
}

export type DemoLoader = () => Promise<{ default: Component }>;
