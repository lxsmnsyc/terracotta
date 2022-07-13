import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const ACCORDION_BUTTON_TAG = 'accordion-button';

export const AccordionContext = createContext<FocusNavigator<any>>();

export function useAccordionContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(AccordionContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}

export function createAccordionFocusNavigator<T extends ValidConstructor>() {
  return new FocusNavigator<T>(ACCORDION_BUTTON_TAG, createUniqueId());
}
