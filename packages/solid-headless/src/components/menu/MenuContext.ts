import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const MenuContext = createContext<FocusNavigator<any>>();

export function useMenuContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(MenuContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Menu>`));
  return context;
}

export function createMenuItemFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T> {
  return new FocusNavigator(createUniqueId());
}
