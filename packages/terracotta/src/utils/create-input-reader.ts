import { createSignal, onCleanup } from 'solid-js';

const INPUT_READER_DEBOUNCE_TIMEOUT = 250;

export default function createInputReader(
  time = INPUT_READER_DEBOUNCE_TIMEOUT,
): [read: () => string, write: (value: string) => void] {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  const [signal, setSignal] = createSignal<string>('');

  return [
    signal,
    value => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setSignal(value);
      }, time);
    },
  ];
}
