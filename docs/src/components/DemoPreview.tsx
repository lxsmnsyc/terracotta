import {
  JSX,
} from 'solid-js';
import * as shiki from 'shiki';
import Split from 'split.js';
import { useMediaQuery } from 'solid-use';
import Preview from './Preview';
import CodeSnippet from './CodeSnippet';
import ClientOnly from './ClientOnly';

export interface DemoPreviewProps {
  src: string;
  code: string;
}

shiki.setCDN('https://unpkg.com/shiki/');

export default function DemoPreview(props: DemoPreviewProps): JSX.Element {
  let previewLoading = $signal(true);
  let snippetLoading = $signal(true);

  function onPreviewLoad() {
    previewLoading = false;
  }
  function onSnippetLoad() {
    snippetLoading = false;
  }

  const isMD = useMediaQuery('(min-width: 768px)');
  const panelA = $signal<HTMLElement>();
  const panelB = $signal<HTMLElement>();

  $effect(() => {
    const md = isMD();
    if (panelA && panelB) {
      const instance = Split([panelA, panelB], {
        direction: md ? 'horizontal' : 'vertical',
        minSize: 200,
      });

      $cleanup(() => instance.destroy());
    }
  });

  return (
    <div class="flex flex-col border bg-gray-900 dark:bg-gray-50 border-gray-900 dark:border-gray-50 divide-x divide-gray-900 dark:divide-gray-50 md:flex-row rounded-lg overflow-hidden h-full">
      <div ref={$set(panelA)} class={`overflow-auto overflow-y-scroll transition duration-300 ${snippetLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ClientOnly>
          <CodeSnippet code={props.code} onLoad={onSnippetLoad} />
        </ClientOnly>
      </div>
      <div ref={$set(panelB)} class={`transition duration-300 ${previewLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ClientOnly>
          <Preview src={props.src} onLoad={onPreviewLoad} />
        </ClientOnly>
      </div>
    </div>
  );
}
