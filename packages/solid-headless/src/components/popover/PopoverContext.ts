import {
  createContext,
  useContext,
} from 'solid-js';

interface PopoverContext {
  ownerID: string;
  buttonID: string;
  panelID: string;
  hovering: boolean;
  anchor?: HTMLElement | null;
}

export const PopoverContext = createContext<PopoverContext>();

export function usePopoverContext(componentName: string): PopoverContext {
  const context = useContext(PopoverContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Popover>`);
}
