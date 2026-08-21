import { createRoot } from 'solid-js';

/**
 * Creates a reactive value inside a root and hands it back with the disposer,
 * so the test can write to it from *outside* the owner. Solid 2 rejects a
 * signal write made inside an owned scope (`REACTIVE_WRITE_IN_OWNED_SCOPE`),
 * which is what calling a state's setter inside `createRoot` would be. A real
 * component writes from an event handler, which is outside the owner too.
 */
export function withRoot<T>(create: () => T): [T, () => void] {
  let dispose!: () => void;
  const value = createRoot((disposer) => {
    dispose = disposer;
    return create();
  });
  return [value, dispose];
}
