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
  ].map(value => [value, `./src/components/${value}`]),
  ['states', './src/states/index.ts'],
]);

export default defineConfig({
  entry: entries,
  platform: 'neutral',
  dts: true,
  exports: true,
});
