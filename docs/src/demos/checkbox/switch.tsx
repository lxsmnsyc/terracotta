import type { JSX } from '@solidjs/web';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from 'terracotta/checkbox';

/**
 * The same component, laid out as a switch. Everything that moves is driven by
 * `[tc-checked]` in CSS.
 */
export default function CheckboxSwitch(): JSX.Element {
  return (
    <div class="stack">
      <Checkbox class="checkbox-switch" defaultChecked>
        <CheckboxLabel class="checkbox-label">Share anonymous usage data</CheckboxLabel>
        <CheckboxIndicator class="switch-track">
          <span class="switch-knob" />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  );
}
