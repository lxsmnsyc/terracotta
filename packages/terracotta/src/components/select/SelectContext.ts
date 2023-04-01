import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
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
  assert(context, new Error(`<${componentName}> must be used inside a <Select>`));
  return context;
}

export function createSelectOptionFocusNavigator
  <T extends ValidConstructor>() {
  return new FocusNavigator<T>(createUniqueId());
}
