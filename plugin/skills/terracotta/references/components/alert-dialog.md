<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# AlertDialog

An [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) is a
modal that interrupts. Use it to confirm a consequential action, or to report an
error that needs a response.

It behaves exactly like [`Dialog`](./dialog.md): same focus trap, same
<kbd>Escape</kbd> handling, same focus restoration. The difference is
`role="alertdialog"`, which tells assistive technology to announce the dialog's
description immediately.

Use it when the user must respond before continuing. For ordinary modal content,
use `Dialog`.

```tsx
import {
  AlertDialog,
  AlertDialogPanel,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogDescription,
} from 'terracotta/alert-dialog';
import { DisclosureStateChild, useDisclosureState } from 'terracotta/states';
```

## Anatomy

```tsx
<AlertDialog>                 {/* role="alertdialog" aria-modal */}
  <AlertDialogOverlay/>       {/* backdrop; closes on click */}
  <AlertDialogPanel>          {/* focus trap */}
    <AlertDialogTitle/>       {/* labels the dialog */}
    <AlertDialogDescription/> {/* describes the dialog, and is announced */}
  </AlertDialogPanel>
</AlertDialog>
```

An alert dialog should always have a description. Screen readers announce it,
and it is what tells the user what they are agreeing to.

## Examples

### Confirming a destructive action

### Keeping the panel above the overlay

`position: relative` on the panel is not decoration. The overlay is
`position: fixed`, and a positioned element paints above an unpositioned sibling
whatever their order in the markup, so an unstyled panel ends up *under* the
backdrop, dimmed and unclickable, and every click meant for it lands on the
overlay and closes the dialog instead. Give the panel a `position` of its own,
or a `z-index`, and the stacking follows the markup again.

### Putting the safe choice first

The panel focuses its first focusable element. The order of the buttons
therefore decides what <kbd>Enter</kbd> hits by default:

```tsx
<div class="alertdialog-actions">
  {/* Focused first: the safe option */}
  <button type="button" onClick={() => setOpen(false)}>Cancel</button>
  <button type="button" class="danger" onClick={remove}>Delete permanently</button>
</div>
```

### Reporting an unrecoverable error

```tsx
<AlertDialog
  class="alertdialog"
  isOpen={failure() !== undefined}
  onClose={() => setFailure(undefined)}
>
  <AlertDialogOverlay class="alertdialog-overlay" />
  <AlertDialogPanel class="alertdialog-panel" data-tone="error">
    <AlertDialogTitle class="alertdialog-title">Upload failed</AlertDialogTitle>
    <AlertDialogDescription class="alertdialog-description">
      {failure()?.message}
    </AlertDialogDescription>
    <div class="alertdialog-actions">
      <button type="button" onClick={() => retry()}>Try again</button>
    </div>
  </AlertDialogPanel>
</AlertDialog>
```

```css
.alertdialog-panel[data-tone="error"] {
  border-block-start: 4px solid #dc2626;
}
```

### Uncontrolled

```tsx
<AlertDialog class="alertdialog" defaultOpen>
  <AlertDialogOverlay class="alertdialog-overlay" />
  <AlertDialogPanel class="alertdialog-panel">
    <AlertDialogTitle class="alertdialog-title">Session expired</AlertDialogTitle>
    <AlertDialogDescription class="alertdialog-description">
      Sign in again to continue.
    </AlertDialogDescription>
    {({ close }) => <button type="button" onClick={close}>OK</button>}
  </AlertDialogPanel>
</AlertDialog>
```

### Preventing dismissal

An alert dialog that must be answered should not close on a click away or on
<kbd>Escape</kbd>. Use a plain element for the backdrop instead of the overlay,
and disable the panel's key handling:

```tsx
<AlertDialog class="alertdialog" isOpen={open()}>
  <div class="alertdialog-overlay" />
  <AlertDialogPanel class="alertdialog-panel" disabled>
    <AlertDialogTitle class="alertdialog-title">Accept the terms</AlertDialogTitle>
    <AlertDialogDescription class="alertdialog-description">
      You must accept the updated terms to continue.
    </AlertDialogDescription>
    <button type="button" onClick={() => accept()}>Accept</button>
  </AlertDialogPanel>
</AlertDialog>
```

`disabled` on the panel stops both <kbd>Escape</kbd> and the <kbd>Tab</kbd>
trap. Use it only when the dialog has few controls. Otherwise focus can wander
behind the modal.

### With transitions

```tsx
<Transition show={open()}>
  <AlertDialog class="alertdialog" isOpen={open()} onClose={() => setOpen(false)} unmount={false}>
    <TransitionChild
      enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
      leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
    >
      <AlertDialogOverlay class="alertdialog-overlay" />
    </TransitionChild>
    <TransitionChild
      enter="pop-enter" enterFrom="pop-from" enterTo="pop-to"
      leave="pop-leave" leaveFrom="pop-to" leaveTo="pop-from"
    >
      <AlertDialogPanel class="alertdialog-panel">…</AlertDialogPanel>
    </TransitionChild>
  </AlertDialog>
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
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `AlertDialog` | `tc-alert-dialog` | Always (whenever rendered) |
| `AlertDialog` | `tc-expanded` | The dialog is open |
| `AlertDialog` | `tc-disabled` | The dialog is disabled |
| `AlertDialogOverlay` | `tc-alert-dialog-overlay` | Always |
| `AlertDialogOverlay` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `AlertDialogPanel` | `tc-alert-dialog-panel` | Always |
| `AlertDialogPanel` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `AlertDialogTitle` | `tc-alert-dialog-title` | Always |
| `AlertDialogTitle` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |
| `AlertDialogDescription` | `tc-alert-dialog-description` | Always |
| `AlertDialogDescription` | `tc-expanded`, `tc-disabled` | Mirrors the dialog |

With the default `unmount`, the dialog is in the DOM only while open.
`tc-expanded` therefore matters most when you set `unmount={false}`.

### Styling

```css
[tc-alert-dialog]:not([tc-expanded]) { display: none; }

[tc-alert-dialog-overlay] { position: fixed; inset: 0; background: rgb(0 0 0 / 0.45); }
[tc-alert-dialog-panel]   { background: #ffffff; border-radius: 0.75rem; padding: 1.5rem; }

/* An alert dialog usually wants a stronger entrance than a plain dialog */
@media (prefers-reduced-motion: no-preference) {
  [tc-alert-dialog-panel] { animation: alertdialog-in 180ms ease-out; }
}

@keyframes alertdialog-in {
  from { opacity: 0; scale: 0.94; }
  to   { opacity: 1; scale: 1; }
}
```

### Reading the state in code

Identical to [`Dialog`](./dialog.md#reading-the-state-in-code). It is the same
[disclosure state](../states.md#disclosure-state):

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the dialog is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the dialog is disabled. |

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Escape</kbd> | Closes the dialog (handled by `AlertDialogPanel`, unless it is `disabled`) |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Cycles focus within the panel |

## API

### `<AlertDialog>`

Owns the [disclosure state](../states.md#disclosure-state) and renders a `<div>`
by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | none | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | none | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks opening and closing. |
| `onChange` | `(state: boolean) => void` | none | Called with the new state on every change. |
| `onOpen` | `() => void` | none | Called when it opens, before `onChange`. |
| `onClose` | `() => void` | none | Called when it closes, including via <kbd>Escape</kbd> and overlay clicks. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the dialog behaves while closed. See [`unmount`](../guides/rendering.md#unmount). |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes include `role="alertdialog"`, `aria-modal="true"`,
`aria-labelledby` and `aria-describedby`.

### `<AlertDialogPanel>`

The focus trap. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Stops the panel's own key handling. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<AlertDialogOverlay>`

The backdrop. Closes the dialog when clicked. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<AlertDialogTitle>`

The accessible name. Renders an `<h2>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'h2'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Title text, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<AlertDialogDescription>`

The announced text. Renders a `<p>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'p'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Description text, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Every descendant throws if rendered outside an `<AlertDialog>`.
