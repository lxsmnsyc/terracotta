import {
  createContext,
  useContext,
} from 'solid-js';

interface ContextMenuContext {
  ownerID: string;
  boundaryID: string;
  panelID: string;
  anchor?: HTMLElement | null;
}

export const ContextMenuContext = createContext<ContextMenuContext>();

export function useContextMenuContext(componentName: string): ContextMenuContext {
  const context = useContext(ContextMenuContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <ContextMenu>`);
}
