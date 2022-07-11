import {
  createContext,
  useContext,
} from 'solid-js';

interface MenuContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

export const MenuContext = createContext<MenuContext>();

export function useMenuContext(componentName: string): MenuContext {
  const context = useContext(MenuContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Menu>`);
}
