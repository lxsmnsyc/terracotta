import {
  createSignal,
  createEffect,
  onCleanup,
} from 'solid-js';
import {
  ToasterStore,
  ToastData,
} from './ToasterStore';

export default function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[] {
  const [signal, setSignal] = createSignal(toaster.getQueue());

  createEffect(() => {
    onCleanup(toaster.subscribe(setSignal));
  });

  return signal;
}
