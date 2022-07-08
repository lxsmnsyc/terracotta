import {
  createContext,
  useContext,
} from 'solid-js';

interface CommandBarContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export const CommandBarContext = createContext<CommandBarContext>();

export function useCommandBarContext(componentName: string): CommandBarContext {
  const context = useContext(CommandBarContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <CommandBar>`);
}
