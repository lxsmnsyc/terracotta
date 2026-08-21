# terracotta

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
