import { ToasterStore, ToastData } from './ToasterStore';
export default function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[];
