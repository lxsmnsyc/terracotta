# Button

Gives any element the behaviour of a button: the `button` role, a sensible
`tabindex` and disabled wiring. When it renders as something other than a real
`<button>`, it also adds <kbd>Enter</kbd> and <kbd>Space</kbd> activation.

:::hero button/basic
:::

`Button` is the base for `Toggle`, `MenuItem`, `ListboxOption`, `SelectOption`,
`Tab`, `RadioGroupOption`, `CheckboxIndicator`, `AccordionButton`,
`DisclosureButton`, `PopoverButton` and `ListboxButton`. That is why they all
accept `disabled` and behave alike.

```tsx
import { Button } from 'terracotta/button';
```

## Anatomy

```tsx
<Button/> {/* role="button", keyboard-activated, disabled-aware */}
```

## Examples

### Basic

:::demo button/basic
:::

### Disabled

`disabled` removes the element from the tab order and marks it for assistive
technology. It only *blocks clicks* on a natively disabled control, though. On a
`<div>` or `<a>`, guard your own handler:

:::demo button/disabled
:::

### As a link

:::demo button/as-other-elements
The second one renders a `<div>`. Terracotta gives it the keyboard behaviour a button is expected to have, so <kbd>Enter</kbd> and <kbd>Space</kbd> activate it.
:::

### As a non-interactive element

When `as` renders anything other than a `<button>`, Terracotta attaches a
`keydown` listener that clicks the element on <kbd>Enter</kbd> or
<kbd>Space</kbd>. Keyboard users get native button behaviour back.

```tsx
<Button as="div" class="card-button">
  <img src={product.image} alt="" />
  <span>{product.name}</span>
</Button>
```

```css
.card-button {
  display: grid;
  gap: 0.5rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
}
```

A `<div>` is the right choice here, because a `<button>` may not contain
interactive descendants. Everything else about the button contract is restored
for you.

### Forwarding a ref

`ref` is called in the same reactive scope as the component, so effects inside it
work:

```tsx
let element: HTMLButtonElement | undefined;

<Button ref={element} class="button">Focus me later</Button>

// …
element?.focus();
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Button` | `tc-button` | Always |
| `Button` | `tc-disabled` | `disabled` is `true` |

`tc-disabled` is more than a styling hook. Every Terracotta focus navigator
skips elements that carry it, and that is how disabled items drop out of
arrow-key navigation.

### Styling

```css
[tc-button] {
  font: inherit;
  cursor: pointer;
}

[tc-button][tc-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Reading the state in code

`Button` has no state object. `disabled` is a prop you already own. Components
built on `Button` do expose state; [`Toggle`](./toggle.md) is the closest
example.

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> | Activates the button. Native on `<button>`; synthesised by Terracotta on any other element. |
| <kbd>Space</kbd> | Same. |
| <kbd>Tab</kbd> | Focuses the button, unless it is disabled. |

## API

### `<Button>`

Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. Non-`<button>` elements get <kbd>Enter</kbd>/<kbd>Space</kbd> activation. |
| `disabled` | `boolean` | `false` | Marks the button disabled: `tabindex` becomes `-1`, and `disabled`, `aria-disabled` and `tc-disabled` are set. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` | none | Button contents. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

#### Rendered attributes

| Attribute | Value |
| --- | --- |
| `role` | `"button"` |
| `tabindex` | `0`, or `-1` when disabled |
| `disabled`, `aria-disabled` | Mirrors the `disabled` prop |
| `tc-button` | `""` |
| `tc-disabled` | `""` when disabled |
