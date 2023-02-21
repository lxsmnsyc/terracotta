import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import { ValidConstructor } from '../../utils/dynamic-prop';
import FocusNavigator from '../../utils/focus-navigator';

export const TabListContext = createContext<FocusNavigator<any>>();

export function useTabListContext<T extends ValidConstructor>(
  componentName: string,
): FocusNavigator<T> {
  const context = useContext(TabListContext);
  assert(context, new Error(`<${componentName}> must be used inside a <TabList>`));
  return context;
}

export function createTabFocusNavigator
  <T extends ValidConstructor>(): FocusNavigator<T> {
  return new FocusNavigator(createUniqueId());
}
