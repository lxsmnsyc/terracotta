import config from '@lxsmnsyc/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [config],
  ignorePatterns: ['dist/**', 'node_modules/**'],
  rules: {
    'new-cap': 'off',
    'no-underscore-dangle': 'off',
    // Solid 2 consumes promise-returning computations directly — a memo whose
    // body calls a `query` is the documented shape, and marking those arrows
    // `async` would suggest the value is awaited somewhere it is not.
    'typescript/promise-function-async': 'off',
  },
  overrides: [
    {
      // Demos are teaching material. Handing a Solid setter straight to
      // `onChange` is the idiomatic way to wire a controlled component, and a
      // wrapper arrow on every handler would teach the wrong pattern.
      files: ['src/demos/**'],
      rules: {
        'typescript/strict-void-return': 'off',
        // Same reason: `onClick={() => save()}` is what a reader should copy,
        // and a braced body on every handler is noise in teaching material.
        'typescript/no-confusing-void-expression': 'off',
        // `onClick={close}` is how the render prop is meant to be used, and
        // wrapping it in an arrow on every demo would teach the wrong pattern.
        'typescript/unbound-method': 'off',
      },
    },
  ],
});
