import {
  createContext,
  useContext,
} from 'solid-js';

interface ToastContext {
  ownerID: string;
}

export const ToastContext = createContext<ToastContext>();

export function useToastContext(componentName: string): ToastContext {
  const context = useContext(ToastContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Toaster>`);
}
