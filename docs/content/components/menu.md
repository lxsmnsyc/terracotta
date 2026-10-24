# Menu

An [ARIA menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) is a list of
actions. Arrow keys move through it, and typing jumps to an item.

:::hero menu/as-dropdown
:::

`Menu` is stateless. It tracks no selection, because menu items *do* things
instead of representing values. Wire an `onClick` to each item.

`Menu` is a popup. It renders the list only. Pair it with
[`Popover`](./popover.md) for a dropdown, or
[`ContextMenu`](./context-menu.md) for a right-click menu. For a list of
actions that stays on screen, use `Menubar`.

```tsx
import { Menu, Menubar, MenuItem, MenuChild } from 'terracotta/menu';
```

## Anatomy

```tsx
<Menu>       {/* role="menu", arrow keys and type-ahead */}
  <MenuItem/>{/* role="menuitem" */}
</Menu>

<Menubar>    {/* role="menubar", one tab stop */}
  <MenuItem/>
</Menubar>
```

## Examples

> `Menu` and `Menubar` render a `<div>` unless you pass `as`. `MenuItem`
> renders an `<li>`, so pass `as="ul"` to keep the markup valid.

### As a dropdown

Put the `Menu` in a `PopoverPanel`, and pass `aria-haspopup="menu"` to the
`PopoverButton`. The popover then follows the
[menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/):

- Opening it focuses the first item.
- <kbd>↓</kbd> on the button opens it on the first item, and <kbd>↑</kbd> on
  the last.
- <kbd>Tab</kbd>, <kbd>Escape</kbd> and activating an item close it. Focus
  returns to the button.

:::demo menu/as-dropdown
:::

### Always on screen

A `Menu` is never in the tab sequence, so one that stays on screen cannot be
reached from the keyboard. Use `Menubar` instead. It takes the same
`MenuItem`s, and is one stop in the tab sequence. <kbd>Tab</kbd> moves focus
to the item that last had it, or to the first enabled item.

:::demo menu/basic
:::

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
| `MenuItem` | `tc-owner` | Always. Ties the item to its menu's keyboard navigation |
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

Handled on the `Menu` or `Menubar` root, across its `MenuItem` descendants:

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>→</kbd> | Next item, wrapping around. A `Menubar` takes only the key that matches its orientation. |
| <kbd>↑</kbd> / <kbd>←</kbd> | Previous item, wrapping around. A `Menubar` takes only the key that matches its orientation. |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last item |
| Printable characters | Type-ahead: jumps to the next item whose text starts with what you typed, wrapping around. Keystrokes are collected for 250 ms, so typing several letters quickly matches a longer prefix. Keys pressed with <kbd>Ctrl</kbd>, <kbd>Meta</kbd> or <kbd>Alt</kbd> are ignored. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Activates the focused item; the root suppresses the browser's default scroll or submit |

Both the arrow keys and type-ahead skip disabled items. A disabled item cannot
be activated by a click or a key.

`Menu` has no open state, so it cannot close itself. Inside a
`ContextMenuPanel` or a `PopoverPanel`, activating an item closes the panel.

### Getting focus into the menu

Every item in a `Menu` carries `tabindex="-1"`, and the root has no `tabindex`
of its own. That matches the [WAI-ARIA menu
pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), which says
<kbd>Tab</kbd> does not move focus into a menu, and that "authors are
responsible for ensuring focus moves to an item inside of a menu when the menu
opens."

`PopoverPanel` and `ContextMenuPanel` do this for you. They focus the first
enabled menu item when they open.

In a `Menubar`, exactly one item has `tabindex="0"`, as the pattern requires
for a menubar. A `Menu` nested inside a `Menubar` keeps its own items at
`tabindex="-1"`.

## API

### `<Menu>`

The container. It holds no state, so it has no value or change props.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` | none | The items. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes: `role="menu"`, a generated `id`, `tc-menu`.

### `<Menubar>`

A container for actions that stay on screen. It is one stop in the tab
sequence.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `horizontal` | `boolean` | `true` | Whether <kbd>←</kbd>/<kbd>→</kbd> or <kbd>↑</kbd>/<kbd>↓</kbd> move between items. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` | none | The items. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. Give it an `aria-label` or `aria-labelledby`. |

Rendered attributes: `role="menubar"`, `aria-orientation`, a generated `id`,
`tc-menubar`.

### `<MenuItem>`

A [`Button`](./button.md) with `role="menuitem"`. Renders an `<li>` by default.
In a `Menu` it sits outside the tab order (`tabindex="-1"`), as the ARIA menu
pattern requires. In a `Menubar`, one item has `tabindex="0"`. See [getting
focus into the menu](#getting-focus-into-the-menu).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'li'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables the item and removes it from keyboard navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: { disabled: () => boolean }) => JSX.Element` | none | Label, or a render prop receiving the item's disabled state. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. This is where `onClick` goes. |

`MenuItem` throws if rendered outside a `<Menu>` or `<Menubar>`.

### `<MenuChild>`

Exposes a disabled flag as a render prop. It renders nothing of its own and does
not read the parent `MenuItem`, so pass it the same value.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | The value reported to the render prop. |
| `children` | `JSX.Element` \| `(state: { disabled: () => boolean }) => JSX.Element` | none | Contents, or a render prop. |
