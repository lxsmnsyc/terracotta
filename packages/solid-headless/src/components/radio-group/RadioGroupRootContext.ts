import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const RADIO_GROUP_OPTION_TAG = 'radio-group-option';

export const RadioGroupRootContext = createContext<FocusNavigator<any>>();

export function useRadioGroupRootContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(RadioGroupRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}

export function createRadioGroupOptionFocusNavigator
  <T extends ValidConstructor>(): FocusNavigator<T> {
  return new FocusNavigator(RADIO_GROUP_OPTION_TAG, createUniqueId());
}
