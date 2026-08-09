# Terracotta documentation

Terracotta is a headless UI library for SolidJS. Every component ships behaviour,
keyboard handling and ARIA wiring — and no styling at all. You decide what the
markup renders as and what it looks like.

```bash
npm i terracotta
# or
pnpm add terracotta
# or
yarn add terracotta
```

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta';
```

- [Component reference](#components)
- [Shared conventions](#shared-conventions) — read this first, it explains props
  that every component has
- [State primitives](./states.md) — the reactive stores the components are built
  on, usable on their own

## Components

| Component | Pattern | Doc |
| --- | --- | --- |
| `Accordion` | Vertically stacked, expandable sections | [accordion.md](./components/accordion.md) |
| `Alert` | Live region for important messages | [alert.md](./components/alert.md) |
| `AlertDialog` | Modal that interrupts to confirm an action | [alert-dialog.md](./components/alert-dialog.md) |
| `Button` | Button behaviour on any element | [button.md](./components/button.md) |
| `Checkbox` | Tri-state checkbox with label and description | [checkbox.md](./components/checkbox.md) |
| `ColorSchemeProvider` | Light/dark/system colour scheme | [color-scheme.md](./components/color-scheme.md) |
| `Combobox` | Text input with a filtered popup listbox | [combobox.md](./components/combobox.md) |
| `Command` | Always-visible filtered listbox (command palette body) | [command.md](./components/command.md) |
| `CommandBar` | Modal opened with <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> | [command-bar.md](./components/command-bar.md) |
| `ContextMenu` | Menu opened by right-click | [context-menu.md](./components/context-menu.md) |
| `Dialog` | Modal dialog with focus trap | [dialog.md](./components/dialog.md) |
| `Disclosure` | Show/hide a section | [disclosure.md](./components/disclosure.md) |
| `Feed` | Stream of articles with feed keyboard navigation | [feed.md](./components/feed.md) |
| `Listbox` | Dropdown select built from a button and a listbox | [listbox.md](./components/listbox.md) |
| `Menu` | Menu of actions | [menu.md](./components/menu.md) |
| `Popover` | Floating panel anchored to a button | [popover.md](./components/popover.md) |
| `RadioGroup` | Single-choice group | [radio-group.md](./components/radio-group.md) |
| `Select` | Always-visible listbox | [select.md](./components/select.md) |
| `Tabs` | Tabbed interface | [tabs.md](./components/tabs.md) |
| `Toast` / `Toaster` | Toast notifications and their queue | [toast.md](./components/toast.md) |
| `Toggle` | Two-state toggle button | [toggle.md](./components/toggle.md) |
| `Toolbar` | Group of controls with roving arrow-key focus | [toolbar.md](./components/toolbar.md) |
| `Transition` | Class-driven enter/leave transitions | [transition.md](./components/transition.md) |

## Shared conventions

### `as` — polymorphic rendering

Every rendered component accepts `as`, which chooses the element or component it
renders. It accepts an intrinsic tag name (`'section'`, `'li'`, …) or any Solid
component.

```tsx
<DisclosureButton as="a" href="#panel">Toggle</DisclosureButton>
<DialogPanel as={MyCard}>…</DialogPanel>
```

Each component documents its own default. Typing follows through: with
`as="a"`, the component also accepts `<a>` props such as `href`.

### Prop passthrough

Any prop that is not part of a component's own API is forwarded to the rendered
element, including `class`, `classList`, `style`, `id` and DOM event handlers.
Terracotta's own props (`value`, `disabled`, `unmount`, …) are stripped before
forwarding, so they never leak into the DOM as stray attributes.

### `ref`

Components that need a DOM handle expose `ref`. Terracotta forwards it through
an effect rather than assigning it directly, so a `ref` callback runs in the
same reactive scope it would if you had written the element yourself — that
means `createEffect` inside a `ref` callback works.

Components that do not take a `ref` are noted in their reference table.

### Controlled and uncontrolled

Stateful components come in two shapes, and Terracotta picks between them by
checking which prop you passed:

| Uncontrolled prop | Controlled prop | Used by |
| --- | --- | --- |
| `defaultOpen` | `isOpen` | Disclosure, Dialog, AlertDialog, Popover, ContextMenu, CommandBar, Listbox, Combobox |
| `defaultValue` | `value` | Accordion, Select, Listbox, Combobox, Command, RadioGroup, TabGroup |
| `defaultChecked` | `checked` | Checkbox |
| `defaultPressed` | `pressed` | Toggle |

In **uncontrolled** mode the component owns a signal and updates itself; `onChange`
is a notification. In **controlled** mode the component never writes state — it
only calls `onChange`, and nothing changes on screen until you update the value
you passed in.

```tsx
// Uncontrolled: works on its own
<Disclosure defaultOpen={false}>…</Disclosure>

// Controlled: you own the signal
const [open, setOpen] = createSignal(false);
<Disclosure isOpen={open()} onChange={setOpen}>…</Disclosure>
```

The choice is made once, when the component is created. Do not switch a
component from `defaultOpen` to `isOpen` at runtime.

### Render props

`children` can be a function that receives the component's state, so you can read
state without reaching for context:

```tsx
<Disclosure defaultOpen={false}>
  {({ isOpen, toggle }) => (
    <>
      <DisclosureButton>{isOpen() ? 'Hide' : 'Show'}</DisclosureButton>
      <DisclosurePanel>Content</DisclosurePanel>
    </>
  )}
</Disclosure>
```

Two details worth knowing:

- On **root** components (the ones that create the state), any function child is
  called with the state.
- On **descendant** components, the function is only treated as a render prop if
  it declares exactly one parameter. `() => <span />` is rendered as-is;
  `state => <span />` is called with the state.

The same states are also reachable through the standalone `…StateChild`
components and `use…State()` hooks documented in [states.md](./states.md).

### `unmount`

Components that hide content accept `unmount`:

| Value | Behaviour |
| --- | --- |
| `true` *(default)* | Children are removed from the DOM while hidden and rebuilt when shown. |
| `false` | Children are always rendered. Use this when you want to hide with CSS, or when wrapping in a `<Transition>` that needs the element to survive its leave animation. |
| `'offscreen'` | Children are created once and reused, but still conditionally attached. Keeps expensive subtrees alive across toggles. |

### State attributes

Terracotta communicates state through `tc-`-prefixed attributes rather than class
names. Nothing is ever added to your `class`, so the attribute is the whole
styling API: plain CSS attribute selectors are all you need, and your own class
names stay entirely yours.

Every component stamps a marker attribute named after itself — `tc-dialog`,
`tc-accordion-button`, `tc-listbox-option` and so on — plus any of these that
apply:

| Attribute | Values | Meaning |
| --- | --- | --- |
| `tc-disabled` | `""` when disabled, otherwise absent | Interaction is blocked. Also used by focus navigation to skip the element. |
| `tc-expanded` | `""` when open | Disclosure-like state is open. |
| `tc-checked` | `""` when checked, `"mixed"` when indeterminate, absent when unchecked | Checkbox / radio state. |
| `tc-selected` | `""` when selected | Option, tab or accordion item is the selected value. |
| `tc-active` | `""` when active | Element currently holds focus within its group. |
| `tc-pressed` | `""` when pressed | Toggle button state. |
| `tc-matches` | `""` when the option matches the query | Combobox/Command filtering. |
| `tc-has-selected` | `""` | A descendant is selected. |
| `tc-has-active` | `""` | A descendant is active. |
| `tc-has-query` | `""` | The autocomplete query is non-empty. |
| `tc-owner` | owner id | Ties a focusable descendant to the root that navigates it. Internal, but present in the DOM. |
| `tc-transition` | `enter-from` \| `enter-to` \| `entered` \| `leave-from` \| `leave-to` | Current phase of a `<TransitionChild>`. |

Boolean attributes carry the empty string when on and are absent when off — which
is exactly what a bare CSS attribute selector tests for:

```css
[tc-selected] { font-weight: 600; }
[tc-disabled] { opacity: 0.5; pointer-events: none; }
```

`tc-checked` is the one attribute with three states, so match its value:

```css
[tc-checked=""]      { /* checked */ }
[tc-checked="mixed"] { /* indeterminate */ }
:not([tc-checked])   { /* unchecked */ }
```

#### Styling with them

Give your element a class as usual and combine it with the state attribute. The
two never collide, because Terracotta only writes attributes:

```tsx
<ListboxOption value={person} class="option">
  {person.name}
</ListboxOption>
```

```css
.option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

/* Keyboard or pointer is on this option */
.option[tc-active] {
  background: #eff6ff;
}

/* This option is the current value */
.option[tc-selected] {
  font-weight: 600;
}

.option[tc-disabled] {
  color: #9ca3af;
  cursor: not-allowed;
}
```

The `tc-has-*` attributes sit on a container and describe its descendants, which
makes parent-driven styling possible without any JavaScript:

```css
/* Dim the placeholder text on the button until something is chosen */
.listbox-button:not([tc-has-selected]) .value {
  color: #9ca3af;
}
```

Because the attributes live on real elements, they compose with ordinary
selectors — `:hover`, `:focus-visible`, sibling and descendant combinators, media
queries — with no special support needed.

#### Reading them in code

The same state that drives the attributes is available to your markup through a
render prop or a hook, so you rarely need to inspect the DOM:

```tsx
<Disclosure defaultOpen={false}>
  {({ isOpen }) => <DisclosureButton>{isOpen() ? 'Hide' : 'Show'}</DisclosureButton>}
</Disclosure>
```

Each component page lists both: the attributes it writes, and the state object
those attributes come from.

### Keyboard navigation and focus

Composite widgets (Accordion, Menu, Listbox, Select, RadioGroup, Tabs, Feed,
Combobox, Command) own a focus navigator. It finds its items by querying for
descendants that carry the matching `tc-owner` attribute and are not
`tc-disabled`, so disabled items are skipped automatically and nesting one widget
inside another does not confuse either of them.

Combobox and Command navigate *virtually*: DOM focus stays on the input and the
active option is published through `aria-activedescendant`.

Dialog, AlertDialog, Popover, ContextMenu and CommandBar remember the element
that was focused before they opened and restore focus to it on close.

### Server-side rendering

Rendering is SSR-safe; the DOM work happens in effects, which do not run on the
server. `ColorSchemeProvider` is the exception to keep in mind — it reads
`localStorage` and mutates `document.documentElement`, both from effects, so it
renders on the server but only takes effect in the browser.
