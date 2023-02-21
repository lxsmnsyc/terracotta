import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface ToastContext {
  ownerID: string;
}

export const ToastContext = createContext<ToastContext>();

export function useToastContext(componentName: string): ToastContext {
  const context = useContext(ToastContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Toaster>`));
  return context;
}
