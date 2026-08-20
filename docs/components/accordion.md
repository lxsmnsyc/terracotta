# Accordion

An [accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) is a set of
stacked headers, each revealing a panel. The `Accordion` root owns a
[select state](../states.md#select-state), so "which section is open" is only a
selected value. That is why one component covers both the one-open-at-a-time
case and the many-open case, through `multiple`.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionButton,
  AccordionPanel,
  SelectStateChild,
  SelectOptionStateChild,
} from 'terracotta';
```

## Anatomy

```tsx
<Accordion>             {/* owns the selection, handles arrow keys */}
  <AccordionItem>       {/* one section, carries the value */}
    <AccordionHeader>   {/* heading wrapper */}
      <AccordionButton/>{/* selects this item */}
    </AccordionHeader>
    <AccordionPanel/>   {/* shown while this item is selected */}
  </AccordionItem>
</Accordion>
```

## Examples

### One section at a time

```tsx
<Accordion<string> class="accordion" defaultValue="shipping" toggleable>
  <AccordionItem class="accordion-item" value="shipping">
    <AccordionHeader class="accordion-header">
      <AccordionButton class="accordion-button">
        Shipping
        <span class="accordion-marker" aria-hidden="true" />
      </AccordionButton>
    </AccordionHeader>
    <AccordionPanel class="accordion-panel">Ships in 2–3 days.</AccordionPanel>
  </AccordionItem>

  <AccordionItem class="accordion-item" value="returns">
    <AccordionHeader class="accordion-header">
      <AccordionButton class="accordion-button">
        Returns
        <span class="accordion-marker" aria-hidden="true" />
      </AccordionButton>
    </AccordionHeader>
    <AccordionPanel class="accordion-panel">30 days, no questions asked.</AccordionPanel>
  </AccordionItem>
</Accordion>
```

```css
.accordion {
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  overflow: hidden;
}

.accordion-item + .accordion-item {
  border-block-start: 1px solid #e4e4e7;
}

.accordion-header { margin: 0; }

.accordion-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  border: none;
  background: #ffffff;
  padding: 0.875rem 1rem;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.accordion-button:hover { background: #fafafa; }

.accordion-button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}

/* Open section */
.accordion-button[tc-expanded] {
  font-weight: 600;
  background: #f4f4f5;
}

/* Plus / minus marker driven purely by the attribute */
.accordion-marker::before { content: "+"; }
.accordion-button[tc-expanded] .accordion-marker::before { content: "−"; }

.accordion-panel {
  padding: 0 1rem 1rem;
}
```

`toggleable` lets a user close the open section by clicking its button again.
Without it, one section is always open.

### Several sections at once

```tsx
<Accordion<string> class="accordion" multiple defaultValue={['shipping']} toggleable>
  {/* same items */}
</Accordion>
```

In multiple mode, `value` and `defaultValue` are arrays, and `onChange` receives
an array.

### Controlled

```tsx
const [open, setOpen] = createSignal<string[]>(['shipping']);

<Accordion<string> class="accordion" multiple value={open()} onChange={setOpen} toggleable>
  …
</Accordion>
```

### Object values

Pass `by` to compare items by identity instead of by reference:

```tsx
interface Section { id: string; title: string; body: string }

<Accordion<Section>
  class="accordion"
  defaultValue={sections[0]}
  by={(a, b) => a.id === b.id}
>
  <For each={sections}>
    {section => (
      <AccordionItem class="accordion-item" value={section}>
        <AccordionHeader class="accordion-header">
          <AccordionButton class="accordion-button">{section.title}</AccordionButton>
        </AccordionHeader>
        <AccordionPanel class="accordion-panel">{section.body}</AccordionPanel>
      </AccordionItem>
    )}
  </For>
</Accordion>
```

### Disabled sections

Disable one item, or the whole accordion:

```tsx
<Accordion<string> class="accordion" defaultValue="shipping">
  <AccordionItem class="accordion-item" value="shipping">…</AccordionItem>
  <AccordionItem class="accordion-item" value="returns" disabled>…</AccordionItem>
</Accordion>
```

```css
.accordion-item[tc-disabled] .accordion-button {
  color: #a1a1aa;
  cursor: not-allowed;
}
```

Disabled items cannot be clicked, and the arrow keys skip them.

### Showing which item has keyboard focus

`tc-active` marks the item the focus navigator is on. That is not the same as
`tc-selected`:

```css
.accordion-button[tc-active] {
  box-shadow: inset 3px 0 0 #2563eb;
}
```

### Custom heading level

`AccordionHeader` renders an `<h3>`. Change it to fit your document outline:

```tsx
<AccordionHeader as="h2" class="accordion-header">
  <AccordionButton class="accordion-button">Shipping</AccordionButton>
</AccordionHeader>
```

### Keeping panels mounted

```tsx
<AccordionPanel class="accordion-panel" unmount={false}>
  <textarea placeholder="Draft survives a collapse" />
</AccordionPanel>
```

```css
.accordion-panel:not([tc-expanded]) { display: none; }
```

### Animating the panels

```tsx
<AccordionItem class="accordion-item" value="shipping">
  <AccordionHeader class="accordion-header">
    <AccordionButton class="accordion-button">Shipping</AccordionButton>
  </AccordionHeader>
  <SelectOptionStateChild>
    {state => (
      <Transition
        show={state.isSelected()}
        enter="panel-enter" enterFrom="panel-from" enterTo="panel-to"
        leave="panel-leave" leaveFrom="panel-to" leaveTo="panel-from"
      >
        <AccordionPanel class="accordion-panel" unmount={false}>…</AccordionPanel>
      </Transition>
    )}
  </SelectOptionStateChild>
</AccordionItem>
```

```css
.panel-enter { transition: opacity 150ms ease-out, translate 150ms ease-out; }
.panel-leave { transition: opacity 100ms ease-in, translate 100ms ease-in; }
.panel-from  { opacity: 0; translate: 0 -0.25rem; }
.panel-to    { opacity: 1; translate: none; }
```

### Reading the selection

```tsx
<Accordion<string> class="accordion" defaultValue="shipping" toggleable>
  {state => (
    <>
      <p class="hint">
        {state.hasSelected() ? 'A section is open' : 'All sections collapsed'}
      </p>
      {/* items */}
    </>
  )}
</Accordion>
```

`<SelectStateChild>` reads the same state from any descendant.
`<SelectOptionStateChild>` reads the per-item state from inside an
`AccordionItem`.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Accordion` | `tc-accordion` | Always |
| `Accordion` | `tc-has-selected` | At least one section is open |
| `Accordion` | `tc-has-active` | A section currently holds keyboard focus |
| `Accordion` | `tc-disabled` | The accordion is disabled |
| `AccordionItem` | `tc-accordion-item` | Always |
| `AccordionItem` | `tc-selected`, `tc-expanded` | This section is open |
| `AccordionItem` | `tc-active` | This section holds keyboard focus |
| `AccordionItem` | `tc-disabled` | This item or the accordion is disabled |
| `AccordionHeader` | `tc-accordion-header` | Always |
| `AccordionHeader` | `tc-selected`, `tc-expanded`, `tc-active`, `tc-disabled` | Mirrors the item |
| `AccordionButton` | `tc-accordion-button`, `tc-button`, `tc-owner` | Always |
| `AccordionButton` | `tc-selected`, `tc-expanded`, `tc-active`, `tc-disabled` | Mirrors the item |
| `AccordionPanel` | `tc-accordion-panel` | Always (whenever rendered) |
| `AccordionPanel` | `tc-selected`, `tc-expanded`, `tc-active`, `tc-disabled` | Mirrors the item |

`tc-selected` and `tc-expanded` always agree on an accordion. Both exist so you
can use whichever reads better. The button also carries `aria-expanded`, and
`aria-controls` while open.

### Styling

```css
/* Open state, from any level */
[tc-accordion-item][tc-expanded] { background: #fafafa; }
[tc-accordion-button][tc-expanded] { font-weight: 600; }

/* Keyboard position, independent of what is open */
[tc-accordion-button][tc-active] { box-shadow: inset 3px 0 0 #2563eb; }

/* Disabled */
[tc-accordion-item][tc-disabled] { opacity: 0.5; }

/* Container-level state: fade a hint while everything is collapsed */
[tc-accordion]:not([tc-has-selected]) .accordion-hint { display: block; }
[tc-accordion][tc-has-selected] .accordion-hint { display: none; }
```

### Reading the state in code

On the root — the [select state](../states.md#select-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(V) => boolean` | Whether that section is open. |
| `select(value)` | `(V) => void` | Opens that section, honouring `toggleable`. |
| `hasSelected()` | `boolean` | Whether anything is open. |
| `isActive(value)` / `hasActive()` | | Keyboard focus position. |
| `disabled()` | `boolean` | Whether the accordion is disabled. |

Inside an item — the [select option state](../states.md#select-option-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected()` | `boolean` | Whether this section is open. |
| `select()` | `() => void` | Opens this section. |
| `isActive()` | `boolean` | Whether this section holds keyboard focus. |
| `disabled()` | `boolean` | Whether this section is disabled. |

## Keyboard

Handled on the `Accordion` root, across its `AccordionButton` descendants:

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous button, wrapping around |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last button |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Opens the focused section |
| <kbd>Tab</kbd> | Moves through every enabled button, and into an open panel |

Disabled items are skipped.

## API

### `<Accordion>`

Renders a `<div>` by default. It has no ARIA role of its own; the semantics live
on the headers, buttons and panels.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `multiple` | `boolean` | `false` | When `true`, several items can be open, and `value` / `defaultValue` / `onChange` deal in arrays. |
| `defaultValue` | `V` \| `V[]` | — | Initially open item(s), uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` \| `V[]` | — | Currently open item(s), controlled. Mutually exclusive with `defaultValue`. |
| `onChange` | `(value?: V) => void` \| `(value: V[]) => void` | — | Called with the new selection. Array form in multiple mode. |
| `toggleable` | `boolean` | `false` | Allow closing the open item by selecting it again. |
| `disabled` | `boolean` | `false` | Disables the whole accordion. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | — | Items, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<AccordionItem>`

One section. Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `value` | `V` | *required* | The value this section represents. |
| `disabled` | `boolean` | `false` | Disables this section. It is also disabled when the `Accordion` is. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | The header and panel, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<AccordionHeader>`

The heading that wraps the button. Renders an `<h3>` by default. Does not take a
`ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'h3'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Usually an `AccordionButton`. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<AccordionButton>`

A [`Button`](./button.md) that selects its item on click, and reports focus to
the accordion's keyboard navigation. Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables this button. It is also disabled when its item or the accordion is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<AccordionPanel>`

The revealed content. Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the panel behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

It is labelled by its button through `aria-labelledby`.

Every descendant throws if used outside its required ancestor.
