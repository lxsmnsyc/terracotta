import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const AccordionContext = createContext<FocusNavigator>();

export function useAccordionContext(componentName: string): FocusNavigator {
  const context = useContext(AccordionContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Accordion>`),
  );
  return context;
}

export function createAccordionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
