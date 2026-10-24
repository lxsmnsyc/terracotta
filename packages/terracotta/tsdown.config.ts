import { defineConfig } from 'tsdown';

const entries = Object.fromEntries([
  ...[
    'accordion',
    'alert',
    'alert-dialog',
    'button',
    'checkbox',
    'color-scheme',
    'combobox',
    'command',
    'command-bar',
    'context-menu',
    'dialog',
    'disclosure',
    'feed',
    'listbox',
    'menu',
    'popover',
    'radio-group',
    'select',
    'tabs',
    'toast',
    'toggle',
    'toolbar',
    'transition',
  ].map((value) => [value, `./src/components/${value}`]),
  ['states', './src/states/index.ts'],
  ['utils', './src/utils/index.ts'],
]);

/**
 * The package ships its JSX as written. A consumer's own Solid compiler turns it
 * into code for its target, DOM or server alike, so nothing here is compiled
 * for one renderer ahead of time.
 */
export default defineConfig({
  entry: entries,
  platform: 'neutral',
  dts: true,
  inputOptions: { transform: { jsx: 'preserve' } },
  outExtensions: () => ({ js: '.jsx', dts: '.d.ts' }),
  exports: {
    // Both conditions resolve to the same preserved JSX. `solid` is what
    // `@solidjs/vite-plugin` looks for to treat the package as Solid source and
    // compile it, so it has to be present even though `default` matches it.
    customExports(exports: Record<string, unknown>) {
      for (const [key, value] of Object.entries(exports)) {
        if (typeof value === 'string' && value.endsWith('.jsx')) {
          exports[key] = {
            types: value.replace(/\.jsx$/, '.d.ts'),
            solid: value,
            default: value,
          };
        }
      }
      return exports;
    },
  },
});
