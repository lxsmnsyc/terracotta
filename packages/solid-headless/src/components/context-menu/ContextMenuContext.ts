import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface ContextMenuContext {
  ownerID: string;
  boundaryID: string;
  panelID: string;
  anchor?: HTMLElement | null;
}

export const ContextMenuContext = createContext<ContextMenuContext>();

export function useContextMenuContext(componentName: string): ContextMenuContext {
  const context = useContext(ContextMenuContext);
  assert(context, new Error(`<${componentName}> must be used inside a <ContextMenu>`));
  return context;
}
