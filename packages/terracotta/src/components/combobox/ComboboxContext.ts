import { createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';
import { MATCHES_NODE } from '../../utils/namespace';

interface ComboboxContextData {
  multiple?: boolean;
  controller: FocusNavigator;
  activeDescendant: string | undefined;
  selectedDescendant: string | undefined;
  inputID: string;
  labelID: string;
  optionsID: string;
  anchor?: HTMLElement | null;
  inputHovering: boolean;
  optionsHovering: boolean;
}

export const ComboboxContext = createContext<ComboboxContextData>();

/**
 * Reads the nearest `Combobox`'s internal context, which holds the generated
 * ids and the focus navigator shared by its options. Throws when called
 * outside a `Combobox`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/combobox.md}
 */
export function useComboboxContext(componentName: string): ComboboxContextData {
  const context = useContext(ComboboxContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Combobox>`),
  );
  return context;
}

export function createComboboxOptionFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId(), {
    virtual: true,
    base: MATCHES_NODE,
  });
}
