import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from 'terracotta/combobox';

interface Person {
  id: number;
  name: string;
}

const PEOPLE: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
];

export default function BasicCombobox(): JSX.Element {
  const [selected, setSelected] = createSignal<Person>(PEOPLE[0]!);

  return (
    <Combobox<Person>
      class="combobox"
      defaultOpen={false}
      value={selected()}
      onSelectChange={(value) => value && setSelected(value)}
      by={(a, b) => a.id === b.id}
      matchBy={(person, query) => person.name.toLowerCase().includes(query.toLowerCase())}
    >
      <ComboboxLabel class="combobox-label">Assignee</ComboboxLabel>
      <ComboboxInput class="combobox-input" placeholder="Search people…" />
      <ComboboxOptions class="combobox-options">
        <For each={PEOPLE}>
          {(person) => (
            <ComboboxOption class="combobox-option" value={person}>
              {person.name}
            </ComboboxOption>
          )}
        </For>
      </ComboboxOptions>
    </Combobox>
  );
}
