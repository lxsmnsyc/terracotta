# Switch

An on/off control, following the
[ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). It is
a [`Button`](./button.md) with `role="switch"`, wired to a
[check state](../states.md#check-state), so it takes every `Button` prop too.

:::hero switch/basic
:::

Use `Switch` for a setting that takes effect at once, such as aeroplane mode or
notifications. Screen readers announce it as "on" or "off".

- For a value submitted with a form, use [`Checkbox`](./checkbox.md).
- For a button that stays pressed, such as bold in an editor, use
  [`Toggle`](./toggle.md).

```tsx
import { CheckStateChild, useCheckState } from 'terracotta/states';
import { Switch } from 'terracotta/switch';
```

## Anatomy

```tsx
<Switch/> {/* role="switch" aria-checked, owns the checked state */}
```

## Examples

### Uncontrolled

The switch owns its state. `onChange` only tells you what happened. The content
of the switch is its label.

:::demo switch/basic
The switch carries `tc-checked` while it is on, and `aria-checked` alongside it.
The knob slides because the theme styles `[tc-checked]`.
:::

### Controlled

Nothing changes on screen until `setEnabled` runs. In controlled mode the
component only reports the state it wants to move to.

:::demo switch/controlled
:::

### Labelled from outside

When the visible label is not inside the switch, point `aria-labelledby` at it:

```tsx
<span id="wifi-label">Wi-Fi</span>
<Switch class="switch" defaultChecked={false} aria-labelledby="wifi-label">
  <span class="switch-track" aria-hidden="true">
    <span class="switch-knob" />
  </span>
</Switch>
```

### Render prop

```tsx
<Switch class="switch" defaultChecked={false}>
  {state => <span>{state.checked() ? 'Dark mode on' : 'Dark mode off'}</span>}
</Switch>
```

Keep the label the same in both states when you can. The switch already
announces whether it is on, so a label that changes says it twice.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Switch` | `tc-switch`, `tc-button` | Always |
| `Switch` | `tc-checked` | The switch is on |
| `Switch` | `tc-disabled` | The switch is disabled |

`aria-checked` is always present too, as `true` or `false`. A switch has no
mixed state.

### Styling

```css
[tc-switch] { /* base */ }
[tc-switch][tc-checked] .switch-knob { translate: 0.95rem 0; }
[tc-switch][tc-disabled] { opacity: 0.5; }
[tc-switch]:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `checked()` | `boolean \| undefined` | Whether the switch is on. |
| `setState(value)` | `(boolean) => void` | Sets the state. |
| `check()` / `uncheck()` | `() => void` | Sets `true` / `false`. |
| `toggle()` | `() => void` | Flips the state. |
| `disabled()` | `boolean` | Whether the switch is disabled. |

You can reach this state three ways: as the render-prop argument on `Switch`,
through `<CheckStateChild>`, or with `useCheckState()` inside any descendant
component. Full reference in [check state](../states.md#check-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Space</kbd> | Flips the switch |
| <kbd>Enter</kbd> | Flips the switch. The pattern makes this optional. |
| <kbd>Tab</kbd> | Focuses the switch, unless it is disabled |

## API

### `<Switch>`

Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. Non-`<button>` elements get <kbd>Enter</kbd>/<kbd>Space</kbd> activation from `Button`. |
| `defaultChecked` | `boolean` | none | Initial state, uncontrolled. Mutually exclusive with `checked`. |
| `checked` | `boolean` | none | Current state, controlled. Mutually exclusive with `defaultChecked`. |
| `disabled` | `boolean` | `false` | Blocks changes and marks the switch disabled. |
| `onChange` | `(checked: boolean) => void` | none | Called with the new state on every change. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: CheckStateProperties) => JSX.Element` | none | The label, or a render prop receiving the check state. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"switch"` |
| `tabindex` | `0`, or `-1` when disabled |
| `aria-checked` | `true` / `false` |
| `aria-disabled`, `disabled` | Mirrors the disabled state |
| `tc-switch`, `tc-button` | `""` |
| `tc-checked` | `""` when on |
| `tc-disabled` | `""` when disabled |
