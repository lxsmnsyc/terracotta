# Slider

Picks a number from a range, following the
[ARIA slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/). The
thumb carries `role="slider"` and the value, and takes the keyboard. The track
takes the pointer.

:::hero slider/basic
:::

```tsx
import {
  Slider,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderStateChild,
  useSliderState,
} from 'terracotta/slider';
```

## Anatomy

```tsx
<Slider>          {/* owns the value, min, max and step */}
  <SliderLabel/>  {/* optional; names the thumb */}
  <SliderTrack>   {/* press and drag to set the value */}
    <SliderThumb/>{/* role="slider", focusable */}
  </SliderTrack>
</Slider>
```

Put the thumb inside the track, so dragging the thumb works like dragging the
track.

## Examples

### Basic

:::demo slider/basic
The thumb and the filled range are placed from `percent()`. The second slider
has `step={0.5}`, `largeStep={4}` and an `aria-valuetext` formatter.
:::

### Placing the thumb

Terracotta moves the value, not the thumb. Read `percent()`, from 0 to 100,
and place the thumb with it:

```tsx
<Slider defaultValue={40}>
  {state => (
    <SliderTrack class="slider-track">
      <SliderThumb
        class="slider-thumb"
        style={{ 'inset-inline-start': `${state.percent()}%` }}
      />
    </SliderTrack>
  )}
</Slider>
```

```css
.slider-track { position: relative; touch-action: none; }
.slider-thumb { position: absolute; translate: -50% -50%; inset-block-start: 50%; }
```

`touch-action: none` on the track stops a touch drag from scrolling the page.

### Value text

When the number alone is not clear, `getValueText` sets `aria-valuetext`:

```tsx
<Slider defaultValue={3} min={1} max={5} getValueText={value => `${value} of 5 stars`}>
  …
</Slider>
```

### Controlled

```tsx
const [volume, setVolume] = createSignal(40);

<Slider value={volume()} onChange={setVolume}>…</Slider>
```

### Vertical

`vertical` makes the track run from bottom to top, and sets
`aria-orientation="vertical"` on the thumb. Place the thumb with
`inset-block-end` instead.

### Without a visible label

Leave out `SliderLabel` and name the thumb directly:

```tsx
<SliderThumb aria-label="Zoom" />
```

### In a form

`name` adds a hidden input that carries the value:

```tsx
<Slider defaultValue={40} name="volume">…</Slider>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Slider` | `tc-slider` | Always |
| `SliderLabel` | `tc-slider-label` | Always |
| `SliderTrack` | `tc-slider-track` | Always |
| `SliderThumb` | `tc-slider-thumb` | Always |
| `Slider` | `tc-vertical` | The slider is vertical |
| `Slider`, `SliderTrack`, `SliderThumb` | `tc-disabled` | The slider is disabled |

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `number` | The current value. |
| `min()` / `max()` / `step()` | `number` | The range and step. |
| `percent()` | `number` | Where the value sits in the range, from 0 to 100. |
| `disabled()` | `boolean` | Whether the slider is disabled. |
| `setValue(value)` | `(number) => void` | Sets the value, snapped to the step and kept in range. |
| `increment(steps?)` / `decrement(steps?)` | `(number?) => void` | Moves by a number of steps, 1 by default. |

You can reach this state as the render-prop argument on `Slider`,
`SliderTrack` or `SliderThumb`, through `<SliderStateChild>`, or with
`useSliderState()` inside any descendant component.

## Keyboard

Handled on the thumb:

| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>↑</kbd> | Increases the value by one step |
| <kbd>←</kbd> / <kbd>↓</kbd> | Decreases the value by one step |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Changes the value by `largeStep` steps |
| <kbd>Home</kbd> / <kbd>End</kbd> | Sets the minimum / maximum |

## API

### `<Slider>`

Renders a `<div>` by default. Pass exactly one of `defaultValue` or `value`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultValue` | `number` | none | Initial value, uncontrolled. |
| `value` | `number` | none | Current value, controlled. |
| `min` | `number` | `0` | The lowest value. |
| `max` | `number` | `100` | The highest value. |
| `step` | `number` | `1` | The distance between allowed values. |
| `largeStep` | `number` | `10` | Steps moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>. |
| `vertical` | `boolean` | `false` | Runs the slider from bottom to top. |
| `disabled` | `boolean` | `false` | Blocks changes. |
| `getValueText` | `(value: number) => string` | none | Text for `aria-valuetext`. |
| `name` | `string` | none | Submits the value with a form. |
| `onChange` | `(value: number) => void` | none | Called with the new value. |
| `children` | `JSX.Element` \| `(state: SliderStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<SliderLabel>`

Renders a `<label>` by default. The thumb points `aria-labelledby` at it while
it is mounted. Clicking it focuses the thumb.

### `<SliderTrack>`

Renders a `<div>` by default. Pressing it sets the value under the pointer and
focuses the thumb. Dragging keeps setting it until the pointer is released.

### `<SliderThumb>`

Renders a `<div>` by default.

Rendered attributes: `role="slider"`, `tabindex="0"` (`-1` while disabled),
`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` when
`getValueText` is set, `aria-orientation="vertical"` when vertical,
`aria-labelledby` while a `SliderLabel` is mounted, `aria-disabled`,
`tc-slider-thumb`.

All three parts take `as`, `ref`, `children` (or a render prop) and forward
the rest of their props.
