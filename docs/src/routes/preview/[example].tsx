import {
  JSX,
} from 'solid-js';
import PreviewShell from '../../components/PreviewShell';
import { LoadResult, RouterParams, useRouter } from '../../internal/router';

interface PreviewParams extends RouterParams {
  example: string;
}

const PREVIEWS: Record<string, () => JSX.Element> = {
  accordion: $lazy(import('../../examples/accordion')),
  dialog: $lazy(import('../../examples/dialog')),
  toast: $lazy(import('../../examples/toast')),
};

export const load = (_: Request, params: PreviewParams): LoadResult<null> => ({
  props: null,
  meta: {
    title: `${params.example} | solid-headless`,
    description: `Preview for ${params.example}`,
  },
});

export default function ToasterPreview(): JSX.Element {
  const router = useRouter<PreviewParams>();

  return (
    <PreviewShell>
      <style>
        {'body { overflow: hidden; }'}
      </style>
      <Dynamic component={PREVIEWS[router.params.example]} />
    </PreviewShell>
  );
}
