# Splitter

Two panes with a movable separator between them, following the
[ARIA window splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/).
The separator carries `role="separator"` and a value: the size of the primary
pane.

:::hero splitter/basic
:::

```tsx
import {
  Splitter,
  SplitterPane,
  SplitterSeparator,
  SplitterStateChild,
  useSplitterState,
} from 'terracotta/splitter';
```

## Anatomy

```tsx
<Splitter>             {/* owns the size of the primary pane */}
  <SplitterPane/>      {/* the primary pane */}
  <SplitterSeparator/> {/* role="separator", focusable, draggable */}
  <div/>               {/* the other pane; no component needed */}
</Splitter>
```

## Examples

### Basic

:::demo splitter/basic
:::

### Sizing the panes

The value runs from `min` to `max`, 0 to 100 by default, so it reads as a
percentage. Size the primary pane from it:

```tsx
<Splitter class="splitter" defaultValue={30}>
  {state => (
    <>
      <SplitterPane style={{ 'flex-basis': `${state.value()}%` }}>…</SplitterPane>
      <SplitterSeparator aria-label="Contents" />
      <div style={{ flex: 1 }}>…</div>
    </>
  )}
</Splitter>
```

A drag sets the value from the pointer's place across the whole splitter, so
the panes should fill it.

### Naming the separator

The pattern names the separator after the primary pane. Point
`aria-labelledby` at the pane's heading, or give it an `aria-label`:

```tsx
<SplitterSeparator aria-labelledby="contents-heading" />
```

### Stacked panes

`horizontal` stacks the panes, so the separator is a horizontal line that
<kbd>↑</kbd> and <kbd>↓</kbd> move. The primary pane is the top one.

### Limits and collapsing

`min` and `max` limit the primary pane. <kbd>Enter</kbd> moves the separator to
`min`, and moves it back to where it was on the next <kbd>Enter</kbd>. With the
default `min` of 0, that collapses the pane completely. While the pane is at
`min`, it and the separator carry `tc-collapsed`.

### Controlled

```tsx
const [size, setSize] = createSignal(30);

<Splitter value={size()} onChange={setSize}>…</Splitter>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Splitter` | `tc-splitter` | Always |
| `SplitterPane` | `tc-splitter-pane` | Always |
| `SplitterSeparator` | `tc-splitter-separator` | Always |
| `Splitter` | `tc-horizontal` | The panes are stacked |
| `SplitterPane`, `SplitterSeparator` | `tc-collapsed` | The primary pane is at `min` |
| `Splitter`, `SplitterSeparator` | `tc-disabled` | The splitter is disabled |

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `number` | The size of the primary pane. |
| `min()` / `max()` / `step()` | `number` | The range, and how far an arrow key moves. |
| `collapsed()` | `boolean` | Whether the primary pane is at `min`. |
| `disabled()` | `boolean` | Whether the splitter is disabled. |
| `setValue(value)` | `(number) => void` | Sets the size, kept in range. |
| `grow(steps?)` / `shrink(steps?)` | `(number?) => void` | Moves by a number of steps, 1 by default. |
| `toggle()` | `() => void` | Collapses the primary pane, or restores it. |

You can reach this state as the render-prop argument on any part, through
`<SplitterStateChild>`, or with `useSplitterState()` inside any descendant
component.

## Keyboard

Handled on the separator:

| Key | Action |
| --- | --- |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the separator left / right, when the panes are side by side |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the separator up / down, when the panes are stacked |
| <kbd>Enter</kbd> | Collapses the primary pane, or restores it |
| <kbd>Home</kbd> / <kbd>End</kbd> | Gives the primary pane its smallest / largest size |

In right-to-left text the primary pane is on the right, and the arrow keys
still move the separator the way they point.

## API

### `<Splitter>`

Renders a `<div>` by default. Pass exactly one of `defaultValue` or `value`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultValue` | `number` | none | Initial size of the primary pane, uncontrolled. |
| `value` | `number` | none | Current size, controlled. |
| `min` | `number` | `0` | The smallest size. |
| `max` | `number` | `100` | The largest size. |
| `step` | `number` | `5` | How far an arrow key moves the separator. |
| `horizontal` | `boolean` | `false` | Stacks the panes. |
| `disabled` | `boolean` | `false` | Blocks changes. |
| `onChange` | `(value: number) => void` | none | Called with the new size. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SplitterStateProperties) => JSX.Element` | none | Contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<SplitterPane>`

Renders a `<div>` by default, with a generated `id` that the separator points
`aria-controls` at.

### `<SplitterSeparator>`

Renders a `<div>` by default.

Rendered attributes: `role="separator"`, `tabindex="0"` (`-1` while
disabled), `aria-orientation`, `aria-valuenow`, `aria-valuemin`,
`aria-valuemax`, `aria-controls`, `aria-disabled`, `tc-splitter-separator`.

Every part takes `as`, `ref` and `children`, and forwards the rest of its
props.
