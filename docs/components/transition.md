# Transition

Class-driven enter and leave transitions. `Transition` adds and removes CSS
classes around a visibility change, waiting for the element's own animations to
finish between steps, and keeps it mounted until the leave transition is over.
An element can therefore animate out instead of vanishing.

It pairs well with every disclosure-based component. Give the panel
`unmount={false}` and let the transition own the mounting.

```tsx
import { Transition, TransitionChild } from 'terracotta';
```

## Anatomy

```tsx
<Transition show>  {/* provides `show` and transitions itself */}
  <TransitionChild/>{/* optional: extra elements sharing the same show flag */}
</Transition>
```

`Transition` *is* a `TransitionChild` with a `show` prop. The simple case needs
only one component.

## How the classes are applied

On **enter**:

1. `beforeEnter()` runs, then the `enter` and `enterFrom` classes are added.
2. Once the element has nothing left animating, `enterFrom` is removed and
   `enterTo` added.
3. Once that animation finishes, `enter` and `enterTo` are removed, `entered` is
   added, and `afterEnter()` runs.

On **leave**:

1. `beforeLeave()` runs and every nested `TransitionChild` leaves first.
2. `entered` is removed, and `leave` and `leaveFrom` are added.
3. Once the element has nothing left animating, `leaveFrom` is removed and
   `leaveTo` added.
4. Once that animation finishes, `leave` and `leaveTo` are removed, the element
   is hidden (or unmounted), and `afterLeave()` runs.

Every wait goes through `Element.getAnimations()` rather than a `transitionend`
listener, so an element with nothing to animate advances on the next microtask
instead of waiting for an event that would never arrive.

Each prop takes a space-separated class string, so one phase can carry several
class names.

## Interrupting

A `show` change part-way through a transition takes effect immediately. The
running transition stops at its next step — its `afterEnter` or `afterLeave`
never fires — and the opposite one starts, clearing the classes the interrupted
one left behind. So a panel shown again while it is fading out enters from
`enterFrom` rather than easing back from wherever the fade had got to: the phase
lives entirely in the classes, and there is no partial value to resume from.

## Examples

### Fade

```tsx
const [show, setShow] = createSignal(true);

<Transition
  show={show()}
  class="card"
  enter="fade-enter"
  enterFrom="fade-from"
  enterTo="fade-to"
  leave="fade-leave"
  leaveFrom="fade-to"
  leaveTo="fade-from"
>
  Hello
</Transition>
```

```css
.card {
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 1rem;
}

/* The transition itself lives on `enter` / `leave` */
.fade-enter { transition: opacity 200ms ease-out; }
.fade-leave { transition: opacity 150ms ease-in; }

/* The two endpoints */
.fade-from { opacity: 0; }
.fade-to   { opacity: 1; }
```

Reusing `fade-to` as `leaveFrom` and `fade-from` as `leaveTo` makes the leave a
mirror of the enter. That is usually what you want.

### Slide and fade

```tsx
<Transition
  show={open()}
  class="drawer"
  enter="slide-enter" enterFrom="slide-from" enterTo="slide-to"
  leave="slide-leave" leaveFrom="slide-to" leaveTo="slide-from"
>
  …
</Transition>
```

```css
.slide-enter { transition: opacity 220ms ease-out, translate 220ms ease-out; }
.slide-leave { transition: opacity 160ms ease-in, translate 160ms ease-in; }
.slide-from  { opacity: 0; translate: 1rem 0; }
.slide-to    { opacity: 1; translate: none; }
```

### Keyframe animations

Keyframe animations are waited on exactly like transitions, so they work
without changes:

```tsx
<Transition
  show={visible()}
  class="toast"
  enter="pop-in"
  leave="pop-out"
>
  Saved
</Transition>
```

```css
.pop-in  { animation: pop-in 180ms ease-out; }
.pop-out { animation: pop-out 140ms ease-in; }

@keyframes pop-in {
  from { opacity: 0; scale: 0.9; }
  to   { opacity: 1; scale: 1; }
}

@keyframes pop-out {
  from { opacity: 1; scale: 1; }
  to   { opacity: 0; scale: 0.9; }
}
```

### A resting state with `entered`

`entered` is applied once the enter transition finishes, and removed when
leaving starts. Use it for a state that should not be part of the animation:

```tsx
<Transition
  show={open()}
  class="panel"
  enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
  entered="panel-open"
  leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
>
  …
</Transition>
```

```css
.panel-open { box-shadow: 0 8px 24px rgb(0 0 0 / 0.12); }
```

### Around a disclosure panel

```tsx
<Disclosure class="disclosure" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <DisclosureButton class="disclosure-button">Toggle</DisclosureButton>
      <Transition
        show={isOpen()}
        enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
        leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
      >
        <DisclosurePanel class="disclosure-panel" unmount={false}>…</DisclosurePanel>
      </Transition>
    </>
  )}
</Disclosure>
```

`unmount={false}` on the panel is the important part. Without it, the panel
removes itself the moment the disclosure closes, and the leave transition has
nothing to animate.

### Coordinating several elements

`TransitionChild` reads `show` from the nearest `Transition`. A group of
elements can therefore animate on different timings while still leaving
together, because the parent waits for its children's leave transitions before
finishing its own.

```tsx
<Transition show={open()}>
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
</Transition>
```

```css
.pop-enter { transition: opacity 200ms ease-out, scale 200ms ease-out; }
.pop-leave { transition: opacity 150ms ease-in, scale 150ms ease-in; }
.pop-from  { opacity: 0; scale: 0.95; }
.pop-to    { opacity: 1; scale: 1; }
```

### Running work around a transition

```tsx
<Transition
  show={open()}
  enter="fade-enter" enterFrom="fade-from" enterTo="fade-to"
  leave="fade-leave" leaveFrom="fade-to" leaveTo="fade-from"
  beforeEnter={() => void preloadImages()}
  afterEnter={() => inputRef?.focus()}
  afterLeave={() => resetForm()}
>
  …
</Transition>
```

`afterLeave` is the right place to discard state. It runs once the element is
gone.

### Respecting reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .fade-enter, .fade-leave, .pop-enter, .pop-leave {
    transition-duration: 1ms;
  }
}
```

Shortening the duration is enough, and dropping the transition altogether is
safe too: Terracotta waits on the element's running animations, so an element
with nothing to animate simply moves straight to the next step.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Transition` / `TransitionChild` | `tc-transition` | Always, carrying the current phase |
| `Transition` / `TransitionChild` | `inert` | While leaving, and for as long as the element stays mounted afterwards |

The phase values, in order:

| Value | Meaning |
| --- | --- |
| `enter-from` | The enter transition has just started; the element is at its starting state. |
| `enter-to` | The enter transition is running towards its end state. |
| `entered` | The enter transition has finished; the element is at rest and visible. |
| `leave-from` | The leave transition has just started. |
| `leave-to` | The leave transition is running towards its end state. |

The attribute is absent until the first transition runs.

### Styling

You can drive the whole transition from the attribute and skip the class props
entirely:

```tsx
<Transition show={open()} class="sheet">…</Transition>
```

```css
.sheet {
  transition: opacity 200ms ease, translate 200ms ease;
}

.sheet[tc-transition="enter-from"],
.sheet[tc-transition="leave-to"] {
  opacity: 0;
  translate: 0 0.5rem;
}

.sheet[tc-transition="enter-to"],
.sheet[tc-transition="entered"],
.sheet[tc-transition="leave-from"] {
  opacity: 1;
  translate: none;
}
```

This works because the attribute changes at exactly the points the classes do.

The attribute is also handy for debugging and for assertions:

```css
/* Temporarily surface the phase while developing */
[tc-transition]::after {
  content: attr(tc-transition);
  position: absolute;
  font-size: 0.625rem;
  color: #dc2626;
}
```

### Reading the state in code

`Transition` exposes no state object and no render prop. `show` is a prop you
already own. To react in JavaScript, use the lifecycle callbacks: `beforeEnter`,
`afterEnter`, `beforeLeave` and `afterLeave`.

## Keyboard

Neither component handles keys. Whatever it wraps keeps its own keyboard
behaviour.

## API

### `<Transition>`

The root. It provides `show` to its descendants and renders a `TransitionChild`
with the rest of its props, so it takes every `TransitionChild` prop too.

Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `show` | `boolean` | *required* | Whether the content should be visible. Drives every `TransitionChild` beneath it. |
| …plus all [`TransitionChild`](#transitionchild) props | | | |

### `<TransitionChild>`

One transitioning element. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `enter` | `string` | — | Classes applied for the whole enter transition. Put the `transition` or `animation` declaration here. |
| `enterFrom` | `string` | — | Starting state of the enter transition. |
| `enterTo` | `string` | — | Ending state of the enter transition. |
| `entered` | `string` | — | Classes applied once entering has finished, and removed when leaving starts. |
| `leave` | `string` | — | Classes applied for the whole leave transition. |
| `leaveFrom` | `string` | — | Starting state of the leave transition. |
| `leaveTo` | `string` | — | Ending state of the leave transition. |
| `beforeEnter` | `() => void` | — | Called just before entering starts. |
| `afterEnter` | `() => void` | — | Called once entering has finished. |
| `beforeLeave` | `() => void` | — | Called just before leaving starts. |
| `afterLeave` | `() => void` | — | Called once leaving has finished and the element is hidden. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the element behaves while hidden — see [`unmount`](../guides/rendering.md#unmount). |
| `appear` | `boolean` | `false` | Mount and start entering on the very first render. It matters for a nested `TransitionChild`, which otherwise waits for its parent to finish entering before it mounts and runs its own enter. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` | — | The content. Not a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

`TransitionChild` throws if rendered outside a `<Transition>`.

## Notes

- Each step ends when the element has no animation left running, read through
  `Element.getAnimations()`. An element hidden with no transition or animation at
  all advances immediately rather than stalling, so a missing duration no longer
  leaves it stranded on screen.
- Nested `TransitionChild`s hold their parent back in both directions. A child
  enters only once its parent has entered, and a parent starts its own leave
  transition only once every child beneath it has finished leaving.
- The element is marked `inert` the moment a leave starts, and stays inert for
  as long as `unmount={false}` keeps it around afterwards. A panel that is fading
  out is therefore unclickable and out of the tab order rather than lingering as
  a focus trap behind its own animation. The enter phases stay interactive, so a
  panel nested inside can still take focus while it animates in.
- `unmount={true}` and `unmount="offscreen"` need no such treatment: both take
  the element out of the document once the leave transition has finished, so the
  content is already unreachable. The difference between them is only what
  happens to the subtree behind the scenes — see
  [`unmount`](../guides/rendering.md#unmount).
- Panels that move focus into themselves — `DialogPanel`, `PopoverPanel`,
  `ContextMenuPanel`, `CommandBarPanel`, `ListboxOptions`, `ComboboxOptions` —
  wait for the same animations to finish before focusing, so focus lands once the
  panel has settled rather than while it is still animating in.
