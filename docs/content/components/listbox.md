# Listbox

A [collapsible listbox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) is
the custom equivalent of a `<select>`: a button that shows the current value,
plus a popup list of options.

:::hero listbox/basic
:::

`Listbox` is unusual, because it owns **two** states at once. A
[disclosure state](../states.md#disclosure-state) drives the popup, and a
[select state](../states.md#select-state) drives the value. That is why its
change callbacks are named `onDisclosureChange` and `onSelectChange` instead of
a single `onChange`, and why it can be controlled on one axis and uncontrolled
on the other.

If you do not need the popup, use [`Select`](./select.md) instead.

```tsx
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
} from 'terracotta/listbox';
import { DisclosureStateChild, SelectStateChild } from 'terracotta/states';
```

## Anatomy

```tsx
<Listbox>          {/* owns both states */}
  <ListboxLabel/>  {/* names the listbox */}
  <ListboxButton/> {/* toggles the popup, shows the value */}
  <ListboxOptions> {/* role="listbox", keyboard navigation */}
    <ListboxOption/>
  </ListboxOptions>
</Listbox>
```

## Examples

### Single selection

Selecting an option closes the popup. With `multiple` set, the popup stays open
so several values can be picked.

:::demo listbox/basic
:::

### Multiple selection

:::demo listbox/multiple
The popup stays open while you pick, because selecting is not the same event as closing.
:::

### Controlling the popup too

Each state can be controlled independently:

```tsx
const [open, setOpen] = createSignal(false);
const [value, setValue] = createSignal<string>();

<Listbox<string>
  class="listbox"
  isOpen={open()}
  onDisclosureChange={setOpen}
  value={value()}
  onSelectChange={setValue}
>
  …
</Listbox>
```

Mixing them is fine. An uncontrolled popup with a controlled value is the most
common combination.

### Horizontal options

```tsx
<Listbox<string> class="listbox" horizontal defaultOpen={false} defaultValue="day">
  …
</Listbox>
```

```css
.listbox-options[aria-orientation="horizontal"] {
  display: flex;
  gap: 0.25rem;
}
```

### Disabled

```tsx
{/* One option */}
<ListboxOption class="listbox-option" value={person} disabled>
  {person.name}
</ListboxOption>

{/* The whole listbox */}
<Listbox<Person> class="listbox" defaultOpen={false} defaultValue={people[0]} disabled>
  …
</Listbox>
```

```css
.listbox[tc-disabled] .listbox-button {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### With a transition

The popup state is a disclosure state, so `<DisclosureStateChild>` hands you the
`show` flag:

```tsx
<Listbox<string> class="listbox" defaultOpen={false} defaultValue="day">
  <ListboxButton class="listbox-button">Range</ListboxButton>
  <DisclosureStateChild>
    {({ isOpen }) => (
      <Transition
        show={isOpen()}
        enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
        leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
      >
        <ListboxOptions class="listbox-options" unmount={false}>…</ListboxOptions>
      </Transition>
    )}
  </DisclosureStateChild>
</Listbox>
```

```css
.pop-enter { transition: opacity 120ms ease-out, scale 120ms ease-out; }
.pop-leave { transition: opacity 80ms ease-in, scale 80ms ease-in; }
.pop-from  { opacity: 0; scale: 0.97; }
.pop-to    { opacity: 1; scale: 1; }
```

### Reading the selection outside the button

```tsx
<Listbox<Person> class="listbox" defaultOpen={false} value={selected()}>
  …
  <SelectStateChild>
    {state => (
      <p class="hint">{state.hasSelected() ? 'Assigned' : 'Unassigned'}</p>
    )}
  </SelectStateChild>
</Listbox>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Listbox` | `tc-listbox` | Always |
| `Listbox` | `tc-expanded` | The popup is open |
| `Listbox` | `tc-has-selected` | Something is selected |
| `Listbox` | `tc-has-active` | An option holds keyboard focus |
| `Listbox` | `tc-disabled` | The listbox is disabled |
| `ListboxLabel` | `tc-listbox-label` | Always |
| `ListboxLabel` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-disabled` | Mirrors the listbox |
| `ListboxButton` | `tc-listbox-button`, `tc-button` | Always |
| `ListboxButton` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-disabled` | Mirrors the listbox |
| `ListboxOptions` | `tc-listbox-options` | Always (whenever rendered) |
| `ListboxOptions` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-disabled` | Mirrors the listbox |
| `ListboxOption` | `tc-listbox-option`, `tc-button`, `tc-owner` | Always |
| `ListboxOption` | `tc-selected` | This option is selected |
| `ListboxOption` | `tc-active` | This option holds keyboard focus |
| `ListboxOption` | `tc-disabled` | This option or the listbox is disabled |

Both states are published on every part. That is what makes the caret rotation
and the placeholder dimming above work without touching a signal.

### Styling

```css
/* Popup state */
[tc-listbox-button][tc-expanded] { border-color: #2563eb; }
[tc-listbox-options]:not([tc-expanded]) { display: none; } /* with unmount={false} */

/* Selection state on the container */
[tc-listbox-button]:not([tc-has-selected]) .listbox-value { color: #a1a1aa; }

/* Per-option state */
[tc-listbox-option][tc-active]   { background: #eff6ff; }
[tc-listbox-option][tc-selected] { font-weight: 600; }
[tc-listbox-option][tc-disabled] { color: #a1a1aa; }

/* Orientation drives layout */
[tc-listbox-options][aria-orientation="horizontal"] { display: flex; }
```

### Reading the state in code

Two states are in scope inside a `Listbox`.

The popup, from the [disclosure state](../states.md#disclosure-state), via
`<DisclosureStateChild>` or `useDisclosureState()`:

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the popup is open. |
| `open()` / `close()` / `toggle()` | `() => void` | Changes it. |

The selection, from the [select state](../states.md#select-state), via
`<SelectStateChild>` or `useSelectState()`:

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(V) => boolean` | Whether that value is selected. |
| `hasSelected()` | `boolean` | Whether anything is selected. |
| `select(value)` | `(V) => void` | Selects it. |
| `isActive(value)` / `hasActive()` | | Keyboard focus position. |

Inside an option, `useSelectOptionState()` gives the per-option view:
`isSelected()`, `isActive()`, `select()` and `disabled()`.

## Keyboard

On `ListboxButton`:

| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggles the popup |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Toggles the popup |

On `ListboxOptions`:

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous option, wrapping around (vertical) |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous option, wrapping around (horizontal) |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last option |
| <kbd>Escape</kbd> | Closes the popup |
| Printable characters | Type-ahead over option text, 250 ms window |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused option |

When the popup opens, focus lands on the selected option, or on the first option
when nothing is selected. Moving focus out of the options closes the popup,
unless the pointer is hovering the button or the list.

## API

### `<Listbox>`

Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `multiple` | `boolean` | `false` | When `true`, the value is an array and picking an option keeps the popup open. |
| `defaultValue` | `V` \| `V[]` | none | Initial selection, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` \| `V[]` | none | Current selection, controlled. Mutually exclusive with `defaultValue`. |
| `onSelectChange` | `(value?: V) => void` \| `(value: V[]) => void` | none | Called with the new selection. |
| `defaultOpen` | `boolean` | none | Initial popup state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | none | Current popup state, controlled. Mutually exclusive with `defaultOpen`. |
| `onDisclosureChange` | `(value: boolean) => void` | none | Called when the popup opens or closes. |
| `onOpen` | `() => void` | none | Called when the popup opens. |
| `onClose` | `() => void` | none | Called when the popup closes. |
| `toggleable` | `boolean` | `false` | Selecting the already-selected value clears or removes it. |
| `disabled` | `boolean` | `false` | Disables the whole listbox. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `horizontal` | `boolean` | `false` | Lays the options out horizontally: swaps the navigation keys and sets `aria-orientation`. |
| `children` | `JSX.Element` | none | The label, button and options. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

`Listbox` has no `onChange`. Use `onSelectChange` and `onDisclosureChange`.

### `<ListboxLabel>`

Names the listbox. Renders a `<label>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'label'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Label text, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<ListboxButton>`

A [`Button`](./button.md) that toggles the popup. Renders a `<button>` by
default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables this button. It is also disabled when the `Listbox` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Usually the current value, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes include `aria-haspopup="listbox"`, `aria-controls` and
`aria-expanded`.

### `<ListboxOptions>`

The popup list. Renders a `<ul>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'ul'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the list behaves while closed. See [`unmount`](../guides/rendering.md#unmount). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | none | The options, or a render prop receiving the select state. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes include `role="listbox"`, `aria-multiselectable`,
`aria-labelledby` and `aria-orientation`.

### `<ListboxOption>`

One option. A [`Button`](./button.md) with `role="option"`, rendered as an
`<li>` by default and kept out of the tab order.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `value` | `V` | *required* | The value this option represents. |
| `disabled` | `boolean` | `false` | Disables this option and removes it from navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | none | Label, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Every descendant throws if rendered outside its required ancestor.
`ListboxOption` needs a `ListboxOptions` around it, not only a `Listbox`.
