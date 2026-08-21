import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const AccordionContext = createContext<FocusNavigator | null>(null);

/**
 * Reads the nearest `Accordion`'s internal context, which holds the focus
 * navigator shared by its buttons. Throws when called outside an `Accordion`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function useAccordionContext(componentName: string): FocusNavigator {
  const context = useContext(AccordionContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Accordion>`));
  return context;
}

export function createAccordionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
