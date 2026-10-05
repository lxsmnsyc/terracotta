import { isServer } from '@solidjs/web';
import { createSignal, onSettled } from 'solid-js';

export interface Presence {
  /** Whether at least one part is mounted. */
  isPresent: () => boolean;
  /** Called by a part as it renders. It counts until the part is disposed. */
  register: () => void;
}

/**
 * Tracks whether a part such as a label is mounted, so the element that
 * points at it by id can drop the reference while it is missing.
 *
 * Parts register once they have mounted, which never happens on the server.
 * The server therefore assumes the part is present, so the rendered HTML keeps
 * the reference. The client drops it after hydration if the part is missing.
 */
export function createPresence(): Presence {
  if (isServer) {
    return {
      isPresent: () => true,
      register: () => undefined,
    };
  }
  const [count, setCount] = createSignal(0);
  return {
    isPresent: () => count() > 0,
    register(): void {
      onSettled(() => {
        setCount((value) => value + 1);
        return () => {
          setCount((value) => value - 1);
        };
      });
    },
  };
}
