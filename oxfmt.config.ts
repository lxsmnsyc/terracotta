import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  // `docs/**` is prose. oxfmt rewrites the snippets inside it — quote style,
  // one-line CSS rules expanded, a stray semicolon appended to a JSX fragment
  // that is not a statement — which makes the examples worse, not consistent.
  ignorePatterns: ['example.js', 'docs/**', '.changeset/**'],
});
