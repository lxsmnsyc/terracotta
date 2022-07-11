import {
  createContext,
  useContext,
} from 'solid-js';

interface ListboxOptionsContext {
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

export const ListboxOptionsContext = createContext<ListboxOptionsContext>();

export function useListboxOptionsContext(componentName: string): ListboxOptionsContext {
  const context = useContext(ListboxOptionsContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ListboxOptions>`);
}
