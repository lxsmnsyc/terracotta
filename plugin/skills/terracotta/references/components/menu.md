<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Menu

An [ARIA menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) is a list of
actions. Arrow keys move through it, and typing jumps to an item.

`Menu` is stateless. It tracks no selection, because menu items *do* things
instead of representing values. Wire an `onClick` to each item.

`Menu` renders the list only. Pair it with [`Popover`](./popover.md) for a
dropdown, or [`ContextMenu`](./context-menu.md) for a right-click menu.

```tsx
import { Menu, MenuItem, MenuChild } from 'terracotta/menu';
```

## Anatomy

```tsx
<Menu>       {/* role="menu", arrow keys and type-ahead */}
  <MenuItem/>{/* role="menuitem" */}
</Menu>
```

## Examples

### Standalone

```tsx
<Menu as="ul" class="menu">
  <MenuItem class="menu-item" onClick={() => duplicate()}>Duplicate</MenuItem>
  <MenuItem class="menu-item" onClick={() => archive()}>Archive</MenuItem>
  <MenuItem class="menu-item" disabled onClick={() => remove()}>Delete</MenuItem>
</Menu>
```

```css
.menu {
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  inline-size: 14rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
}

.menu-item {
  border-radius: 0.375rem;
  padding: 0.4375rem 0.625rem;
  cursor: pointer;
}

.menu-item:hover { background: #f4f4f5; }

.menu-item:focus-visible {
  outline: none;
  background: #eff6ff;
}

.menu-item[tc-disabled] {
  color: #a1a1aa;
  cursor: not-allowed;
}

.menu-item[tc-disabled]:hover { background: none; }
```

> `Menu` renders a `<div>` unless you pass `as`. `MenuItem` renders an `<li>`,
> so pass `as="ul"` as above to keep the markup valid.

### As a dropdown

```tsx
<Popover class="popover" defaultOpen={false}>
  <PopoverButton class="popover-button">Actions</PopoverButton>
  <PopoverPanel class="popover-panel popover-panel-flush">
    <Menu as="ul" class="menu">
      <MenuItem class="menu-item" onClick={rename}>Rename</MenuItem>
      <MenuItem class="menu-item" onClick={duplicate}>Duplicate</MenuItem>
      <MenuItem class="menu-item" onClick={remove}>Delete</MenuItem>
    </Menu>
  </PopoverPanel>
</Popover>
```

### With separators and section labels

The arrow keys skip non-focusable elements, so these need no special handling:

```tsx
<Menu as="ul" class="menu">
  <li class="menu-section" role="presentation">Edit</li>
  <MenuItem class="menu-item" onClick={cut}>Cut</MenuItem>
  <MenuItem class="menu-item" onClick={copy}>Copy</MenuItem>
  <li class="menu-separator" role="separator" />
  <li class="menu-section" role="presentation">Danger</li>
  <MenuItem class="menu-item menu-item-danger" onClick={remove}>Delete</MenuItem>
</Menu>
```

```css
.menu-section {
  padding: 0.375rem 0.625rem 0.1875rem;
  color: #71717a;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.menu-separator {
  block-size: 1px;
  margin: 0.25rem 0.375rem;
  background: #e4e4e7;
}

.menu-item-danger { color: #b91c1c; }
```

### Items with icons and shortcut hints

```tsx
<MenuItem class="menu-item menu-item-rich" onClick={duplicate}>
  <span class="menu-icon" aria-hidden="true">⧉</span>
  <span class="menu-label">Duplicate</span>
  <span class="menu-shortcut" aria-hidden="true">⌘D</span>
</MenuItem>
```

```css
.menu-item-rich {
  display: grid;
  grid-template-columns: 1rem 1fr auto;
  align-items: center;
  gap: 0.625rem;
}

.menu-shortcut { color: #a1a1aa; font-size: 0.8125rem; }
```

### Reading the disabled state inside an item

```tsx
<MenuItem class="menu-item" disabled={!canDelete()}>
  {({ disabled }) => (
    <>
      <span>Delete</span>
      <Show when={disabled()}>
        <span class="menu-hint">Not available on shared files</span>
      </Show>
    </>
  )}
</MenuItem>
```

`MenuChild` is the same render prop as a standalone component. Use it when the
state is needed deeper in the tree:

```tsx
<MenuItem class="menu-item" disabled={!canDelete()}>
  <MenuChild disabled={!canDelete()}>
    {({ disabled }) => <TrashIcon muted={disabled()} />}
  </MenuChild>
  Delete
</MenuItem>
```

`MenuChild` takes its own `disabled` prop. It does not read the parent item's,
so pass the same value to both.

### Anchoring rich items to the focus ring

Items sit outside the tab order, so `:focus` on a `MenuItem` means "the arrow
keys are on this item":

```css
.menu-item:focus {
  outline: none;
  background: #eff6ff;
  color: #1d4ed8;
}
```

## State attributes

`Menu` is stateless, so only the item carries dynamic state.

| Element | Attribute | Present when |
| --- | --- | --- |
| `Menu` | `tc-menu` | Always |
| `MenuItem` | `tc-menu-item`, `tc-button` | Always |
| `MenuItem` | `tc-owner` | Always — ties the item to its menu's keyboard navigation |
| `MenuItem` | `tc-disabled` | The item is disabled |

`tc-disabled` removes an item from arrow-key navigation and type-ahead, so it is
behaviour as well as styling. There is no `tc-active` here. A menu moves real
DOM focus, so use `:focus` for the highlighted item.

### Styling

```css
[tc-menu] {
  margin: 0;
  padding: 0.25rem;
  list-style: none;
}

[tc-menu-item] {
  border-radius: 0.375rem;
  padding: 0.4375rem 0.625rem;
  cursor: pointer;
}

/* Arrow keys move focus, so :focus is the highlight */
[tc-menu-item]:focus { outline: none; background: #eff6ff; }

[tc-menu-item][tc-disabled] {
  color: #a1a1aa;
  cursor: not-allowed;
}
```

### Reading the state in code

`Menu` exposes no state object. `MenuItem` exposes only its own disabled flag,
through its render prop or `<MenuChild>`:

| Member | Type | Description |
| --- | --- | --- |
| `disabled()` | `boolean` | Whether the item is disabled. |

## Keyboard

Handled on the `Menu` root, across its `MenuItem` descendants:

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>→</kbd> | Next item, wrapping around |
| <kbd>↑</kbd> / <kbd>←</kbd> | Previous item, wrapping around |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last item |
| Printable characters | Type-ahead: jumps to the first item whose text starts with what you typed. Keystrokes are collected for 250 ms, so typing several letters quickly matches a longer prefix. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused item; the root suppresses the browser's default scroll or submit |

Both the arrow keys and type-ahead skip disabled items.

### Getting focus into the menu

Every item carries `tabindex="-1"`, and the `Menu` root has no `tabindex` of
its own. That matches the [WAI-ARIA menu
pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), which puts every
item at `tabindex="-1"` outside a menubar, and says <kbd>Tab</kbd> does not
move focus into a menu at all. The spec puts the responsibility on you:
"authors are responsible for ensuring focus moves to an item inside of a menu
when the menu opens."

Terracotta does not do that for you, and neither do the panels. `PopoverPanel`
and `ContextMenuPanel` focus their first *tabbable* child on open, and a menu
item is deliberately not tabbable, so a panel whose only content is a `Menu`
leaves focus where it was. Move focus yourself when the menu appears:

```tsx
<PopoverPanel
  ref={panel => {
    // Items are focusable programmatically even at tabindex="-1".
    queueMicrotask(() => panel.querySelector<HTMLElement>('[role="menuitem"]')?.focus());
  }}
>
  <Menu as="ul">…</Menu>
</PopoverPanel>
```

An always-visible `Menu` that no popup owns falls outside the pattern
entirely — the spec covers menubars and menus opened from a button. Give the
user a real control to move focus from, or reach for a
[`Toolbar`](./toolbar.md), which is a single tab stop by design.

## API

### `<Menu>`

The container. It holds no state, so it has no value or change props.

> **Note:** the type default for `as` is `'ul'`, but the implementation falls
> back to a `<div>` when `as` is not given. Pass `as="ul"` explicitly to get a
> list element, which also matches the `<li>` that `MenuItem` renders.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` at runtime (typed as `'ul'`) | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | The items. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes: `role="menu"`, a generated `id`, `tc-menu`.

### `<MenuItem>`

A [`Button`](./button.md) with `role="menuitem"`. Renders an `<li>` by default.
It sits outside the tab order (`tabindex="-1"`), as the ARIA menu pattern
requires. That means the menu has no tab stop at all — see [getting focus into
the menu](#getting-focus-into-the-menu).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables the item and removes it from keyboard navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: { disabled: () => boolean }) => JSX.Element` | — | Label, or a render prop receiving the item's disabled state. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. This is where `onClick` goes. |

`MenuItem` throws if rendered outside a `<Menu>`.

### `<MenuChild>`

Exposes a disabled flag as a render prop. It renders nothing of its own and does
not read the parent `MenuItem`, so pass it the same value.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | The value reported to the render prop. |
| `children` | `JSX.Element` \| `(state: { disabled: () => boolean }) => JSX.Element` | — | Contents, or a render prop. |
