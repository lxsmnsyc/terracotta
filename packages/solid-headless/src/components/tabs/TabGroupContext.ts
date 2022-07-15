import {
  createContext,
  useContext,
} from 'solid-js';

interface TabGroupContext<V> {
  horizontal: boolean;
  getId(kind: string, value: V): string;
}

export const TabGroupContext = createContext<TabGroupContext<any>>();

export function useTabGroupContext<V>(
  componentName: string,
): TabGroupContext<V> {
  const context = useContext(TabGroupContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TabGroup>`);
}
