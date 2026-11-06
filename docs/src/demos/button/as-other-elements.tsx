import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';

/**
 * `as` decides the element. On anything that is not a `<button>`, Terracotta
 * adds the keyboard behaviour a button is expected to have.
 */
export default function ButtonAsOtherElements(): JSX.Element {
  const [activations, setActivations] = createSignal(0);

  return (
    <div class="stack">
      <Button class="button" as="a" href="#anchor">
        A link that behaves as a button
      </Button>

      <Button class="button" as="div" onClick={() => setActivations((n) => n + 1)}>
        A div: try Enter and Space
      </Button>
      <p class="hint">Activated {activations()} times.</p>
    </div>
  );
}
