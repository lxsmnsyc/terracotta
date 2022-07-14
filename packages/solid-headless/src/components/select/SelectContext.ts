import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

interface SelectContext<T extends ValidConstructor> {
  horizontal: boolean;
  controller: FocusNavigator<T>
}

export const SelectContext = createContext<SelectContext<any>>();

export function useSelectContext<T extends ValidConstructor>(
  componentName: string,
): SelectContext<T> {
  const context = useContext(SelectContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}

export function createSelectOptionFocusNavigator
  <T extends ValidConstructor>() {
  return new FocusNavigator<T>(createUniqueId());
}
