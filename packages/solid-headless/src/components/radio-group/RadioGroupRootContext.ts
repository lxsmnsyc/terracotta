import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const RadioGroupRootContext = createContext<FocusNavigator<any>>();

export function useRadioGroupRootContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(RadioGroupRootContext);
  assert(context, new Error(`<${componentName}> must be used inside a <RadioGroup>`));
  return context;
}

export function createRadioGroupOptionFocusNavigator
  <T extends ValidConstructor>(): FocusNavigator<T> {
  return new FocusNavigator(createUniqueId());
}
