import { onCleanup } from 'solid-js';

type FocusListener = (el: HTMLElement) => void;

const LISTENERS = new Set<FocusListener>();

export function useVirtualFocus(listener: FocusListener): void {
  LISTENERS.add(listener);

  onCleanup(() => {
    LISTENERS.delete(listener);
  });
}

// This is just a way to emulate focus without actually losing the focused element
// This is useful in combination with `aria-activedescendant`
// References
// https://www.w3.org/WAI/GL/wiki/Using_aria-activedescendant_to_allow_changes_in_focus_within_widgets_to_be_communicated_to_Assistive_Technology
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant
export function focusVirtually<T extends HTMLElement>(el: T): void {
  for (const listener of LISTENERS.keys()) {
    listener(el);
  }
}
