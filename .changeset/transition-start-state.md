---
'terracotta': patch
---

Fix a panel flashing at its final appearance before it enters.

The starting state and the class carrying the `transition` declaration were
applied in the same change, so whenever the element's style had already been
computed once, the browser treated the starting state as somewhere to animate
*to*: the panel appeared fully visible, faded out to its `enterFrom` state over
the whole duration, and only then entered. A `PopoverPanel` inside a
`Transition` hit this reliably, because opening the popover computes the panel's
style before the transition applies its classes.

The starting state is now committed on its own before the transition can act on
it, in both directions, so an enter begins from `enterFrom` and a leave from
`leaveFrom` however the element came to be on screen.
