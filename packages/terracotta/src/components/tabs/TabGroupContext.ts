import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface TabGroupContext<V> {
  horizontal: boolean;
  getId(kind: string, value: V): string;
}

export const TabGroupContext = createContext<TabGroupContext<any>>();

export function useTabGroupContext<V>(
  componentName: string,
): TabGroupContext<V> {
  const context = useContext(TabGroupContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TabGroup>`));
  return context;
}
