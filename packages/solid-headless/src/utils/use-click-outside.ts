import { createEffect, onCleanup } from 'solid-js';

export default function useClickOutside(
  ref: () => HTMLElement | undefined | null,
  callback: () => void,
): void {
  createEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = ref();
      const { target } = e;
      if (el && target && !el.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', onClick);
    onCleanup(() => {
      document.removeEventListener('click', onClick);
    });
  });
}
