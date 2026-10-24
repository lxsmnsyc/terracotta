<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Toggle

A button with two states, pressed or not, following the
[ARIA button (toggle) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).
It is a [`Button`](./button.md) wired to a
[toggle state](../states.md#toggle-state), so it takes every `Button` prop too.

Use `Toggle` when the control turns something on and off in place, such as bold
in an editor or mute on a call. If the control represents a form value, use
[`Checkbox`](./checkbox.md) instead.

```tsx
import { ToggleStateChild, useToggleState } from 'terracotta/states';
import { Toggle } from 'terracotta/toggle';
```

## Anatomy

```tsx
<Toggle/> {/* role="button" aria-pressed, owns the pressed state */}
```

## Examples

### Uncontrolled

The toggle owns its state. `onChange` only tells you what happened.

### Controlled

Nothing changes on screen until `setMuted` runs. In controlled mode the
component only reports the state it wants to move to.

### Disabled

```tsx
<Toggle class="toggle" defaultPressed={false} disabled={!hasSelection()}>
  Bold
</Toggle>
```

While disabled, clicks and keyboard activation do not change the state. Both
`aria-disabled` and `tc-disabled` are set.

### Render prop

```tsx
<Toggle class="toggle" defaultPressed={false}>
  {state => (
    <>
      <span aria-hidden="true">{state.pressed() ? '🔔' : '🔕'}</span>
      {state.pressed() ? 'Notifications on' : 'Notifications off'}
    </>
  )}
</Toggle>
```

### A switch built from the state attribute

The pressed state is an attribute, so a sliding switch needs no JavaScript
beyond the toggle itself:

### Reading the state from a descendant

```tsx
<Toggle class="toggle" defaultPressed={false}>
  <ToggleStateChild>
    {state => <Icon name={state.pressed() ? 'volume-off' : 'volume'} />}
  </ToggleStateChild>
</Toggle>
```

Or, from a component further down the tree:

```tsx
function PressedBadge() {
  const state = useToggleState();
  return <Show when={state.pressed()}><span class="badge">On</span></Show>;
}
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Toggle` | `tc-toggle`, `tc-button` | Always |
| `Toggle` | `tc-pressed` | The toggle is pressed |
| `Toggle` | `tc-disabled` | The toggle is disabled |

`aria-pressed` is always present too, as `true` or `false`. Select on
`[aria-pressed="true"]` instead if you prefer to style from the ARIA state.

### Styling

```css
[tc-toggle] { /* base */ }
[tc-toggle][tc-pressed] { /* on */ }
[tc-toggle]:not([tc-pressed]) { /* off */ }
[tc-toggle][tc-disabled] { /* unavailable */ }

/* State attributes compose with pseudo-classes */
[tc-toggle][tc-pressed]:hover { background: #1d4ed8; }
[tc-toggle]:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `pressed()` | `boolean` | Whether the toggle is pressed. |
| `setState(value)` | `(boolean) => void` | Sets the state. |
| `check()` / `uncheck()` | `() => void` | Sets `true` / `false`. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the toggle is disabled. |

You can reach this state three ways: as the render-prop argument on `Toggle`,
through `<ToggleStateChild>`, or with `useToggleState()` inside any descendant
component. Full reference in [toggle state](../states.md#toggle-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Flips the pressed state |
| <kbd>Tab</kbd> | Focuses the toggle, unless it is disabled |

## API

### `<Toggle>`

Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. Non-`<button>` elements get <kbd>Enter</kbd>/<kbd>Space</kbd> activation from `Button`. |
| `defaultPressed` | `boolean` | none | Initial state, uncontrolled. Mutually exclusive with `pressed`. |
| `pressed` | `boolean` | none | Current state, controlled. Mutually exclusive with `defaultPressed`. |
| `disabled` | `boolean` | `false` | Blocks toggling and marks the button disabled. |
| `onChange` | `(state: boolean) => void` | none | Called with the new pressed state on every toggle. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: ToggleStateProperties) => JSX.Element` | none | Contents, or a render prop receiving the toggle state. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"button"` |
| `tabindex` | `0`, or `-1` when disabled |
| `aria-pressed` | `true` / `false` |
| `aria-disabled`, `disabled` | Mirrors the disabled state |
| `tc-toggle`, `tc-button` | `""` |
| `tc-pressed` | `""` when pressed |
| `tc-disabled` | `""` when disabled |
