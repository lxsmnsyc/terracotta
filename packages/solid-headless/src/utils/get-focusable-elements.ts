export default function getFocusableElements(node: HTMLElement): NodeListOf<HTMLElement> {
  return node.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
}
