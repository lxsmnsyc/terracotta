import {
  createContext,
  useContext,
} from 'solid-js';

interface AccordionItemContext {
  buttonID: string;
  panelID: string;
}

export const AccordionItemContext = createContext<AccordionItemContext>();

export function useAccordionItemContext(componentName: string): AccordionItemContext {
  const context = useContext(AccordionItemContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}
