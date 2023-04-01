import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const AccordionContext = createContext<FocusNavigator<any>>();

export function useAccordionContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(AccordionContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Accordion>`));
  return context;
}

export function createAccordionFocusNavigator<T extends ValidConstructor>() {
  return new FocusNavigator<T>(createUniqueId());
}
