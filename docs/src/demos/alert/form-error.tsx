import type { JSX } from '@solidjs/web';
import { Show, createSignal } from 'solid-js';
import { Alert } from 'terracotta/alert';

export default function FormErrorAlert(): JSX.Element {
  const [error, setError] = createSignal<string>();

  return (
    <div class="stack">
      <Show when={error()}>{(message) => <Alert class="alert">{message()}</Alert>}</Show>

      <button
        type="button"
        class="button"
        onClick={() => setError('Could not reach the server. Your changes are not saved.')}
      >
        Trigger a failure
      </button>
      <button type="button" class="button" onClick={() => setError(undefined)}>
        Clear
      </button>
      <p class="hint">
        The alert is only rendered once there is something to say, so the live region announces on
        arrival rather than on every keystroke.
      </p>
    </div>
  );
}
