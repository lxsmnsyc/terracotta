import { isServer } from '@solidjs/web';
import { createSignal, createUniqueId, onSettled } from 'solid-js';

export interface PartID {
  /** The id of the part: the one it was given, or a generated one. */
  id: () => string;
  /** Called by the part as it renders, with the `id` prop it was given. */
  register: (id: () => string | undefined) => void;
}

/**
 * The id of a part that another element points at, such as a label for
 * `aria-labelledby`. A part given its own `id` keeps it, and the reference
 * follows it.
 *
 * The part registers once it has mounted, which never happens on the server.
 * The server therefore renders the reference with the generated id. The client
 * moves it to the given id after hydration.
 */
export function createPartID(): PartID {
  const generated = createUniqueId();
  if (isServer) {
    return {
      id: () => generated,
      register: () => undefined,
    };
  }
  const [source, setSource] = createSignal<() => string | undefined>();
  return {
    id: () => source()?.() ?? generated,
    register(id): void {
      onSettled(() => {
        setSource(() => id);
        return () => {
          setSource(undefined);
        };
      });
    },
  };
}
