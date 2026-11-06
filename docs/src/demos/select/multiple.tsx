import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import { Select, SelectOption } from 'terracotta/select';

const LABELS = ['Bug', 'Documentation', 'Enhancement', 'Question'];

export default function MultipleSelect(): JSX.Element {
  const [values, setValues] = createSignal<string[]>(['Bug']);

  return (
    <div class="stack">
      <Select<string> class="select" multiple value={values()} onChange={setValues}>
        <For each={LABELS}>
          {(label) => (
            <SelectOption class="select-option" value={label}>
              {label}
              <span class="select-tick" aria-hidden="true">
                ✓
              </span>
            </SelectOption>
          )}
        </For>
      </Select>
      <p class="hint">{values().length ? values().join(', ') : 'No labels'}</p>
    </div>
  );
}
