<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Grid

A two-dimensional set of cells, such as a data table the user moves through
cell by cell, following the
[ARIA grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/). It is one
stop in the tab sequence, and the arrow keys move between cells.

A plain `<table>` is easier to use when the user only reads it. Reach for a
grid when the cells are interactive, or when the table is large enough that
moving cell by cell helps.

```tsx
import {
  Grid,
  GridBody,
  GridCell,
  GridColumnHeader,
  GridFoot,
  GridHead,
  GridRow,
  GridRowHeader,
} from 'terracotta/grid';
```

## Anatomy

```tsx
<Grid>                    {/* <table role="grid">, the tab stop */}
  <GridHead>              {/* <thead role="rowgroup"> */}
    <GridRow>             {/* <tr role="row"> */}
      <GridColumnHeader/> {/* <th role="columnheader"> */}
    </GridRow>
  </GridHead>
  <GridBody>              {/* <tbody role="rowgroup"> */}
    <GridRow>
      <GridRowHeader/>    {/* <th role="rowheader"> */}
      <GridCell/>         {/* <td role="gridcell"> */}
    </GridRow>
  </GridBody>
  <GridFoot/>             {/* optional; <tfoot role="rowgroup"> */}
</Grid>
```

The parts render table elements by default, so the grid lays out its rows and
columns with no CSS. Rows can also sit directly in the `Grid`, without a group.

## Examples

### Basic

### What a cell should hold

The pattern names two cell designs that work best, and the grid supports both:

- A cell with text, or a single image. Focus lands on the cell.
- A cell with one widget that does not need the arrow keys, such as a link, a
  button, a checkbox or a switch. Focus lands on the widget, so screen readers
  announce it as a widget.

A cell with several widgets, or with a text field, takes focus itself. The
arrow keys are left to a text field, select or editable content inside a
cell, so its caret still moves. Entering and leaving a cell with
<kbd>Enter</kbd> and <kbd>F2</kbd> is not included.

### Naming and sorting

Name the grid with `aria-label` or `aria-labelledby`. Pass `aria-sort` on the
header of a sorted column, as the demo does.

### Layout grids

`wrap` lets the arrow keys wrap from the end of a row to the next row, and
from the bottom of a column to the next column. Use it for a layout grid, such
as a list of recipients that wraps across lines. Do not use it for data, where
wrapping is disorienting.

### Other elements

Every part takes `as`, so a grid can be built from `div`s. The roles are set
on every part, so this works the same, though the layout is then yours to
write:

```tsx
<Grid as="div" aria-label="Recipients" wrap>
  <GridRow as="div">
    <GridCell as="div"><a href="/ada">Ada</a></GridCell>
  </GridRow>
</Grid>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Grid` | `tc-grid` | Always |
| `GridHead`, `GridBody`, `GridFoot` | `tc-grid-head`, `tc-grid-body`, `tc-grid-foot` | Always |
| `GridRow` | `tc-grid-row` | Always |
| `GridCell` | `tc-grid-cell` | Always |
| `GridColumnHeader` | `tc-grid-column-header` | Always |
| `GridRowHeader` | `tc-grid-row-header` | Always |

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous cell in the row. Stops at the edge, or wraps with `wrap`. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Cell below / above. Stops at the edge, or wraps with `wrap`. |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves `pageSize` rows down / up |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last cell in the row |
| <kbd>Ctrl</kbd>+<kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>End</kbd> | First cell of the grid / last cell of the grid |
| <kbd>Tab</kbd> | Moves into the grid, on the cell that last had focus, else the first cell |

The pattern's optional selection keys are not included. Set `aria-selected` on
cells or rows yourself if the grid selects.

## API

### `<Grid>`

Renders a `<table>` by default, with `role="grid"`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'table'` | Element or component to render as. |
| `wrap` | `boolean` | `false` | Lets the arrow keys wrap, for a layout grid. |
| `pageSize` | `number` | `5` | Rows moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

The grid sets `tabindex` on the cells, and on the widgets inside them, to keep
one tab stop. A widget's own `tabindex` is put back when it leaves the grid.

### Row groups, rows and cells

| Component | Renders | Role |
| --- | --- | --- |
| `<GridHead>` | `<thead>` | `rowgroup` |
| `<GridBody>` | `<tbody>` | `rowgroup` |
| `<GridFoot>` | `<tfoot>` | `rowgroup` |
| `<GridRow>` | `<tr>` | `row` |
| `<GridCell>` | `<td>` | `gridcell` |
| `<GridColumnHeader>` | `<th>` | `columnheader` |
| `<GridRowHeader>` | `<th>` | `rowheader` |

Each takes `as` and forwards the rest of its props.
