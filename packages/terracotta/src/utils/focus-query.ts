// This is just a close approximation
// I'm not sure if this is accurate
const QUERY =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

export default function getFocusableElements(
  node: HTMLElement,
  filter?: HTMLElement,
): HTMLElement[] {
  const nodes = node.querySelectorAll(QUERY);
  const replicated: Element[] = [];

  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (!(filter && filter.contains(nodes[i]))) {
      replicated.push(nodes[i]);
    }
  }

  return replicated as HTMLElement[];
}
