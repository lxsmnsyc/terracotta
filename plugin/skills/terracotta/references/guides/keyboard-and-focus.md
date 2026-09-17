<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Keyboard and focus

Terracotta ships the keyboard behaviour each WAI-ARIA pattern calls for. Every
component page lists its own key bindings. This page covers the parts that work
the same way across the library.

## Focus navigation in composite widgets

Accordion, Menu, Listbox, Select, RadioGroup, Tabs, Feed, Combobox and Command
each own a focus navigator. To find its items, a navigator queries for
descendants that carry its `tc-owner` attribute and are not `tc-disabled`.

Two things follow from that:

- Disabled items are skipped automatically, so arrow keys step over them.
- Nesting one widget inside another confuses neither, because each only matches
  the descendants it owns.

## Roving tabindex

Composite widgets take a single <kbd>Tab</kbd> stop. Only the selected item has
`tabindex="0"`; the rest have `tabindex="-1"`. <kbd>Tab</kbd> moves into the
widget and then out of it, and arrow keys move within it.

## Virtual focus

Combobox and Command navigate virtually. DOM focus stays on the input, and the
active option is published through `aria-activedescendant`. This keeps typing
working while the highlight moves through the list.

Style the highlight from `tc-active`, not from `:focus`. The option never holds
DOM focus.

## Focus restoration

Dialog, AlertDialog, Popover, ContextMenu and CommandBar remember which element
was focused before they opened, and return focus to it when they close.

All five also trap <kbd>Tab</kbd> inside their panel while open, so focus wraps
within the panel instead of escaping to the page behind it.

The search for something to focus happens once, as the panel opens. A panel
whose content arrives later, from a `Loading` boundary inside it or any other
async source, has nothing to offer at that moment, and is not asked again. See
[async content](./rendering.md#async-content) for what to do about it.
