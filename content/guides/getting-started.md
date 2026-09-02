# Getting started

Terracotta is a headless UI library for SolidJS. Each component gives you
behaviour, keyboard handling and ARIA wiring. None of them give you styles. You
choose what the markup renders as, and what it looks like.

## Install

```bash
npm i terracotta@next
# or
pnpm add terracotta@next
# or
yarn add terracotta@next
```

Terracotta 2 is published under the `next` tag while it is a release candidate.
The `latest` tag still points at the 1.x line, which targets Solid 1 and uses
the older `data-sh-` state attributes.

`solid-js` and `@solidjs/web` are peer dependencies. Terracotta 2 targets
Solid 2 (`^2.0.0-rc.0`).

## Imports

Terracotta has no barrel entry point. Every component is its own entry, named
after itself, and the state primitives share one:

```tsx
import { Disclosure } from 'terracotta/disclosure';
import { Listbox } from 'terracotta/listbox';
import { useDisclosureState } from 'terracotta/states';
```

Each page in this documentation opens with the exact import line for what it
covers. Importing a component pulls in that component and nothing else, so a
page that uses one widget never pays for the other twenty-two.

## Your first component

Every widget is a set of parts that you compose. Terracotta renders nothing
beyond the elements you write, and adds no class names to them.

```tsx
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from 'terracotta/disclosure';

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

## The Claude Code plugin

Terracotta ships a plugin for [Claude Code](https://www.claude.com/product/claude-code).
It carries a skill that describes the component catalogue and every part name,
the subpath imports, controlled versus uncontrolled state, render props, `as`
and prop passthrough, the `tc-` attributes, `unmount`, transitions, and the
keyboard and focus behaviour — with a copy of this reference material alongside
it, so the detail is available without a fetch.

```text
/plugin marketplace add lxsmnsyc/terracotta@2.x
/plugin install terracotta@terracotta
```

The `@2.x` matters for the moment. The marketplace manifest lives on the `2.x`
branch, and the shorthand without a ref resolves to the repository's default
branch, where it is not yet present.

Nothing else needs configuring. The skill declares the situations it applies to,
so it loads on its own once you are working in SolidJS code that imports from
`terracotta`, and stays out of the way otherwise. Check that it registered with:

```text
/plugin
```

It documents Terracotta 2 and marks where 1.x differs — chiefly that 1.x has a
package root entry, so `import { Dialog } from 'terracotta'` is right there and
resolves to nothing here.

## Where to go next

- [Component reference](../README.md#components) — every component, part by part
- [State primitives](../states.md) — the reactive stores underneath, which you
  can also use on their own
