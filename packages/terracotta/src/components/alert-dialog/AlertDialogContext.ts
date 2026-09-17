import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface AlertDialogContextData {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const AlertDialogContext = createContext<AlertDialogContextData | null>(null);

/**
 * Reads the nearest `AlertDialog`'s internal context, which holds the
 * generated ids for its title, description and panel. Throws when called
 * outside an `AlertDialog`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function useAlertDialogContext(componentName: string): AlertDialogContextData {
  const context = useContext(AlertDialogContext);
  assert(context, new Error(`<${componentName}> must be used inside a <AlertDialog>`));
  return context;
}
