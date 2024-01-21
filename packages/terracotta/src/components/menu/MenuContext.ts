import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const MenuContext = createContext<FocusNavigator>();

export function useMenuContext(componentName: string): FocusNavigator {
  const context = useContext(MenuContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Menu>`));
  return context;
}

export function createMenuItemFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
