import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const ListboxOptionsContext = createContext<FocusNavigator>();

export function useListboxOptionsContext(
  componentName: string,
): FocusNavigator {
  const context = useContext(ListboxOptionsContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <ListboxOptions>`),
  );
  return context;
}

export function createListboxOptionsFocusNavigator(
  owner: string,
): FocusNavigator {
  return new FocusNavigator(owner);
}
