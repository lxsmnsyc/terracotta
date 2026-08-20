import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface TabGroupContextData<V> {
  horizontal: boolean;
  getId(kind: string, value: V): string;
}

export const TabGroupContext = createContext<TabGroupContextData<unknown>>();

/**
 * Reads the nearest `TabGroup`'s internal context, which holds the id prefix
 * that links each tab to its panel. Throws when called outside a `TabGroup`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function useTabGroupContext<V>(
  componentName: string,
): TabGroupContextData<V> {
  const context = useContext(TabGroupContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <TabGroup>`),
  );
  return context;
}
