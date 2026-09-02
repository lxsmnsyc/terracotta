<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Select

An always-visible [listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/):
a list of options the user picks from, with arrow-key navigation and type-ahead.

There is no button and no popup. For those, use [`Listbox`](./listbox.md), which
wraps a disclosure around the same list.

```tsx
import { Select, SelectOption } from 'terracotta/select';
import { SelectStateChild, SelectOptionStateChild, useSelectState } from 'terracotta/states';
```

## Anatomy

```tsx
<Select>         {/* role="listbox", owns the selection */}
  <SelectOption/>{/* role="option" */}
</Select>
```

## Examples

### Single selection

```tsx
interface Person { id: number; name: string }

const people: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
];

<Select<Person>
  class="select"
  defaultValue={people[0]}
  by={(a, b) => a.id === b.id}
>
  <For each={people}>
    {person => (
      <SelectOption class="select-option" value={person}>
        {person.name}
      </SelectOption>
    )}
  </For>
</Select>
```

```css
.select {
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  inline-size: 16rem;
  border: 1px solid #d4d4d8;
  border-radius: 0.5rem;
  background: #ffffff;
}

.select[aria-orientation="horizontal"] {
  display: flex;
  gap: 0.25rem;
  inline-size: auto;
}

.select-option {
  border-radius: 0.375rem;
  padding: 0.4375rem 0.625rem;
  cursor: pointer;
}

/* The keyboard/pointer position */
.select-option[tc-active] {
  background: #f4f4f5;
}

/* The chosen value */
.select-option[tc-selected] {
  font-weight: 600;
  color: #1d4ed8;
}

.select-option[tc-disabled] {
  color: #a1a1aa;
  cursor: not-allowed;
}

.select-option:focus-visible { outline: none; }
```

`by` matters here. The options are objects, and without it two structurally
equal objects would not count as the same value.

### Multiple selection

```tsx
const [picked, setPicked] = createSignal<Person[]>([]);

<Select<Person>
  class="select"
  multiple
  toggleable
  value={picked()}
  onChange={setPicked}
  by={(a, b) => a.id === b.id}
>
  <For each={people}>
    {person => (
      <SelectOption class="select-option" value={person}>
        {person.name}
      </SelectOption>
    )}
  </For>
</Select>
```

`multiple` switches `value`, `defaultValue` and `onChange` to arrays.
`toggleable` lets a second click deselect, which is usually what you want in
multiple mode.

### Showing a tick for selected options

```tsx
<SelectOption class="select-option select-option-check" value={person}>
  {state => (
    <>
      <span class="select-mark" aria-hidden="true">{state.isSelected() ? '✓' : ''}</span>
      {person.name}
    </>
  )}
</SelectOption>
```

```css
.select-option-check {
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.5rem;
}

.select-mark { color: #1d4ed8; }
```

The same mark works without a render prop, driven by the attribute alone:

```css
.select-option::before {
  content: "";
  display: inline-block;
  inline-size: 1rem;
}

.select-option[tc-selected]::before {
  content: "✓";
  color: #1d4ed8;
}
```

### Horizontal

```tsx
<Select<string> class="select" horizontal defaultValue="day">
  <SelectOption class="select-option" value="day">Day</SelectOption>
  <SelectOption class="select-option" value="week">Week</SelectOption>
  <SelectOption class="select-option" value="month">Month</SelectOption>
</Select>
```

`horizontal` swaps which arrow keys navigate, and sets `aria-orientation`. One
CSS rule then keeps layout and semantics in step; see `.select[aria-orientation]`
above.

### Disabled options, and a disabled list

```tsx
<Select<string> class="select" defaultValue="day">
  <SelectOption class="select-option" value="day">Day</SelectOption>
  <SelectOption class="select-option" value="week" disabled>
    Week (upgrade required)
  </SelectOption>
</Select>

<Select<string> class="select" defaultValue="day" disabled>
  …
</Select>
```

Both the arrow keys and type-ahead skip disabled options.

### Clearing the selection

```tsx
<Select<string> class="select" toggleable defaultValue="day" onChange={setRange}>
  …
</Select>
```

With `toggleable`, choosing the selected option again clears it, and `onChange`
receives `undefined`.

### Reading the selection

```tsx
<Select<string> class="select" defaultValue="day">
  {state => (
    <>
      <SelectOption class="select-option" value="day">Day</SelectOption>
      <SelectOption class="select-option" value="week">Week</SelectOption>
      <li class="select-hint" aria-hidden="true">
        {state.hasSelected() ? 'Range chosen' : 'Pick a range'}
      </li>
    </>
  )}
</Select>
```

From a nested component:

```tsx
function SelectionCount(): JSX.Element {
  const state = useSelectState<Person>();
  return <p class="hint">{state.hasSelected() ? 'Selected' : 'Nothing selected'}</p>;
}
```

### Grouping options

Navigation ignores non-option elements, so group headings work as-is:

```tsx
<Select<string> class="select" defaultValue="gb">
  <li class="select-group" role="presentation">Europe</li>
  <SelectOption class="select-option" value="gb">United Kingdom</SelectOption>
  <SelectOption class="select-option" value="fr">France</SelectOption>
  <li class="select-group" role="presentation">Asia</li>
  <SelectOption class="select-option" value="jp">Japan</SelectOption>
</Select>
```

```css
.select-group {
  padding: 0.5rem 0.625rem 0.1875rem;
  color: #71717a;
  font-size: 0.75rem;
  text-transform: uppercase;
}
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Select` | `tc-select` | Always |
| `Select` | `tc-has-selected` | At least one option is selected |
| `Select` | `tc-has-active` | An option currently holds keyboard focus |
| `Select` | `tc-disabled` | The list is disabled |
| `SelectOption` | `tc-select-option`, `tc-button`, `tc-owner` | Always |
| `SelectOption` | `tc-selected` | This option is selected |
| `SelectOption` | `tc-active` | This option holds keyboard focus |
| `SelectOption` | `tc-disabled` | This option or the list is disabled |

`tc-selected` and `tc-active` mean different things. *Selected* is the chosen
value. *Active* is where the keyboard is. While the user browses the list, they
sit on different options.

The option also carries `aria-selected`. The list carries `aria-multiselectable`
and `aria-orientation`.

### Styling

```css
[tc-select-option][tc-active]   { background: #f4f4f5; }
[tc-select-option][tc-selected] { font-weight: 600; }
[tc-select-option][tc-disabled] { color: #a1a1aa; cursor: not-allowed; }

/* Both at once — the selected option is also the one being browsed */
[tc-select-option][tc-selected][tc-active] { background: #dbeafe; }

/* Container-level state */
[tc-select]:not([tc-has-selected]) .select-hint { display: block; }
[tc-select][tc-has-selected] .select-hint { display: none; }

/* Orientation drives layout */
[tc-select][aria-orientation="horizontal"] { display: flex; gap: 0.25rem; }
```

### Reading the state in code

On the list — the [select state](../states.md#select-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(V) => boolean` | Whether that value is selected. |
| `select(value)` | `(V) => void` | Selects it, honouring `toggleable`. |
| `hasSelected()` | `boolean` | Whether anything is selected. |
| `isActive(value)` / `hasActive()` | | Keyboard focus position. |
| `focus(value)` / `blur()` | `() => void` | Moves or clears the active value. |
| `disabled()` | `boolean` | Whether the list is disabled. |

Inside an option — the [select option state](../states.md#select-option-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected()` | `boolean` | Whether this option is selected. |
| `isActive()` | `boolean` | Whether this option holds keyboard focus. |
| `select()` | `() => void` | Selects this option. |
| `disabled()` | `boolean` | Whether this option is disabled. |

Reach either one through the render prop on the matching component, through
`<SelectStateChild>` or `<SelectOptionStateChild>`, or with `useSelectState()`
or `useSelectOptionState()`.

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous option, wrapping around (vertical) |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous option, wrapping around (horizontal) |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last option |
| Printable characters | Type-ahead over option text, with a 250 ms window for multi-character prefixes |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused option; the root suppresses the browser default |

Focusing the list jumps to the selected option, or to the first option when
nothing is selected. Disabled options are skipped. Hovering an option focuses
it, which is why mouse and keyboard highlight the same way.

## API

### `<Select>`

Owns a [select state](../states.md#select-state) and renders a `<ul>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'ul'` | Element or component to render as. |
| `multiple` | `boolean` | `false` | When `true`, `value` / `defaultValue` / `onChange` deal in arrays. |
| `defaultValue` | `V` \| `V[]` | — | Initial selection, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` \| `V[]` | — | Current selection, controlled. Mutually exclusive with `defaultValue`. |
| `onChange` | `(value?: V) => void` \| `(value: V[]) => void` | — | Called with the new selection. |
| `toggleable` | `boolean` | `false` | Selecting the already-selected value clears (single) or removes (multiple) it. |
| `disabled` | `boolean` | `false` | Disables the whole list. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `horizontal` | `boolean` | `false` | Lays the list out horizontally: swaps the navigation keys and sets `aria-orientation`. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | — | The options, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"listbox"` |
| `aria-multiselectable` | Mirrors `multiple` |
| `aria-orientation` | `"horizontal"` or `"vertical"` |
| `tabindex` | `0`, or `-1` once an option is active — so focus moves down into the options |

### `<SelectOption>`

One option. A [`Button`](./button.md) with `role="option"`, rendered as an
`<li>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `value` | `V` | *required* | The value this option represents. |
| `disabled` | `boolean` | `false` | Disables this option and removes it from navigation. It is also disabled when the `Select` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="option"`, `aria-selected`, and `tabindex`,
which is `0` while active and `-1` otherwise.

`SelectOption` throws if rendered outside a `<Select>`.
