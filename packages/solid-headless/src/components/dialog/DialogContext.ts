import {
  createContext,
  useContext,
} from 'solid-js';

interface DialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const DialogContext = createContext<DialogContext>();

export function useDialogContext(componentName: string): DialogContext {
  const context = useContext(DialogContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Dialog>`);
}
