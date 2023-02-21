import { DocumentInfo } from '../meta';
import DEMO_CODE from '../../examples/toast?raw';

const structure = `<Toaster>
  <Toast />
</Toaster>
`;

const TOAST: DocumentInfo = {
  header: {
    title: 'Toast',
    description: '',
  },
  demo: DEMO_CODE,
  structure: {
    description: 'The Accordion component adheres to a loose structure and organization of its member components.',
    code: structure,
  },
  api: {
    components: [
      {
        name: 'Toaster',
        description: 'The root component. Manages the state of the Dialog structure.',
        props: [],
      },
      {
        name: 'Toast',
        description: 'Serves as the visual obstruction for the Dialog which usually covers the inert window.',
        props: [],
      },
    ],
    extras: [
      {
        code: 'function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[]',
      },
    ],
  },
};

export default TOAST;
