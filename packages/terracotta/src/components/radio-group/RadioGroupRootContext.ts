import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const RadioGroupRootContext = createContext<FocusNavigator>();

export function useRadioGroupRootContext(
  componentName: string,
): FocusNavigator {
  const context = useContext(RadioGroupRootContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <RadioGroup>`),
  );
  return context;
}

export function createRadioGroupOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
