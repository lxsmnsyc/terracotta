import { DocumentInfo } from './meta';

const META: Record<string, () => Promise<{ default: DocumentInfo }>> = {
  dialog: () => import('./dialog'),
};

export default META;
