import {
  createContext,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const LISTBOX_OPTION_TAG = 'listbox-option';

export const ListboxOptionsContext = createContext<FocusNavigator<any>>();

export function useListboxOptionsContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(ListboxOptionsContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ListboxOptions>`);
}

export function createListboxOptionsFocusNavigator<T extends ValidConstructor>(
  owner: string,
) {
  return new FocusNavigator<T>(LISTBOX_OPTION_TAG, owner);
}
