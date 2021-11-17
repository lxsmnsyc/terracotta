import {
  JSX,
} from 'solid-js';
import { RouterParams, useRouter } from 'solid-tiny-router';
import PreviewShell from '../../components/PreviewShell';

interface PreviewParams extends RouterParams {
  example: string;
}

const PREVIEWS: Record<string, () => JSX.Element> = {
  dialog: $lazy(import('../../examples/dialog')),
  toaster: $lazy(import('../../examples/toaster')),
};

export default function ToasterPreview(): JSX.Element {
  const router = useRouter<PreviewParams>();
  return (
    <PreviewShell>
      {PREVIEWS[router.params.example]}
    </PreviewShell>
  );
}
