import {
  DynamicNode,
  ValidConstructor,
} from './dynamic-prop';

export function focusNextContinuous<T extends ValidConstructor>(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
  targetNode: DynamicNode<T>,
): void {
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (targetNode === nodes[i] && i + 1 < len) {
      nodes[i + 1].focus();
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
      nodes[i - 1].focus();
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
      if (i === len - 1) {
        nodes[0].focus();
      } else {
        nodes[i + 1].focus();
      }
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
      if (i === 0) {
        nodes[len - 1].focus();
      } else {
        nodes[i - 1].focus();
      }
      break;
    }
  }
}

export function focusFirst(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
): void {
  if (nodes.length) {
    nodes[0].focus();
  }
}

export function focusLast(
  nodes: HTMLElement[] | NodeListOf<HTMLElement>,
): void {
  if (nodes.length) {
    nodes[nodes.length - 1].focus();
  }
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
