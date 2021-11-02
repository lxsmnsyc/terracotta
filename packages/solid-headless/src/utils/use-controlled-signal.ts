import { Accessor, createSignal } from 'solid-js';

export default function useControlledSignal<T>(
  initialValue: T,
  read: Accessor<T> | undefined,
  write: (value: T) => void,
): [Accessor<T>, (value: T) => void] {
  if (read) {
    return [read, write];
  }
  const [signal, setSignal] = createSignal(initialValue);
  return [
    signal,
    (value: T) => {
      write(value);
      setSignal(() => value);
    },
  ];
}
