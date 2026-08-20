import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const ListboxOptionsContext = createContext<FocusNavigator>();

/**
 * Reads the nearest `ListboxOptions`' internal context, which holds the focus
 * navigator shared by its options. Throws when called outside a
 * `ListboxOptions`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/listbox.md}
 */
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
