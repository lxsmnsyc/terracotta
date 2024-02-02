import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface DialogContextData {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const DialogContext = createContext<DialogContextData>();

export function useDialogContext(componentName: string): DialogContextData {
  const context = useContext(DialogContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Dialog>`),
  );
  return context;
}
