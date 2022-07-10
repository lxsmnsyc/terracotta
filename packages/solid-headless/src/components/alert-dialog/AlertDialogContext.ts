import {
  createContext,
  useContext,
} from 'solid-js';

interface AlertDialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const AlertDialogContext = createContext<AlertDialogContext>();

export function useAlertDialogContext(componentName: string): AlertDialogContext {
  const context = useContext(AlertDialogContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AlertDialog>`);
}
