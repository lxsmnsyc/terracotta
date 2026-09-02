<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Command

A command palette body: a text input above an always-visible, filtered listbox.
It is [`Combobox`](./combobox.md) without the popup. The list is always there,
so there is no open/closed state to manage.

Wrap it in [`CommandBar`](./command-bar.md) for the familiar
<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> modal, or drop it straight into a
sidebar or search page.

Navigation is virtual, as in `Combobox`. Focus stays on the input, and the
active option is published through `aria-activedescendant`.

```tsx
import {
  Command,
  CommandLabel,
  CommandInput,
  CommandOptions,
  CommandOption,
} from 'terracotta/command';
import { AutocompleteStateChild, useAutocompleteState } from 'terracotta/states';
```

## Anatomy

```tsx
<Command matchBy>{/* owns the query and the selection */}
  <CommandLabel/>{/* names the palette */}
  <CommandInput/>{/* role="combobox", drives the query */}
  <CommandOptions>{/* role="listbox", always visible */}
    <CommandOption/>
  </CommandOptions>
</Command>
```

## Filtering is yours to render

`matchBy` decides which options match. Terracotta marks those with `tc-matches`
and leaves every option in the DOM. Hide the rest yourself:

```css
.command-option:not([tc-matches]) { display: none; }
```

Either way, keyboard navigation only visits matching, non-disabled options.

## Examples

### A palette of actions

```tsx
import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import {
  Command,
  CommandInput,
  CommandLabel,
  CommandOption,
  CommandOptions,
} from 'terracotta/command';

interface Action { id: string; label: string; run: () => void }

export function Palette(props: { actions: Action[] }): JSX.Element {
  return (
    <Command<Action>
      class="command"
      defaultValue={undefined as unknown as Action}
      by={(a, b) => a.id === b.id}
      matchBy={(action, query) =>
        action.label.toLowerCase().includes(query.toLowerCase())
      }
      onChange={action => action?.run()}
    >
      <CommandLabel class="visually-hidden">Commands</CommandLabel>
      <CommandInput class="command-input" placeholder="Type a command…" />
      <CommandOptions class="command-options">
        <For each={props.actions}>
          {action => (
            <CommandOption class="command-option" value={action}>
              {action.label}
            </CommandOption>
          )}
        </For>
      </CommandOptions>
    </Command>
  );
}
```

```css
.command {
  inline-size: 24rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.75rem;
  background: #ffffff;
  overflow: hidden;
}

.command-input {
  inline-size: 100%;
  border: none;
  border-block-end: 1px solid #e4e4e7;
  padding: 0.875rem 1rem;
  font: inherit;
}

.command-input:focus { outline: none; }

.command-options {
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  max-block-size: 18rem;
  overflow-y: auto;
}

.command-option {
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

/* Entries that do not match the query */
.command-option:not([tc-matches]) { display: none; }

/* Virtual focus — DOM focus stays on the input */
.command-option[tc-active]   { background: #f4f4f5; }
.command-option[tc-selected] { font-weight: 600; }
.command-option[tc-disabled] { color: #a1a1aa; cursor: not-allowed; }

.visually-hidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

Running the action from `onChange` is the usual pattern. `Command` tracks a
*selected value*, and what you do with it is up to you.

### Entries with icons and shortcut hints

```tsx
<CommandOption class="command-option command-option-rich" value={action}>
  <span class="command-icon" aria-hidden="true">{action.icon}</span>
  <span class="command-label">{action.label}</span>
  <span class="command-shortcut" aria-hidden="true">{action.shortcut}</span>
</CommandOption>
```

```css
.command-option-rich {
  display: grid;
  grid-template-columns: 1.25rem 1fr auto;
  align-items: center;
  gap: 0.625rem;
}

.command-shortcut {
  color: #a1a1aa;
  font-size: 0.8125rem;
}
```

### An empty state

The list's render prop receives the autocomplete state:

```tsx
<CommandOptions class="command-options">
  {state => (
    <>
      <For each={props.actions}>
        {action => (
          <CommandOption class="command-option" value={action}>
            {action.label}
          </CommandOption>
        )}
      </For>
      <Show when={state.hasQuery() && !props.actions.some(a => state.matches(a))}>
        <li class="command-empty">No commands match “{state.query()}”</li>
      </Show>
    </>
  )}
</CommandOptions>
```

```css
.command-empty {
  padding: 1rem;
  color: #71717a;
  text-align: center;
}
```

### Grouped entries

Navigation ignores non-option elements, so headings need no special handling. To
hide a heading when none of its entries match, combine `tc-has-query` with your
own logic:

```tsx
<CommandOptions class="command-options">
  <li class="command-group" role="presentation">Navigation</li>
  <For each={navigationActions}>
    {action => (
      <CommandOption class="command-option" value={action}>{action.label}</CommandOption>
    )}
  </For>
  <li class="command-group" role="presentation">Editing</li>
  <For each={editingActions}>
    {action => (
      <CommandOption class="command-option" value={action}>{action.label}</CommandOption>
    )}
  </For>
</CommandOptions>
```

```css
.command-group {
  padding: 0.5rem 0.75rem 0.25rem;
  color: #71717a;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

### Multiple selection

Use this for a filter palette rather than an action palette:

```tsx
const [active, setActive] = createSignal<Filter[]>([]);

<Command<Filter>
  class="command"
  multiple
  toggleable
  value={active()}
  onChange={setActive}
  by={(a, b) => a.id === b.id}
  matchBy={(filter, query) => filter.label.toLowerCase().includes(query.toLowerCase())}
>
  <CommandInput class="command-input" placeholder="Filter…" />
  <CommandOptions class="command-options">
    <For each={filters}>
      {filter => (
        <CommandOption class="command-option command-option-check" value={filter}>
          <span class="command-mark" aria-hidden="true" />
          {filter.label}
        </CommandOption>
      )}
    </For>
  </CommandOptions>
</Command>
```

```css
.command-option-check {
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 0.5rem;
}

.command-option[tc-selected] .command-mark::before {
  content: "✓";
  color: #1d4ed8;
}
```

### Showing a clear button only while typing

```tsx
<div class="command-field">
  <CommandInput class="command-input" placeholder="Type a command…" />
  <button type="button" class="command-clear" onClick={reset}>Clear</button>
</div>
```

```css
.command-field { position: relative; }

.command-clear {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 0.5rem;
  translate: 0 -50%;
}

/* tc-has-query lives on the input, and on the Command root */
.command:not([tc-has-query]) .command-clear { display: none; }
```

### Disabled entries

```tsx
<CommandOption class="command-option" value={action} disabled={!action.available}>
  {action.label}
</CommandOption>
```

The arrow keys skip disabled entries, even when they match the query.

### Reading the query

```tsx
function QueryEcho(): JSX.Element {
  const state = useAutocompleteState<Action>();
  return <Show when={state.hasQuery()}><p class="hint">“{state.query()}”</p></Show>;
}
```

`<AutocompleteStateChild>` does the same inline. Note that `query()` runs 250 ms
behind what has been typed, because it is debounced.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Command` | `tc-command` | Always |
| `Command` | `tc-has-selected` | Something is selected |
| `Command` | `tc-has-active` | An entry is virtually focused |
| `Command` | `tc-has-query` | The query is non-empty |
| `Command` | `tc-disabled` | The palette is disabled |
| `CommandLabel` | `tc-command-label` | Always |
| `CommandLabel` | `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the palette |
| `CommandInput` | `tc-command-input` | Always |
| `CommandInput` | `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the palette |
| `CommandOptions` | `tc-command-options` | Always |
| `CommandOptions` | `tc-has-selected`, `tc-has-active`, `tc-has-query`, `tc-disabled` | Mirrors the palette |
| `CommandOption` | `tc-command-option`, `tc-button`, `tc-owner` | Always |
| `CommandOption` | `tc-matches` | This entry matches the current query |
| `CommandOption` | `tc-selected` | This entry is selected |
| `CommandOption` | `tc-active` | This entry is virtually focused |
| `CommandOption` | `tc-disabled` | This entry or the palette is disabled |

There is no `tc-expanded` here. The list is always visible, and for the same
reason `CommandInput` reports a constant `aria-expanded="true"`.

### Styling

```css
/* Filtering */
[tc-command-option]:not([tc-matches]) { display: none; }

/* Virtual focus — the only highlight, since DOM focus stays on the input */
[tc-command-option][tc-active]   { background: #f4f4f5; }
[tc-command-option][tc-selected] { font-weight: 600; }
[tc-command-option][tc-disabled] { color: #a1a1aa; }

/* Container-level query state */
[tc-command]:not([tc-has-query]) .command-clear { display: none; }
[tc-command][tc-has-query] .command-recent { display: none; }

/* Nothing highlighted yet */
[tc-command]:not([tc-has-active]) .command-hint { display: block; }
```

### Reading the state in code

The [autocomplete state](../states.md#autocomplete-state). Reach it through the
render prop on `Command` or `CommandOptions`, through
`<AutocompleteStateChild>`, or with `useAutocompleteState()`:

| Member | Type | Description |
| --- | --- | --- |
| `query()` | `string` | The current query, debounced by 250 ms. |
| `setQuery(value)` | `(string) => void` | Sets the query. |
| `hasQuery()` | `boolean` | Whether the query is non-empty. |
| `matches(value)` | `(V) => boolean` | Runs `matchBy` against the current query. |
| `isSelected(value)` / `hasSelected()` | | Selection. |
| `isActive(value)` / `hasActive()` | | Virtual focus position. |
| `select(value)` / `focus(value)` / `blur()` | | Changes them. |
| `disabled()` | `boolean` | Whether the palette is disabled. |

Inside an entry, `useAutocompleteOptionState()` gives the per-option view:
`isSelected()`, `isActive()`, `matches()`, `select()` and `disabled()`.

## Keyboard

Handled on `CommandInput`:

| Key | Action |
| --- | --- |
| Typing | Updates the query (debounced 250 ms) and moves to the first match |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous matching entry, wrapping around |
| <kbd>Enter</kbd> | Selects the active entry |

Focusing the input restores the entry that was active before. Failing that, it
jumps to the selected entry, or to the first match. Hovering an entry makes it
active, so mouse and keyboard agree on what is highlighted.

`Command` handles no <kbd>Escape</kbd> of its own. That belongs to whatever
wraps it, usually [`CommandBar`](./command-bar.md).

## API

### `<Command>`

Owns an [autocomplete state](../states.md#autocomplete-state) and renders a
`<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `matchBy` | `(value: V, query: string) => boolean` | *required* | Decides whether an entry matches the current query. |
| `multiple` | `boolean` | `false` | When `true`, `value` / `defaultValue` / `onChange` deal in arrays. |
| `defaultValue` | `V` \| `V[]` | — | Initial selection, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` \| `V[]` | — | Current selection, controlled. Mutually exclusive with `defaultValue`. |
| `onChange` | `(value?: V) => void` \| `(value: V[]) => void` | — | Called with the new selection. |
| `toggleable` | `boolean` | `false` | Selecting the already-selected value clears or removes it. |
| `disabled` | `boolean` | `false` | Disables the whole palette. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `horizontal` | `boolean` | `false` | Accepted for symmetry with `Select`, but currently unused — the list is always navigated vertically. |
| `children` | `JSX.Element` \| `(state: AutocompleteStateProperties<V>) => JSX.Element` | — | The label, input and options, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CommandLabel>`

Names the palette. Renders a `<label>` by default. It takes no `ref`, and its
`children` is not a render prop.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'label'` | Element or component to render as. |
| `children` | `JSX.Element` | — | Label text. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CommandInput>`

The text field. Renders an `<input type="text">` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'input'` | Element or component to render as. Query tracking only works on a real `<input>`. |
| `disabled` | `boolean` | `false` | Disables the input's own handling. It is also disabled when the `Command` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| *…rest* | props of `as` | — | Forwarded to the rendered element, including `placeholder` and `value`. |

Rendered attributes include `role="combobox"`, `type="text"`, `tabindex="0"`,
`aria-controls`, `aria-expanded="true"` and `aria-activedescendant`.

### `<CommandOptions>`

The list. Renders a `<ul>` by default, always mounted, and kept out of the tab
order.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'ul'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: AutocompleteStateProperties<V>) => JSX.Element` | — | The entries, or a render prop receiving the autocomplete state. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="listbox"`, `aria-multiselectable`,
`aria-orientation="vertical"` and `tabindex="-1"`.

### `<CommandOption>`

One entry. A [`Button`](./button.md) with `role="option"`, rendered as an
`<li>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `value` | `V` | *required* | The value this entry represents; also what `matchBy` receives. |
| `disabled` | `boolean` | `false` | Disables this entry and removes it from navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: AutocompleteOptionStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="option"`, `aria-selected`, `tabindex="-1"`,
and a generated `id`, which is the one `aria-activedescendant` points at.

Every descendant throws if rendered outside a `<Command>`.
