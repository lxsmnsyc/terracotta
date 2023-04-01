import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

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
  assert(context, new Error(`<${componentName}> must be used inside a <Popover>`));
  return context;
}
