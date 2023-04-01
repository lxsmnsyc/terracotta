import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface AlertDialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const AlertDialogContext = createContext<AlertDialogContext>();

export function useAlertDialogContext(componentName: string): AlertDialogContext {
  const context = useContext(AlertDialogContext);
  assert(context, new Error(`<${componentName}> must be used inside a <AlertDialog>`));
  return context;
}
