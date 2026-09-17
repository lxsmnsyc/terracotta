import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const TabListContext = createContext<FocusNavigator | null>(null);

/**
 * Reads the nearest `TabList`'s internal context, which holds the focus
 * navigator shared by its tabs. Throws when called outside a `TabList`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function useTabListContext(componentName: string): FocusNavigator {
  const context = useContext(TabListContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TabList>`));
  return context;
}

export function createTabFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
