---
'terracotta': patch
---

Keep `aria-activedescendant` on `CommandInput` and `ComboboxInput` pointing at the active option. It used to follow only the pointer and the arrow keys, so an option made active through `focus(value)` was never announced, and an active option that unmounted left the input pointing at an id that no longer existed.
