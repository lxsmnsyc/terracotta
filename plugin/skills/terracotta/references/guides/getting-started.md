<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Getting started

Terracotta is a headless UI library for SolidJS. Each component gives you
behaviour, keyboard handling and ARIA wiring. None of them give you styles. You
choose what the markup renders as, and what it looks like.

## Install

```bash
npm i terracotta
# or
pnpm add terracotta
# or
yarn add terracotta
```

`solid-js` and `@solidjs/web` are peer dependencies. Terracotta 2.x supports
`^2.0.0-rc.0` of both.

## Your first component

Every widget is a set of parts that you compose. Terracotta renders nothing
beyond the elements you write, and adds no class names to them.

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

Those few lines already cover what an accessible disclosure needs. The button
carries `aria-expanded`. While the panel is open, the button points at it with
`aria-controls`. While it is closed, the panel is not in the DOM at all.

## The mental model

Four ideas apply to every component in the library:

- **You own the markup.** Each part renders a default element. Use `as` to swap
  it for another element or your own component. See [rendering](./rendering.md).
- **You own the state, or the component does.** Pass `defaultOpen` and the
  component manages itself. Pass `isOpen` and you drive it. See
  [state](./state.md).
- **You own the styling.** State reaches CSS through `tc-` attributes, never
  through class names. See [styling](./styling.md).
- **The library owns the accessibility.** Roles, ARIA relationships, focus
  management and keyboard handling come with the component. See
  [keyboard and focus](./keyboard-and-focus.md).

## Where to go next

- [Component reference](../README.md#components) — every component, part by part
- [State primitives](../states.md) — the reactive stores underneath, which you
  can also use on their own
