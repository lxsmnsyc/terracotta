import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export interface TabEntry {
  ref(): unknown;
  isSelected(): boolean;
  disabled(): boolean;
}

interface TabListContextData {
  navigator: FocusNavigator;
  /** Called by each tab, so the list can pick its tab stop. */
  registerTab(tab: TabEntry): void;
  /**
   * The tab that takes the tab stop when no enabled tab is selected: the
   * first enabled one.
   */
  getFallbackTab(): unknown;
}

export const TabListContext = createContext<TabListContextData | null>(null);

/**
 * Reads the nearest `TabList`'s internal context, which holds the focus
 * navigator shared by its tabs. Throws when called outside a `TabList`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function useTabListContext(componentName: string): TabListContextData {
  const context = useContext(TabListContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TabList>`));
  return context;
}

export function createTabFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
