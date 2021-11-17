import {
  JSX,
} from 'solid-js';
import * as shiki from 'shiki';
import Preview from './Preview';
import CodeSnippet from './CodeSnippet';

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

  return (
    <div class="flex flex-col border bg-gray-900 dark:bg-gray-50 border-gray-900 dark:border-gray-50 md:flex-row rounded-lg overflow-hidden h-full">
      <div class={`flex-1 overflow-scroll transition duration-300 ${snippetLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CodeSnippet code={props.code} onLoad={onSnippetLoad} />
      </div>
      <div class={`flex-1 transition duration-300 ${previewLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Preview src={props.src} onLoad={onPreviewLoad} />
      </div>
    </div>
  );
}
