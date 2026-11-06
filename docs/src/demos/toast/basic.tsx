import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { Toast, Toaster, ToasterStore, useToaster } from 'terracotta/toast';

interface Notice {
  title: string;
  tone: 'info' | 'success' | 'error';
}

// Created once, outside any component: the queue outlives every render.
const notices = new ToasterStore<Notice>();

export default function BasicToast(): JSX.Element {
  const queue = useToaster(notices);

  return (
    <div class="stack">
      <div class="row">
        <button
          type="button"
          class="button"
          onClick={() => notices.create({ title: 'Project saved', tone: 'success' })}
        >
          Success
        </button>
        <button
          type="button"
          class="button"
          onClick={() => notices.create({ title: 'Could not reach the server', tone: 'error' })}
        >
          Error
        </button>
        <button type="button" class="button" onClick={() => notices.clear()}>
          Clear
        </button>
      </div>

      <Toaster class="toaster">
        <For each={queue()}>
          {(item) => (
            <Toast class="toast" data-tone={item.data.tone}>
              <p class="toast-title">{item.data.title}</p>
              <button
                type="button"
                class="toast-dismiss"
                aria-label="Dismiss"
                onClick={() => notices.remove(item.id)}
              >
                ×
              </button>
            </Toast>
          )}
        </For>
      </Toaster>
    </div>
  );
}
