import { onCleanup } from 'solid-js';

function useEventListener<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener<K extends keyof WindowEventMap>(
  node: Window,
  type: K,
  listener: (ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener<K extends keyof DocumentEventMap>(
  node: Document,
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
function useEventListener(
  node: HTMLElement | Window | Document,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  node.addEventListener(type, listener, options);
  onCleanup(() => {
    node.removeEventListener(type, listener, options);
  });
}

export default useEventListener;
