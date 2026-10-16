# Spinbutton

A number field that steps through a range, following the
[ARIA spinbutton pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/).
The field carries `role="spinbutton"` and the value. It takes typing and the
arrow keys, and it is the only part that takes focus.

:::hero spinbutton/basic
:::

```tsx
import {
  Spinbutton,
  SpinbuttonDecrement,
  SpinbuttonIncrement,
  SpinbuttonInput,
  SpinbuttonLabel,
  SpinbuttonStateChild,
  useSpinbuttonState,
} from 'terracotta/spinbutton';
```

## Anatomy

```tsx
<Spinbutton>             {/* owns the value, limits and step */}
  <SpinbuttonLabel/>     {/* optional; names the field */}
  <SpinbuttonDecrement/> {/* optional; out of the tab sequence */}
  <SpinbuttonInput/>     {/* role="spinbutton", the only tab stop */}
  <SpinbuttonIncrement/> {/* optional; out of the tab sequence */}
</Spinbutton>
```

## Examples

### Basic

:::demo spinbutton/basic
:::

### Typing

The field is a normal text field, so editing keys work as the browser provides
them.

- Text that is a value in range sets the value as it is typed.
- Text on its way to a value, such as `1.` or `-`, waits.
- Text that is not a number, or is out of range, sets `aria-invalid="true"`.
- On blur and <kbd>Enter</kbd>, the text becomes the value: snapped to the
  step and kept in range. Text that is not a number is dropped, and the field
  shows the last value again.

### Buttons

`SpinbuttonIncrement` and `SpinbuttonDecrement` are optional. They are out of
the tab sequence, since the arrow keys do the same, and pressing one leaves
focus in the field. Each is disabled at its limit. Give each a name:

```tsx
<SpinbuttonIncrement aria-label="More adults">+</SpinbuttonIncrement>
```

### Without limits

Leave out `min` or `max` for an open range. `aria-valuemin` and
`aria-valuemax` are only set for the limits that exist. Without a limit,
<kbd>Home</kbd> and <kbd>End</kbd> move the caret as usual.

### Formatting

`formatValue` sets the text shown in the field, and `parseValue` reads it
back. `getValueText` sets `aria-valuetext` when the number alone is not clear.

```tsx
<Spinbutton
  defaultValue={5}
  min={0}
  formatValue={value => `${value} kg`}
  parseValue={text => Number.parseFloat(text)}
  getValueText={value => `${value} kilograms`}
>
  <SpinbuttonInput aria-label="Weight" />
</Spinbutton>
```

### Controlled

```tsx
const [adults, setAdults] = createSignal(2);

<Spinbutton value={adults()} onChange={setAdults} min={1} max={8}>…</Spinbutton>
```

### In a form

Pass `name` to `SpinbuttonInput`. The form receives the text in the field.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Spinbutton` | `tc-spinbutton` | Always |
| `SpinbuttonLabel` | `tc-spinbutton-label` | Always |
| `SpinbuttonInput` | `tc-spinbutton-input` | Always |
| `SpinbuttonIncrement` | `tc-spinbutton-increment` | Always |
| `SpinbuttonDecrement` | `tc-spinbutton-decrement` | Always |
| `Spinbutton`, `SpinbuttonInput` | `tc-disabled` | The spinbutton is disabled |
| `SpinbuttonIncrement`, `SpinbuttonDecrement` | `tc-disabled` | The button cannot step, at a limit or while disabled |

Style typed text that is not a value with `[aria-invalid="true"]`.

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `number` | The current value. |
| `min()` / `max()` | `number \| undefined` | The limits, if there are any. |
| `step()` | `number` | The step. |
| `disabled()` | `boolean` | Whether the spinbutton is disabled. |
| `canIncrement()` / `canDecrement()` | `boolean` | Whether the value can move up or down a step. |
| `setValue(value)` | `(number) => void` | Sets the value, snapped to the step and kept in range. |
| `increment(steps?)` / `decrement(steps?)` | `(number?) => void` | Moves by a number of steps, 1 by default. |

You can reach this state as the render-prop argument on `Spinbutton` and the
two buttons, through `<SpinbuttonStateChild>`, or with `useSpinbuttonState()`
inside any descendant component.

## Keyboard

Handled on the field:

| Key | Action |
| --- | --- |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Increases / decreases the value by one step |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Changes the value by `largeStep` steps |
| <kbd>Home</kbd> / <kbd>End</kbd> | Sets the minimum / maximum, when there is one |
| <kbd>Enter</kbd> | Turns the typed text into the value. A form still submits. |
| Text editing keys | Edit the text, as the browser provides them |

## API

### `<Spinbutton>`

Renders a `<div>` by default. Pass exactly one of `defaultValue` or `value`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultValue` | `number` | none | Initial value, uncontrolled. |
| `value` | `number` | none | Current value, controlled. |
| `min` | `number` | none | The lowest value. |
| `max` | `number` | none | The highest value. |
| `step` | `number` | `1` | The distance between allowed values, counted from `min` or 0. |
| `largeStep` | `number` | `10` | Steps moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>. |
| `disabled` | `boolean` | `false` | Blocks changes, and disables the field and buttons. |
| `formatValue` | `(value: number) => string` | `String` | The text shown in the field. |
| `parseValue` | `(text: string) => number` | `Number` | Reads typed text. Return `NaN` for text that is not a value. |
| `getValueText` | `(value: number) => string` | none | Text for `aria-valuetext`. |
| `onChange` | `(value: number) => void` | none | Called with the new value. |
| `children` | `JSX.Element` \| `(state: SpinbuttonStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<SpinbuttonInput>`

Renders an `<input>` by default.

Rendered attributes: `role="spinbutton"`, `type="text"`,
`inputmode="decimal"`, `autocomplete="off"`, `aria-valuenow`, `aria-valuemin`
and `aria-valuemax` when there are limits, `aria-valuetext` when
`getValueText` is set, `aria-invalid` for typed text that is not a value,
`aria-labelledby` while a `SpinbuttonLabel` is mounted, `disabled` while
disabled, `tc-spinbutton-input`.

### `<SpinbuttonLabel>`

Renders a `<label>` by default, with `for` pointing at the field.

### `<SpinbuttonIncrement>` / `<SpinbuttonDecrement>`

Render a `<button>` by default, with `type="button"`, `tabindex="-1"`,
`aria-controls` pointing at the field, and `disabled` at the limit.

Every part takes `as`, `ref` and `children`, and forwards the rest of its
props.
