import { createMemo } from 'solid-js';

function isListEquals<T extends unknown[]>(a: T, b: T): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0, len = a.length; i < len; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

export function createDependencyList<T extends unknown[]>(source: () => T): () => T {
  return createMemo(source, {
    equals: isListEquals,
    // `T` is always some tuple of dependencies, so the empty list is the right
    // starting point; the cast is what tells TypeScript that.
    loadingValue: [] as unknown as T,
  });
}
