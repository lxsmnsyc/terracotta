# Meter

Shows a value within a known range, such as a battery level or the storage in
use, following the
[ARIA meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/).

:::hero meter/basic
:::

Use a meter for a measurement. For progress through a task, such as a file
upload, use a progress bar instead. A meter also needs a meaningful maximum,
so it does not suit a value like a count of visitors.

```tsx
import { Meter, MeterLabel } from 'terracotta/meter';
```

## Anatomy

```tsx
<Meter>        {/* role="meter", the value and range */}
  <MeterLabel/>{/* optional; names the meter */}
</Meter>
```

## Examples

### Basic

:::demo meter/basic
:::

### Value text

Screen readers often read the value as a percentage. When that is not clear,
`getValueText` sets `aria-valuetext`:

```tsx
<Meter value={18} max={64} getValueText={value => `${value} of 64 GB used`} />
```

### Naming

Put a `MeterLabel` inside the meter, and the meter points `aria-labelledby` at
it. Otherwise, give the meter an `aria-label`.

### Drawing the fill

The meter takes a render prop with its state. Draw the fill from `percent()`:

```tsx
<Meter value={62}>
  {state => (
    <span class="meter-track">
      <span class="meter-fill" style={{ 'inline-size': `${state.percent()}%` }} />
    </span>
  )}
</Meter>
```

The children of an element with `role="meter"` are not read out on their own,
so keep anything the user needs to hear in the label and the value text.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Meter` | `tc-meter` | Always |
| `MeterLabel` | `tc-meter-label` | Always |

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `number` | The value, kept between `min` and `max`. |
| `min()` / `max()` | `number` | The range. |
| `percent()` | `number` | Where the value sits in the range, from 0 to 100. |

## Keyboard

None. A meter does not take focus.

## API

### `<Meter>`

Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `value` | `number` | none | The value. Required. |
| `min` | `number` | `0` | The lowest value. |
| `max` | `number` | `100` | The highest value. It is kept above `min`. |
| `getValueText` | `(value: number) => string` | none | Text for `aria-valuetext`. |
| `children` | `JSX.Element` \| `(state: MeterStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes: `role="meter"`, `aria-valuenow`, `aria-valuemin`,
`aria-valuemax`, `aria-valuetext` when `getValueText` is set,
`aria-labelledby` while a `MeterLabel` is mounted, `tc-meter`.

### `<MeterLabel>`

Renders a `<span>` by default. Put it inside the `Meter`.
