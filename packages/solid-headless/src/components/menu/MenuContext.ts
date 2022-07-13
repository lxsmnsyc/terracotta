import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const MENU_ITEM_TAG = 'menu-item';

export const MenuContext = createContext<FocusNavigator<any>>();

export function useMenuContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(MenuContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}

export function createMenuItemFocusNavigator<T extends ValidConstructor>(): FocusNavigator<T> {
  return new FocusNavigator(MENU_ITEM_TAG, createUniqueId());
}
