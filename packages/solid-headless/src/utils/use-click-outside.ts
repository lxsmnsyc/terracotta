import { createEffect, onCleanup } from 'solid-js';

export default function useClickOutside(
  ref: () => HTMLElement | undefined | null,
  callback: () => void,
): void {
  createEffect(() => {
    let alive = true;
    const onClick = (e: Event) => {
      if (!alive) {
        return;
      }
      const el = ref();
      const { target, type } = e;
      const isTouch = type === 'touchend';
      if (type === 'click' && isTouch) {
        return;
      }
      if (el && target && !el.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('touchend', onClick, true);
    onCleanup(() => {
      alive = false;
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('touchend', onClick, true);
    });
  });
}
