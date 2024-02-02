import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface TabGroupContextData<V> {
  horizontal: boolean;
  getId(kind: string, value: V): string;
}

export const TabGroupContext = createContext<TabGroupContextData<unknown>>();

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
