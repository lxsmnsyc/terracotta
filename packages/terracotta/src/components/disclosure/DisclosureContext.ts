import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface DisclosureContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
}

export const DisclosureContext = createContext<DisclosureContext>();

export function useDisclosureContext(componentName: string): DisclosureContext {
  const context = useContext(DisclosureContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Disclosure>`));
  return context;
}
