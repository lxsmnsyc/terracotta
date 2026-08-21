import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface DialogContextData {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const DialogContext = createContext<DialogContextData | null>(null);

/**
 * Reads the nearest `Dialog`'s internal context, which holds the generated ids
 * for its title, description and panel. Throws when called outside a `Dialog`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function useDialogContext(componentName: string): DialogContextData {
  const context = useContext(DialogContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Dialog>`));
  return context;
}
