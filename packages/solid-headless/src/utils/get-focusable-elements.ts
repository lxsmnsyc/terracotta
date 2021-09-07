export default function getFocusableElements(
  node: HTMLElement,
  filter?: HTMLElement,
): HTMLElement[] {
  const nodes = node.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const replicated: Element[] = [];

  for (let i = 0, len = nodes.length; i < len; i += 1) {
    if (!filter || !filter.contains(nodes[i])) {
      replicated.push(nodes[i]);
    }
  }

  return replicated as HTMLElement[];
}
