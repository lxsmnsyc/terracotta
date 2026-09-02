# terracotta

## 2.0.0-next.9

### Patch Changes

- c128bcf: Fix the query that finds focusable elements inside a panel.

  It now looks past the element it was given for anything that takes a subtree out
  of the tab order, so a panel is no longer offered content hidden by an `inert`
  or `hidden` ancestor. `Transition` marks a leaving element `inert`, which made
  this reachable: focus could be sent into a panel that was fading out, where the
  browser would refuse it and leave focus where it was. Where the browser provides
  `checkVisibility`, content hidden by CSS is skipped as well.

  The selector itself is more accurate too. `input[type="hidden"]` and
  `contenteditable="false"` are no longer offered, `object` and `embed` are gone
  since neither is tab-navigable, and `summary`, `audio[controls]` and
  `video[controls]` are now included.

- 19fb94b: Fix a panel flashing at its final appearance before it enters.

  The starting state and the class carrying the `transition` declaration were
  applied in the same change, so whenever the element's style had already been
  computed once, the browser treated the starting state as somewhere to animate
  _to_: the panel appeared fully visible, faded out to its `enterFrom` state over
  the whole duration, and only then entered. A `PopoverPanel` inside a
  `Transition` hit this reliably, because opening the popover computes the panel's
  style before the transition applies its classes.

  The starting state is now committed on its own before the transition can act on
  it, in both directions, so an enter begins from `enterFrom` and a leave from
  `leaveFrom` however the element came to be on screen.

## 2.0.0-next.8

### Patch Changes

- e6d20a0: Stop a nested popup from letting the panel around it act on the same keypress.

  `DialogPanel`, `AlertDialogPanel`, `CommandBarPanel`, `ContextMenuPanel`,
  `PopoverPanel`, `ListboxOptions` and `ComboboxInput` now stop the `Tab` and
  `Escape` they handle from bubbling. A `Popover` inside a `Dialog` used to move
  focus twice per `Tab` — once for its own trap, once for the dialog's — which
  skipped an element and dropped focus outside the popover, closing it. One
  `Escape` likewise closed the popup _and_ the dialog. Each now acts on one layer.

- 13a3f49: Fix an infinite re-creation loop when a `Transition` or `TransitionChild` is
  paired with a disclosure component through the `as` prop — `<Transition
as={PopoverPanel}>`, `<DialogPanel as={TransitionChild}>` and every combination
  of the two — or used as the sole child of one.

  `TransitionChild` assigned its own mounted state from an effect. Solid resolves
  a provider's children eagerly, so that write landed inside the very computation
  that had just built the component and invalidated it, and the component rebuilt
  itself forever. Mounted state is now derived from a memo, which removes the
  cycle: an element that is no longer wanted stays mounted until its leave
  transition has finished with it, without anything having to write the signal its
  own mount depends on.

  `createUnmountable` is rewritten around a `Show` for the ordinary modes and a
  small `Offscreen` component for `unmount="offscreen"`. Behaviour of all three
  `unmount` modes is unchanged, and is now covered by tests.

## 2.0.0-next.7

### Minor Changes

- 2bc2ae2: Drive transitions from a shared `TransitionState` that waits on the element's
  running animations (`Element.getAnimations()`) instead of listening for
  `transitionend`/`animationend`.

  - An element with no transition or animation now advances immediately instead of
    stalling, so a missing duration no longer strands it on screen.
  - `appear` now does something: it mounts a `TransitionChild` and starts its enter
    on the first render, rather than waiting for its parent to finish entering.
  - Panels that move focus into themselves (`DialogPanel`, `PopoverPanel`,
    `ContextMenuPanel`, `CommandBarPanel`, `ListboxOptions`, `ComboboxOptions`) now
    wait for the transition to finish before focusing.
  - `ComboboxOptions` now really does activate an option when the popup opens — the
    selected one, or the first. It always meant to, but it ran before the options
    had mounted, so the popup opened with no active option until the first arrow
    key.
  - Siblings of one transition apply their starting classes against the same style
    baseline. Reading `Element.getAnimations()` flushes style, so the first
    sibling's read used to freeze the resting style of one that had not applied
    its classes yet — that sibling then animated _into_ its starting state before
    animating out of it, a phase behind the rest of the group.
  - Transitions run against the element that is actually on screen. A transition
    whose element had been unmounted and rebuilt (`show` going `false` then `true`
    again under the default `unmount`) used to apply its classes to the detached
    element the ref still held, leaving the newly mounted one unanimated.
  - Transitions are interruptible. Toggling `show` while one is running reverses
    it immediately; it used to be ignored outright, which could leave an element
    stuck visible after `show` had gone `false`.
  - `Transition` and `TransitionChild` mark their element `inert` while it leaves
    and while it stays mounted afterwards under `unmount={false}`, so a panel on
    its way out is no longer clickable or reachable by Tab. The enter phases stay
    interactive.
  - `TransitionState` and its `TransitionClasses`, `TransitionHooks` and
    `TransitionStates` types are exported.

## 2.0.0-next.6

### Patch Changes

- fix JSX path

## 2.0.0-next.5

### Patch Changes

- beta.15 compat

## 2.0.0-next.4

### Patch Changes

- e0ed99d: Fix transition orchestration

## 2.0.0-next.3

### Patch Changes

- fix transition orchestration

## 2.0.0-next.2

### Patch Changes

- ea215d4: fix dependencies

## 2.0.0-next.1

### Patch Changes

- c6133fc: cleanup omitProps and context values

## 2.0.0-next.0

### Major Changes

- Solid 2.0 support, multi-entry exports, transition fix

## 1.1.0

### Minor Changes

- d7a5ab5: migration
