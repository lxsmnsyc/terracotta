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

/**
 * `document.activeElement` once the components have finished moving it.
 *
 * The panels wait on `waitForTransition` before focusing, which settles on a
 * microtask or two, so a plain read of the property can catch the state from
 * before the panel opened.
 */
export async function activeElement(): Promise<Element | null> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
  return document.activeElement;
}

/**
 * Waits for the components to finish their opening work — the
 * `waitForTransition` microtask that moves focus into a panel. Call it after
 * rendering something that opens, before driving the keyboard, so the focus
 * trap starts from the element the component chose rather than `<body>`.
 */
export async function settle(): Promise<void> {
  await activeElement();
}

/** Dispatches a keydown on whichever element currently holds DOM focus. */
export function pressKeyOnFocused(key: string, init: { shiftKey?: boolean } = {}): void {
  const target = document.activeElement;
  if (target === null) {
    throw new Error(`Nothing is focused, cannot press "${key}"`);
  }
  fireEvent.keyDown(target, { key, ...init });
}
