import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
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
  { id: 4, name: 'Tom Cook' },
];

export default function BasicListbox(): JSX.Element {
  const [selected, setSelected] = createSignal<Person>(PEOPLE[0]!);

  return (
    <Listbox<Person>
      class="listbox"
      defaultOpen={false}
      value={selected()}
      onSelectChange={(value) => value && setSelected(value)}
      by={(a, b) => a.id === b.id}
    >
      <ListboxLabel class="listbox-label">Assignee</ListboxLabel>
      <ListboxButton class="listbox-button">
        <span class="listbox-value">{selected().name}</span>
        <span class="listbox-caret" aria-hidden="true">
          ▾
        </span>
      </ListboxButton>
      <ListboxOptions class="listbox-options">
        <For each={PEOPLE}>
          {(person) => (
            <ListboxOption class="listbox-option" value={person}>
              {person.name}
            </ListboxOption>
          )}
        </For>
      </ListboxOptions>
    </Listbox>
  );
}
