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
 * Pass `false` where assuming the part is there would say something wrong,
 * such as calling a leaf of a tree a parent.
 */
export function createPresence(assumeOnServer = true): Presence {
  if (isServer) {
    return {
      isPresent: () => assumeOnServer,
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
