import {
  createContext,
  useContext,
} from 'solid-js';

interface DisclosureContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
}

export const DisclosureContext = createContext<DisclosureContext>();

export function useDisclosureContext(componentName: string): DisclosureContext {
  const context = useContext(DisclosureContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Disclosure>`);
}
