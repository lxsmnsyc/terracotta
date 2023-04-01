import { createMemo, JSX } from 'solid-js';

export default function createShow<T>(
  when: () => T,
  children: () => JSX.Element,
  fallback?: () => JSX.Element,
): JSX.Element {
  const condition = createMemo(() => !!when());
  return createMemo(() => {
    if (condition()) {
      return children();
    }
    if (fallback) {
      return fallback();
    }
    return undefined;
  }) as unknown as JSX.Element;
}
