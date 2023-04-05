import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';
import { MATCHES_NODE } from '../../utils/namespace';

interface ComboboxContext {
  multiple: boolean;
  controller: FocusNavigator;
  activeDescendant: string | undefined;
  selectedDescendant: string | undefined;
  inputID: string;
  labelID: string;
  optionsID: string;
  hovering: boolean;
  anchor?: HTMLElement | null;
}

export const ComboboxContext = createContext<ComboboxContext>();

export function useComboboxContext(
  componentName: string,
): ComboboxContext {
  const context = useContext(ComboboxContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Combobox>`));
  return context;
}

export function createComboboxOptionFocusNavigator() {
  return new FocusNavigator(createUniqueId(), {
    virtual: true,
    base: MATCHES_NODE,
  });
}
