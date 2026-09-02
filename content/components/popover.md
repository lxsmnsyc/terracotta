# Popover

A [disclosure-style popover](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
is a button that opens a floating panel. It is not modal, unlike
[`Dialog`](./dialog.md), so the page behind it stays usable. The panel still
traps <kbd>Tab</kbd> while open, closes on <kbd>Escape</kbd>, and closes when
focus leaves it.

:::hero popover/basic
:::

```tsx
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverOverlay,
} from 'terracotta/popover';
import { DisclosureStateChild, useDisclosureState } from 'terracotta/states';
```

## Anatomy

```tsx
<Popover>          {/* owns the open state */}
  <PopoverButton/> {/* toggles it, anchors the panel */}
  <PopoverOverlay/>{/* optional backdrop; closes on click */}
  <PopoverPanel/>  {/* the floating content */}
</Popover>
```

## Examples

### Uncontrolled

:::demo popover/basic
:::

### Controlled

```tsx
const [open, setOpen] = createSignal(false);

<Popover class="popover" isOpen={open()} onChange={setOpen}>
  <PopoverButton class="popover-button">Account</PopoverButton>
  <PopoverPanel class="popover-panel">…</PopoverPanel>
</Popover>
```

### Closing from inside the panel

:::demo popover/close-from-inside
:::

### With a backdrop

`PopoverOverlay` closes the popover when clicked. It gives you click-outside
behaviour with a visible scrim. It is not conditionally mounted, so render it
inside the render prop when you want it only while open:

```tsx
<Popover class="popover" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <PopoverButton class="popover-button">Account</PopoverButton>
      <Show when={isOpen()}>
        <PopoverOverlay class="popover-overlay" />
      </Show>
      <PopoverPanel class="popover-panel">…</PopoverPanel>
    </>
  )}
</Popover>
```

```css
.popover-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.1);
}
```

### As a dropdown menu

Pair it with [`Menu`](./menu.md) when the panel contains actions:

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

```css
.popover-panel-flush { padding: 0.25rem; }
```

### Positioning

Terracotta gives you behaviour, not geometry. Anchor the panel with CSS as
above, or use the CSS anchor positioning API where it is supported:

```css
.popover-button { anchor-name: --popover-anchor; }

.popover-panel {
  position: absolute;
  position-anchor: --popover-anchor;
  inset-block-start: anchor(bottom);
  inset-inline-start: anchor(start);
  margin-block-start: 0.25rem;
}
```

For a full-featured solution, pass a `ref` to `PopoverButton` and
`PopoverPanel`, then hand both elements to a positioning library.

### Aligning to the end of the button

```css
.popover-panel-end {
  inset-inline-start: auto;
  inset-inline-end: 0;
}
```

### With a transition

```tsx
<Popover class="popover" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <PopoverButton class="popover-button">Menu</PopoverButton>
      <Transition
        show={isOpen()}
        enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
        leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
      >
        <PopoverPanel class="popover-panel" unmount={false}>…</PopoverPanel>
      </Transition>
    </>
  )}
</Popover>
```

```css
.pop-enter { transition: opacity 150ms ease-out, scale 150ms ease-out; }
.pop-leave { transition: opacity 100ms ease-in, scale 100ms ease-in; }
.pop-from  { opacity: 0; scale: 0.95; }
.pop-to    { opacity: 1; scale: 1; }
```

### Disabled

```tsx
<Popover class="popover" defaultOpen={false} disabled={!hasFilters()}>
  <PopoverButton class="popover-button">Filters</PopoverButton>
  <PopoverPanel class="popover-panel">…</PopoverPanel>
</Popover>
```

```css
.popover-button[tc-disabled] { opacity: 0.5; cursor: not-allowed; }
```

### Reading the state from a nested component

```tsx
function CloseButton(): JSX.Element {
  const state = useDisclosureState();
  return <button type="button" onClick={() => state.close()}>Done</button>;
}
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Popover` | `tc-popover` | Always |
| `Popover` | `tc-expanded` | The popover is open |
| `Popover` | `tc-disabled` | The popover is disabled |
| `PopoverButton` | `tc-popover-button`, `tc-button` | Always |
| `PopoverButton` | `tc-expanded` | The popover is open |
| `PopoverButton` | `tc-disabled` | The button or the popover is disabled |
| `PopoverPanel` | `tc-popover-panel` | Always (whenever rendered) |
| `PopoverPanel` | `tc-expanded`, `tc-disabled` | Mirrors the popover |
| `PopoverOverlay` | `tc-popover-overlay` | Always |
| `PopoverOverlay` | `tc-expanded`, `tc-disabled` | Mirrors the popover |

The button also carries `aria-expanded`, and `aria-controls` pointing at the
panel while open.

### Styling

```css
/* Root-level state cascades to everything inside */
[tc-popover][tc-expanded] .popover-label { color: #1d4ed8; }

/* Rotate a caret on the button */
[tc-popover-button]::after {
  content: "▾";
  margin-inline-start: 0.375rem;
  display: inline-block;
  transition: rotate 150ms ease;
}
[tc-popover-button][tc-expanded]::after { rotate: 180deg; }

/* The overlay is always mounted — hide it while closed */
[tc-popover-overlay]:not([tc-expanded]) { display: none; }

/* With unmount={false} on the panel, you own its visibility */
[tc-popover-panel]:not([tc-expanded]) { display: none; }
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the popover is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the popover is disabled. |

You can reach this state as the render-prop argument on `Popover` and each of
its parts, through `<DisclosureStateChild>`, or with `useDisclosureState()` in
any descendant. Full reference in
[disclosure state](../states.md#disclosure-state).

## Behaviour and keyboard

| Key / event | Action |
| --- | --- |
| Click on `PopoverButton` | Toggles the popover |
| <kbd>Enter</kbd> / <kbd>Space</kbd> on the button | Same |
| <kbd>Escape</kbd> | Closes it |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles focus within the panel |
| Focus leaves the panel | Closes it — unless the pointer is hovering the button, so a click on the button reads as a toggle rather than a close-then-reopen |

The panel focuses its first focusable element when it opens. Focus returns to
where it was when the popover closes.

## API

### `<Popover>`

Owns the [disclosure state](../states.md#disclosure-state) and renders a `<div>`
by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | — | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks opening and closing. |
| `onChange` | `(state: boolean) => void` | — | Called with the new state on every change. |
| `onOpen` | `() => void` | — | Called when it opens, before `onChange`. |
| `onClose` | `() => void` | — | Called when it closes, after `onChange`. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<PopoverButton>`

A [`Button`](./button.md) that toggles the popover. Renders a `<button>` by
default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables this button. It is also disabled when the `Popover` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<PopoverPanel>`

The floating content, with the focus trap. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the panel behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<PopoverOverlay>`

An optional backdrop that closes the popover when clicked. Renders a `<div>` by
default. It is **not** conditionally mounted, so hide it with CSS or wrap it in
a `<Show>`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Every descendant throws if rendered outside a `<Popover>`.
