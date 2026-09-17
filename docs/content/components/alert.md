# Alert

An [ARIA alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) is a live
region for an important, usually time-sensitive message. Assistive technology
reads its contents as soon as they appear. Focus does not move.

:::hero alert/form-error
:::

Use `Alert` for messages that must interrupt, such as a failed save or a lost
connection. For messages the user can read at their own pace, use
[`Toast`](./toast.md). For something that demands a response, use
[`AlertDialog`](./alert-dialog.md).

```tsx
import { Alert } from 'terracotta/alert';
```

## Anatomy

```tsx
<Alert/> {/* role="alert": announced the moment it appears */}
```

`Alert` has no state and no sub-components. It is the one Terracotta component
that is purely semantic.

## Examples

### Announcing a form error

The alert is announced when it enters the DOM. Render it conditionally, rather
than rendering an empty alert and filling it in later.

:::demo alert/form-error
:::

### Choosing a different element

```tsx
<Alert as="p" class="alert alert-warning">
  Your session expires in two minutes.
</Alert>
```

### Re-announcing the same message

A live region is announced only when its contents change. If the same error can
happen twice in a row, remount the alert with a key so it is announced again:

```tsx
const [failure, setFailure] = createSignal<{ id: number; message: string }>();

// Each failure gets a new id, so <Show> tears down and rebuilds the alert
<Show when={failure()} keyed>
  {current => <Alert class="alert alert-error">{current.message}</Alert>}
</Show>
```

### Styling by severity without extra classes

Every prop you pass is forwarded, so a plain `data-*` attribute works if you
would rather express severity as data:

:::demo alert/severity
:::

## State attributes

`Alert` is stateless, so it writes only its marker attribute.

| Element | Attribute | Present when |
| --- | --- | --- |
| `Alert` | `tc-alert` | Always |

### Styling

Use the marker as a selector when you would rather not add a class at all:

```css
[tc-alert] {
  border: 1px solid #fca5a5;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  color: #991b1b;
}

/* Give it a little entrance so it does not appear abruptly */
@media (prefers-reduced-motion: no-preference) {
  [tc-alert] {
    animation: alert-in 150ms ease-out;
  }
}

@keyframes alert-in {
  from { opacity: 0; transform: translateY(-0.25rem); }
  to   { opacity: 1; transform: none; }
}
```

### Reading the state in code

There is no state to read. Visibility is yours: it depends on whether you render
the `Alert` at all.

## Keyboard

`Alert` takes no focus and handles no keys. That is deliberate. An alert
announces itself without pulling the user away from what they were doing. If the
message needs a response, use [`AlertDialog`](./alert-dialog.md) instead.

## API

### `<Alert>`

Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `children` | `JSX.Element` | none | The message. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"alert"` |
| `id` | A generated unique id, unless you pass your own `id`. |
| `tc-alert` | `""` |
