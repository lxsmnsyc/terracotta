import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const ListboxOptionsContext = createContext<FocusNavigator<any>>();

export function useListboxOptionsContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(ListboxOptionsContext);
  assert(context, new Error(`<${componentName}> must be used inside a <ListboxOptions>`));
  return context;
}

export function createListboxOptionsFocusNavigator<T extends ValidConstructor>(
  owner: string,
) {
  return new FocusNavigator<T>(owner);
}
