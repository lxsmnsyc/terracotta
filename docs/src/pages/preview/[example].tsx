import {
  JSX,
} from 'solid-js';
import { css } from 'solid-styled';
import { RouterParams, useRouter } from 'solid-tiny-router';
import PreviewShell from '../../components/PreviewShell';

interface PreviewParams extends RouterParams {
  example: string;
}

const PREVIEWS: Record<string, () => JSX.Element> = {
  accordion: $lazy(import('../../examples/accordion')),
  dialog: $lazy(import('../../examples/dialog')),
  toast: $lazy(import('../../examples/toast')),
};

export default function ToasterPreview(): JSX.Element {
  const router = useRouter<PreviewParams>();

  // eslint-disable-next-line no-unused-expressions
  css`
    :global(body) {
      overflow: hidden;
    }
  `;

  return (
    <PreviewShell>
      <solid:dynamic component={PREVIEWS[router.params.example]} />
    </PreviewShell>
  );
}
