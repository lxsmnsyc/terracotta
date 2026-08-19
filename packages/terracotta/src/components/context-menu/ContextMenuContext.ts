import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface ContextMenuContextData {
  ownerID: string;
  boundaryID: string;
  panelID: string;
  anchor?: HTMLElement | null;
}

export const ContextMenuContext = createContext<ContextMenuContextData>();

/**
 * Reads the nearest `ContextMenu`'s internal context, which holds the
 * generated ids for its boundary and panel. Throws when called outside a
 * `ContextMenu`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/context-menu.md}
 */
export function useContextMenuContext(
  componentName: string,
): ContextMenuContextData {
  const context = useContext(ContextMenuContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <ContextMenu>`),
  );
  return context;
}
