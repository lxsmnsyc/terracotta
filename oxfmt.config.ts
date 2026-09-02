import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  // `docs/**` is prose. oxfmt rewrites the snippets inside it — quote style,
  // one-line CSS rules expanded, a stray semicolon appended to a JSX fragment
  // that is not a statement — which makes the examples worse, not consistent.
  // The plugin's reference tree is a generated copy of `docs/`, so it has to be
  // ignored on the same grounds — and reformatting it would fail
  // `pnpm skill:check` against its source anyway.
  ignorePatterns: [
    'example.js',
    'docs/**',
    '.changeset/**',
    'plugin/skills/terracotta/references/**',
  ],
});
