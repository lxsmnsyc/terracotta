function useEventListener<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap,
>(
  node: T,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void;
function useEventListener<T extends Window, K extends keyof WindowEventMap>(
  node: T,
  type: K,
  listener: (ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void;
function useEventListener<T extends Document, K extends keyof DocumentEventMap>(
  node: T,
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void;
function useEventListener<T extends Document, K extends keyof DocumentEventMap>(
  node: T,
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void {
  node.addEventListener(type, listener, options);
  return (node.removeEventListener<K>).bind(node, type, listener, options);
}

export default useEventListener;
