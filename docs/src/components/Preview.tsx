import { JSX } from 'solid-js';

export interface PreviewProps {
  src: string;
}

export default function Preview(props: PreviewProps): JSX.Element {
  return (
    <iframe
      title="Preview"
      class="w-full h-full"
      src={props.src}
      // https://github.com/sveltejs/svelte-repl/blob/master/src/Output/Viewer.svelte
      sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
    />
  );
}
