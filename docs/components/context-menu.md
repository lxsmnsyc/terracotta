# ContextMenu

A right-click menu. `ContextMenuBoundary` marks the region that responds to the
`contextmenu` event; opening it suppresses the browser's own menu and shows
`ContextMenuPanel` instead. The panel traps <kbd>Tab</kbd>, closes on
<kbd>Escape</kbd>, and closes on any click outside itself.

The panel is a dialog-style container rather than an ARIA menu, so you are free
to put whatever you want in it — including a [`Menu`](./menu.md) if you do want
menu semantics.

```tsx
import {
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuPanel,
  ContextMenuOverlay,
  DisclosureStateChild,
  useDisclosureState,
} from 'terracotta';
```

## Anatomy

```tsx
<ContextMenu>           {/* owns the open state */}
  <ContextMenuBoundary/>{/* right-clicking here opens the menu */}
  <ContextMenuOverlay/> {/* optional backdrop; closes on click */}
  <ContextMenuPanel/>   {/* the menu content */}
</ContextMenu>
```

## Examples

### Basic

```tsx
<ContextMenu class="contextmenu" defaultOpen={false}>
  <ContextMenuBoundary class="contextmenu-boundary">
    Right-click anywhere in this box
  </ContextMenuBoundary>

  <ContextMenuPanel class="contextmenu-panel">
    <button type="button" class="contextmenu-item">Cut</button>
    <button type="button" class="contextmenu-item">Copy</button>
    <button type="button" class="contextmenu-item">Paste</button>
  </ContextMenuPanel>
</ContextMenu>
```

```css
.contextmenu {
  position: relative;
}

.contextmenu-boundary {
  display: grid;
  place-items: center;
  block-size: 12rem;
  border: 1px dashed #a1a1aa;
  border-radius: 0.5rem;
  color: #71717a;
  user-select: none;
}

/* The boundary reflects whether its menu is open */
.contextmenu-boundary[tc-expanded] {
  border-style: solid;
  border-color: #2563eb;
}

.contextmenu-panel {
  position: absolute;
  inline-size: 12rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 0.25rem;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.15);
  z-index: 10;
}

.contextmenu-item {
  display: block;
  inline-size: 100%;
  border: none;
  border-radius: 0.25rem;
  background: none;
  padding: 0.375rem 0.625rem;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.contextmenu-item:hover,
.contextmenu-item:focus-visible {
  background: #f4f4f5;
  outline: none;
}
```

### With menu semantics

```tsx
<ContextMenu class="contextmenu" defaultOpen={false}>
  <ContextMenuBoundary class="contextmenu-boundary">…</ContextMenuBoundary>
  <ContextMenuPanel class="contextmenu-panel">
    <Menu as="ul" class="menu">
      <MenuItem class="menu-item" onClick={cut}>Cut</MenuItem>
      <MenuItem class="menu-item" onClick={copy}>Copy</MenuItem>
      <MenuItem class="menu-item" disabled>Paste</MenuItem>
    </Menu>
  </ContextMenuPanel>
</ContextMenu>
```

Arrow-key navigation and type-ahead come from `Menu`; the trap and dismissal come
from `ContextMenuPanel`.

### Positioning at the cursor

Terracotta gives you behaviour, not geometry. Record the pointer position on the
boundary and feed it to the panel:

```tsx
const [point, setPoint] = createSignal({ x: 0, y: 0 });

<ContextMenu class="contextmenu" defaultOpen={false}>
  <ContextMenuBoundary
    class="contextmenu-boundary"
    onContextMenu={(event: MouseEvent) => setPoint({ x: event.clientX, y: event.clientY })}
  >
    Right-click anywhere in this box
  </ContextMenuBoundary>

  <ContextMenuPanel
    class="contextmenu-panel contextmenu-panel-fixed"
    style={{ '--x': `${point().x}px`, '--y': `${point().y}px` }}
  >
    …
  </ContextMenuPanel>
</ContextMenu>
```

```css
.contextmenu-panel-fixed {
  position: fixed;
  inset-block-start: var(--y);
  inset-inline-start: var(--x);
}
```

Your `onContextMenu` is forwarded and runs alongside Terracotta's own listener,
which is what opens the menu.

### Controlled

```tsx
const [open, setOpen] = createSignal(false);

<ContextMenu class="contextmenu" isOpen={open()} onChange={setOpen}>
  …
</ContextMenu>
```

### Closing from inside

```tsx
<ContextMenu class="contextmenu" defaultOpen={false}>
  {({ close }) => (
    <>
      <ContextMenuBoundary class="contextmenu-boundary">…</ContextMenuBoundary>
      <ContextMenuPanel class="contextmenu-panel">
        <button type="button" class="contextmenu-item" onClick={() => { copy(); close(); }}>
          Copy
        </button>
      </ContextMenuPanel>
    </>
  )}
</ContextMenu>
```

### Per-row context menus in a list

Each row gets its own `ContextMenu`, so each has its own state:

```tsx
<ul class="file-list">
  <For each={files()}>
    {file => (
      <li>
        <ContextMenu class="contextmenu" defaultOpen={false}>
          <ContextMenuBoundary class="file-row">{file.name}</ContextMenuBoundary>
          <ContextMenuPanel class="contextmenu-panel">
            <button type="button" class="contextmenu-item" onClick={() => rename(file)}>
              Rename
            </button>
            <button type="button" class="contextmenu-item" onClick={() => remove(file)}>
              Delete
            </button>
          </ContextMenuPanel>
        </ContextMenu>
      </li>
    )}
  </For>
</ul>
```

```css
.file-row { padding: 0.5rem 0.75rem; border-radius: 0.375rem; }
.file-row[tc-expanded] { background: #eff6ff; }
```

### Letting the browser menu through

A disabled `ContextMenu` does not call `preventDefault()`, so the native menu
appears as usual:

```tsx
<ContextMenu class="contextmenu" defaultOpen={false} disabled={isReadOnly()}>
  …
</ContextMenu>
```

### With a transition

```tsx
<ContextMenu class="contextmenu" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <ContextMenuBoundary class="contextmenu-boundary">…</ContextMenuBoundary>
      <Transition
        show={isOpen()}
        enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
        leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
      >
        <ContextMenuPanel class="contextmenu-panel" unmount={false}>…</ContextMenuPanel>
      </Transition>
    </>
  )}
</ContextMenu>
```

```css
.pop-enter { transition: opacity 120ms ease-out, scale 120ms ease-out; }
.pop-leave { transition: opacity 80ms ease-in, scale 80ms ease-in; }
.pop-from  { opacity: 0; scale: 0.96; }
.pop-to    { opacity: 1; scale: 1; }
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `ContextMenu` | `tc-context-menu` | Always |
| `ContextMenu` | `tc-expanded` | The menu is open |
| `ContextMenu` | `tc-disabled` | The menu is disabled |
| `ContextMenuBoundary` | `tc-context-menu-boundary` | Always |
| `ContextMenuBoundary` | `tc-expanded`, `tc-disabled` | Mirrors the menu |
| `ContextMenuPanel` | `tc-context-menu-panel` | Always (whenever rendered) |
| `ContextMenuPanel` | `tc-expanded`, `tc-disabled` | Mirrors the menu |
| `ContextMenuOverlay` | `tc-context-menu-overlay` | Always |
| `ContextMenuOverlay` | `tc-expanded`, `tc-disabled` | Mirrors the menu |

The boundary also carries `aria-expanded`, and `aria-controls` pointing at the
panel while open.

### Styling

```css
/* Highlight the region whose menu is open */
[tc-context-menu-boundary][tc-expanded] {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* The overlay is always mounted — hide it while closed */
[tc-context-menu-overlay]:not([tc-expanded]) { display: none; }

/* With unmount={false} on the panel, you own its visibility */
[tc-context-menu-panel]:not([tc-expanded]) { display: none; }

[tc-context-menu-boundary][tc-disabled] { cursor: default; }
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the menu is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the menu is disabled. |

Available as the render-prop argument on `ContextMenu` and each of its parts,
through `<DisclosureStateChild>`, or with `useDisclosureState()` in any
descendant. Full reference in
[disclosure state](../states.md#disclosure-state).

## Behaviour and keyboard

| Key / event | Action |
| --- | --- |
| Right-click inside `ContextMenuBoundary` | Opens the menu and calls `preventDefault()` on the native event. A disabled menu does nothing and lets the browser menu through. |
| <kbd>Escape</kbd> | Closes the menu |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles focus within the panel |
| Click outside the panel | Closes the menu |

The panel focuses its first focusable child when it opens, and focus returns to
where it was on close.

## API

### `<ContextMenu>`

Owns the [disclosure state](../states.md#disclosure-state) and renders a `<div>`
by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | — | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks opening and closing, and lets the native menu through. |
| `onChange` | `(state: boolean) => void` | — | Called with the new state on every change. |
| `onOpen` | `() => void` | — | Called when it opens, before `onChange`. |
| `onClose` | `() => void` | — | Called when it closes, after `onChange`. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<ContextMenuBoundary>`

The region that listens for `contextmenu`. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | The region's content, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element, including your own `onContextMenu`. |

### `<ContextMenuPanel>`

The menu content, with the focus trap and outside-click handling. Renders a
`<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the panel behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `disabled` | `boolean` | `false` | Stops the panel's own key handling. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<ContextMenuOverlay>`

An optional backdrop that closes the menu when clicked. Renders a `<div>` by
default. **Not** conditionally mounted — hide it with CSS or wrap it in a
`<Show>`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Every descendant throws if rendered outside a `<ContextMenu>`.
