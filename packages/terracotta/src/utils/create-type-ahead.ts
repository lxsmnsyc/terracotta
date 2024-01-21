import { onCleanup } from 'solid-js';

const TYPE_AHEAD_DEBOUNCE_TIMEOUT = 250;

export default function createTypeAhead(
  callback: (value: string) => void,
  time = TYPE_AHEAD_DEBOUNCE_TIMEOUT,
): (value: string) => void {
  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return value => {
    characters += value;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(characters);
      characters = '';
    }, time);
  };
}
