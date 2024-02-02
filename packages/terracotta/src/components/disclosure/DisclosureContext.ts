import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface DisclosureContextData {
  ownerID: string;
  buttonID: string;
  panelID: string;
}

export const DisclosureContext = createContext<DisclosureContextData>();

export function useDisclosureContext(
  componentName: string,
): DisclosureContextData {
  const context = useContext(DisclosureContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Disclosure>`),
  );
  return context;
}
