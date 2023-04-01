import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface AccordionItemContext {
  buttonID: string;
  panelID: string;
}

export const AccordionItemContext = createContext<AccordionItemContext>();

export function useAccordionItemContext(componentName: string): AccordionItemContext {
  const context = useContext(AccordionItemContext);
  assert(context, new Error(`<${componentName}> must be used inside a <AccordionItem>`));
  return context;
}
