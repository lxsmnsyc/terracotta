# Terracotta

Headless UI components for SolidJS. Terracotta handles state, keyboard
interaction, focus and ARIA wiring. It adds no styles and no class names.
Component state reaches your CSS through `tc-` attributes.

The components follow the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).

## Install

```bash
pnpm add terracotta@next
# or
npm i terracotta@next
# or
yarn add terracotta@next
```

Terracotta 2 targets Solid 2 and is published under the `next` tag while Solid 2
is a release candidate. `solid-js` and `@solidjs/web` are peer dependencies. The
`latest` tag is still the [1.x line](https://github.com/lxsmnsyc/terracotta/tree/1.x),
which targets Solid 1.

## Usage

Every component has its own entry point and is built from parts you compose:

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

function Details() {
  return (
    <Disclosure defaultOpen={false}>
      <DisclosureButton class="trigger">Details</DisclosureButton>
      <DisclosurePanel class="panel">Everything worth knowing.</DisclosurePanel>
    </Disclosure>
  );
}
```

Style it by selecting on state:

```css
.trigger[tc-expanded] {
  font-weight: 600;
}
```

## Documentation

- [Getting started](./docs/content/guides/getting-started.md)
- Guides: [rendering](./docs/content/guides/rendering.md),
  [state](./docs/content/guides/state.md),
  [styling](./docs/content/guides/styling.md),
  [keyboard and focus](./docs/content/guides/keyboard-and-focus.md),
  [server-side rendering](./docs/content/guides/ssr.md)
- [State primitives](./docs/content/states.md)

### Components

| | | |
| --- | --- | --- |
| [Accordion](./docs/content/components/accordion.md) | [Dialog](./docs/content/components/dialog.md) | [Spinbutton](./docs/content/components/spinbutton.md) |
| [Alert](./docs/content/components/alert.md) | [Disclosure](./docs/content/components/disclosure.md) | [Splitter](./docs/content/components/splitter.md) |
| [AlertDialog](./docs/content/components/alert-dialog.md) | [Feed](./docs/content/components/feed.md) | [Switch](./docs/content/components/switch.md) |
| [Breadcrumb](./docs/content/components/breadcrumb.md) | [Grid](./docs/content/components/grid.md) | [Tabs](./docs/content/components/tabs.md) |
| [Button](./docs/content/components/button.md) | [Listbox](./docs/content/components/listbox.md) | [Toast](./docs/content/components/toast.md) |
| [Checkbox](./docs/content/components/checkbox.md) | [Menu](./docs/content/components/menu.md) | [Toggle](./docs/content/components/toggle.md) |
| [ColorScheme](./docs/content/components/color-scheme.md) | [Meter](./docs/content/components/meter.md) | [Toolbar](./docs/content/components/toolbar.md) |
| [Combobox](./docs/content/components/combobox.md) | [Popover](./docs/content/components/popover.md) | [Tooltip](./docs/content/components/tooltip.md) |
| [Command](./docs/content/components/command.md) | [RadioGroup](./docs/content/components/radio-group.md) | [Transition](./docs/content/components/transition.md) |
| [CommandBar](./docs/content/components/command-bar.md) | [Select](./docs/content/components/select.md) | [Tree](./docs/content/components/tree.md) |
| [ContextMenu](./docs/content/components/context-menu.md) | [Slider](./docs/content/components/slider.md) | [TreeGrid](./docs/content/components/treegrid.md) |

## Claude Code plugin

The repository is also a Claude Code plugin marketplace. Its skill teaches an
agent the component parts, imports, state and styling attributes:

```text
/plugin marketplace add lxsmnsyc/terracotta
/plugin install terracotta@terracotta
```

## Development

The documentation site in [`docs/`](./docs) uses the library from the
workspace, so build the library first:

```bash
pnpm install
pnpm --filter terracotta build
pnpm --filter @terracotta/docs dev
```

## FAQ

### Is this the official Headless UI for SolidJS?

No. Terracotta started as a port of [Headless UI](https://headlessui.com/), but
it is not an official port, and it has since grown to cover the WAI-ARIA
widgets that Headless UI does not.

### Is it API-compatible with Headless UI?

No. SolidJS and React work differently, so the component APIs differ, and some
Headless UI features have no equivalent here.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
