import {
  createContext,
  useContext,
} from 'solid-js';

interface ListboxContext {
  horizontal?: boolean;
  multiple?: boolean;
  ownerID: string;
  labelID: string;
  buttonID: string;
  optionsID: string;
  hovering: boolean;
  anchor?: HTMLElement | null;
}

export const ListboxContext = createContext<ListboxContext>();

export function useListboxContext(componentName: string): ListboxContext {
  const context = useContext(ListboxContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Listbox>`);
}
