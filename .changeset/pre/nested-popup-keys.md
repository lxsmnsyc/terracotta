---
'terracotta': patch
---

Stop a nested popup from letting the panel around it act on the same keypress.

`DialogPanel`, `AlertDialogPanel`, `CommandBarPanel`, `ContextMenuPanel`,
`PopoverPanel`, `ListboxOptions` and `ComboboxInput` now stop the `Tab` and
`Escape` they handle from bubbling. A `Popover` inside a `Dialog` used to move
focus twice per `Tab` — once for its own trap, once for the dialog's — which
skipped an element and dropped focus outside the popover, closing it. One
`Escape` likewise closed the popup *and* the dialog. Each now acts on one layer.
