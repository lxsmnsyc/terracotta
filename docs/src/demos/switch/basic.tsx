import type { JSX } from '@solidjs/web';
import { Switch } from 'terracotta/switch';

/**
 * The knob moves because the theme styles `[tc-checked]`. The text inside the
 * switch is its label.
 */
export default function BasicSwitch(): JSX.Element {
  return (
    <div class="stack">
      <Switch class="switch" defaultChecked={false}>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Aeroplane mode</span>
      </Switch>

      <Switch class="switch" defaultChecked disabled>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Locked by your administrator</span>
      </Switch>
    </div>
  );
}
