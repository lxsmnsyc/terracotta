---
'terracotta': minor
---

Drive transitions from a shared `TransitionState` that waits on the element's
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
- Transitions are interruptible. Toggling `show` while one is running reverses
  it immediately; it used to be ignored outright, which could leave an element
  stuck visible after `show` had gone `false`.
- `Transition` and `TransitionChild` mark their element `inert` while it leaves
  and while it stays mounted afterwards under `unmount={false}`, so a panel on
  its way out is no longer clickable or reachable by Tab. The enter phases stay
  interactive.
- `TransitionState` and its `TransitionClasses`, `TransitionHooks` and
  `TransitionStates` types are exported.
