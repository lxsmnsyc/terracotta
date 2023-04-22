import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';

// Show has a quirky TS support since 1.7
export default function createShow<T>(
  when: () => T,
  children: () => JSX.Element,
  fallback?: () => JSX.Element,
): JSX.Element {
  const condition = createMemo(() => !!when());
  return createMemo(() => {
    if (condition()) {
      return createMemo(() => children());
    }
    if (fallback) {
      return createMemo(() => fallback());
    }
    return undefined;
  }) as unknown as JSX.Element;
}
