import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';

export default function DisabledButton(): JSX.Element {
  const [saving, setSaving] = createSignal(true);

  return (
    <div class="stack">
      <Button class="button" disabled={saving()}>
        {saving() ? 'Saving…' : 'Save'}
      </Button>
      <button type="button" class="button" onClick={() => setSaving((value) => !value)}>
        {saving() ? 'Finish saving' : 'Start saving'}
      </button>
      <p class="hint">
        While disabled the element leaves the tab order and carries <code>tc-disabled</code>.
      </p>
    </div>
  );
}
