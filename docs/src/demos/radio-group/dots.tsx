import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';

const OPTIONS = ['Weekly', 'Monthly', 'Never'];

export default function RadioDots(): JSX.Element {
  const [value, setValue] = createSignal('Weekly');

  return (
    <div class="stack">
      <RadioGroup<string>
        class="radiogroup"
        value={value()}
        onChange={(next) => next && setValue(next)}
      >
        <RadioGroupLabel class="radiogroup-label">Send me a summary</RadioGroupLabel>
        <For each={OPTIONS}>
          {(option) => (
            <RadioGroupOption class="radio-row" value={option}>
              <span class="radio-dot" aria-hidden="true" />
              <RadioGroupLabel class="radio-row-label">{option}</RadioGroupLabel>
            </RadioGroupOption>
          )}
        </For>
      </RadioGroup>
      <p class="hint">Chosen: {value()}</p>
    </div>
  );
}
