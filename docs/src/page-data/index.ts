import { JSX } from 'solid-js';
import { DocumentInfo } from './meta';

interface MetaInfo {
  name: string;
  render: () => Promise<{ default: DocumentInfo }>;
  // preview: () => JSX.Element;
}

const META: Record<string, MetaInfo> = {
  accordion: {
    name: 'Accordion',
    render: () => import('./accordion'),
  },
  dialog: {
    name: 'Dialog',
    render: () => import('./dialog'),
  },
  toast: {
    name: 'Toast',
    render: () => import('./toast'),
  },
};

export default META;
