import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const SelectContext = createContext<FocusNavigator>();

export function useSelectContext(componentName: string): FocusNavigator {
  const context = useContext(SelectContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Select>`),
  );
  return context;
}

export function createSelectOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
