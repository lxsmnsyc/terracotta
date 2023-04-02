type FocusListener = (el: HTMLElement) => void;

const LISTENERS = new Set<FocusListener>();

export function registerVirtualFocus(listener: FocusListener): () => void {
  LISTENERS.add(listener);

  return () => {
    LISTENERS.delete(listener);
  };
}

export function focusVirtually<T extends HTMLElement>(el: T) {
  for (const listener of LISTENERS.keys()) {
    listener(el);
  }
}
