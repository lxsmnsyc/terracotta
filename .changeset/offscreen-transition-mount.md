---
'terracotta': patch
---

Fix an infinite re-creation loop when a `Transition` or `TransitionChild` is
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
