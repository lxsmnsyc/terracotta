import { fireEvent } from '@solidjs/testing-library';
import '@testing-library/jest-dom/vitest';
import { flush } from 'solid-js';

// Solid 2 defers DOM updates, so an assertion made straight after an
// interaction sees the previous render. React Testing Library solves this with
// `act`; Solid exposes `flush`. Patching the interaction entry points here
// keeps every test synchronous, the way they read, instead of scattering
// `waitFor` over assertions that are not actually waiting for anything.
/**
 * The library focuses elements from inside effects, and `flush` refuses to run
 * re-entrantly there: "writes made here are processed in the same flush's
 * continuation". So a flush that lands inside one is not needed — skip it
 * rather than letting it halt the reactive system.
 */
function safeFlush(): void {
  try {
    flush();
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('not reentrant')) {
      throw error;
    }
  }
}

const events = fireEvent as unknown as Record<string, unknown>;
for (const key of Object.keys(events)) {
  const original = events[key];
  if (typeof original !== 'function') {
    continue;
  }
  events[key] = (...args: unknown[]): unknown => {
    const result = (original as (...a: unknown[]) => unknown)(...args);
    safeFlush();
    return result;
  };
}

for (const method of ['click', 'focus', 'blur'] as const) {
  const original = HTMLElement.prototype[method];
  HTMLElement.prototype[method] = function patched(this: HTMLElement): void {
    original.call(this);
    safeFlush();
  };
}
