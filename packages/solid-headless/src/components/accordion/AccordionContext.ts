import {
  createContext,
  useContext,
} from 'solid-js';
import AccordionController from './AccordionController';

export const AccordionContext = createContext<AccordionController<any>>();

export function useAccordionContext(componentName: string): AccordionController {
  const context = useContext(AccordionContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}
