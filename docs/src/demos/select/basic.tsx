import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import { Select, SelectOption } from 'terracotta/select';

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

export default function BasicSelect(): JSX.Element {
  const [selected, setSelected] = createSignal<Person | undefined>(PEOPLE[0]);

  return (
    <div class="stack">
      <Select<Person>
        class="select"
        value={selected()}
        onChange={setSelected}
        by={(a, b) => a.id === b.id}
      >
        <For each={PEOPLE}>
          {(person) => (
            <SelectOption class="select-option" value={person}>
              {person.name}
              <span class="select-tick" aria-hidden="true">
                ✓
              </span>
            </SelectOption>
          )}
        </For>
      </Select>
      <p class="hint">Assigned to {selected()?.name ?? 'nobody'}.</p>
    </div>
  );
}
