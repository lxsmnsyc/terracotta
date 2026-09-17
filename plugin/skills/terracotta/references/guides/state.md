<!-- Generated from docs/content by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# State

Who owns a component's state, and how you read it back out.

## Controlled and uncontrolled

Stateful components come in two shapes. Terracotta picks between them by looking
at which prop you passed:

| Uncontrolled prop | Controlled prop | Used by |
| --- | --- | --- |
| `defaultOpen` | `isOpen` | Disclosure, Dialog, AlertDialog, Popover, ContextMenu, CommandBar, Listbox, Combobox |
| `defaultValue` | `value` | Accordion, Select, Listbox, Combobox, Command, RadioGroup, TabGroup |
| `defaultChecked` | `checked` | Checkbox |
| `defaultPressed` | `pressed` | Toggle |

**Uncontrolled**: the component owns a signal and updates itself. `onChange`
only tells you what happened.

**Controlled**: the component never writes state. It calls `onChange`, and
nothing moves on screen until you update the value you passed in.

```tsx
// Uncontrolled: works on its own
<Disclosure defaultOpen={false}>…</Disclosure>

// Controlled: you own the signal
const [open, setOpen] = createSignal(false);
<Disclosure isOpen={open()} onChange={setOpen}>…</Disclosure>
```

The choice is made once, when the component is created. Do not switch a
component from `defaultOpen` to `isOpen` at runtime.

A controlled component whose value never changes will not move. If a click seems
to do nothing, check that `onChange` writes back to the signal you pass in.

## Render props

`children` can be a function. It receives the component's state, so you can read
that state without reaching for context:

```tsx
<Disclosure defaultOpen={false}>
  {({ isOpen, toggle }) => (
    <>
      <DisclosureButton>{isOpen() ? 'Hide' : 'Show'}</DisclosureButton>
      <DisclosurePanel>Content</DisclosurePanel>
    </>
  )}
</Disclosure>
```

Two details are worth knowing:

- On **root** components, the ones that create the state, any function child is
  called with the state.
- On **descendant** components, a function counts as a render prop only if it
  declares exactly one parameter. `() => <span />` renders as-is.
  `state => <span />` is called with the state.

## Reaching the state from further away

The same states are available through the `…StateChild` components and
`use…State()` hooks in [states.md](../states.md). Use those when the markup that
needs the state sits several components below the root, where threading a render
prop down would only add noise.

```tsx
function CloseButton() {
  const state = useDisclosureState();
  return <button onClick={() => state.close()}>Close</button>;
}
```

Every component page names the state it owns, so you know which hook applies.
