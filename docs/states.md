# State primitives

Every stateful Terracotta component is a thin shell around one of these reactive
stores. The stores are exported, so you can read a component's state from
anywhere in its subtree, or build your own component on the same behaviour.

Three things are exported per state:

- `create…State(options)` — creates the store. Call it inside a component you own.
- `use…State()` — reads the nearest store from context. Throws if there is none.
- `…StateChild` — a component whose `children` render prop receives the store.

```tsx
import { DisclosureStateChild, useDisclosureState } from 'terracotta/states';

// Render prop, no extra component needed
<Dialog defaultOpen={false}>
  <DisclosureStateChild>
    {state => <p>{state.isOpen() ? 'open' : 'closed'}</p>}
  </DisclosureStateChild>
</Dialog>

// Or a hook, inside any descendant component
function CloseButton() {
  const state = useDisclosureState();
  return <button onClick={() => state.close()}>Close</button>;
}
```

A function passed to a `…StateChild` counts as a render prop only if it declares
exactly one parameter. A zero-parameter function is rendered as-is.

---

## Disclosure state

Open/closed state. Backs `Disclosure`, `Dialog`, `AlertDialog`, `Popover`,
`ContextMenu`, `CommandBar` and the popup half of `Listbox` and `Combobox`.

`createDisclosureState(options)` · `useDisclosureState()` · `<DisclosureStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultOpen` | `boolean` | — | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks every state change. |
| `onChange` | `(state: boolean) => void` | — | Called on every change with the new state. |
| `onOpen` | `() => void` | — | Called when the state becomes open. Runs before `onChange`. |
| `onClose` | `() => void` | — | Called when the state becomes closed. Runs after `onChange`. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the disclosure is open. |
| `setState(value)` | `(boolean) => void` | Sets the state. No-op while disabled. |
| `open()` | `() => void` | Opens. No-op while disabled. |
| `close()` | `() => void` | Closes. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. No-op while disabled. |
| `disabled()` | `boolean` | Whether the state is disabled. |

---

## Toggle state

Pressed/unpressed state for toggle buttons. Backs `Toggle`.

`createToggleState(options)` · `useToggleState()` · `<ToggleStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultPressed` | `boolean` | — | Initial state, uncontrolled. |
| `pressed` | `boolean` | — | Current state, controlled. |
| `disabled` | `boolean` | `false` | Blocks every state change. |
| `onChange` | `(state: boolean) => void` | — | Called with the new state. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `pressed()` | `boolean` | Whether the toggle is pressed. |
| `setState(value)` | `(boolean) => void` | Sets the state. |
| `check()` / `uncheck()` | `() => void` | Sets the state to `true` / `false`. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the state is disabled. |

---

## Check state

Tri-state checkbox value: `true`, `false`, or `undefined` for indeterminate.
Backs `Checkbox`.

`createCheckState(options)` · `useCheckState()` · `<CheckStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultChecked` | `boolean \| undefined` | — | Initial state, uncontrolled. `undefined` starts indeterminate. |
| `checked` | `boolean \| undefined` | — | Current state, controlled. |
| `disabled` | `boolean` | `false` | Blocks every state change. |
| `onChange` | `(state?: boolean) => void` | — | Called with the new state. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `checked()` | `boolean \| undefined` | Current value; `undefined` means indeterminate. |
| `setState(value?)` | `(boolean \| undefined) => void` | Sets the state. |
| `check()` / `uncheck()` | `() => void` | Sets `true` / `false`. |
| `reset()` | `() => void` | Returns to indeterminate (`undefined`). |
| `toggle()` | `() => void` | Flips the state. From indeterminate this yields `true`. |
| `disabled()` | `boolean` | Whether the state is disabled. |

---

## Input state

A plain string value. Exported for building text-input components.

`createInputState(options)` · `useInputState()` · `<InputStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string \| undefined` | — | Initial value, uncontrolled. |
| `value` | `string \| undefined` | — | Current value, controlled. |
| `disabled` | `boolean` | `false` | Blocks writes. |
| `onChange` | `(state?: string) => void` | — | Called with the new value. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `string \| undefined` | Current value. |
| `setState(value?)` | `(string \| undefined) => void` | Sets the value. |
| `disabled()` | `boolean` | Whether the state is disabled. |

---

## Select state

Selection over a set of values, in single or multiple mode. It also tracks the
*active* value, the one focus is on. Backs `Accordion`, `Select`, `Listbox`,
`RadioGroup` and `TabGroup`.

`createSingleSelectState(options)` · `createMultipleSelectState(options)` ·
`useSelectState<T>()` · `<SelectStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `false` / `true` | `false` | Discriminates the two variants. `createMultipleSelectState` requires `multiple: true`. |
| `defaultValue` | `T` (single) / `T[]` (multiple) | — | Initial selection, uncontrolled. |
| `value` | `T` (single) / `T[]` (multiple) | — | Current selection, controlled. |
| `onChange` | `(value?: T) => void` / `(value: T[]) => void` | — | Called with the new selection. |
| `toggleable` | `boolean` | `false` | When `true`, selecting the already-selected value clears it (single) or removes it (multiple). |
| `disabled` | `boolean` | `false` | Blocks selection and focus changes. |
| `by` | `(a: T, b: T) => boolean` | reference equality | Compares values. The default treats `NaN` as equal to `NaN`; supply your own for value objects, e.g. `(a, b) => a.id === b.id`. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(T) => boolean` | Whether the value is selected. |
| `select(value)` | `(T) => void` | Selects the value, honouring `toggleable`. |
| `hasSelected()` | `boolean` | Whether anything is selected. |
| `isActive(value)` | `(T) => boolean` | Whether the value is the active one. |
| `hasActive()` | `boolean` | Whether any value is active. |
| `focus(value)` | `(T) => void` | Marks the value active. |
| `blur()` | `() => void` | Clears the active value. |
| `disabled()` | `boolean` | Whether the state is disabled. |

> In single mode, `isSelected` compares with the built-in equality instead of
> `by`. `by` is applied by `select`, `isActive` and the multiple-mode lookups.
> If that distinction matters to you, pass values you can compare by reference,
> or use multiple mode.

---

## Select option state

The per-option view of a select state. Created by `SelectOption`,
`ListboxOption`, `AccordionItem`, `Tab`, `TabPanel` and `RadioGroupOption`.

`createSelectOptionState(options)` · `useSelectOptionState()` · `<SelectOptionStateChild>`

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `T` | *required* | The value this option represents. |
| `disabled` | `boolean` | `false` | Disables this option. The option is also disabled when the parent select state is. |

### Properties

| Member | Type | Description |
| --- | --- | --- |
| `isSelected()` | `boolean` | Whether this option is selected. |
| `select()` | `() => void` | Selects this option. |
| `isActive()` | `boolean` | Whether this option is active. |
| `focus()` / `blur()` | `() => void` | Marks this option active / clears it. |
| `disabled()` | `boolean` | Whether this option is disabled. |

---

## Autocomplete state

A select state, plus a debounced text query and per-value matching. Backs
`Combobox` and `Command`.

`createSingleAutocompleteState(options)` · `createMultipleAutocompleteState(options)` ·
`useAutocompleteState<T>()` · `<AutocompleteStateChild>`

### Options

Everything from [select state](#select-state), plus:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `matchBy` | `(value: T, query: string) => boolean` | *required* | Decides whether a value matches the current query. Called for every option on every query change. |

### Properties

Everything from [select state](#select-state), plus:

| Member | Type | Description |
| --- | --- | --- |
| `query()` | `string` | The current query. Starts as `''`. |
| `setQuery(value)` | `(string) => void` | Sets the query. Debounced by 250 ms before it becomes readable. |
| `matches(value)` | `(T) => boolean` | Runs `matchBy` against the current query. |
| `hasQuery()` | `boolean` | Whether the query is non-empty. |

> `setQuery` is debounced, so `query()` lags typing by 250 ms. The debounce
> keeps filtering off the keystroke path. It also means an assertion made
> immediately after typing still sees the previous query.

---

## Autocomplete option state

The per-option view of an autocomplete state. Created by `ComboboxOption` and
`CommandOption`.

`createAutocompleteOptionState(options)` · `useAutocompleteOptionState()` ·
`<AutocompleteOptionStateChild>`

Options are the same as [select option state](#select-option-state). Properties
are the same, plus:

| Member | Type | Description |
| --- | --- | --- |
| `matches()` | `boolean` | Whether this option matches the current query. |
