import { JSX } from 'solid-js';
import { useDarkPreference } from './ThemeAdapter';
import { useHighlighter } from './HighlighterProvider';

export interface CodeSnippetProps {
  code: string;
  onLoad?: () => void;
}

export default function CodeSnippet(props: CodeSnippetProps): JSX.Element {
  const code = $signal<HTMLElement>();
  const isDarkMode = useDarkPreference();
  const highlighter = useHighlighter();

  effect: {
    if (highlighter()) {
      props.onLoad?.();
    }
  }

  effect: {
    const el = code;
    const value = props.code;
    const dark = isDarkMode();
    const instance = highlighter();
    if (el && instance) {
      el.innerHTML = instance.codeToHtml(value, 'tsx', dark ? 'github-dark' : 'github-light');
    }
  }

  return (
    <div ref={$set(code)} />
  );
}
