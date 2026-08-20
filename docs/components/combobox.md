# Combobox

A [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) is a text input
that filters a popup listbox as you type. Reach for it when a
[`Listbox`](./listbox.md) has too many options to scroll through.

A `Combobox` owns two states, as `Listbox` does. An
[autocomplete state](../states.md#autocomplete-state) holds the query and the
selection, and a [disclosure state](../states.md#disclosure-state) holds the
popup. That is why its callbacks are `onSelectChange` and `onDisclosureChange`.

Navigation is *virtual*. DOM focus stays on the input while the arrow keys move
an active option, which is published through `aria-activedescendant`. That is
what lets you keep typing while browsing the list.

```tsx
import {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  DisclosureStateChild,
  AutocompleteStateChild,
} from 'terracotta';
```

## Anatomy

```tsx
<Combobox matchBy>{/* owns both states */}
  <ComboboxLabel/> {/* names the combobox */}
  <ComboboxInput/> {/* role="combobox", drives the query */}
  <ComboboxOptions>{/* role="listbox" */}
    <ComboboxOption/>
  </ComboboxOptions>
</Combobox>
```

## Filtering is yours to render

`matchBy` decides *which* options match, but Terracotta does not remove the rest
from the DOM. An option gets a `tc-matches` attribute while it matches the
current query, and hiding the others is up to you:

```css
.combobox-option:not([tc-matches]) { display: none; }
```

This is deliberate. Hiding with CSS keeps the options mounted, so the list does
not thrash on every keystroke. Either way, keyboard navigation only visits
matching, non-disabled options.

## Examples

### Single selection

```tsx
import { For, createSignal, type JSX } from 'solid-js';
import {
  Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions,
} from 'terracotta';

interface Person { id: number; name: string }

const people: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
];

export function PeoplePicker(): JSX.Element {
  const [selected, setSelected] = createSignal<Person>(people[0]);

  return (
    <Combobox<Person>
      class="combobox"
      defaultOpen={false}
      value={selected()}
      onSelectChange={value => value && setSelected(value)}
      by={(a, b) => a.id === b.id}
      matchBy={(person, query) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      }
    >
      <ComboboxLabel class="combobox-label">Assignee</ComboboxLabel>
      <ComboboxInput
        class="combobox-input"
        placeholder="Search people…"
        value={selected().name}
      />
      <ComboboxOptions class="combobox-options">
        <For each={people}>
          {person => (
            <ComboboxOption class="combobox-option" value={person}>
              {person.name}
            </ComboboxOption>
          )}
        </For>
      </ComboboxOptions>
    </Combobox>
  );
}
```

```css
.combobox {
  position: relative;
  inline-size: 18rem;
}

.combobox-label {
  display: block;
  margin-block-end: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.combobox-input {
  inline-size: 100%;
  border: 1px solid #d4d4d8;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font: inherit;
}

.combobox-input:focus {
  outline: 2px solid #2563eb;
  outline-offset: -1px;
}

/* The input reflects the popup state */
.combobox-input[tc-expanded] {
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

.combobox-options {
  position: absolute;
  inset-block-start: calc(100% + 0.25rem);
  inset-inline: 0;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  max-block-size: 16rem;
  overflow-y: auto;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  z-index: 10;
}

.combobox-option {
  border-radius: 0.375rem;
  padding: 0.4375rem 0.625rem;
  cursor: pointer;
}

/* Options that do not match the query */
.combobox-option:not([tc-matches]) { display: none; }

/* Virtual focus — DOM focus stays on the input */
.combobox-option[tc-active]   { background: #eff6ff; }
.combobox-option[tc-selected] { font-weight: 600; }
.combobox-option[tc-disabled] { color: #a1a1aa; cursor: not-allowed; }
```

`tc-active` is the only highlight available here. Focus never leaves the input,
so `:focus` and `:hover` alone cannot tell you which option the arrow keys are
on.

### Multiple selection

```tsx
const [selected, setSelected] = createSignal<Person[]>([]);

<Combobox<Person>
  class="combobox"
  multiple
  toggleable
  defaultOpen={false}
  value={selected()}
  onSelectChange={setSelected}
  by={(a, b) => a.id === b.id}
  matchBy={(person, query) => person.name.toLowerCase().includes(query.toLowerCase())}
>
  <ComboboxLabel class="combobox-label">Reviewers</ComboboxLabel>
  <ComboboxInput class="combobox-input" placeholder="Add reviewers…" />
  <ComboboxOptions class="combobox-options">
    <For each={people}>
      {person => (
        <ComboboxOption class="combobox-option combobox-option-check" value={person}>
          <span class="combobox-mark" aria-hidden="true" />
          {person.name}
        </ComboboxOption>
      )}
    </For>
  </ComboboxOptions>
</Combobox>
```

```css
.combobox-option-check {
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.5rem;
}

.combobox-option[tc-selected] .combobox-mark::before {
  content: "✓";
  color: #1d4ed8;
}
```

In multiple mode the popup stays open after each pick. In single mode it closes.

### An empty state

The list's render prop receives the autocomplete state, so you can react to the
query:

```tsx
<ComboboxOptions class="combobox-options">
  {state => (
    <>
      <For each={people}>
        {person => (
          <ComboboxOption class="combobox-option" value={person}>
            {person.name}
          </ComboboxOption>
        )}
      </For>
      <Show when={state.hasQuery() && !people.some(p => state.matches(p))}>
        <li class="combobox-empty">No people match “{state.query()}”</li>
      </Show>
    </>
  )}
</ComboboxOptions>
```

```css
.combobox-empty {
  padding: 0.75rem 0.625rem;
  color: #71717a;
  text-align: center;
}
```

### Highlighting the matched text

```tsx
<ComboboxOption class="combobox-option" value={person}>
  {state => (
    <span classList={{ 'combobox-hit': state.matches() }}>{person.name}</span>
  )}
</ComboboxOption>
```

Or from CSS alone, with no render prop:

```css
.combobox-option[tc-matches] .combobox-name { color: #18181b; }
```

### Controlling the popup

```tsx
const [open, setOpen] = createSignal(false);

<Combobox<Person>
  class="combobox"
  isOpen={open()}
  onDisclosureChange={setOpen}
  value={selected()}
  onSelectChange={value => value && setSelected(value)}
  matchBy={matchBy}
>
  …
</Combobox>
```

### Disabled

```tsx
{/* One option */}
<ComboboxOption class="combobox-option" value={person} disabled={!person.available}>
  {person.name}
</ComboboxOption>

{/* The whole combobox */}
<Combobox<Person> class="combobox" disabled value={selected()} matchBy={matchBy}>
  …
</Combobox>
```

```css
.combobox[tc-disabled] .combobox-input {
  background: #f4f4f5;
  cursor: not-allowed;
}
```

### With a transition

```tsx
<Combobox<Person> class="combobox" defaultOpen={false} value={selected()} matchBy={matchBy}>
  <ComboboxInput class="combobox-input" />
  <DisclosureStateChild>
    {({ isOpen }) => (
      <Transition
        show={isOpen()}
        enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
        leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
      >
        <ComboboxOptions class="combobox-options" unmount={false}>…</ComboboxOptions>
      </Transition>
    )}
  </DisclosureStateChild>
</Combobox>
```

```css
.pop-enter { transition: opacity 120ms ease-out, scale 120ms ease-out; }
.pop-leave { transition: opacity 80ms ease-in, scale 80ms ease-in; }
.pop-from  { opacity: 0; scale: 0.98; }
.pop-to    { opacity: 1; scale: 1; }
```

### Reading the query elsewhere

```tsx
<AutocompleteStateChild>
  {state => (
    <Show when={state.hasQuery()}>
      <p class="hint">Filtering by “{state.query()}”</p>
    </Show>
  )}
</AutocompleteStateChild>
```

Note that `query()` runs 250 ms behind what has been typed, because it is
debounced.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Combobox` | `tc-combobox` | Always |
| `Combobox` | `tc-expanded` | The popup is open |
| `Combobox` | `tc-has-selected` | Something is selected |
| `Combobox` | `tc-has-active` | An option is virtually focused |
| `Combobox` | `tc-disabled` | The combobox is disabled |
| `ComboboxLabel` | `tc-combobox-label` | Always |
| `ComboboxLabel` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the combobox |
| `ComboboxInput` | `tc-command-input` | Always — see the note below |
| `ComboboxInput` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the combobox |
| `ComboboxOptions` | `tc-combobox-options` | Always (whenever rendered) |
| `ComboboxOptions` | `tc-expanded`, `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the combobox |
| `ComboboxOption` | `tc-combobox-option`, `tc-button`, `tc-owner` | Always |
| `ComboboxOption` | `tc-matches` | This option matches the current query |
| `ComboboxOption` | `tc-selected` | This option is selected |
| `ComboboxOption` | `tc-active` | This option is virtually focused |
| `ComboboxOption` | `tc-disabled` | This option or the combobox is disabled |

> `ComboboxInput` carries **`tc-command-input`**, not `tc-combobox-input`. It
> shares the marker with [`Command`](./command.md)'s input. Select on
> `tc-command-input`, or give the input your own class.

`tc-has-query` is the container-level counterpart of `tc-matches`. It is present
whenever the query is non-empty, which makes "clear" affordances easy.

### Styling

```css
/* Filtering */
[tc-combobox-option]:not([tc-matches]) { display: none; }

/* Virtual focus — the only highlight, since DOM focus stays on the input */
[tc-combobox-option][tc-active]   { background: #eff6ff; }
[tc-combobox-option][tc-selected] { font-weight: 600; }
[tc-combobox-option][tc-disabled] { color: #a1a1aa; }

/* Popup state on the input */
[tc-command-input][tc-expanded] { border-end-start-radius: 0; border-end-end-radius: 0; }

/* Show a clear button only while there is a query */
[tc-combobox]:not([tc-has-query]) .combobox-clear { display: none; }

/* With unmount={false} on the options */
[tc-combobox-options]:not([tc-expanded]) { display: none; }
```

### Reading the state in code

Two states are in scope inside a `Combobox`.

Query and selection: the
[autocomplete state](../states.md#autocomplete-state), through
`<AutocompleteStateChild>` or `useAutocompleteState()`:

| Member | Type | Description |
| --- | --- | --- |
| `query()` | `string` | The current query, debounced by 250 ms. |
| `setQuery(value)` | `(string) => void` | Sets the query. |
| `hasQuery()` | `boolean` | Whether the query is non-empty. |
| `matches(value)` | `(V) => boolean` | Runs `matchBy` against the current query. |
| `isSelected(value)` / `hasSelected()` | | Selection. |
| `isActive(value)` / `hasActive()` | | Virtual focus position. |
| `select(value)` / `focus(value)` / `blur()` | | Changes them. |

The popup: the [disclosure state](../states.md#disclosure-state), through
`<DisclosureStateChild>` or `useDisclosureState()`:

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the popup is open. |
| `open()` / `close()` / `toggle()` | `() => void` | Changes it. |

Inside an option, `useAutocompleteOptionState()` gives the per-option view:
`isSelected()`, `isActive()`, `matches()`, `select()` and `disabled()`.

## Keyboard

All of this is handled on `ComboboxInput`, since focus never leaves it:

| Key | Action |
| --- | --- |
| Typing | Updates the query (debounced 250 ms) and opens the popup |
| <kbd>↓</kbd> | Opens the popup, or moves to the next matching option |
| <kbd>↑</kbd> | Opens the popup, or moves to the previous matching option |
| <kbd>Enter</kbd> | Selects the active option |
| <kbd>Escape</kbd> | Closes the popup |

Clicking the input toggles the popup. Blurring the input closes it, unless the
pointer is over the options list. That exception is what stops a click on an
option from closing the popup before the click lands.

## API

### `<Combobox>`

Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `matchBy` | `(value: V, query: string) => boolean` | *required* | Decides whether an option matches the current query. |
| `multiple` | `boolean` | `false` | When `true`, the value is an array and the popup stays open after each pick. |
| `defaultValue` | `V` \| `V[]` | — | Initial selection, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` \| `V[]` | — | Current selection, controlled. Mutually exclusive with `defaultValue`. |
| `onSelectChange` | `(value?: V) => void` \| `(value: V[]) => void` | — | Called with the new selection. |
| `defaultOpen` | `boolean` | — | Initial popup state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current popup state, controlled. Mutually exclusive with `defaultOpen`. |
| `onDisclosureChange` | `(value: boolean) => void` | — | Called when the popup opens or closes. |
| `onOpen` | `() => void` | — | Called when the popup opens. |
| `onClose` | `() => void` | — | Called when the popup closes. |
| `toggleable` | `boolean` | `false` | Selecting the already-selected value clears or removes it. |
| `disabled` | `boolean` | `false` | Disables the whole combobox. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `children` | `JSX.Element` | — | The label, input and options. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

`Combobox` has no `onChange`. Use `onSelectChange` and `onDisclosureChange`.
There is no `horizontal` option either, because the list is always vertical.

### `<ComboboxLabel>`

Names the combobox. Renders a `<label>` by default. It takes no `ref`, and its
`children` is not a render prop.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'label'` | Element or component to render as. |
| `children` | `JSX.Element` | — | Label text. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<ComboboxInput>`

The text field. Renders an `<input type="text">` by default. Everything you pass
is forwarded — `placeholder`, `value`, `onInput`, `class` — so you control what
the input displays.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'input'` | Element or component to render as. Query tracking only works on a real `<input>`. |
| `disabled` | `boolean` | `false` | Disables the input's own handling. It is also disabled when the `Combobox` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | Rarely used for an input. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="combobox"`, `type="text"`, `tabindex="0"`,
`aria-haspopup="listbox"`, `aria-controls`, `aria-labelledby`, `aria-expanded`
and `aria-activedescendant`.

### `<ComboboxOptions>`

The popup list. Renders a `<ul>` by default and is kept out of the tab order, so
focus stays on the input.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'ul'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the list behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: AutocompleteStateProperties<V>) => JSX.Element` | — | The options, or a render prop receiving the autocomplete state. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="listbox"`, `aria-multiselectable`,
`aria-orientation="vertical"` and `tabindex="-1"`.

### `<ComboboxOption>`

One option. A [`Button`](./button.md) with `role="option"`, rendered as an
`<li>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `value` | `V` | *required* | The value this option represents; also what `matchBy` receives. |
| `disabled` | `boolean` | `false` | Disables this option and removes it from navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: AutocompleteOptionStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="option"`, `aria-selected`, `tabindex="-1"`,
and a generated `id` — the one `aria-activedescendant` points at.

Every descendant throws if rendered outside a `<Combobox>`.
