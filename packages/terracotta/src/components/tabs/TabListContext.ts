import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const TabListContext = createContext<FocusNavigator>();

export function useTabListContext(componentName: string): FocusNavigator {
  const context = useContext(TabListContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <TabList>`),
  );
  return context;
}

export function createTabFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
