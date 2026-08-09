import { fireEvent } from '@solidjs/testing-library';

/**
 * Resolves an IDREF attribute (`aria-labelledby`, `aria-describedby`, ...) to
 * the element it points at. Returns `null` when the attribute is missing or
 * dangling, which is exactly what the assertions want to catch.
 */
export function referencedBy(element: Element, attribute: string): HTMLElement | null {
  const id = element.getAttribute(attribute);
  return id === null ? null : document.getElementById(id);
}

export function labelledBy(element: Element): HTMLElement | null {
  return referencedBy(element, 'aria-labelledby');
}

export function describedBy(element: Element): HTMLElement | null {
  return referencedBy(element, 'aria-describedby');
}

/** Dispatches a keydown on whichever element currently holds DOM focus. */
export function pressKeyOnFocused(key: string, init: { shiftKey?: boolean } = {}): void {
  const target = document.activeElement;
  if (target === null) {
    throw new Error(`Nothing is focused, cannot press "${key}"`);
  }
  fireEvent.keyDown(target, { key, ...init });
}
