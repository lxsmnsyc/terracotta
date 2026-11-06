# terracotta

> Headless UI library for SolidJS

## Install

```bash
npm i terracotta
```

```bash
yarn add terracotta
```

```bash
pnpm add terracotta
```

## Documentation

- [Getting started](./docs/guides/getting-started.md)
- [Guides](./docs/README.md#guides) — `as`, controlled state, styling, keyboard
  and focus, SSR
- [Component reference](./docs/README.md#components)
- [State primitives](./docs/states.md)

## Note

The project is still in development, as I aim to implement the [WAI-ARIA Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/).

Here's the current components:

- `Accordion` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/accordion)
- `Alert`
- `Alert Dialog`
- `Button`
- `Button (Toggle)`
- `Checkbox` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/checkbox)
- `Dialog (Modal)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/dialog)
- `Dialog (Popover)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/popover)
- `Disclosure (Show/Hide)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/disclosure)
- `Feed` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/feed)
- `Listbox (Select)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/select)
- `Listbox (Dropdown)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/listbox)
- `Menu` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/menu)
- `Radio Group` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/radiogroup)
- `Toolbar` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/toolbar)
- `Transition` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/transitions)
- `Toaster`/`Toast` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/toaster)
- `ContextMenu (Dialog)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/context-menu)
- `CommandBar (Dialog)` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/commandbar)
- `Tabs` [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?style=flat-square&logo=stackblitz)](https://stackblitz.com/github/LXSMNSYC/terracotta/tree/1.x/examples/tabs)

## FAQ

### Is this the official [HeadlessUI](https://headlessui.dev/) for SolidJS?

Uhh, no. I intended to port the original however this is not recognized as the official port for SolidJS. There's also some differences in development path since I intended to implement the WAI-ARIA widgets. The reason is that there seems to be no resolution from the original Headless UI if they're going to implement WAI-ARIA widgets in the first place.

### If this is a port, does it mean it is 100% compatible?

Kinda. Due to differences in principle between SolidJS and React, the implementation would be different and such, features that are originally found in the original HeadlessUI may be incompatible with the SolidJS version.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
