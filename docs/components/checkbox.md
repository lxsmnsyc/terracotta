# Checkbox

A [tri-state checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/):
checked, unchecked, or indeterminate (`undefined`). The pieces are split apart so
you can lay out the indicator, label and description however you like, and they
are wired together with the right `id`s and `aria-*` relationships for you.

```tsx
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxDescription,
  CheckStateChild,
  useCheckState,
} from 'terracotta';
```

## Anatomy

```tsx
<Checkbox>              {/* owns the check state */}
  <CheckboxIndicator/>  {/* role="checkbox", toggles on click */}
  <CheckboxLabel/>      {/* labels the indicator */}
  <CheckboxDescription/>{/* describes the indicator */}
</Checkbox>
```

`CheckboxIndicator` carries `role="checkbox"` and is linked to the label and
description through `aria-labelledby` / `aria-describedby`; `CheckboxLabel`
renders a `<label for>` pointing back at it, so clicking the label toggles the
box.

## Examples

### Uncontrolled

```tsx
<Checkbox class="checkbox" defaultChecked={false}>
  <CheckboxIndicator class="checkbox-box">
    {state => <Show when={state.checked()}><span aria-hidden="true">✓</span></Show>}
  </CheckboxIndicator>
  <div class="checkbox-text">
    <CheckboxLabel class="checkbox-label">Email notifications</CheckboxLabel>
    <CheckboxDescription class="checkbox-description">
      We will only write when something needs your attention.
    </CheckboxDescription>
  </div>
</Checkbox>
```

```css
.checkbox {
  display: flex;
  align-items: start;
  gap: 0.625rem;
}

.checkbox-box {
  display: grid;
  place-items: center;
  inline-size: 1.125rem;
  block-size: 1.125rem;
  margin-block-start: 0.125rem;
  border: 1px solid #a1a1aa;
  border-radius: 0.25rem;
  background: #ffffff;
  color: #ffffff;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
}

.checkbox-box:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Checked */
.checkbox-box[tc-checked=""] {
  background: #2563eb;
  border-color: #2563eb;
}

/* Indeterminate */
.checkbox-box[tc-checked="mixed"] {
  background: #94a3b8;
  border-color: #94a3b8;
}

.checkbox-label {
  font-weight: 500;
  cursor: pointer;
}

.checkbox-description {
  margin: 0.125rem 0 0;
  color: #71717a;
  font-size: 0.875rem;
}
```

### Controlled

```tsx
const [accepted, setAccepted] = createSignal<boolean | undefined>(false);

<Checkbox class="checkbox" checked={accepted()} onChange={setAccepted}>
  <CheckboxIndicator class="checkbox-box" />
  <CheckboxLabel class="checkbox-label">Accept terms</CheckboxLabel>
</Checkbox>
```

### Indeterminate — a "select all" parent

`undefined` is the indeterminate value. It renders as `aria-checked="mixed"` and
`tc-checked="mixed"`.

```tsx
const [items, setItems] = createSignal([true, false, true]);

const parentState = (): boolean | undefined => {
  const all = items();
  if (all.every(Boolean)) return true;
  if (all.every(value => !value)) return false;
  return undefined;
};

<Checkbox
  class="checkbox"
  checked={parentState()}
  onChange={next => setItems(items().map(() => !!next))}
>
  <CheckboxIndicator class="checkbox-box">
    {state => (
      <span aria-hidden="true">
        {state.checked() === undefined ? '–' : state.checked() ? '✓' : ''}
      </span>
    )}
  </CheckboxIndicator>
  <CheckboxLabel class="checkbox-label">Select all</CheckboxLabel>
</Checkbox>
```

Toggling from indeterminate produces `true`, which is the behaviour a
"select all" needs.

### Disabled

```tsx
<Checkbox class="checkbox" defaultChecked={false} disabled>
  <CheckboxIndicator class="checkbox-box" />
  <CheckboxLabel class="checkbox-label">Unavailable on your plan</CheckboxLabel>
</Checkbox>
```

```css
.checkbox[tc-disabled] {
  opacity: 0.5;
}

.checkbox[tc-disabled] .checkbox-box,
.checkbox[tc-disabled] .checkbox-label {
  cursor: not-allowed;
}
```

Because `tc-disabled` and `tc-checked` are also mirrored onto the label and the
description, you can dim just one part if you prefer.

### Drawing the mark in CSS

The indicator's contents are yours, so the tick can be pure CSS:

```tsx
<CheckboxIndicator class="checkbox-box" />
```

```css
.checkbox-box::after {
  content: "";
  inline-size: 0.3rem;
  block-size: 0.6rem;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  rotate: 45deg;
  opacity: 0;
}

.checkbox-box[tc-checked=""]::after { opacity: 1; }

/* A dash for the indeterminate state instead of a tick */
.checkbox-box[tc-checked="mixed"]::after {
  inline-size: 0.55rem;
  block-size: 0;
  border-width: 0 0 2px 0;
  rotate: none;
  opacity: 1;
}
```

### Switch layout

The same state, laid out as a switch:

```tsx
<Checkbox class="switch-row" defaultChecked={false}>
  <CheckboxLabel class="switch-label">Public profile</CheckboxLabel>
  <CheckboxIndicator class="switch">
    <span class="switch-thumb" />
  </CheckboxIndicator>
</Checkbox>
```

```css
.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.switch {
  display: inline-flex;
  align-items: center;
  inline-size: 2.75rem;
  block-size: 1.5rem;
  padding: 0.125rem;
  border: none;
  border-radius: 999px;
  background: #d4d4d8;
  cursor: pointer;
  transition: background 150ms ease;
}

.switch-thumb {
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: 50%;
  background: #ffffff;
  transition: translate 150ms ease;
}

.switch[tc-checked=""] { background: #16a34a; }
.switch[tc-checked=""] .switch-thumb { translate: 1.25rem 0; }

@media (prefers-reduced-motion: reduce) {
  .switch, .switch-thumb { transition: none; }
}
```

### Reading the state from elsewhere

```tsx
function CheckboxSummary(): JSX.Element {
  const state = useCheckState();
  return (
    <p class="hint">
      {state.checked() === undefined
        ? 'Some selected'
        : state.checked()
          ? 'All selected'
          : 'None selected'}
    </p>
  );
}
```

`<CheckStateChild>` does the same inline, without a separate component.

### In a form

`Checkbox` renders no `<input>`, so add a hidden one if the value must be
submitted natively:

```tsx
<Checkbox class="checkbox" checked={subscribed()} onChange={v => setSubscribed(!!v)}>
  <CheckboxIndicator class="checkbox-box" />
  <CheckboxLabel class="checkbox-label">Subscribe</CheckboxLabel>
  <input type="hidden" name="subscribe" value={subscribed() ? 'on' : ''} />
</Checkbox>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `Checkbox` | `tc-checkbox` | Always |
| `Checkbox` | `tc-checked` | `""` when checked, `"mixed"` when indeterminate, absent when unchecked |
| `Checkbox` | `tc-disabled` | The checkbox is disabled |
| `CheckboxIndicator` | `tc-checkbox-indicator`, `tc-button` | Always |
| `CheckboxIndicator` | `tc-checked`, `tc-disabled` | As above |
| `CheckboxLabel` | `tc-checkbox-label` | Always |
| `CheckboxLabel` | `tc-checked`, `tc-disabled` | As above |
| `CheckboxDescription` | `tc-checkbox-description` | Always |
| `CheckboxDescription` | `tc-checked`, `tc-disabled` | As above |

Every part carries the same state, so you can style from whichever element is
most convenient — the root for whole-row effects, the indicator for the box
itself.

`aria-checked` on the indicator carries the same three states as `true`, `false`
and `"mixed"`.

### Styling

```css
/* Three-state matching */
[tc-checkbox-indicator][tc-checked=""]      { /* checked */ }
[tc-checkbox-indicator][tc-checked="mixed"] { /* indeterminate */ }
[tc-checkbox-indicator]:not([tc-checked])   { /* unchecked */ }

/* Whole-row state from the root */
[tc-checkbox][tc-checked=""] [tc-checkbox-label] { color: #1d4ed8; }
[tc-checkbox][tc-disabled] { opacity: 0.5; }

/* Combine with pseudo-classes as usual */
[tc-checkbox-indicator]:hover:not([tc-disabled]) { border-color: #2563eb; }
```

### Reading the state in code

| Member | Type | Description |
| --- | --- | --- |
| `checked()` | `boolean \| undefined` | Current value; `undefined` is indeterminate. |
| `setState(value?)` | `(boolean \| undefined) => void` | Sets the value. |
| `check()` / `uncheck()` | `() => void` | Sets `true` / `false`. |
| `reset()` | `() => void` | Returns to indeterminate. |
| `toggle()` | `() => void` | Flips the value; from indeterminate this yields `true`. |
| `disabled()` | `boolean` | Whether the checkbox is disabled. |

Available as the render-prop argument on `Checkbox` and each of its parts,
through `<CheckStateChild>`, or with `useCheckState()` in any descendant. Full
reference in [check state](../states.md#check-state).

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggles the checkbox, when the indicator has focus |
| <kbd>Tab</kbd> | Focuses the indicator — the only focusable part |

The label is not a focus stop, but clicking it toggles the box through the native
`<label for>` relationship.

## API

### `<Checkbox>`

Owns the [check state](../states.md#check-state) and renders a `<div>` by
default. Does not take a `ref`, and has no role of its own — the role lives on
the indicator.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `defaultChecked` | `boolean \| undefined` | — | Initial value, uncontrolled. `undefined` starts indeterminate. Mutually exclusive with `checked`. |
| `checked` | `boolean \| undefined` | — | Current value, controlled. Mutually exclusive with `defaultChecked`. |
| `disabled` | `boolean` | `false` | Blocks every state change. |
| `onChange` | `(state?: boolean) => void` | — | Called with the new value; `undefined` means indeterminate. |
| `children` | `JSX.Element` \| `(state: CheckStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CheckboxIndicator>`

The interactive part. A [`Button`](./button.md) that toggles the state on click.
Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'button'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: CheckStateProperties) => JSX.Element` | — | The visual mark, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="checkbox"`, `aria-checked`,
`aria-labelledby` and `aria-describedby`.

### `<CheckboxLabel>`

Renders a `<label>` by default, with `for` pointing at the indicator. Does not
take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'label'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: CheckStateProperties) => JSX.Element` | — | Label text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<CheckboxDescription>`

Supporting text, referenced by the indicator's `aria-describedby`. Renders a
`<p>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'p'` | Element or component to render as. |
| `children` | `JSX.Element` \| `(state: CheckStateProperties) => JSX.Element` | — | Description text, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

All three descendants must be rendered inside a `<Checkbox>`; each throws with a
message naming itself if it is not.
