# RadioGroup

A [radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) picks exactly
one option from a set. The group is a single tab stop. The arrow keys move
between options *and* select as they go, which is how native radios behave and
what the ARIA pattern expects.

:::hero radio-group/cards
:::

A radio option does not have to be a small circle. Each `RadioGroupOption` is a
container with its own label and description slots, so cards and tiles work
naturally.

```tsx
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from 'terracotta/radio-group';
import { SelectStateChild, useSelectState } from 'terracotta/states';
```

## Anatomy

```tsx
<RadioGroup>                {/* role="radiogroup", owns the value */}
  <RadioGroupLabel/>        {/* names the group */}
  <RadioGroupDescription/>  {/* describes the group */}
  <RadioGroupOption>        {/* role="radio" */}
    <RadioGroupLabel/>      {/* names this option */}
    <RadioGroupDescription/>{/* describes this option */}
  </RadioGroupOption>
</RadioGroup>
```

`RadioGroupLabel` and `RadioGroupDescription` bind to whichever is closest: the
group at the top level, or the option when nested inside one.

## Examples

### Cards

:::demo radio-group/cards
:::

### Classic radio dots

The dot is CSS driven by `tc-checked`:

:::demo radio-group/dots
:::

### Controlled

```tsx
const [speed, setSpeed] = createSignal('standard');

<RadioGroup<string>
  class="radiogroup"
  value={speed()}
  onChange={value => value && setSpeed(value)}
>
  …
</RadioGroup>
```

`onChange` receives `V | undefined`. The `undefined` case only comes up with
`toggleable`, which lets the user clear the selection.

### Object values

```tsx
interface Plan { id: string; name: string; price: string }

<RadioGroup<Plan>
  class="radiogroup"
  defaultValue={plans[0]}
  by={(a, b) => a.id === b.id}
>
  <RadioGroupLabel class="radiogroup-label">Plan</RadioGroupLabel>
  <For each={plans}>
    {plan => (
      <RadioGroupOption class="radio-card" value={plan}>
        <RadioGroupLabel class="radio-card-title">{plan.name}</RadioGroupLabel>
        <RadioGroupDescription class="radio-card-hint">{plan.price}</RadioGroupDescription>
      </RadioGroupOption>
    )}
  </For>
</RadioGroup>
```

### Group-level description

Placed outside any option, the description belongs to the group. The group's
`aria-describedby` points at it:

```tsx
<RadioGroup<string> class="radiogroup" defaultValue="standard">
  <RadioGroupLabel class="radiogroup-label">Delivery speed</RadioGroupLabel>
  <RadioGroupDescription class="radiogroup-hint">
    Estimated dates assume orders placed before 4pm.
  </RadioGroupDescription>
  …
</RadioGroup>
```

### Disabled options

```tsx
<RadioGroupOption class="radio-card" value="overnight" disabled>
  <RadioGroupLabel class="radio-card-title">Overnight</RadioGroupLabel>
  <RadioGroupDescription class="radio-card-hint">
    Not available for your address
  </RadioGroupDescription>
</RadioGroupOption>
```

The arrow keys skip disabled options.

### Horizontal layout

There is no `horizontal` prop. Arrow keys on both axes always work, so the
layout is entirely yours:

```css
.radiogroup-inline {
  flex-direction: row;
  flex-wrap: wrap;
}
```

### Reading the selection

```tsx
<RadioGroup<string> class="radiogroup" defaultValue="standard">
  {state => (
    <>
      <RadioGroupLabel class="radiogroup-label">Delivery speed</RadioGroupLabel>
      {/* options */}
      <p class="hint">{state.hasSelected() ? 'Ready to continue' : 'Choose one'}</p>
    </>
  )}
</RadioGroup>
```

From a nested component, `useSelectState()` reads the group and
`useSelectOptionState()` reads the option.

### In a form

`RadioGroup` renders no `<input>`. Add a hidden one if the value must be
submitted natively:

```tsx
<RadioGroup<string> class="radiogroup" value={speed()} onChange={v => v && setSpeed(v)}>
  …
  <input type="hidden" name="speed" value={speed()} />
</RadioGroup>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `RadioGroup` | `tc-radio-group` | Always |
| `RadioGroup` | `tc-has-selected` | An option is selected |
| `RadioGroup` | `tc-has-active` | An option holds keyboard focus |
| `RadioGroup` | `tc-disabled` | The group is disabled |
| `RadioGroupOption` | `tc-radio-group-option`, `tc-button`, `tc-owner` | Always |
| `RadioGroupOption` | `tc-checked` | This option is selected |
| `RadioGroupOption` | `tc-active` | This option holds keyboard focus |
| `RadioGroupOption` | `tc-disabled` | This option or the group is disabled |
| `RadioGroupLabel` | `tc-radio-group-label` | Always |
| `RadioGroupDescription` | `tc-radio-group-description` | Always |

The option uses **`tc-checked`**, not `tc-selected`. It is a radio, so it
follows the checkbox family of attributes and carries `aria-checked` too. The
label and description carry no state attributes, so style them through the
option.

### Styling

```css
[tc-radio-group-option][tc-checked]  { border-color: #2563eb; background: #eff6ff; }
[tc-radio-group-option][tc-active]   { box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2); }
[tc-radio-group-option][tc-disabled] { opacity: 0.5; cursor: not-allowed; }

/* Reach the nested label from the option's state */
[tc-radio-group-option][tc-checked] [tc-radio-group-label] { color: #1d4ed8; }

/* Prompt the user while nothing is chosen */
[tc-radio-group]:not([tc-has-selected]) .radiogroup-prompt { display: block; }
[tc-radio-group][tc-has-selected] .radiogroup-prompt { display: none; }
```

`aria-checked` mirrors `tc-checked`, so `[aria-checked="true"]` works just as
well.

### Reading the state in code

On the group, from the [select state](../states.md#select-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(V) => boolean` | Whether that value is selected. |
| `select(value)` | `(V) => void` | Selects it. |
| `hasSelected()` | `boolean` | Whether anything is selected. |
| `isActive(value)` / `hasActive()` | | Keyboard focus position. |
| `disabled()` | `boolean` | Whether the group is disabled. |

Inside an option, from the [select option state](../states.md#select-option-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected()` | `boolean` | Whether this option is selected. |
| `isActive()` | `boolean` | Whether this option holds keyboard focus. |
| `select()` | `() => void` | Selects this option. |
| `disabled()` | `boolean` | Whether this option is disabled. |

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>→</kbd> | Next option, wrapping around |
| <kbd>↑</kbd> / <kbd>←</kbd> | Previous option, wrapping around |
| <kbd>Tab</kbd> | Enters or leaves the group; only the selected option is in the tab order |

Focusing an option selects it. That is what makes arrow navigation change the
value. Disabled options are skipped.

## API

### `<RadioGroup>`

Owns a single-selection [select state](../states.md#select-state) and renders a
`<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultValue` | `V` | none | Initially selected value, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` | none | Currently selected value, controlled. Mutually exclusive with `defaultValue`. |
| `onChange` | `(value?: V) => void` | none | Called with the new selection. |
| `toggleable` | `boolean` | `false` | Allow clearing the selection by choosing the selected option again. |
| `disabled` | `boolean` | `false` | Disables the whole group. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | none | Label, description and options, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes include `role="radiogroup"`, `aria-labelledby` and
`aria-describedby`.

### `<RadioGroupOption>`

One choice. A [`Button`](./button.md) with `role="radio"`. It renders a `<div>`
by default, so it can hold a label and a description.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `value` | `V` | *required* | The value this option represents. |
| `disabled` | `boolean` | `false` | Disables this option and removes it from navigation. It is also disabled when the group is. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | none | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | none | The option's contents, or a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

Rendered attributes include `role="radio"`, `aria-checked`, `aria-labelledby`,
`aria-describedby`, and `tabindex`. The `tabindex` is `0` while selected and
`-1` otherwise, which is what makes the group a single tab stop.

### `<RadioGroupLabel>`

Names the nearest group or option. Renders a `<label>` by default. It takes no
`ref` and carries no state attributes of its own.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'label'` | Element or component to render as. |
| `children` | `JSX.Element` | none | Label text. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

### `<RadioGroupDescription>`

Describes the nearest group or option. Renders a `<div>` by default. Does not
take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `children` | `JSX.Element` | none | Description text. Not a render prop. |
| *…rest* | props of `as` | none | Forwarded to the rendered element. |

`RadioGroupOption` throws outside a `<RadioGroup>`. The label and description
throw outside a `<RadioGroup>` or `<RadioGroupOption>`.
