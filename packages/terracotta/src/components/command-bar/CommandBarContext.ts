import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface CommandBarContextData {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export const CommandBarContext = createContext<CommandBarContextData>();

export function useCommandBarContext(
  componentName: string,
): CommandBarContextData {
  const context = useContext(CommandBarContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <CommandBar>`),
  );
  return context;
}
