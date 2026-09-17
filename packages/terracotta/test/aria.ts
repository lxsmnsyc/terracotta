import { fireEvent } from '@solidjs/testing-library';
import { flush } from 'solid-js';

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

/**
 * `document.activeElement` once the components have finished moving it.
 *
 * Two things defer that on Solid 2: effects run on a flush, and the panels wait
 * on `waitForTransition` before focusing, which settles a microtask or two
 * later. So a plain read of the property can catch the state from before the
 * panel opened.
 */
export async function activeElement(): Promise<Element | null> {
  flush();
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
  flush();
  return document.activeElement;
}

/**
 * Waits for the components to finish their opening work — the deferred effects
 * and the `waitForTransition` microtask that moves focus into a panel. Call it
 * after rendering something that opens, before driving the keyboard, so the
 * focus trap starts from the element the component chose rather than `<body>`.
 */
export async function settle(): Promise<void> {
  await activeElement();
}
