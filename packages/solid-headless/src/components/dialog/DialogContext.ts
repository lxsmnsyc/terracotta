import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface DialogContext {
  ownerID: string;
  panelID: string;
  titleID: string;
  descriptionID: string;
}

export const DialogContext = createContext<DialogContext>();

export function useDialogContext(componentName: string): DialogContext {
  const context = useContext(DialogContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Dialog>`));
  return context;
}
