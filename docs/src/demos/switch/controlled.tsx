import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Switch } from 'terracotta/switch';

export default function ControlledSwitch(): JSX.Element {
  const [enabled, setEnabled] = createSignal(true);

  return (
    <div class="stack">
      <Switch class="switch" checked={enabled()} onChange={setEnabled}>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Notifications</span>
      </Switch>
      <p class="hint">Notifications are {enabled() ? 'on' : 'off'}.</p>
    </div>
  );
}
