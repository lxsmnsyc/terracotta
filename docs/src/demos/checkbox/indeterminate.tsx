import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from 'terracotta/checkbox';
import { CheckIcon, MinusIcon } from '../../lib/icons';

const LABELS = ['Comments', 'Mentions', 'Weekly digest'];

/** Three states, three marks: a tick, nothing, or a dash for mixed. */
function markFor(checked: boolean | undefined): JSX.Element {
  if (checked === undefined) {
    return <MinusIcon />;
  }
  return checked ? <CheckIcon /> : null;
}

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
          {(state) => markFor(state.checked())}
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
                {(state) => markFor(state.checked())}
              </CheckboxIndicator>
              <CheckboxLabel class="checkbox-label">{label}</CheckboxLabel>
            </Checkbox>
          )}
        </For>
      </div>
    </div>
  );
}
