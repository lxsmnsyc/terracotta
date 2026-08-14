# Dialog

A [modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). While
open, `DialogPanel` traps <kbd>Tab</kbd> inside itself, focuses its first
focusable element, and closes on <kbd>Escape</kbd>. The dialog also remembers
which element had focus before it opened and restores it on close.

For a dialog that confirms a consequential action, use
[`AlertDialog`](./alert-dialog.md), which is identical apart from
`role="alertdialog"`.

```tsx
import {
  Dialog,
  DialogPanel,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  DisclosureStateChild,
  useDisclosureState,
} from 'terracotta';
```

## Anatomy

```tsx
<Dialog>                 {/* role="dialog" aria-modal, owns open state */}
  <DialogOverlay/>       {/* backdrop; closes on click */}
  <DialogPanel>          {/* focus trap */}
    <DialogTitle/>       {/* labels the dialog */}
    <DialogDescription/> {/* describes the dialog */}
  </DialogPanel>
</Dialog>
```

`DialogTitle` and `DialogDescription` are wired to the dialog's
`aria-labelledby` / `aria-describedby` automatically — you do not need to pass
ids.

## Examples

### Controlled

The usual shape: a button outside the dialog owns the signal.

```tsx
const [open, setOpen] = createSignal(false);

<>
  <button type="button" onClick={() => setOpen(true)}>Delete project</button>

  <Dialog class="dialog" isOpen={open()} onClose={() => setOpen(false)}>
    <DialogOverlay class="dialog-overlay" />
    <DialogPanel class="dialog-panel">
      <DialogTitle class="dialog-title">Delete project</DialogTitle>
      <DialogDescription class="dialog-description">
        This cannot be undone.
      </DialogDescription>
      <div class="dialog-actions">
        <button type="button" onClick={() => setOpen(false)}>Cancel</button>
        <button type="button" class="danger" onClick={() => remove()}>Delete</button>
      </div>
    </DialogPanel>
  </Dialog>
</>
```

```css
.dialog {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
}

.dialog-panel {
  position: relative;
  inline-size: min(28rem, 100%);
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgb(0 0 0 / 0.2);
}

.dialog-title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.dialog-description {
  margin: 0;
  color: #52525b;
}

.dialog-actions {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin-block-start: 1.5rem;
}

.danger { background: #dc2626; color: #ffffff; }
```

`onClose` fires for <kbd>Escape</kbd> and overlay clicks as well as your own
calls, so wiring it to `setOpen(false)` is enough.

### Uncontrolled, closing from inside

```tsx
<Dialog class="dialog" defaultOpen>
  <DialogOverlay class="dialog-overlay" />
  <DialogPanel class="dialog-panel">
    <DialogTitle class="dialog-title">Welcome</DialogTitle>
    {({ close }) => (
      <button type="button" onClick={close}>Got it</button>
    )}
  </DialogPanel>
</Dialog>
```

### Rendering into a portal

`Dialog` renders where you put it. Wrap it in Solid's `<Portal>` if it needs to
escape a stacking or overflow context:

```tsx
import { Portal } from 'solid-js/web';

<Portal>
  <Dialog class="dialog" isOpen={open()} onClose={() => setOpen(false)}>…</Dialog>
</Portal>
```

### With transitions

Set `unmount={false}` so the element survives long enough to animate out, and let
`Transition` own the mounting:

```tsx
<Transition show={open()}>
  <Dialog class="dialog" isOpen={open()} onClose={() => setOpen(false)} unmount={false}>
    <TransitionChild
      enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
      leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
    >
      <DialogOverlay class="dialog-overlay" />
    </TransitionChild>

    <TransitionChild
      enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
      leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
    >
      <DialogPanel class="dialog-panel">…</DialogPanel>
    </TransitionChild>
  </Dialog>
</Transition>
```

```css
.fade-enter { transition: opacity 200ms ease-out; }
.fade-leave { transition: opacity 150ms ease-in; }
.fade-from  { opacity: 0; }
.fade-to    { opacity: 1; }

.pop-enter { transition: opacity 200ms ease-out, scale 200ms ease-out; }
.pop-leave { transition: opacity 150ms ease-in, scale 150ms ease-in; }
.pop-from  { opacity: 0; scale: 0.95; }
.pop-to    { opacity: 1; scale: 1; }

@media (prefers-reduced-motion: reduce) {
  .fade-enter, .fade-leave, .pop-enter, .pop-leave { transition: none; }
}
```

### A drawer instead of a centred modal

The behaviour is identical; only the CSS changes:

```css
.dialog { position: fixed; inset: 0; z-index: 50; }

.drawer-panel {
  position: fixed;
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: min(24rem, 100%);
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: -8px 0 24px rgb(0 0 0 / 0.15);
}
```

### Choosing what receives focus

The panel focuses its first focusable element. Put the safe choice first, or give
an element `tabindex="0"` and place it at the top:

```tsx
<DialogPanel class="dialog-panel">
  <DialogTitle class="dialog-title" tabindex="0">Delete project</DialogTitle>
  <DialogDescription class="dialog-description">This cannot be undone.</DialogDescription>
  <div class="dialog-actions">
    <button type="button" onClick={() => setOpen(false)}>Cancel</button>
    <button type="button" class="danger" onClick={remove}>Delete</button>
  </div>
</DialogPanel>
```

### Locking page scroll

Terracotta does not touch the document's scroll. Do it in an effect:

```tsx
createEffect(() => {
  document.body.style.overflow = open() ? 'hidden' : '';
  onCleanup(() => { document.body.style.overflow = ''; });
});
```

### Reading the state from a nested component

```tsx
function CloseButton(): JSX.Element {
  const state = useDisclosureState();
  return <button type="button" onClick={() => state.close()}>Close</button>;
}
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Dialog` | `tc-dialog` | Always (whenever rendered) |
| `Dialog` | `tc-expanded` | The dialog is open |
| `Dialog` | `tc-disabled` | The dialog is disabled |
| `DialogOverlay` | `tc-dialog-overlay` | Always |
| `DialogOverlay` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `DialogPanel` | `tc-dialog-panel` | Always |
| `DialogPanel` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `DialogTitle` | `tc-dialog-title` | Always |
| `DialogTitle` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `DialogDescription` | `tc-dialog-description` | Always |
| `DialogDescription` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |

With the default `unmount`, the dialog is only in the DOM while it is open, so
`tc-expanded` is mostly interesting when you set `unmount={false}` — that is when
it becomes the hook for hiding and showing.

### Styling

```css
/* With unmount={false}, you own visibility */
[tc-dialog]:not([tc-expanded]) { display: none; }

/* Style parts without adding classes */
[tc-dialog-overlay] { position: fixed; inset: 0; background: rgb(0 0 0 / 0.4); }
[tc-dialog-panel]   { background: #ffffff; border-radius: 0.75rem; padding: 1.5rem; }
[tc-dialog-title]   { margin: 0 0 0.5rem; font-size: 1.125rem; }

/* Entry animation without <Transition>, for the unmount={true} case */
@media (prefers-reduced-motion: no-preference) {
  [tc-dialog-panel] { animation: dialog-in 150ms ease-out; }
}

@keyframes dialog-in {
  from { opacity: 0; scale: 0.97; }
  to   { opacity: 1; scale: 1; }
}
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the dialog is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. |
| `setState(value)` | `(boolean) => void` | Sets the state directly. |
| `disabled()` | `boolean` | Whether the dialog is disabled. |

Available as the render-prop argument on `Dialog` and each of its parts, through
`<DisclosureStateChild>`, or with `useDisclosureState()` in any descendant. Full
reference in [disclosure state](../states.md#disclosure-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Escape</kbd> | Closes the dialog (handled by `DialogPanel`) |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles focus within the panel; focus cannot leave it |

## API

### `<Dialog>`

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
| `onClose` | `() => void` | — | Called when it closes, including via <kbd>Escape</kbd> and overlay clicks. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the dialog behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="dialog"`, `aria-modal="true"`,
`aria-labelledby` and `aria-describedby`.

### `<DialogPanel>`

The focus trap. While the dialog is open it focuses its first focusable child,
keeps <kbd>Tab</kbd> inside itself, and closes on <kbd>Escape</kbd>. Renders a
`<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Stops the panel's own key handling (both the trap and <kbd>Escape</kbd>). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<DialogOverlay>`

The backdrop. Closes the dialog when clicked. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<DialogTitle>`

The accessible name. Renders an `<h2>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'h2'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Title text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<DialogDescription>`

Supporting text referenced by `aria-describedby`. Renders a `<p>` by default.
Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'p'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Description text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Every descendant throws if rendered outside a `<Dialog>`.
