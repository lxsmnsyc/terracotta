<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Styling

Terracotta reports state through `tc-` attributes instead of class names. It
never touches your `class`. The attributes are the whole styling API: CSS
attribute selectors are all you need, and your class names stay yours.

## State attributes

Every component stamps a marker attribute named after itself, such as
`tc-dialog`, `tc-accordion-button` or `tc-listbox-option`. On top of that, it
writes whichever of these apply:

| Attribute | Values | Meaning |
| --- | --- | --- |
| `tc-disabled` | `""` when disabled, otherwise absent | Interaction is blocked. Focus navigation also uses it to skip the element. |
| `tc-expanded` | `""` when open | Disclosure-like state is open. |
| `tc-checked` | `""` when checked, `"mixed"` when indeterminate, absent when unchecked | Checkbox / radio state. |
| `tc-selected` | `""` when selected | Option, tab or accordion item is the selected value. |
| `tc-active` | `""` when active | Element currently holds focus within its group. |
| `tc-pressed` | `""` when pressed | Toggle button state. |
| `tc-matches` | `""` when the option matches the query | Combobox/Command filtering. |
| `tc-has-selected` | `""` | A descendant is selected. |
| `tc-has-active` | `""` | A descendant is active. |
| `tc-has-query` | `""` | The autocomplete query is non-empty. |
| `tc-owner` | owner id | Ties a focusable descendant to the root that navigates it. Internal, but present in the DOM. |
| `tc-transition` | `enter-from` \| `enter-to` \| `entered` \| `leave-from` \| `leave-to` | Current phase of a `<TransitionChild>`. |

Boolean attributes hold an empty string when on, and are absent when off. That
is exactly what a bare attribute selector tests for:

```css
[tc-selected] { font-weight: 600; }
[tc-disabled] { opacity: 0.5; pointer-events: none; }
```

`tc-checked` is the only one with three states, so match on its value:

```css
[tc-checked=""]      { /* checked */ }
[tc-checked="mixed"] { /* indeterminate */ }
:not([tc-checked])   { /* unchecked */ }
```

## Styling with them

Give the element a class as usual, then combine it with the state attribute.
The two never collide, because Terracotta only writes attributes:

```tsx
<ListboxOption value={person} class="option">
  {person.name}
</ListboxOption>
```

```css
.option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

/* Keyboard or pointer is on this option */
.option[tc-active] {
  background: #eff6ff;
}

/* This option is the current value */
.option[tc-selected] {
  font-weight: 600;
}

.option[tc-disabled] {
  color: #9ca3af;
  cursor: not-allowed;
}
```

The `tc-has-*` attributes sit on a container and describe its descendants. That
lets a parent react to its children in plain CSS:

```css
/* Dim the placeholder text on the button until something is chosen */
.listbox-button:not([tc-has-selected]) .value {
  color: #9ca3af;
}
```

The attributes live on real elements, so they work with ordinary selectors:
`:hover`, `:focus-visible`, sibling and descendant combinators, media queries.
Nothing extra is needed.

## Reading them in code

The state behind these attributes is also available to your markup, through a
render prop or a hook. You rarely need to read the DOM:

```tsx
<Disclosure defaultOpen={false}>
  {({ isOpen }) => <DisclosureButton>{isOpen() ? 'Hide' : 'Show'}</DisclosureButton>}
</Disclosure>
```

Each component page lists both: the attributes it writes, and the state object
they come from. See [state](./state.md) for how render props and hooks work.
