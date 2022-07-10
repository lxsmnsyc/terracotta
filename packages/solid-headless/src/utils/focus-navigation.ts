import { DynamicNode, ValidConstructor } from "./dynamic-prop";

export function focusNext<T extends ValidConstructor>(
  nodes: HTMLElement[],
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
  nodes: HTMLElement[],
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