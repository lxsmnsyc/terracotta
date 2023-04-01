export function getFocusStartPoint() {
  return window.getSelection()?.focusNode?.parentElement;
}

export function setFocusStartPoint(element?: HTMLElement | null) {
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
