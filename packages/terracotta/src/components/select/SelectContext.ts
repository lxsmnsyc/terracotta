import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

interface SelectContext {
  horizontal: boolean;
  controller: FocusNavigator
}

export const SelectContext = createContext<SelectContext>();

export function useSelectContext(
  componentName: string,
): SelectContext {
  const context = useContext(SelectContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Select>`));
  return context;
}

export function createSelectOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId());
}
