<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Toolbar

A [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) is a container of
related controls that acts as a single tab stop. <kbd>Tab</kbd> enters the
toolbar once, and the arrow keys move between the controls inside it.

Most Terracotta composites navigate a specific child component. `Toolbar`
navigates *any* focusable descendant, so you can drop buttons, links, inputs and
`<select>` elements into it directly.

```tsx
import { Toolbar } from 'terracotta/toolbar';
```

## Anatomy

```tsx
<Toolbar> {/* role="toolbar", one tab stop, arrow-key navigation */}
  {/* any focusable controls */}
</Toolbar>
```

## Examples

### Horizontal (default)

The orientation is published as `aria-orientation`. One CSS rule then keeps the
layout and the semantics in step.

### Vertical

```tsx
<Toolbar class="toolbar" horizontal={false} aria-label="Tools">
  <button type="button" class="toolbar-button">Select</button>
  <button type="button" class="toolbar-button">Draw</button>
  <button type="button" class="toolbar-button">Erase</button>
</Toolbar>
```

### With Terracotta controls

`Toggle` is a natural fit. Its `tc-pressed` attribute gives you the active state
for free:

### With separators and groups

The arrow keys skip non-focusable elements, so separators need no special
handling:

```tsx
<Toolbar class="toolbar" aria-label="Editor">
  <button type="button" class="toolbar-button">Undo</button>
  <button type="button" class="toolbar-button">Redo</button>
  <span class="toolbar-separator" role="separator" aria-orientation="vertical" />
  <button type="button" class="toolbar-button">Cut</button>
  <button type="button" class="toolbar-button">Copy</button>
</Toolbar>
```

```css
.toolbar-separator {
  inline-size: 1px;
  align-self: stretch;
  margin-inline: 0.25rem;
  background: #d4d4d8;
}
```

### Mixed control types

```tsx
<Toolbar class="toolbar" aria-label="View">
  <button type="button" class="toolbar-button">Zoom in</button>
  <button type="button" class="toolbar-button">Zoom out</button>
  <select class="toolbar-select">
    <option>100%</option>
    <option>150%</option>
  </select>
  <a class="toolbar-button" href="/help">Help</a>
</Toolbar>
```

### Disabled controls

A control disabled the native way, with `disabled` on a `<button>`, drops out of
the focusable set on its own. Navigation skips a Terracotta control marked with
`tc-disabled` for the same reason.

```tsx
<Toolbar class="toolbar" aria-label="Editor">
  <button type="button" class="toolbar-button">Cut</button>
  <button type="button" class="toolbar-button" disabled>Paste</button>
</Toolbar>
```

```css
.toolbar-button:disabled,
.toolbar-button[tc-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
```

## State attributes

`Toolbar` holds no state of its own. The controls inside it do.

| Element | Attribute | Present when |
| --- | --- | --- |
| `Toolbar` | `tc-toolbar` | Always |

Orientation uses the standard `aria-orientation` attribute instead of a `tc-`
one, because it is a genuine ARIA property.

### Styling

```css
[tc-toolbar] {
  display: flex;
  gap: 0.25rem;
}

[tc-toolbar][aria-orientation="vertical"] {
  flex-direction: column;
}

/* The toolbar itself is focusable; do not double up the focus ring
   when focus has already moved to a control inside it. */
[tc-toolbar]:focus { outline: none; }
[tc-toolbar]:focus-visible { outline: 2px solid #2563eb; }
```

### Reading the state in code

`Toolbar` exposes no state object. Read the state of the controls it contains
instead, such as [`Toggle`](./toggle.md)'s `pressed()`.

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous control, when horizontal |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous control, when vertical |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last control |
| <kbd>Tab</kbd> | Enters or leaves the toolbar, which is a single tab stop |

Arrow navigation does not wrap around the ends. Focusing the toolbar itself
restores the control that was focused last, or the first control if there is
none. Returning to a toolbar puts you back where you left off.

## API

### `<Toolbar>`

Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `horizontal` | `boolean` | `true` | Orientation. Decides which arrow keys navigate and what `aria-orientation` reports. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` | none | The controls. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Give the toolbar an accessible name with `aria-label` or `aria-labelledby`. Both
are forwarded like any other prop.

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"toolbar"` |
| `tabindex` | `0` |
| `aria-orientation` | `"horizontal"` or `"vertical"` |
| `tc-toolbar` | `""` |
