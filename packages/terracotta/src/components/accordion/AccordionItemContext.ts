import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface AccordionItemContextData {
  buttonID: string;
  panelID: string;
}

export const AccordionItemContext = createContext<AccordionItemContextData>();

export function useAccordionItemContext(
  componentName: string,
): AccordionItemContextData {
  const context = useContext(AccordionItemContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <AccordionItem>`),
  );
  return context;
}
