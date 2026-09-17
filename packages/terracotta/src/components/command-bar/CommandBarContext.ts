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

export const CommandBarContext = createContext<CommandBarContextData | null>(null);

/**
 * Reads the nearest `CommandBar`'s internal context, which holds the generated
 * ids for its title, description and panel. Throws when called outside a
 * `CommandBar`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command-bar.md}
 */
export function useCommandBarContext(componentName: string): CommandBarContextData {
  const context = useContext(CommandBarContext);
  assert(context, new Error(`<${componentName}> must be used inside a <CommandBar>`));
  return context;
}
