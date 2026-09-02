<!-- Generated from docs/ by scripts/sync-plugin-docs.mjs. Edit the source, not this copy. -->

# Tabs

A [tabbed interface](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) is a row of
tabs, each revealing a panel. Tabs follow the *automatic activation* model: the
arrow keys move focus and select at the same time, so the visible panel always
matches the focused tab.

```tsx
import { SelectStateChild, useSelectState } from 'terracotta/states';
import { TabGroup, TabList, Tab, TabPanel } from 'terracotta/tabs';
```

## Anatomy

```tsx
<TabGroup horizontal>{/* owns the selected value and the shared ids */}
  <TabList>          {/* role="tablist", handles arrow keys */}
    <Tab/>           {/* role="tab" */}
  </TabList>
  <TabPanel/>        {/* role="tabpanel", matched to a Tab by value */}
</TabGroup>
```

`Tab` and `TabPanel` are linked by their `value`, not by their position. The
group derives a stable pair of ids from each value, then wires `aria-controls`
and `aria-labelledby` from them. Panels therefore need not sit inside the tab
list, or even in the same order.

## Examples

### Horizontal

```tsx
<TabGroup<string> class="tabs" horizontal defaultValue="account">
  <TabList class="tablist">
    <Tab class="tab" value="account">Account</Tab>
    <Tab class="tab" value="billing">Billing</Tab>
    <Tab class="tab" value="team" disabled>Team</Tab>
  </TabList>

  <TabPanel class="tabpanel" value="account">Account settings…</TabPanel>
  <TabPanel class="tabpanel" value="billing">Billing settings…</TabPanel>
  <TabPanel class="tabpanel" value="team">Team settings…</TabPanel>
</TabGroup>
```

```css
.tabs {
  inline-size: 28rem;
}

.tablist {
  display: flex;
  gap: 0.25rem;
  border-block-end: 1px solid #e4e4e7;
}

.tab {
  border: none;
  border-block-end: 2px solid transparent;
  background: none;
  padding: 0.5rem 0.875rem;
  font: inherit;
  color: #52525b;
  cursor: pointer;
}

.tab:hover { color: #18181b; }

/* The visible tab */
.tab[tc-selected] {
  border-block-end-color: #2563eb;
  color: #1d4ed8;
  font-weight: 600;
}

.tab[tc-disabled] {
  color: #a1a1aa;
  cursor: not-allowed;
}

.tab:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}

.tabpanel { padding-block: 1rem; }
```

`horizontal` is required. It decides which arrow keys navigate, and what
`aria-orientation` reports.

### Vertical

```tsx
<TabGroup<string> class="tabs tabs-vertical" horizontal={false} defaultValue="general">
  <TabList class="tablist">
    <Tab class="tab" value="general">General</Tab>
    <Tab class="tab" value="advanced">Advanced</Tab>
  </TabList>
  <div class="tabs-content">
    <TabPanel class="tabpanel" value="general">…</TabPanel>
    <TabPanel class="tabpanel" value="advanced">…</TabPanel>
  </div>
</TabGroup>
```

```css
.tabs-vertical { display: flex; gap: 1.5rem; }

/* The orientation is published as ARIA, so one rule flips the layout */
.tablist[aria-orientation="vertical"] {
  flex-direction: column;
  inline-size: 10rem;
  border-block-end: none;
  border-inline-end: 1px solid #e4e4e7;
}

.tablist[aria-orientation="vertical"] .tab {
  border-block-end: none;
  border-inline-end: 2px solid transparent;
  text-align: start;
}

.tablist[aria-orientation="vertical"] .tab[tc-selected] {
  border-inline-end-color: #2563eb;
}

.tabs-content { flex: 1; }
```

### Controlled

Use this when the active tab lives in the URL, or when another control switches
tabs:

```tsx
const [tab, setTab] = createSignal('account');

<TabGroup<string>
  class="tabs"
  horizontal
  value={tab()}
  onChange={value => value && setTab(value)}
>
  …
</TabGroup>
```

### Object values

```tsx
interface Section { id: string; title: string }

<TabGroup<Section>
  class="tabs"
  horizontal
  defaultValue={sections[0]}
  by={(a, b) => a.id === b.id}
>
  <TabList class="tablist">
    <For each={sections}>
      {section => <Tab class="tab" value={section}>{section.title}</Tab>}
    </For>
  </TabList>
  <For each={sections}>
    {section => (
      <TabPanel class="tabpanel" value={section}>{/* … */}</TabPanel>
    )}
  </For>
</TabGroup>
```

### Keeping panels mounted

```tsx
<TabPanel class="tabpanel" value="billing" unmount={false}>
  {/* Stays in the DOM while other tabs are shown — keeps scroll position,
      form state, and anything else you would lose on unmount. */}
</TabPanel>
```

```css
.tabpanel:not([tc-selected]) { display: none; }
```

### Tabs with badges

```tsx
<Tab class="tab tab-rich" value="inbox">
  Inbox
  <span class="tab-badge">{unread()}</span>
</Tab>
```

```css
.tab-rich { display: inline-flex; align-items: center; gap: 0.5rem; }

.tab-badge {
  border-radius: 999px;
  background: #e4e4e7;
  padding: 0.0625rem 0.375rem;
  font-size: 0.75rem;
}

.tab[tc-selected] .tab-badge { background: #dbeafe; color: #1d4ed8; }
```

### Animating panel changes

```tsx
<SelectStateChild>
  {state => (
    <Transition
      show={state.isSelected('billing')}
      enter="panel-enter" enterFrom="panel-from" enterTo="panel-to"
    >
      <TabPanel class="tabpanel" value="billing" unmount={false}>…</TabPanel>
    </Transition>
  )}
</SelectStateChild>
```

```css
.panel-enter { transition: opacity 150ms ease-out, translate 150ms ease-out; }
.panel-from  { opacity: 0; translate: 0 0.25rem; }
.panel-to    { opacity: 1; translate: none; }
```

### Reading the active tab

```tsx
<TabGroup<string> class="tabs" horizontal defaultValue="account">
  {state => (
    <>
      <TabList class="tablist">
        <Tab class="tab" value="account">Account</Tab>
        <Tab class="tab" value="billing">Billing</Tab>
      </TabList>
      <p class="hint">
        {state.isSelected('billing') ? 'Billing is shown' : 'Account is shown'}
      </p>
    </>
  )}
</TabGroup>
```

## State attributes

| Element | Attribute | Present when |
| --- | --- | --- |
| `TabGroup` | `tc-tab-group` | Always |
| `TabGroup` | `tc-has-selected` | A tab is selected |
| `TabGroup` | `tc-has-active` | A tab holds keyboard focus |
| `TabGroup` | `tc-disabled` | The group is disabled |
| `TabList` | `tc-tab-list` | Always |
| `TabList` | `tc-has-selected`, `tc-has-active` | Mirrors the group |
| `Tab` | `tc-tab`, `tc-button`, `tc-owner` | Always |
| `Tab` | `tc-selected` | This tab is the active one |
| `Tab` | `tc-active` | This tab holds keyboard focus |
| `Tab` | `tc-disabled` | This tab or the group is disabled |
| `TabPanel` | `tc-tab-panel` | Always (whenever rendered) |
| `TabPanel` | `tc-selected` | Its tab is selected |
| `TabPanel` | `tc-active` | Its tab holds keyboard focus |

Focusing a tab also selects it, so `tc-selected` and `tc-active` usually agree
here. They diverge in [`Select`](./select.md), where browsing does not change
the value.

`TabList` reports orientation through `aria-orientation`. `Tab` carries
`aria-selected`.

### Styling

```css
[tc-tab][tc-selected] { border-block-end-color: #2563eb; font-weight: 600; }
[tc-tab][tc-disabled] { color: #a1a1aa; cursor: not-allowed; }

/* With unmount={false}, you own panel visibility */
[tc-tab-panel]:not([tc-selected]) { display: none; }

/* Orientation drives the whole layout */
[tc-tab-list][aria-orientation="vertical"] { flex-direction: column; }
```

### Reading the state in code

On the group and list — the [select state](../states.md#select-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected(value)` | `(V) => boolean` | Whether that tab is active. |
| `select(value)` | `(V) => void` | Switches to that tab. |
| `hasSelected()` | `boolean` | Whether any tab is active. |
| `isActive(value)` / `hasActive()` | | Keyboard focus position. |
| `disabled()` | `boolean` | Whether the group is disabled. |

Inside a `Tab` or `TabPanel` — the
[select option state](../states.md#select-option-state):

| Member | Type | Description |
| --- | --- | --- |
| `isSelected()` | `boolean` | Whether this tab or panel is the active one. |
| `select()` | `() => void` | Switches to it. |
| `isActive()` | `boolean` | Whether it holds keyboard focus. |
| `disabled()` | `boolean` | Whether it is disabled. |

## Keyboard

Handled on `TabList`:

| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Next / previous tab, wrapping around (horizontal) |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Next / previous tab, wrapping around (vertical) |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last tab |
| <kbd>Tab</kbd> | Leaves the tab list — only the selected tab is in the tab order |

Moving focus to a tab selects it. Disabled tabs are skipped.

## API

### `<TabGroup>`

Owns a single-selection [select state](../states.md#select-state) and renders a
`<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `horizontal` | `boolean` | *required* | Orientation of the tab list. |
| `defaultValue` | `V` | — | Initially selected tab, uncontrolled. Mutually exclusive with `value`. |
| `value` | `V` | — | Currently selected tab, controlled. Mutually exclusive with `defaultValue`. |
| `onChange` | `(value?: V) => void` | — | Called with the newly selected value. |
| `toggleable` | `boolean` | `false` | Allow deselecting the active tab, leaving no panel shown. Rarely what you want for tabs. |
| `disabled` | `boolean` | `false` | Disables the whole group. |
| `by` | `(a: V, b: V) => boolean` | reference equality | Compares values. Needed for object values. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | — | The list and panels, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

### `<TabList>`

The row (or column) of tabs. Renders a `<div>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectStateProperties<V>) => JSX.Element` | — | The tabs, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="tablist"` and `aria-orientation`.

### `<Tab>`

One tab. A [`Button`](./button.md) with `role="tab"`, rendered as a `<div>` by
default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `value` | `V` | *required* | Identifies the tab and links it to the `TabPanel` with the same value. |
| `disabled` | `boolean` | `false` | Disables this tab and removes it from navigation. |
| `ref` | `DynamicNode<T>` \| `(el) => void` | — | Handle to the rendered element. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Label, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="tab"`, `aria-selected`, `aria-controls`, a
derived `id`, and `tabindex`, which is `0` while selected and `-1` otherwise.

### `<TabPanel>`

The content for one tab. Renders a `<div>` by default. Does not take a `ref`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidConstructor` | `'div'` | Element or component to render as. |
| `value` | `V` | *required* | Must match the `value` of its `Tab`. |
| `unmount` | `boolean` | `true` | Whether the panel is removed from the DOM when its tab is not selected. |
| `children` | `JSX.Element` \| `(state: SelectOptionStateProperties) => JSX.Element` | — | Contents, or a render prop. |
| *…rest* | props of `as` | — | Forwarded to the rendered element. |

Rendered attributes include `role="tabpanel"`, `aria-labelledby`, a derived
`id`, and `tabindex`, which is `0` while selected and `-1` otherwise.

`TabList`, `Tab` and `TabPanel` throw outside a `<TabGroup>`. `Tab` also
requires a `<TabList>`.
