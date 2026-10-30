import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from 'terracotta/listbox';

const LABELS = ['Bug', 'Documentation', 'Enhancement', 'Question', 'Wontfix'];

export default function MultipleListbox(): JSX.Element {
  const [values, setValues] = createSignal<string[]>(['Bug', 'Question']);

  return (
    <Listbox<string>
      class="listbox"
      defaultOpen={false}
      multiple
      value={values()}
      onSelectChange={setValues}
    >
      <ListboxLabel class="listbox-label">Labels</ListboxLabel>
      <ListboxButton class="listbox-button">
        <span class="listbox-value">{values().length ? values().join(', ') : 'Choose labels'}</span>
        <span class="listbox-caret" aria-hidden="true">
          ▾
        </span>
      </ListboxButton>
      <ListboxOptions class="listbox-options">
        <For each={LABELS}>
          {(label) => (
            <ListboxOption class="listbox-option" value={label}>
              {label}
            </ListboxOption>
          )}
        </For>
      </ListboxOptions>
    </Listbox>
  );
}
