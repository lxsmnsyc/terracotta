import getFocusableElements from './focus-query';
import { DISABLED_NODE } from './namespace';
import { focusVirtually } from './virtual-focus';

const enum Direction {
  Next = 1,
  Prev = -1,
}

function isFocusable(el: HTMLElement): boolean {
  return !el.matches(DISABLED_NODE);
}

// Gets the next focusable element
function getNextFocusable(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  anchor: number,
  direction: Direction,
  loop: boolean,
): HTMLElement | undefined {
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
      if (direction === Direction.Next && current >= nodes.length) {
        current = 0;
      }
      if (direction === Direction.Prev && current < 0) {
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

export function focusNode(
  node: HTMLElement | undefined,
  virtual: boolean,
): HTMLElement | undefined {
  if (node) {
    if (virtual) {
      focusVirtually(node);
    } else {
      node.focus();
    }
  }
  return node;
}

export function focusNext(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: HTMLElement,
  loop: boolean,
  virtual: boolean,
): HTMLElement | undefined {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] || nodes[i].contains(targetNode)) {
      return focusNode(
        getNextFocusable(nodes, i, Direction.Next, loop),
        virtual,
      );
    }
  }
  return undefined;
}

export function focusPrev(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: HTMLElement,
  loop: boolean,
  virtual: boolean,
): HTMLElement | undefined {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (nodes[i].contains(targetNode)) {
      return focusNode(
        getNextFocusable(nodes, i, Direction.Prev, loop),
        virtual,
      );
    }
  }
  return undefined;
}

export function focusFirst(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  virtual: boolean,
): HTMLElement | undefined {
  if (nodes.length) {
    return focusNode(
      getNextFocusable(nodes, -1, Direction.Next, false),
      virtual,
    );
  }
  return undefined;
}

export function focusLast(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  virtual: boolean,
): HTMLElement | undefined {
  if (nodes.length) {
    return focusNode(
      getNextFocusable(nodes, nodes.length, Direction.Prev, false),
      virtual,
    );
  }
  return undefined;
}

export function focusMatch(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  character: string,
  virtual: boolean,
): HTMLElement | undefined {
  const lower = character.toLowerCase();
  for (let i = 0, l = nodes.length; i < l; i += 1) {
    const content = nodes[i].textContent;
    if (content != null && content.toLowerCase().startsWith(lower)) {
      return focusNode(nodes[i], virtual);
    }
  }
  return undefined;
}

export function lockFocus(
  ref: HTMLElement,
  reverse: boolean,
  virtual: boolean,
): HTMLElement | undefined {
  const nodes = getFocusableElements(ref);
  if (reverse) {
    if (!(document.activeElement && ref.contains(document.activeElement))) {
      return focusLast(nodes, virtual);
    }
    return focusPrev(
      nodes,
      document.activeElement as HTMLElement,
      true,
      virtual,
    );
  }
  if (!(document.activeElement && ref.contains(document.activeElement))) {
    return focusFirst(nodes, virtual);
  }
  return focusNext(nodes, document.activeElement as HTMLElement, true, virtual);
}
