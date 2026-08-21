# terracotta

## 1.2.2

### Patch Changes

- 2c7c625: Fix an infinite re-creation loop when a `Transition` or `TransitionChild` is
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

## 1.2.1

### Patch Changes

- 4a05c38: Stop a nested popup from letting the panel around it act on the same keypress.

  `DialogPanel`, `AlertDialogPanel`, `CommandBarPanel`, `ContextMenuPanel`,
  `PopoverPanel`, `ListboxOptions` and `ComboboxInput` now stop the `Tab` and
  `Escape` they handle from bubbling. A `Popover` inside a `Dialog` used to move
  focus twice per `Tab` — once for its own trap, once for the dialog's — which
  skipped an element and dropped focus outside the popover, closing it. One
  `Escape` likewise closed the popup _and_ the dialog. Each now acts on one layer.

## 1.2.0

### Minor Changes

- 9902614: Drive transitions from a shared `TransitionState` that waits on the element's
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

## 1.1.2

### Patch Changes

- fix ref forwarding, tab group id, etc

## 1.1.1

### Patch Changes

- fix popover states closing on child refocus

## 1.1.0

### Minor Changes

- d7a5ab5: migration
