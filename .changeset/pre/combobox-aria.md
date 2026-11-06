---
'terracotta': patch
---

`ComboboxInput` now sets `aria-autocomplete="list"`, carries `tc-combobox-input` instead of `tc-command-input`, and clears `aria-activedescendant` when the popup closes or nothing matches. `ComboboxOptions` is named by the label, and the root no longer carries `aria-labelledby` or `aria-disabled`. <kbd>Escape</kbd> and <kbd>Enter</kbd> are passed on while the popup is closed, so a surrounding dialog can close and a form can submit.
