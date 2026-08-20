import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from 'terracotta';

const PEOPLE = ['ada', 'grace', 'katherine', 'margaret'];

export default function ComboboxCase(): JSX.Element {
  const [selected, setSelected] = createSignal<string | undefined>('ada');

  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <Combobox
        defaultOpen={false}
        value={selected()}
        onSelectChange={(value) => {
          setSelected(value);
        }}
        matchBy={(value: string, query) => value.toLowerCase().includes(query.toLowerCase())}
      >
        <ComboboxLabel>Assignee</ComboboxLabel>
        <ComboboxInput />
        <ComboboxOptions>
          {PEOPLE.map((person) => (
            <ComboboxOption value={person} disabled={person === 'katherine'}>
              {person}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
      <div data-testid="selection">{selected() ?? 'none'}</div>
      <button type="button" data-testid="after">
        After
      </button>
    </div>
  );
}
