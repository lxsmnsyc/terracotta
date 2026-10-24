import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface TabGroupContextData<V> {
  isHorizontal(): boolean;
  getId(kind: string, value: V): string;
  /** Whether the panel for `value` is in the DOM. */
  hasPanel(value: V): boolean;
  /** Called by a panel. `present` tells whether its element is in the DOM. */
  registerPanel(value: V, present: () => boolean): void;
}

export const TabGroupContext = createContext<TabGroupContextData<unknown> | null>(null);

/**
 * Reads the nearest `TabGroup`'s internal context, which holds the id prefix
 * that links each tab to its panel. Throws when called outside a `TabGroup`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function useTabGroupContext<V>(componentName: string): TabGroupContextData<V> {
  const context = useContext(TabGroupContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TabGroup>`));
  return context;
}
