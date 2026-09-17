import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { Alert } from 'terracotta/alert';

export default function AlertSeverity(): JSX.Element {
  const levels = ['info', 'warning', 'danger'] as const;

  return (
    <div class="stack">
      <For each={levels}>
        {(level) => (
          <Alert class="alert" data-severity={level}>
            This one is styled from <code>data-severity="{level}"</code>.
          </Alert>
        )}
      </For>
    </div>
  );
}
