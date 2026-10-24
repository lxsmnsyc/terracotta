import type { Setter } from 'solid-js';
import { createContext, onCleanup, useContext } from 'solid-js';
import useEventListener from './use-event-listener';

/**
 * The panels that open inside one another: dialogs, popovers, menus and the
 * popups of a listbox or combobox. The tree follows the components, not the
 * DOM. A panel rendered into a `Portal` is no longer inside its parent's
 * element, but focus or a press in it still counts as inside the parent.
 */
export interface PanelNode {
  /** The element of the panel, once it has rendered. */
  element: () => Element | undefined;
  /** Whether `target` is in this panel or in a panel nested in it. */
  contains: (target: Node | null | undefined) => boolean;
  /** The elements of the panels nested in this one, at any depth. */
  descendants: () => HTMLElement[];
  /** Adds a nested panel. Returns the function that removes it. */
  register: (child: PanelNode) => () => void;
}

export const PanelTreeContext = createContext<PanelNode | null>(null);

/**
 * Creates the node of a panel and registers it with the panel around it.
 * Provide the node through `PanelTreeContext` around the panel's children, so
 * the panels inside it find it.
 *
 * Returns the node and a `ref` for the panel's element, which also calls
 * `setRef`. The node keeps the element in a plain variable, not a signal. A
 * modal reads its nested panels in an effect of the same flush that rendered
 * them, before a signal written there would show the new value.
 */
export function createPanelNode<T>(
  setRef: Setter<T | undefined>,
): [PanelNode, Setter<T | undefined>] {
  const parent = useContext(PanelTreeContext);
  const children = new Set<PanelNode>();
  let current: Element | undefined;

  const node: PanelNode = {
    element: () => current,
    contains(target) {
      if (!target) {
        return false;
      }
      if (current?.contains(target)) {
        return true;
      }
      for (const child of children) {
        if (child.contains(target)) {
          return true;
        }
      }
      return false;
    },
    descendants() {
      const result: HTMLElement[] = [];
      for (const child of children) {
        const element = child.element();
        if (element instanceof HTMLElement) {
          result.push(element);
        }
        result.push(...child.descendants());
      }
      return result;
    },
    register(child) {
      children.add(child);
      return () => {
        children.delete(child);
      };
    },
  };

  if (parent) {
    onCleanup(parent.register(node));
  }

  // Solid only ever calls a `ref` with the element.
  const ref = ((element: T) => {
    current = element instanceof Element ? element : undefined;
    return setRef(() => element);
  }) as Setter<T | undefined>;

  return [node, ref];
}

/**
 * Calls `onLeave` when focus moves from the panel to an element outside it.
 * A panel nested in it, portal or not, counts as inside.
 *
 * It listens on the document, not on the panel. A `focusout` in a nested panel
 * rendered into a `Portal` does not bubble through this panel's element.
 */
export function onFocusLeave(node: PanelNode, onLeave: () => void): () => void {
  return useEventListener(document, 'focusout', (e) => {
    if (
      node.contains(e.target as Node) &&
      e.relatedTarget &&
      !node.contains(e.relatedTarget as Node)
    ) {
      onLeave();
    }
  });
}
