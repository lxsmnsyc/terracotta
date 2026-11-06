# Tooltip

A short description of a control, shown while the control is hovered or
focused, following the
[ARIA tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

:::hero tooltip/basic
:::

The tooltip never takes focus. While it is open, the trigger points
`aria-describedby` at it, so a screen reader reads the tooltip as the trigger's
description. Keep anything interactive out of a tooltip. For content the user
acts on, use a [`Popover`](./popover.md).

```tsx
import { Tooltip, TooltipPanel, TooltipTrigger } from 'terracotta/tooltip';
```

## Anatomy

```tsx
<Tooltip>          {/* owns the open state and the delays */}
  <TooltipTrigger/>{/* the described control */}
  <TooltipPanel/>  {/* role="tooltip" */}
</Tooltip>
```

## Examples

### Basic

:::demo tooltip/basic
:::

### When it opens and closes

- Focusing the trigger opens the tooltip at once. Moving focus away closes it.
- The pointer entering the trigger opens it after `openDelay`, 300 ms by default.
- The pointer leaving the trigger or the tooltip closes it after `closeDelay`,
  100 ms by default. The pointer can move from the trigger onto the tooltip in
  that time, and the tooltip stays open while the pointer is on it.
- <kbd>Escape</kbd> closes it and leaves focus where it is. It is handled
  before anything else, so a [`Dialog`](./dialog.md) around the trigger stays
  open.

```tsx
<Tooltip defaultOpen={false} openDelay={500} closeDelay={0}>
  …
</Tooltip>
```

### Controlled

`isOpen` and `onChange` work as on every disclosure component. The tooltip only
reports the state it wants to move to.

```tsx
const [open, setOpen] = createSignal(false);

<Tooltip isOpen={open()} onChange={setOpen}>
  <TooltipTrigger class="button">Save</TooltipTrigger>
  <TooltipPanel class="tooltip-panel">Saves the file</TooltipPanel>
</Tooltip>
```

### Triggers that are not buttons

`TooltipTrigger` renders a `<button>` by default. Pass `as` for another
element. The trigger must be focusable, or keyboard users never see the
tooltip.

```tsx
<TooltipTrigger as="a" href="/settings">Settings</TooltipTrigger>
```

### Positioning

Terracotta sets no coordinates. Anchor the panel with CSS, as the demo does:

```css
.tooltip { position: relative; display: inline-flex; }

.tooltip-panel {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 50%;
  translate: -50% 0;
  margin-block-start: 0.35rem;
}
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Tooltip` | `tc-tooltip` | Always |
| `TooltipTrigger` | `tc-tooltip-trigger` | Always |
| `TooltipPanel` | `tc-tooltip-panel` | Always |
| All three | `tc-expanded` | The tooltip is open |
| `Tooltip` | `tc-disabled` | The tooltip is disabled |

## Keyboard

| Key / event | Action |
| --- | --- |
| Focus on the trigger | Opens the tooltip |
| Focus leaves the trigger | Closes it |
| <kbd>Escape</kbd> | Closes it. Focus stays on the trigger. |

## API

### `<Tooltip>`

Renders a `<div>` by default. Pass exactly one of `defaultOpen` or `isOpen`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultOpen` | `boolean` | none | Initial state, uncontrolled. |
| `isOpen` | `boolean` | none | Current state, controlled. |
| `disabled` | `boolean` | `false` | Stops the tooltip from opening. |
| `openDelay` | `number` | `300` | Milliseconds from the pointer entering the trigger to the tooltip opening. |
| `closeDelay` | `number` | `100` | Milliseconds from the pointer leaving to the tooltip closing. |
| `onChange` | `(open: boolean) => void` | none | Called with the new state. |
| `onOpen` / `onClose` | `() => void` | none | Called when it opens or closes. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop receiving the disclosure state. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<TooltipTrigger>`

Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. Keep it focusable. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes: a generated `id`, `aria-describedby` while open,
`tc-tooltip-trigger`.

### `<TooltipPanel>`

Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `unmount` | `boolean` \| `'offscreen'` | `true` | Whether a closed tooltip is removed, kept, or detached. See [`Transition`](./transition.md). |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: DisclosureStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes: `role="tooltip"`, a generated `id`, `tc-tooltip-panel`.
