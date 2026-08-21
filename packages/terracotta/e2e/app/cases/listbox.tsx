import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from 'terracotta/listbox';

const FRUITS = ['apple', 'banana', 'cherry', 'durian'];

export default function ListboxCase(): JSX.Element {
  const [selected, setSelected] = createSignal('apple');

  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <Listbox
        defaultOpen={false}
        value={selected()}
        onSelectChange={(value) => {
          if (value) {
            setSelected(value);
          }
        }}
      >
        <ListboxLabel>Fruit</ListboxLabel>
        <ListboxButton>Pick one</ListboxButton>
        <ListboxOptions>
          {FRUITS.map((fruit) => (
            <ListboxOption value={fruit} disabled={fruit === 'cherry'}>
              {fruit}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <div data-testid="selection">{selected()}</div>
    </div>
  );
}
