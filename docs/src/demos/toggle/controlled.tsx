import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Toggle } from 'terracotta/toggle';

export default function ControlledToggle(): JSX.Element {
  const [muted, setMuted] = createSignal(false);

  return (
    <div class="stack">
      <Toggle class="toggle" pressed={muted()} onChange={setMuted}>
        {muted() ? 'Unmute' : 'Mute'}
      </Toggle>
      <button type="button" class="button" onClick={() => setMuted((value) => !value)}>
        Toggle from outside
      </button>
      <p class="hint">
        Nothing changes on screen until <code>setMuted</code> runs.
      </p>
    </div>
  );
}
