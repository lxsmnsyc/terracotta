import { JSX } from 'solid-js';
import { usePreferredColorScheme } from 'solid-headless';
import { useHighlighter } from './HighlighterProvider';

export interface CodeSnippetProps {
  code: string;
  onLoad?: () => void;
}

export default function CodeSnippet(props: CodeSnippetProps): JSX.Element {
  const code = $signal<HTMLElement>();
  const colorScheme = usePreferredColorScheme();
  const highlighter = useHighlighter();

  $effect(() => {
    if (highlighter()) {
      props.onLoad?.();
    }
  });

  $effect(() => {
    const el = code;
    const value = props.code;
    const dark = colorScheme() === 'dark';
    const instance = highlighter();
    if (el && instance) {
      el.innerHTML = instance.codeToHtml(value, {
        lang: 'tsx',
        theme: dark ? 'github-dark' : 'github-light',
      });
    }
  });

  return (
    <div ref={$set(code)} />
  );
}
