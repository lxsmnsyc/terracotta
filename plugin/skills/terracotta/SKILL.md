---
name: terracotta
description: Build accessible UI with Terracotta, the headless component library for SolidJS. Covers the component catalogue and their part names, subpath imports, controlled vs uncontrolled state, render props, the `as` prop and prop passthrough, `tc-*` styling attributes, `unmount`, transitions, and keyboard and focus behaviour. Use when writing, reviewing or debugging SolidJS code that imports from `terracotta`.
---

# Terracotta

A headless UI library for SolidJS. Each component ships behaviour, keyboard
handling and ARIA wiring, and no styles. You own the markup and the CSS; the
library owns the accessibility.

This skill describes **Terracotta 2.x**, which requires **Solid 2**
(`solid-js` and `@solidjs/web`, both `^2.0.0-rc.0`, as peer dependencies).
For Terracotta 1.x on Solid 1, see [1.x differences](#1x-differences).

## Importing

There is **no root entry**. Every component group publishes its own subpath, and
importing from `'terracotta'` will not resolve:

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
import { useDisclosureState } from 'terracotta/states';
```

A snippet that draws on more than one group needs one import per subpath.

On Solid 2 the JSX namespace and the JSX runtime live in `@solidjs/web`, not in
`solid-js`. Import the type from there, and set `jsxImportSource` to
`@solidjs/web`; `solid-js` publishes no `./jsx-runtime` entry, so the Solid 1
habit fails to resolve.

```tsx
import type { JSX } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
```

## Component catalogue

Subpath — exported parts. The first name in each row is the root that owns the
state; the rest are its parts.

| Subpath | Exports |
| --- | --- |
| `terracotta/accordion` | `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionButton`, `AccordionPanel` |
| `terracotta/alert` | `Alert` |
| `terracotta/alert-dialog` | `AlertDialog`, `AlertDialogPanel`, `AlertDialogOverlay`, `AlertDialogTitle`, `AlertDialogDescription` |
| `terracotta/button` | `Button` |
| `terracotta/checkbox` | `Checkbox`, `CheckboxIndicator`, `CheckboxLabel`, `CheckboxDescription` |
| `terracotta/color-scheme` | `ColorSchemeProvider`, `useColorScheme`, `useNativeColorScheme`, `usePreferredColorScheme` |
| `terracotta/combobox` | `Combobox`, `ComboboxLabel`, `ComboboxInput`, `ComboboxOptions`, `ComboboxOption` |
| `terracotta/command` | `Command`, `CommandLabel`, `CommandInput`, `CommandOptions`, `CommandOption` |
| `terracotta/command-bar` | `CommandBar`, `CommandBarPanel`, `CommandBarOverlay`, `CommandBarTitle`, `CommandBarDescription` |
| `terracotta/context-menu` | `ContextMenu`, `ContextMenuBoundary`, `ContextMenuPanel`, `ContextMenuOverlay` |
| `terracotta/dialog` | `Dialog`, `DialogPanel`, `DialogOverlay`, `DialogTitle`, `DialogDescription` |
| `terracotta/disclosure` | `Disclosure`, `DisclosureButton`, `DisclosurePanel` |
| `terracotta/feed` | `Feed`, `FeedLabel`, `FeedContent`, `FeedArticle`, `FeedArticleLabel`, `FeedArticleDescription` |
| `terracotta/listbox` | `Listbox`, `ListboxLabel`, `ListboxButton`, `ListboxOptions`, `ListboxOption` |
| `terracotta/menu` | `Menu`, `MenuItem`, `MenuChild` |
| `terracotta/popover` | `Popover`, `PopoverButton`, `PopoverPanel`, `PopoverOverlay` |
| `terracotta/radio-group` | `RadioGroup`, `RadioGroupLabel`, `RadioGroupDescription`, `RadioGroupOption` |
| `terracotta/select` | `Select`, `SelectOption` |
| `terracotta/tabs` | `TabGroup`, `TabList`, `Tab`, `TabPanel` |
| `terracotta/toast` | `Toaster`, `Toast`, `ToasterStore`, `useToaster` |
| `terracotta/toggle` | `Toggle` |
| `terracotta/toolbar` | `Toolbar` |
| `terracotta/transition` | `Transition`, `TransitionChild` |
| `terracotta/states` | State primitives — see [State primitives](#state-primitives) |

Pick by pattern, not by name: `Listbox` is a dropdown (button plus popup),
`Select` is an always-visible listbox, `Command` is an always-visible filtered
listbox, and `Combobox` is a text input with a filtered popup.

## Controlled and uncontrolled

Terracotta chooses between the two by looking at which prop you passed. The
choice is made once, at creation — never switch a component between them at
runtime.

| Uncontrolled | Controlled | Components |
| --- | --- | --- |
| `defaultOpen` | `isOpen` | Disclosure, Dialog, AlertDialog, Popover, ContextMenu, CommandBar, Listbox, Combobox |
| `defaultValue` | `value` | Accordion, Select, Listbox, Combobox, Command, RadioGroup, TabGroup |
| `defaultChecked` | `checked` | Checkbox |
| `defaultPressed` | `pressed` | Toggle |

A **controlled** component never writes its own state: it calls `onChange` and
nothing moves until you update the value you passed in. If a click appears to do
nothing, check that `onChange` writes back to the signal.

`Listbox` and `Combobox` hold two states, so their callbacks are named for which
one moved: `onSelectChange` and `onDisclosureChange`.

## Render props

`children` may be a function that receives the component's state:

```tsx
<Disclosure defaultOpen={false}>
  {({ isOpen }) => <DisclosureButton>{isOpen() ? 'Hide' : 'Show'}</DisclosureButton>}
</Disclosure>
```

The rule differs by position:

- On **root** components, any function child is called with the state.
- On **descendant** components, a function is a render prop only if it declares
  exactly one parameter. `() => <span />` renders as-is; `state => <span />` is
  called with the state.

State values are accessors — call them (`isOpen()`, not `isOpen`).

## Rendering

**`as`** picks the element or component each part renders. It accepts an
intrinsic tag or any Solid component, and the props type follows it, so
`as="a"` also accepts `href`. Behaviour comes from the component, not the tag:
a `Button` rendered `as="div"` still handles <kbd>Enter</kbd> and
<kbd>Space</kbd>.

**Prop passthrough**: anything the component does not consume itself reaches the
rendered element — `class`, `classList`, `style`, `id`, `data-*`, DOM event
handlers. Terracotta strips its own props first, so they never leak into the DOM.

**`ref`** is assigned from an effect rather than written directly, so a `ref`
callback runs in a reactive scope and may contain `createEffect`. Not every part
accepts one.

**`unmount`** controls hidden content:

| Value | Behaviour |
| --- | --- |
| `true` *(default)* | Children are removed while hidden and rebuilt when shown. |
| `false` | Children are always rendered; you hide them yourself. |
| `'offscreen'` | Children are built once and reused, detached while hidden. |

`'offscreen'` keeps a subtree's state across toggles, but a detached subtree is
still mounted: its effects keep running and it has no layout, so
`getBoundingClientRect()` reads zeroes. Use it for subtrees expensive to
*build*, not expensive to *run*.

## Styling

State reaches CSS through `tc-` attributes. Terracotta never touches `class`.

| Attribute | Values | Meaning |
| --- | --- | --- |
| `tc-disabled` | `""` when disabled | Interaction blocked; focus navigation skips it. |
| `tc-expanded` | `""` when open | Disclosure-like state is open. |
| `tc-checked` | `""` checked, `"mixed"` indeterminate, absent unchecked | Checkbox / radio state. |
| `tc-selected` | `""` when selected | Option, tab or item is the selected value. |
| `tc-active` | `""` when active | Holds focus within its group. |
| `tc-pressed` | `""` when pressed | Toggle button state. |
| `tc-matches` | `""` when matching the query | Combobox / Command filtering. |
| `tc-has-selected` / `tc-has-active` / `tc-has-query` | `""` | A descendant is selected / active; the query is non-empty. |
| `tc-transition` | `enter-from`, `enter-to`, `entered`, `leave-from`, `leave-to` | Current phase of a `TransitionChild`. |

Every part also stamps a marker named after itself (`tc-dialog`,
`tc-listbox-option`, …). Booleans are empty-string-when-on, absent-when-off, so
a bare attribute selector is the test:

```css
.option[tc-active]   { background: #eff6ff; }
.option[tc-selected] { font-weight: 600; }
[tc-checked="mixed"] { /* indeterminate */ }
```

## Transitions

`Transition` applies enter and leave classes around a `show` prop and keeps
children mounted until the leave finishes. It only adds and removes classes —
the animation is yours to write. `TransitionChild` follows its parent instead of
its own `show`, so a group animates together.

```tsx
<Transition show={isOpen()} enter="fade" enterFrom="opacity-0" enterTo="opacity-100"
            leave="fade" leaveFrom="opacity-100" leaveTo="opacity-0">
  <PopoverPanel unmount={false}>…</PopoverPanel>
</Transition>
```

Points that matter:

- A child of an already-open transition needs `appear` to run its enter on the
  first render.
- Transitions are interruptible: toggling `show` mid-flight reverses immediately.
- A leaving element is marked `inert`, so it leaves the tab order and the
  accessibility tree while it animates out.
- Phases are driven by the element's running animations, not by `transitionend`,
  so an element with nothing to animate advances on its own.

## Keyboard and focus

- **Composite widgets** (Accordion, Menu, Listbox, Select, RadioGroup, Tabs,
  Feed, Combobox, Command) take a single <kbd>Tab</kbd> stop and move internally
  with the arrow keys. Disabled items are skipped, and nesting one widget inside
  another confuses neither.
- **Virtual focus** in Combobox and Command keeps DOM focus on the input and
  publishes the active option through `aria-activedescendant`. Style the
  highlight from `tc-active`, never from `:focus`.
- **Focus restoration**: Dialog, AlertDialog, Popover, ContextMenu and CommandBar
  trap <kbd>Tab</kbd> while open and return focus to the previously focused
  element on close.
- The search for something to focus happens **once**, as the panel opens. A panel
  whose content arrives later — from a `Loading` boundary or any async source —
  has nothing to offer at that moment and is not asked again. Keep a focusable
  element outside the boundary (a close button), or hoist the boundary above the
  component.

## State primitives

Every stateful component is a shell around a reactive store, and the stores are
exported from `terracotta/states`. Each ships three names: `create…State` to
make one, `use…State` to read the nearest from context, and `…StateChild` to
reach it from a render prop.

Disclosure (open/closed), Toggle (pressed), Check (tri-state), Input (a string),
Select (selected plus active), SelectOption, Autocomplete (select plus a
debounced query), AutocompleteOption.

```tsx
import { useDisclosureState } from 'terracotta/states';

function CloseButton() {
  const state = useDisclosureState();
  return <button onClick={() => state.close()}>Close</button>;
}
```

Using a `use…State()` hook outside its component throws with a message naming
both components.

## Server-side rendering

SSR-safe: DOM work happens in effects, which do not run on the server. Markup
and ARIA render server-side; listeners, focus and measurement wire up on
hydration.

`ColorSchemeProvider` is the exception worth planning for. It reads
`localStorage` and mutates `documentElement` from effects, so the first paint
uses your CSS default and the provider corrects it after hydration. Avoid the
flash with an inline script in `<head>` that reads the same `theme-preference`
key.

## Common mistakes

- Importing from `'terracotta'`. There is no root entry; use the subpath.
- Importing `JSX` from `'solid-js'`. On Solid 2 it comes from `'@solidjs/web'`.
- Reading a state value without calling it — `isOpen` instead of `isOpen()`.
- Passing `isOpen` but no `onChange`, then wondering why nothing opens.
- Styling a Combobox or Command option with `:focus`. Use `[tc-active]`.
- Expecting `tc-checked` to be `"true"`/`"false"`. Booleans are empty-string or
  absent; only `tc-checked` has a third value, `"mixed"`.
- Reaching for `unmount={false}` to keep a panel alive for a transition when
  `Transition` already handles it, including the `inert` marking.
- Putting a `Loading` boundary around a panel's only focusable content and
  expecting focus to land in it.

## 1.x differences

Terracotta 1.x targets Solid 1 and does have a root entry, so
`import { Dialog } from 'terracotta'` is correct there. Solid 1 code also uses
`Suspense` and `createResource` where the notes above say `Loading` and an async
memo. Everything else in this skill — parts, `as`, `tc-*` attributes, controlled
and uncontrolled props, keyboard behaviour — applies to both.

## Recipes

[references/recipes.md](./references/recipes.md) holds complete, typechecked
examples for Dialog, Listbox, Combobox, Tabs, a transitioned Popover, toasts, a
tri-state checkbox, reading state from a descendant, and building on a state
primitive. Read it when writing one of those rather than reconstructing the
shape from this page.

## Full documentation

Per-component reference, part by part, with keyboard tables and worked examples:
<https://github.com/lxsmnsyc/terracotta/tree/main/docs>. Each component has its
own page under `docs/components/`, and the cross-cutting rules are in
`docs/guides/`.
