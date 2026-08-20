import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

interface SelectContextData {
  horizontal: boolean;
  controller: FocusNavigator;
}

export const SelectContext = createContext<SelectContextData>();

/**
 * Reads the nearest `Select`'s internal context, which holds the focus
 * navigator shared by its options. Throws when called outside a `Select`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/select.md}
 */
export function useSelectContext(componentName: string): SelectContextData {
  const context = useContext(SelectContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Select>`));
  return context;
}

export function createSelectOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}
