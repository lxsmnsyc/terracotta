import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

export interface TooltipContextData {
  triggerID: string;
  panelID: string;
  /** Opens after the open delay. */
  scheduleOpen: () => void;
  /** Closes after the close delay. */
  scheduleClose: () => void;
  /** Opens now, and cancels a pending close. */
  openNow: () => void;
  /** Closes now, and cancels a pending open. */
  closeNow: () => void;
  /** Cancels a pending open or close. */
  cancel: () => void;
}

export const TooltipContext = createContext<TooltipContextData | null>(null);

/**
 * Reads the nearest `Tooltip`'s internal context, which holds the generated
 * ids for its trigger and panel. Throws when called outside a `Tooltip`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tooltip.md}
 */
export function useTooltipContext(componentName: string): TooltipContextData {
  const context = useContext(TooltipContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Tooltip>`));
  return context;
}
