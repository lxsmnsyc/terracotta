import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from 'terracotta/checkbox';

const LABELS = ['Comments', 'Mentions', 'Weekly digest'];

/** Three states, three glyphs — keyed by the value the state reports. */
const MARKS: Record<string, string> = { true: '✓', false: '', undefined: '–' };

/**
 * `undefined` is the third state. It renders as `aria-checked="mixed"` and
 * `tc-checked="mixed"`, which is what the parent box below reads.
 */
export default function IndeterminateCheckbox(): JSX.Element {
  const [items, setItems] = createSignal([true, false, true]);

  const parentState = (): boolean | undefined => {
    const all = items();
    if (all.every(Boolean)) {
      return true;
    }
    if (all.every((value) => !value)) {
      return false;
    }
    return undefined;
  };

  return (
    <div class="stack">
      <Checkbox
        class="checkbox"
        checked={parentState()}
        onChange={(next) => setItems(items().map(() => !!next))}
      >
        <CheckboxIndicator class="checkbox-box">
          {(state) => <span aria-hidden="true">{MARKS[String(state.checked())] ?? ''}</span>}
        </CheckboxIndicator>
        <CheckboxLabel class="checkbox-label">All notifications</CheckboxLabel>
      </Checkbox>

      <div class="checkbox-children">
        <For each={LABELS}>
          {(label, index) => (
            <Checkbox
              class="checkbox"
              checked={items()[index()] ?? false}
              onChange={(next) =>
                setItems((current) => current.map((value, i) => (i === index() ? !!next : value)))
              }
            >
              <CheckboxIndicator class="checkbox-box">
                {(state) => <span aria-hidden="true">{state.checked() ? '✓' : ''}</span>}
              </CheckboxIndicator>
              <CheckboxLabel class="checkbox-label">{label}</CheckboxLabel>
            </Checkbox>
          )}
        </For>
      </div>
    </div>
  );
}
