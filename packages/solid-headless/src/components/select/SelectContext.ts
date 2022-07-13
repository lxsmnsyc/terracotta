import {
  createContext,
  useContext,
} from 'solid-js';

interface SelectContext {
  ownerID: string;
  horizontal: boolean;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

export const SelectContext = createContext<SelectContext>();

export function useSelectContext(componentName: string): SelectContext {
  const context = useContext(SelectContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}
