<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Tree

A hierarchical list, such as a file browser, following the
[ARIA tree view pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).
It is one stop in the tab sequence. The arrow keys move through the nodes on
screen, and open and close them.

```tsx
import { Tree, TreeGroup, TreeItem, TreeItemLabel } from 'terracotta/tree';
```

## Anatomy

```tsx
<Tree>              {/* role="tree", owns selection and expansion */}
  <TreeItem>        {/* role="treeitem" */}
    <TreeItemLabel/>{/* names the item */}
    <TreeGroup>     {/* role="group"; makes the item a parent */}
      <TreeItem/>
    </TreeGroup>
  </TreeItem>
</Tree>
```

## Examples

### Basic

### Parents and end nodes

An item with a `TreeGroup` is a parent node. It gets `aria-expanded`, and its
group is shown while it is expanded. An item without one is an end node, with
no `aria-expanded`, so it is not announced as a parent.

`TreeGroup` takes `unmount`, as [`Transition`](./transition.md) does. By
default a closed group is removed.

### Labels

Put the item's name in a `TreeItemLabel`. The item points `aria-labelledby` at
it, so the names of its children are not read as part of its own name.
Type-ahead matches this text.

### Selection

`value` and `defaultValue` work as on [`Listbox`](./listbox.md). Every item
needs a `value`.

- A single-select tree holds one value. Clicking a node, or pressing
  <kbd>Enter</kbd> or <kbd>Space</kbd> on it, selects it.
- `multiple` makes the tree hold an array, and sets
  `aria-multiselectable="true"`. <kbd>Enter</kbd> and <kbd>Space</kbd> toggle
  the focused node.
- Selection does not follow focus. The arrow keys only move focus.
- A `disabled` item stays focusable but cannot be selected.

Pass `by` when the values are objects.

### Expansion

`defaultExpanded` lists the values of the items that start open. Pass
`expanded` and `onExpandedChange` to control it.

```tsx
const [open, setOpen] = createSignal<string[]>(['docs']);

<Tree aria-label="Files" defaultValue={undefined} expanded={open()} onExpandedChange={setOpen}>
  …
</Tree>
```

### Drawing the rows

`TreeItem` takes a render prop with the item's state. Use it for the
indentation and an open or closed marker:

```tsx
<TreeItem value={node.id}>
  {item => (
    <>
      <span style={{ 'padding-inline-start': `${item.level() - 1}rem` }}>
        {item.isParent() ? (item.isExpanded() ? '▾' : '▸') : ''}
        <TreeItemLabel>{node.name}</TreeItemLabel>
      </span>
      {node.children && <TreeGroup>…</TreeGroup>}
    </>
  )}
</TreeItem>
```

Style the row inside the item, not the item itself. The item contains its
group, so a background on the item would cover its children too.

### Naming the tree

Give the tree an `aria-label`, or point `aria-labelledby` at a visible heading.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Tree` | `tc-tree` | Always |
| `TreeItem` | `tc-tree-item`, `tc-owner` | Always |
| `TreeItem` | `tc-level` | Always, set to the item's depth from 1 |
| `TreeItem` | `tc-selected` | The item is selected |
| `TreeItem`, `TreeGroup` | `tc-expanded` | The item is expanded |
| `TreeItem` | `tc-disabled` | The item is disabled |
| `TreeItemLabel` | `tc-tree-item-label` | Always |
| `TreeGroup` | `tc-tree-group` | Always |

### Reading the item state

| Member | Type | Description |
| --- | --- | --- |
| `level()` | `number` | The depth of the item, from 1 for a root node. |
| `isSelected()` | `boolean` | Whether the item is selected. |
| `isExpanded()` | `boolean` | Whether the item is open. |
| `isParent()` | `boolean` | Whether the item has a `TreeGroup`. |
| `disabled()` | `boolean` | Whether the item is disabled. |
| `toggle()` | `() => void` | Opens or closes the item. |
| `select()` | `() => void` | Selects the item, or toggles it in a multi-select tree. |

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous node on screen |
| <kbd>→</kbd> | Opens a closed node. On an open node, moves to its first child. |
| <kbd>←</kbd> | Closes an open node. Otherwise, moves to its parent. |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last node on screen |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the node, or toggles it in a multi-select tree |
| Printable characters | Type-ahead: moves to the next node whose label starts with what you typed |
| <kbd>Tab</kbd> | Moves into the tree, on the last focused node, else the first selected node, else the first node |

The pattern's optional keys are not included: <kbd>*</kbd> to open every
sibling, and <kbd>Shift</kbd> and <kbd>Ctrl</kbd> combinations for selecting
ranges.

## API

### `<Tree>`

Renders a `<ul>` by default. Pass exactly one of `defaultValue` or `value`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'ul'` | Element or component to render as. |
| `multiple` | `boolean` | `false` | Holds an array of selected values. |
| `defaultValue` | `V \| V[] \| undefined` | none | Initial selection, uncontrolled. |
| `value` | `V \| V[] \| undefined` | none | Current selection, controlled. |
| `onChange` | `(value) => void` | none | Called with the new selection. |
| `toggleable` | `boolean` | `false`, `true` with `multiple` | Whether selecting a selected node deselects it. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. |
| `disabled` | `boolean` | `false` | Blocks selection. |
| `defaultExpanded` | `V[]` | `[]` | Values of the items that start open. |
| `expanded` | `V[]` | none | Values of the open items, controlled. |
| `onExpandedChange` | `(expanded: V[]) => void` | none | Called with the new open items. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<TreeItem>`

Renders an `<li>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `V` | none | Identifies the item. Required. |
| `disabled` | `boolean` | `false` | Keeps the item from being selected. |
| `children` | `JSX.Element` \| `(item: TreeItemProperties) => JSX.Element` | none | Contents, or a render prop. |

Rendered attributes: `role="treeitem"`, `tabindex` (`0` on one item, `-1` on
the rest), `aria-level`, `aria-selected`, `aria-expanded` on parent nodes,
`aria-labelledby` while a `TreeItemLabel` is mounted, `aria-disabled`.

### `<TreeItemLabel>`

Renders a `<span>` by default.

### `<TreeGroup>`

Renders a `<ul>` by default, with `role="group"`. It takes `unmount`.

Every part takes `as` and forwards the rest of its props.
