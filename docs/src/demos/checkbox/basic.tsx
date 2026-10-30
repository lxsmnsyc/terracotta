import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from 'terracotta/checkbox';

export default function BasicCheckbox(): JSX.Element {
  return (
    <div class="stack">
      <Checkbox class="checkbox" defaultChecked={false}>
        <CheckboxIndicator class="checkbox-box">
          {(state) => (
            <Show when={state.checked()}>
              <span aria-hidden="true">✓</span>
            </Show>
          )}
        </CheckboxIndicator>
        <div class="checkbox-text">
          <CheckboxLabel class="checkbox-label">Email notifications</CheckboxLabel>
          <CheckboxDescription class="checkbox-description">
            We will only write when something needs your attention.
          </CheckboxDescription>
        </div>
      </Checkbox>

      <Checkbox class="checkbox" defaultChecked={false} disabled>
        <CheckboxIndicator class="checkbox-box" />
        <CheckboxLabel class="checkbox-label">Unavailable on your plan</CheckboxLabel>
      </Checkbox>
    </div>
  );
}
