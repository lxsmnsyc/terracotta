# Terracotta recipes

Complete, compiling examples for the components that come up most. Every snippet
here is typechecked against Terracotta 2.x. Styles are omitted — the class names
are yours to fill in.

Read [SKILL.md](../SKILL.md) first for the conventions these rely on.

## Dialog

A modal with a focus trap. The close button matters: it gives the panel
something focusable the moment it opens, which is what puts focus inside the
dialog as the ARIA pattern expects.

```tsx
import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from 'terracotta/dialog';

export function DeleteDialog(): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      <Dialog isOpen={open()} onClose={() => setOpen(false)} class="dialog">
        {/* Fixed, full-screen, and painted behind the panel. */}
        <DialogOverlay class="dialog-overlay" />
        {/* `position: relative` keeps the panel above the overlay; without it
            the overlay covers the panel and swallows its clicks. */}
        <DialogPanel class="dialog-panel">
          <DialogTitle as="h2">Delete file</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Delete</Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
```

## Listbox

A dropdown select. `Listbox` owns two states, so its callbacks are
`onSelectChange` and `onDisclosureChange` rather than a single `onChange`. Pass
`by` whenever the values are objects, so selection compares identity rather than
reference.

```tsx
import type { JSX } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from 'terracotta/listbox';

interface Person {
  id: number;
  name: string;
}

const PEOPLE: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
];

export function Assignee(): JSX.Element {
  const [selected, setSelected] = createSignal(PEOPLE[0]);

  return (
    <Listbox<Person>
      class="listbox"
      defaultOpen={false}
      value={selected()}
      onSelectChange={value => value && setSelected(value)}
      by={(a, b) => a.id === b.id}
    >
      <ListboxLabel>Assignee</ListboxLabel>
      <ListboxButton>{selected().name}</ListboxButton>
      <ListboxOptions>
        <For each={PEOPLE}>
          {person => (
            <ListboxOption class="option" value={person}>
              {person.name}
            </ListboxOption>
          )}
        </For>
      </ListboxOptions>
    </Listbox>
  );
}
```

Style the option highlight from `[tc-active]` and the current value from
`[tc-selected]`.

## Combobox

A text input with a filtered popup. `matchBy` decides which options survive the
query; the query itself is debounced, and options that match carry `tc-matches`.
Navigation is virtual — DOM focus stays on the input — so style the highlight
from `[tc-active]`, never `:focus`.

```tsx
import type { JSX } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from 'terracotta/combobox';

const PEOPLE = ['ada', 'grace', 'katherine', 'margaret'];

export function PersonPicker(): JSX.Element {
  const [selected, setSelected] = createSignal<string>();

  return (
    <Combobox<string>
      class="combobox"
      defaultOpen={false}
      value={selected()}
      onSelectChange={setSelected}
      matchBy={(value, query) => value.toLowerCase().includes(query.toLowerCase())}
    >
      <ComboboxLabel>Person</ComboboxLabel>
      <ComboboxInput />
      <ComboboxOptions>
        <For each={PEOPLE}>
          {person => (
            <ComboboxOption class="option" value={person}>
              {person}
            </ComboboxOption>
          )}
        </For>
      </ComboboxOptions>
    </Combobox>
  );
}
```

Hide the options that do not match in CSS: `.option:not([tc-matches])
{ display: none; }`.

## Tabs

`TabPanel` is matched to its `Tab` by `value`, so the two lists stay in sync
without ids.

```tsx
import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta/tabs';

const SECTIONS = ['Overview', 'Activity', 'Settings'];

export function Sections(): JSX.Element {
  return (
    <TabGroup<string> horizontal defaultValue={SECTIONS[0]}>
      <TabList>
        <For each={SECTIONS}>
          {section => (
            <Tab class="tab" value={section}>
              {section}
            </Tab>
          )}
        </For>
      </TabList>
      <For each={SECTIONS}>
        {section => <TabPanel value={section}>{section} content</TabPanel>}
      </For>
    </TabGroup>
  );
}
```

## Popover with a transition

`Transition` only adds and removes classes; the animation is yours. Wrap the
panel and give the panel `unmount={false}` so it survives the leave.

```tsx
import type { JSX } from '@solidjs/web';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';
import { Transition } from 'terracotta/transition';

export function Menu(): JSX.Element {
  return (
    <Popover defaultOpen={false} class="popover">
      {({ isOpen }) => (
        <>
          <PopoverButton>Options</PopoverButton>
          <Transition
            show={isOpen()}
            enter="fade"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="fade"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <PopoverPanel unmount={false} class="popover-panel">
              <button type="button">Rename</button>
              <button type="button">Duplicate</button>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
```

The leaving element is marked `inert` while it fades, so its buttons leave the
tab order before they disappear. A `TransitionChild` inside an already-open
`Transition` needs `appear` to run its enter on the first render.

## Toasts

The queue is a `ToasterStore` created outside the component tree, so anything
can raise a toast without prop drilling.

```tsx
import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { Toast, Toaster, ToasterStore, useToaster } from 'terracotta/toast';

interface Notice {
  title: string;
  tone: 'info' | 'error';
}

export const notices = new ToasterStore<Notice>();

export function Notifications(): JSX.Element {
  const queue = useToaster(notices);

  return (
    <Toaster class="toaster">
      <For each={queue()}>
        {item => (
          <Toast class="toast" data-tone={item.data.tone}>
            <p>{item.data.title}</p>
            <button type="button" aria-label="Dismiss" onClick={() => notices.remove(item.id)}>
              ×
            </button>
          </Toast>
        )}
      </For>
    </Toaster>
  );
}

// Anywhere else:
// notices.create({ title: 'Saved', tone: 'info' });
```

## Tri-state checkbox

`checked` accepts `undefined` for indeterminate, which surfaces as
`tc-checked="mixed"`.

```tsx
import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from 'terracotta/checkbox';

export function SelectAll(): JSX.Element {
  const [checked, setChecked] = createSignal<boolean | undefined>(undefined);

  return (
    <Checkbox checked={checked()} onChange={setChecked}>
      <CheckboxIndicator class="indicator" />
      <CheckboxLabel>Select all</CheckboxLabel>
      <CheckboxDescription>Some rows are already selected</CheckboxDescription>
    </Checkbox>
  );
}
```

```css
.indicator[tc-checked=""] { /* checked */ }
.indicator[tc-checked="mixed"] { /* indeterminate */ }
.indicator:not([tc-checked]) { /* unchecked */ }
```

## Reading a component's state from a descendant

Rather than threading a render prop down, read the state from context. The hook
throws if used outside its component, with a message naming both.

```tsx
import type { JSX } from '@solidjs/web';
import { Dialog, DialogPanel, DialogTitle } from 'terracotta/dialog';
import { useDisclosureState } from 'terracotta/states';

function CloseButton(): JSX.Element {
  const state = useDisclosureState();
  return (
    <button type="button" onClick={() => state.close()}>
      Close
    </button>
  );
}

export function Sheet(): JSX.Element {
  return (
    <Dialog defaultOpen>
      <DialogPanel>
        <DialogTitle as="h2">Settings</DialogTitle>
        <CloseButton />
      </DialogPanel>
    </Dialog>
  );
}
```

## Building on a state primitive

The stores are exported on their own, so a component of your own can carry
Terracotta behaviour without any of its markup.

```tsx
import type { JSX } from '@solidjs/web';
import { createDisclosureState, DisclosureStateChild } from 'terracotta/states';

export function Drawer(props: { children: JSX.Element }): JSX.Element {
  createDisclosureState({ defaultOpen: false });

  return (
    <DisclosureStateChild>
      {state => (
        <aside data-open={state.isOpen() ? '' : undefined}>
          <button type="button" onClick={() => state.toggle()}>
            Toggle
          </button>
          {props.children}
        </aside>
      )}
    </DisclosureStateChild>
  );
}
```
