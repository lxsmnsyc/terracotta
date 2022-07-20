import {
  DynamicNode,
  ValidConstructor,
} from './dynamic-prop';
import getFocusableElements from './focus-query';

function isFocusable(el: HTMLElement) {
  return !el.matches('[data-sh-disabled="true"]');
}

function getNextFocusable(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  anchor: number,
  direction: number,
) {
  let current = anchor + direction;
  while (current >= 0 && current < nodes.length) {
    if (isFocusable(nodes[anchor])) {
      return nodes[anchor];
    }
    current += direction;
  }
  return undefined;
}

function getNextLockedFocusable(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  anchor: number,
  direction: number,
) {
  let current = anchor + direction;
  if (direction === 1 && current === nodes.length) {
    current = 0;
  }
  if (direction === -1 && current === -1) {
    current = nodes.length - 1;
  }
  while (anchor !== current) {
    if (isFocusable(nodes[current])) {
      return nodes[current];
    }
    current += direction;
    if (direction === 1 && current >= nodes.length) {
      current = 0;
    }
    if (direction === -1 && current < 0) {
      current = nodes.length - 1;
    }
  }
  return undefined;
}

export function focusNextContinuous<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] && i + 1 < len) {
      getNextFocusable(nodes, i, 1)?.focus();
      break;
    }
  }
}

export function focusPrevContinuous<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] && i - 1 >= 0) {
      getNextFocusable(nodes, i, -1)?.focus();
      break;
    }
  }
}

export function focusNext<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      getNextLockedFocusable(nodes, i, 1)?.focus();
      break;
    }
  }
}

export function focusPrev<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      getNextLockedFocusable(nodes, i, -1)?.focus();
      break;
    }
  }
}

export function focusFirst(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
): boolean {
  if (nodes.length) {
    getNextFocusable(nodes, -1, 1)?.focus();
    return true;
  }
  return false;
}

export function focusLast(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
): boolean {
  if (nodes.length) {
    getNextFocusable(nodes, nodes.length, -1)?.focus();
    return true;
  }
  return false;
}

export function focusMatch(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  character: string,
): void {
  const lower = character.toLowerCase();
  for (let i = 0, l = nodes.length; i < l; i += 1) {
    if (nodes[i].textContent?.toLowerCase().startsWith(lower)) {
      nodes[i].focus();
      return;
    }
  }
}

export function lockFocus(
  ref: HTMLElement,
  reverse: boolean,
): void {
  const nodes = getFocusableElements(ref);
  if (reverse) {
    if (!document.activeElement || !ref.contains(document.activeElement)) {
      focusLast(nodes);
    } else {
      focusPrev(nodes, document.activeElement);
    }
  } else if (!document.activeElement || !ref.contains(document.activeElement)) {
    focusFirst(nodes);
  } else {
    focusNext(nodes, document.activeElement);
  }
}
