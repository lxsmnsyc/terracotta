import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const MenuContext = createContext<FocusNavigator | null>(null);

/**
 * Reads the nearest `Menu`'s internal context, which holds the focus navigator
 * shared by its items. Throws when called outside a `Menu`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function useMenuContext(componentName: string): FocusNavigator {
  const context = useContext(MenuContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Menu>`));
  return context;
}

export function createMenuItemFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
