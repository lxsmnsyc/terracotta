---
'terracotta': patch
---

Fix the query that finds focusable elements inside a panel.

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
