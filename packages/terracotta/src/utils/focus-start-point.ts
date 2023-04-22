// document.activeElement isn't accurate for this specific behavior

export function getFocusStartPoint(): HTMLElement | null | undefined {
  const selection = window.getSelection();
  if (selection) {
    const node = selection.focusNode;
    if (node) {
      return node.parentElement;
    }
  }
  return undefined;
}

export function setFocusStartPoint(element?: HTMLElement | null): void {
  if (element) {
    const tabindex = element.getAttribute('tabindex');

    element.setAttribute('tabindex', '-1');
    element.focus();
    element.blur();

    if (tabindex) {
      element.setAttribute('tabindex', tabindex);
    } else {
      element.removeAttribute('tabindex');
    }
  }
}
