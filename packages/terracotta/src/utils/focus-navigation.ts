import {
  DynamicNode,
  ValidConstructor,
} from './dynamic-prop';
import getFocusableElements from './focus-query';
import { DATA_SET_NAMESPACE } from './namespace';
import { focusVirtually } from './virtual-focus';

const enum Direction {
  Next = 1,
  Prev = -1,
}

function isFocusable(el: HTMLElement) {
  return !el.matches(`[${DATA_SET_NAMESPACE}-disabled="true"]`);
}

// Gets the next focusable element
function getNextFocusable(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  anchor: number,
  direction: Direction,
  loop: boolean,
) {
  let current = anchor + direction;
  if (loop) {
    if (direction === Direction.Next && current === nodes.length) {
      current = 0;
    }
    if (direction === Direction.Prev && current === -1) {
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
  while (current >= 0 && current < nodes.length) {
    if (isFocusable(nodes[current])) {
      return nodes[current];
    }
    current += direction;
  }
  return undefined;
}

function focusNode(node: HTMLElement | undefined, virtual: boolean) {
  if (node) {
    if (virtual) {
      focusVirtually(node);
    } else {
      node.focus();
    }
  }
}

export function focusNext<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
  loop: boolean,
  virtual: boolean,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      focusNode(getNextFocusable(nodes, i, Direction.Next, loop), virtual);
      break;
    }
  }
}

export function focusPrev<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
  loop: boolean,
  virtual: boolean,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i]) {
      focusNode(getNextFocusable(nodes, i, Direction.Prev, loop), virtual);
      break;
    }
  }
}

export function focusFirst(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  virtual: boolean,
): boolean {
  if (nodes.length) {
    focusNode(getNextFocusable(nodes, -1, Direction.Next, false), virtual);
    return true;
  }
  return false;
}

export function focusLast(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  virtual: boolean,
): boolean {
  if (nodes.length) {
    focusNode(getNextFocusable(nodes, nodes.length, Direction.Prev, false), virtual);
    return true;
  }
  return false;
}

export function focusMatch(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  character: string,
  virtual: boolean,
): void {
  const lower = character.toLowerCase();
  for (let i = 0, l = nodes.length; i < l; i += 1) {
    if (nodes[i].textContent?.toLowerCase().startsWith(lower)) {
      focusNode(nodes[i], virtual);
      return;
    }
  }
}

export function lockFocus(
  ref: HTMLElement,
  reverse: boolean,
  virtual: boolean,
): void {
  const nodes = getFocusableElements(ref);
  if (reverse) {
    if (!document.activeElement || !ref.contains(document.activeElement)) {
      focusLast(nodes, virtual);
    } else {
      focusPrev(nodes, document.activeElement, true, virtual);
    }
  } else if (!document.activeElement || !ref.contains(document.activeElement)) {
    focusFirst(nodes, virtual);
  } else {
    focusNext(nodes, document.activeElement, true, virtual);
  }
}
