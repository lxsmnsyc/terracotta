import { DocumentInfo } from './meta';

interface MetaInfo {
  name: string;
  render: () => Promise<{ default: DocumentInfo }>;
  // preview: () => JSX.Element;
}

const META: Record<string, MetaInfo> = {
  accordion: {
    name: 'Accordion',
    render: () => import('./components/accordion'),
  },
  dialog: {
    name: 'Dialog',
    render: () => import('./components/dialog'),
  },
  toast: {
    name: 'Toast',
    render: () => import('./components/toast'),
  },
};

export default META;
