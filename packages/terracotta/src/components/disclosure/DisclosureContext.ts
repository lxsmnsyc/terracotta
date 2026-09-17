import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface DisclosureContextData {
  ownerID: string;
  buttonID: string;
  panelID: string;
}

export const DisclosureContext = createContext<DisclosureContextData | null>(null);

/**
 * Reads the nearest `Disclosure`'s internal context, which holds the generated
 * ids for its button and panel. Throws when called outside a `Disclosure`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/disclosure.md}
 */
export function useDisclosureContext(componentName: string): DisclosureContextData {
  const context = useContext(DisclosureContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Disclosure>`));
  return context;
}
