# Terracotta documentation

Terracotta is a headless UI library for SolidJS. Each component gives you
behaviour, keyboard handling and ARIA wiring. None of them give you styles.

```bash
npm i terracotta
```

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
```

## Guides

Start here. These cover the props and conventions that every component shares.

| Guide | What it covers |
| --- | --- |
| [Getting started](./guides/getting-started.md) | Install, a first component, and the mental model |
| [Rendering](./guides/rendering.md) | `as`, prop passthrough, `ref`, `unmount`, async content |
| [State](./guides/state.md) | Controlled vs uncontrolled, render props, state hooks |
| [Styling](./guides/styling.md) | The `tc-` state attributes and how to style with them |
| [Keyboard and focus](./guides/keyboard-and-focus.md) | Roving tabindex, virtual focus, focus restoration |
| [Server-side rendering](./guides/ssr.md) | What runs where, and the colour-scheme flash |

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

## State primitives

Every stateful component is a thin shell around a reactive store. Those stores
are exported, so you can read a component's state from anywhere in its subtree
or build your own component on the same behaviour.

Each one ships three exports: `create…State` to make the store, `use…State` to
read the nearest one from context, and `…StateChild` to reach it from a render
prop. Full reference in [states.md](./states.md).

| State | What it holds | Backs |
| --- | --- | --- |
| [Disclosure](./states.md#disclosure-state) | Open or closed | `Disclosure`, `Dialog`, `AlertDialog`, `Popover`, `ContextMenu`, `CommandBar`, and the popups of `Listbox` and `Combobox` |
| [Toggle](./states.md#toggle-state) | Pressed or unpressed | `Toggle` |
| [Check](./states.md#check-state) | Checked, unchecked, or indeterminate | `Checkbox` |
| [Input](./states.md#input-state) | A string value | Text-input components you build |
| [Select](./states.md#select-state) | Selected values, plus the active one | `Accordion`, `Select`, `Listbox`, `RadioGroup`, `TabGroup` |
| [Select option](./states.md#select-option-state) | One option's view of a select state | `SelectOption`, `ListboxOption`, `AccordionItem`, `Tab`, `TabPanel`, `RadioGroupOption` |
| [Autocomplete](./states.md#autocomplete-state) | A select state, plus a debounced query | `Combobox`, `Command` |
| [Autocomplete option](./states.md#autocomplete-option-state) | One option's view of an autocomplete state | `ComboboxOption`, `CommandOption` |
