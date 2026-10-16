<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# TreeGrid

A grid whose rows open and close like a tree, such as an inbox with threaded
replies, following the
[ARIA treegrid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/).
It is one stop in the tab sequence. Both rows and cells take focus.

Use a [`Tree`](./tree.md) when each node is a single item, and a
[`Grid`](./grid.md) when the rows do not nest.

```tsx
import {
  TreeGrid,
  TreeGridCell,
  TreeGridColumnHeader,
  TreeGridHeaderRow,
  TreeGridRow,
  TreeGridRowHeader,
  TreeGridStateChild,
  useTreeGridState,
} from 'terracotta/treegrid';
```

## Anatomy

```tsx
<TreeGrid>                  {/* <table role="treegrid">, owns expansion */}
  <thead>
    <TreeGridHeaderRow>     {/* a header row; does not take focus */}
      <TreeGridColumnHeader/>
    </TreeGridHeaderRow>
  </thead>
  <tbody>
    <TreeGridRow value level expandable>{/* role="row", takes focus */}
      <TreeGridCell/>       {/* role="gridcell" */}
    </TreeGridRow>
  </tbody>
</TreeGrid>
```

The cell parts are the same components as `GridCell`, `GridColumnHeader`,
`GridRowHeader` and `GridRow` from [`Grid`](./grid.md), under treegrid names.

## Examples

### Basic

### Declaring the hierarchy

The rows of a table are flat, so the treegrid cannot see which row is inside
which. Declare it on each row:

- `level` is the depth, from 1. It sets `aria-level`.
- `expandable` marks a parent row. It gets `aria-expanded`. Rows without it
  never get `aria-expanded`, so they are not announced as parents.
- Render a parent's child rows right after it, while it is expanded. Read
  that from the treegrid's render prop, `<TreeGridStateChild>` or
  `useTreeGridState()`:

```tsx
<TreeGrid aria-label="Inbox" defaultExpanded={['trip']}>
  {state => (
    <tbody>
      <TreeGridRow value="trip" expandable aria-label="Trip in June">…</TreeGridRow>
      {state.isExpanded('trip') && (
        <TreeGridRow value="trip-1" level={2} aria-label="Re: Trip in June">…</TreeGridRow>
      )}
    </tbody>
  )}
</TreeGrid>
```

### Naming rows

A focused row is read by its name. Give each `TreeGridRow` an `aria-label`
that sums it up, as the demo does. Otherwise a screen reader reads every cell.

### Widgets in rows

The widgets of the row that has focus stay in the tab sequence. From a row,
<kbd>Tab</kbd> moves through its buttons and links, then out of the treegrid,
as the pattern describes. Widgets in other rows are reached with the arrow
keys.

### Controlled expansion

```tsx
const [open, setOpen] = createSignal<string[]>([]);

<TreeGrid aria-label="Inbox" expanded={open()} onExpandedChange={setOpen}>…</TreeGrid>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `TreeGrid` | `tc-treegrid` | Always |
| `TreeGridRow` | `tc-treegrid-row` | Always |
| `TreeGridRow` | `tc-level` | Always, set to the row's depth |
| `TreeGridRow` | `tc-expanded` | The row is expanded |

### Reading the state in code

On the treegrid, through its render prop, `<TreeGridStateChild>` or
`useTreeGridState()`:

| Member | Type | Description |
| --- | --- | --- |
| `isExpanded(value)` | `(V) => boolean` | Whether a row is open. |
| `setExpanded(value, open)` | `(V, boolean) => void` | Opens or closes a row. |
| `toggle(value)` | `(V) => void` | Flips a row. |

On a row, through its render prop: `level()`, `isExpandable()`,
`isExpanded()` and `toggle()`.

## Keyboard

On a focused row:

| Key | Action |
| --- | --- |
| <kbd>→</kbd> | Opens a closed parent row. Otherwise, moves to the first cell. |
| <kbd>←</kbd> | Closes an open row. Otherwise, focus stays. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous row |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves `pageSize` rows |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last row |
| <kbd>Enter</kbd> | Opens or closes a parent row |
| <kbd>Tab</kbd> | Moves through the widgets in the row, then out |

On a focused cell:

| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous cell. <kbd>←</kbd> on the first cell moves to the row. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Cell below / above, header row included |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves `pageSize` rows in the column |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last cell in the row |
| <kbd>Ctrl</kbd>+<kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>End</kbd> | Cell in the first / last row of the column |

As in [`Grid`](./grid.md), focus lands on a cell, or on the one widget inside
it, and a text field in a cell keeps its own arrow keys. The pattern's
optional selection keys are not included.

## API

### `<TreeGrid>`

Renders a `<table>` by default, with `role="treegrid"`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'table'` | Element or component to render as. |
| `defaultExpanded` | `V[]` | `[]` | Values of the rows that start open. |
| `expanded` | `V[]` | none | Values of the open rows, controlled. |
| `onExpandedChange` | `(expanded: V[]) => void` | none | Called with the new open rows. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares row values. |
| `pageSize` | `number` | `5` | Rows moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>. |
| `children` | `JSX.Element` \| `(state: TreeGridStateProperties<V>) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<TreeGridRow>`

Renders a `<tr>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `V` | none | Identifies the row. Required. |
| `level` | `number` | `1` | The depth of the row. |
| `expandable` | `boolean` | `false` | Marks a parent row. |
| `children` | `JSX.Element` \| `(row: TreeGridRowProperties) => JSX.Element` | none | Cells, or a render prop. |

Rendered attributes: `role="row"`, `aria-level`, `aria-expanded` on parent
rows, `tabindex`.

### Cells and header rows

`TreeGridCell`, `TreeGridColumnHeader`, `TreeGridRowHeader` and
`TreeGridHeaderRow` are the [`Grid`](./grid.md) parts. They render `<td>`,
`<th>`, `<th>` and `<tr>` with the matching roles.
