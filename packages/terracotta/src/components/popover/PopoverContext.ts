import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface PopoverContextData {
  ownerID: string;
  buttonID: string;
  panelID: string;
  hovering: boolean;
  anchor?: HTMLElement | null;
}

export const PopoverContext = createContext<PopoverContextData>();

/**
 * Reads the nearest `Popover`'s internal context, which holds the generated
 * ids for its button and panel. Throws when called outside a `Popover`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function usePopoverContext(componentName: string): PopoverContextData {
  const context = useContext(PopoverContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Popover>`));
  return context;
}
