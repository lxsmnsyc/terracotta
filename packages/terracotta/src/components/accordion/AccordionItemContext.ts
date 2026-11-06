import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface AccordionItemContextData {
  buttonID: string;
  panelID: string;
  /** Whether the panel element is in the DOM. */
  hasPanel(): boolean;
  /** Called by the panel. `present` tells whether its element is in the DOM. */
  registerPanel(present: () => boolean): void;
}

export const AccordionItemContext = createContext<AccordionItemContextData | null>(null);

/**
 * Reads the nearest `AccordionItem`'s internal context, which holds the
 * generated ids that link its button and panel. Throws when called outside an
 * `AccordionItem`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function useAccordionItemContext(componentName: string): AccordionItemContextData {
  const context = useContext(AccordionItemContext);
  assert(context, new Error(`<${componentName}> must be used inside a <AccordionItem>`));
  return context;
}
