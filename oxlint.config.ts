import config from '@lxsmnsyc/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [config],
  ignorePatterns: ['example.js'],
  rules: {
    'new-cap': 'off',
    'no-underscore-dangle': 'off',
  },
  overrides: [
    {
      // Every headless component resolves its props through `DynamicProps<T>`,
      // and `ValidConstructor` admits `ValidComponent<any>`, so `props` degrades
      // to `any` while `T` is unresolved and the `as DynamicProps<T>` bridge
      // back to a concrete element reads as an unsafe narrowing. Silencing the
      // reports here is deliberate: fixing them means retyping the
      // dynamic-component layer, which is a design change, not a lint fix.
      // Tests and examples stay on the full rule set.
      files: ['packages/*/src/**'],
      rules: {
        'typescript/no-explicit-any': 'off',
        'typescript/no-unsafe-return': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
      },
    },
    {
      // Handing a Solid setter straight to `onChange` is the idiomatic way to
      // wire a controlled component, and setters return the value they wrote.
      // The demos would need a wrapper arrow on every handler to satisfy the
      // rule, which teaches the wrong pattern.
      files: ['examples/**'],
      rules: {
        'typescript/strict-void-return': 'off',
      },
    },
  ],
});
