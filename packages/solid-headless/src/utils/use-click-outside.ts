import { createEffect, onCleanup } from 'solid-js';

export default function useClickOutside(
  ref: () => HTMLElement | undefined | null,
  callback: () => void,
  anchor?: () => HTMLElement | undefined | null,
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
      const anchorEl = anchor?.();
      const contains = el
        && target
        && !el.contains(target as Node)
        && ((anchorEl && !anchorEl.contains(target as Node)) || (!anchorEl));

      if (contains) {
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
