import type { JSX } from '@solidjs/web';
import { Toggle } from 'terracotta/toggle';

/**
 * A switch is a `Toggle` plus CSS. The knob moves because the theme styles
 * `[tc-pressed]`; no second signal, no class juggling.
 */
export default function SwitchToggle(): JSX.Element {
  return (
    <div class="stack">
      <Toggle class="switch" defaultPressed={false}>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Aeroplane mode</span>
      </Toggle>

      <Toggle class="switch" defaultPressed disabled>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Locked by your administrator</span>
      </Toggle>
    </div>
  );
}
