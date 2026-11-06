import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  // `docs/**` is prose. oxfmt rewrites the snippets inside it — quote style,
  // one-line CSS rules expanded, a stray semicolon appended to a JSX fragment
  // that is not a statement — which makes the examples worse, not consistent.
  // The plugin's skill is prose around JSX fragments, and its reference tree is
  // a generated copy of the docs, so both are ignored on the same grounds as
  // `docs/**`. Formatting either would also fail `pnpm skill:check`, which
  // compares them against the source they are generated from.
  ignorePatterns: ['example.js', 'docs/**', '.changeset/**', 'plugin/skills/**'],
});
