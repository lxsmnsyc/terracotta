import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';

export default function BasicButton(): JSX.Element {
  const [saves, setSaves] = createSignal(0);

  return (
    <div class="stack">
      <Button class="button" onClick={() => setSaves((value) => value + 1)}>
        Save
      </Button>
      <p class="hint">Saved {saves()} times.</p>
    </div>
  );
}
