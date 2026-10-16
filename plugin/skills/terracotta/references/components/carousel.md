<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Carousel

Shows a set of slides one at a time, following the
[ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
Previous and next buttons, a rotation control and slide picker buttons are all
optional parts.

```tsx
import {
  Carousel,
  CarouselNext,
  CarouselPicker,
  CarouselPickerButton,
  CarouselPrevious,
  CarouselRotation,
  CarouselSlide,
  CarouselSlides,
} from 'terracotta/carousel';
```

## Anatomy

```tsx
<Carousel>                  {/* role="region", aria-roledescription="carousel" */}
  <CarouselRotation/>       {/* optional; first in the tab sequence */}
  <CarouselPrevious/>       {/* optional */}
  <CarouselNext/>           {/* optional */}
  <CarouselSlides>          {/* the live region */}
    <CarouselSlide index/>  {/* role="group", aria-roledescription="slide" */}
  </CarouselSlides>
  <CarouselPicker>          {/* optional; role="group" */}
    <CarouselPickerButton index/>
  </CarouselPicker>
</Carousel>
```

## Examples

### Basic

### Naming

- Name the carousel with `aria-label` or `aria-labelledby`. Leave out the word
  "carousel", since `aria-roledescription` already says it.
- Each slide is named "2 of 5" by default. Pass `aria-label` or
  `aria-labelledby` for a better name, again without the word "slide".
- Each picker button is named "2 of 5" by default. Pass a name of your own to
  match a slide's name.

### Rotation

`autoRotate` starts rotating the slides, one every `interval` milliseconds
(5000 by default). The pattern asks for three things, and the carousel does
all of them:

- Rotation stops when focus enters the carousel, and stays stopped until the
  user starts it again with the rotation control.
- Rotation pauses while the pointer is over the carousel.
- While it rotates, `CarouselSlides` has `aria-live="off"`, so screen readers
  are not interrupted by every slide. Otherwise it is `"polite"`.

`CarouselRotation` stops and starts rotation. Its label should say what it
will do, so it carries no `aria-pressed`:

```tsx
<CarouselRotation>
  {state => (state.isRotating() ? 'Stop slide rotation' : 'Start slide rotation')}
</CarouselRotation>
```

Put it first in the carousel, before the slides, as the pattern requires.

### Previous and next

`CarouselPrevious` and `CarouselNext` do not move focus, so they can be
pressed again and again. With `loop` (the default), the last slide leads back
to the first. With `loop={false}`, the buttons are `aria-disabled` at the
ends. They stay focusable, so focus is not lost.

### Picking a slide

`CarouselPicker` groups one `CarouselPickerButton` per slide. Name the group
after what it does, such as `aria-label="Choose slide to display"`. The button
for the slide on screen is `aria-disabled`, and carries `tc-current`.

### Slides kept mounted

A slide is removed while it is not on screen. Pass `unmount={false}` to keep
it, for a sliding animation. A kept slide is `inert` and `aria-hidden` while
it is off screen, and the current one carries `tc-current`.

### Controlled

```tsx
const [slide, setSlide] = createSignal(0);

<Carousel aria-label="Photos" value={slide()} onChange={setSlide}>…</Carousel>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Carousel` | `tc-carousel` | Always |
| `Carousel` | `tc-rotating` | The slides rotate on their own |
| `CarouselSlide` | `tc-carousel-slide` | Always |
| `CarouselSlide` | `tc-current` | The slide is on screen |
| `CarouselPickerButton` | `tc-current` | Its slide is on screen |
| `CarouselPrevious`, `CarouselNext` | `tc-disabled` | There is no slide that way |

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `index()` | `number` | The slide on screen, from 0. |
| `count()` | `number` | How many slides there are. |
| `isRotating()` | `boolean` | Whether the slides rotate on their own. |
| `isPaused()` | `boolean` | Whether rotation is held by the pointer. |
| `hasPrevious()` / `hasNext()` | `boolean` | Whether there is a slide that way. |
| `show(index)` | `(number) => void` | Shows a slide. |
| `previous()` / `next()` | `() => void` | Moves one slide. |
| `start()` / `stop()` | `() => void` | Starts or stops rotation. |

You can reach this state as the render-prop argument on any part, through
`<CarouselStateChild>`, or with `useCarouselState()` inside any descendant
component.

## Keyboard

The carousel adds no keys of its own. Tab moves through its buttons, which
work as buttons do. Focus anywhere inside stops rotation.

## API

### `<Carousel>`

Renders a `<section>` by default, with `role="region"` and
`aria-roledescription="carousel"`. Pass exactly one of `defaultValue` or
`value`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'section'` | Element or component to render as. |
| `defaultValue` | `number` | none | The first slide on screen, uncontrolled. |
| `value` | `number` | none | The slide on screen, controlled. |
| `loop` | `boolean` | `true` | Whether the last slide leads back to the first. |
| `autoRotate` | `boolean` | `false` | Starts rotating the slides. |
| `interval` | `number` | `5000` | Milliseconds per slide while rotating. |
| `onChange` | `(index: number) => void` | none | Called with the new slide. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<CarouselSlides>`

Renders a `<div>` by default, with `aria-live` and `aria-atomic="false"`.

### `<CarouselSlide>`

Renders a `<div>` by default. Takes `index`, required, and `unmount`.

### `<CarouselPrevious>` / `<CarouselNext>` / `<CarouselRotation>`

Render a `<button>` by default, with `type="button"` and `aria-controls`
pointing at the slides.

### `<CarouselPicker>`

Renders a `<div>` by default, with `role="group"`.

### `<CarouselPickerButton>`

Renders a `<button>` by default. Takes `index`, required.

Every part takes `as`, `ref` and `children` (or a render prop), and forwards
the rest of its props.
