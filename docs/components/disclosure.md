# Disclosure

A [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) is a button
that shows and hides a section of content. It is the simplest of the
disclosure-state components: no focus trap, no overlay, no portal. That makes it
the right base for FAQs, "show more" sections and collapsible sidebars.

For several sections that behave as a set, use [`Accordion`](./accordion.md).

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
import { DisclosureStateChild, useDisclosureState } from 'terracotta/states';
```

## Anatomy

```tsx
<Disclosure>          {/* owns the open/closed state */}
  <DisclosureButton/> {/* toggles it */}
  <DisclosurePanel/>  {/* shown while open */}
</Disclosure>
```

## Examples

### Uncontrolled

```tsx
<Disclosure class="disclosure" defaultOpen={false}>
  <DisclosureButton class="disclosure-button">
    What is a headless component?
    <span class="disclosure-chevron" aria-hidden="true">▸</span>
  </DisclosureButton>
  <DisclosurePanel class="disclosure-panel">
    One that ships behaviour and accessibility, but no styles.
  </DisclosurePanel>
</Disclosure>
```

```css
.disclosure {
  border: 1px solid #e4e4e7;
  border-radius: 0.5rem;
  overflow: hidden;
}

.disclosure-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  inline-size: 100%;
  border: none;
  background: #fafafa;
  padding: 0.75rem 1rem;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.disclosure-button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}

/* The chevron turns when the section is open — no JS involved */
.disclosure-chevron {
  transition: rotate 150ms ease;
}

.disclosure-button[tc-expanded] .disclosure-chevron {
  rotate: 90deg;
}

.disclosure-panel {
  padding: 0.75rem 1rem;
  border-block-start: 1px solid #e4e4e7;
}
```

### Controlled

```tsx
const [open, setOpen] = createSignal(false);

<Disclosure class="disclosure" isOpen={open()} onChange={setOpen}>
  <DisclosureButton class="disclosure-button">Details</DisclosureButton>
  <DisclosurePanel class="disclosure-panel">…</DisclosurePanel>
</Disclosure>
```

Nothing moves until `setOpen` runs. In controlled mode the component only
reports the state it wants to move to.

### Changing the label with the state

```tsx
<Disclosure class="disclosure" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <DisclosureButton class="disclosure-button">
        {isOpen() ? 'Hide' : 'Show'} details
      </DisclosureButton>
      <DisclosurePanel class="disclosure-panel">…</DisclosurePanel>
    </>
  )}
</Disclosure>
```

### Closing from inside the panel

```tsx
<Disclosure class="disclosure" defaultOpen={false}>
  <DisclosureButton class="disclosure-button">Filters</DisclosureButton>
  <DisclosurePanel class="disclosure-panel">
    {({ close }) => (
      <>
        <FilterFields />
        <button type="button" onClick={close}>Apply</button>
      </>
    )}
  </DisclosurePanel>
</Disclosure>
```

### Disabled

```tsx
<Disclosure class="disclosure" defaultOpen={false} disabled={!hasContent()}>
  <DisclosureButton class="disclosure-button">Attachments</DisclosureButton>
  <DisclosurePanel class="disclosure-panel">…</DisclosurePanel>
</Disclosure>
```

```css
.disclosure[tc-disabled] .disclosure-button {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Reacting to open and close

```tsx
<Disclosure
  class="disclosure"
  defaultOpen={false}
  onOpen={() => void loadComments()}
  onClose={() => cancelPendingRequests()}
>
  …
</Disclosure>
```

`onOpen` runs before `onChange`, and `onClose` after it.

### Keeping the panel mounted

`unmount={false}` leaves the panel in the DOM at all times, so form state and
scroll position survive a collapse. You then own its visibility:

```tsx
<DisclosurePanel class="disclosure-panel" unmount={false}>
  <textarea placeholder="Draft is preserved while collapsed" />
</DisclosurePanel>
```

```css
/* Hide it yourself when the disclosure is closed */
.disclosure-panel:not([tc-expanded]) {
  display: none;
}
```

`unmount="offscreen"` is the middle ground. The panel is built once and reused,
but still detached while closed, so its state survives without leaving anything
in the document. Its effects keep running while it is hidden — see
[`unmount`](../guides/rendering.md#unmountoffscreen).

### Loading the panel content

A `Loading` boundary inside the panel behaves as it does anywhere else, and the
panel does not wait for it: it opens, animates, and shows the fallback until the
content arrives. See [async content](../guides/rendering.md#async-content) for
how that lines up with transitions and with focus.

### Animating the panel

```tsx
<Disclosure class="disclosure" defaultOpen={false}>
  {({ isOpen }) => (
    <>
      <DisclosureButton class="disclosure-button">Toggle</DisclosureButton>
      <Transition
        show={isOpen()}
        enter="panel-enter"
        enterFrom="panel-from"
        enterTo="panel-to"
        leave="panel-leave"
        leaveFrom="panel-to"
        leaveTo="panel-from"
      >
        <DisclosurePanel class="disclosure-panel" unmount={false}>…</DisclosurePanel>
      </Transition>
    </>
  )}
</Disclosure>
```

```css
.panel-enter { transition: opacity 150ms ease-out, translate 150ms ease-out; }
.panel-leave { transition: opacity 100ms ease-in, translate 100ms ease-in; }
.panel-from  { opacity: 0; translate: 0 -0.25rem; }
.panel-to    { opacity: 1; translate: none; }
```

### Reading the state from a nested component

```tsx
function PanelCount(): JSX.Element {
  const state = useDisclosureState();
  return <Show when={!state.isOpen()}><span class="badge">{count()}</span></Show>;
}
```

`<DisclosureStateChild>` does the same without a separate component.

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Disclosure` | `tc-disclosure` | Always |
| `Disclosure` | `tc-expanded` | The disclosure is open |
| `Disclosure` | `tc-disabled` | The disclosure is disabled |
| `DisclosureButton` | `tc-disclosure-button`, `tc-button` | Always |
| `DisclosureButton` | `tc-expanded` | The disclosure is open |
| `DisclosureButton` | `tc-disabled` | The button or the disclosure is disabled |
| `DisclosurePanel` | `tc-disclosure-panel` | Always (whenever it is rendered) |
| `DisclosurePanel` | `tc-expanded` | The disclosure is open |
| `DisclosurePanel` | `tc-disabled` | The disclosure is disabled |

The button also carries `aria-expanded`, and `aria-controls` pointing at the
panel while open.

### Styling

```css
/* State on the root cascades to anything inside it */
[tc-disclosure][tc-expanded] { border-color: #2563eb; }

/* Or style each part directly */
[tc-disclosure-button][tc-expanded] { background: #eff6ff; }
[tc-disclosure-button][tc-disabled] { opacity: 0.5; cursor: not-allowed; }

/* Marker rotation, driven entirely by the attribute */
[tc-disclosure-button]::after {
  content: "+";
  margin-inline-start: auto;
}
[tc-disclosure-button][tc-expanded]::after {
  content: "−";
}
```

The button carries `aria-expanded` too, so `[aria-expanded="true"]` works just
as well if you prefer to style from ARIA.

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `isOpen()` | `boolean` | Whether the disclosure is open. |
| `open()` / `close()` | `() => void` | Opens / closes it. No-op while disabled. |
| `toggle()` | `() => void` | Flips the state. |
| `setState(value)` | `(boolean) => void` | Sets the state directly. |
| `disabled()` | `boolean` | Whether the disclosure is disabled. |

You can reach this state as the render-prop argument on `Disclosure`,
`DisclosureButton` and `DisclosurePanel`, through `<DisclosureStateChild>`, or
with `useDisclosureState()` in any descendant. Full reference in
[disclosure state](../states.md#disclosure-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggles the disclosure, when the button has focus |
| <kbd>Tab</kbd> | Moves through the button and, while open, into the panel |

There is no <kbd>Escape</kbd> handling and no focus trap. A disclosure is inline
content, not a modal. Use [`Popover`](./popover.md) if you need those.

## API

### `<Disclosure>`

Owns the [disclosure state](../states.md#disclosure-state) and renders a `<div>`
by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | — | Initial state, uncontrolled. Mutually exclusive with `isOpen`. |
| `isOpen` | `boolean` | — | Current state, controlled. Mutually exclusive with `defaultOpen`. |
| `disabled` | `boolean` | `false` | Blocks opening and closing. |
| `onChange` | `(state: boolean) => void` | — | Called with the new state on every change. |
| `onOpen` | `() => void` | — | Called when it opens, before `onChange`. |
| `onClose` | `() => void` | — | Called when it closes, after `onChange`. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop receiving the state. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<DisclosureButton>`

A [`Button`](./button.md) that toggles the disclosure. Renders a `<button>` by
default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. |
| `disabled` | `boolean` | `false` | Disables this button. It is also disabled when the `Disclosure` is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Its `id` is generated and linked to the panel through `aria-controls`.

### `<DisclosurePanel>`

The content shown while open. Renders a `<div>` by default. Does not take a
`ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `unmount` | `boolean \| 'offscreen'` | `true` | How the panel behaves while closed — see [`unmount`](../guides/rendering.md#unmount). |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

`DisclosureButton` and `DisclosurePanel` throw if rendered outside a
`<Disclosure>`.
