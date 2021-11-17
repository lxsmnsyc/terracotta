import { JSX } from 'solid-js';
import * as shiki from 'shiki';
import { useDarkPreference } from './ThemeAdapter';

export interface CodeSnippetProps {
  code: string;
  onLoad: () => void;
}

export default function CodeSnippet(props: CodeSnippetProps): JSX.Element {
  const code = $signal<HTMLElement>();
  const isDarkMode = useDarkPreference();

  let highlighter = $signal<shiki.Highlighter>();

  effect: {
    shiki.getHighlighter({
      langs: ['tsx', 'jsx'],
      themes: ['github-dark', 'github-light'],
    }).then((result) => {
      highlighter = result;
      props.onLoad();
    }).catch(() => {
      //
    });
  }

  effect: {
    const el = code;
    const value = props.code;
    const dark = isDarkMode();
    if (el && highlighter) {
      el.innerHTML = highlighter?.codeToHtml(value, 'tsx', dark ? 'github-dark' : 'github-light');
    }
  }

  return (
    <div ref={$set(code)} />
  );
}
