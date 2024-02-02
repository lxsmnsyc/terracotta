import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface ListboxContextData {
  horizontal?: boolean;
  multiple?: boolean;
  ownerID: string;
  labelID: string;
  buttonID: string;
  optionsID: string;
  buttonHovering: boolean;
  optionsHovering: boolean;
  anchor?: HTMLElement | null;
}

export const ListboxContext = createContext<ListboxContextData>();

export function useListboxContext(componentName: string): ListboxContextData {
  const context = useContext(ListboxContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Listbox>`),
  );
  return context;
}
