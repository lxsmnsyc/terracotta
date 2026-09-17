import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Toggle } from 'terracotta/toggle';

export default function BasicToggle(): JSX.Element {
  const [bold, setBold] = createSignal(false);

  return (
    <div class="stack">
      <Toggle class="toggle" defaultPressed={false} onChange={setBold}>
        Bold
      </Toggle>
      <p class="hint" style={{ 'font-weight': bold() ? '700' : '400' }}>
        The sample text follows the button’s pressed state.
      </p>
    </div>
  );
}
