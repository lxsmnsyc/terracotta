import { JSX, useContext } from 'solid-js';
import * as shiki from 'shiki';

interface HighlighterProviderProps {
  children: JSX.Element;
}

const HighlighterContext = $createContext<() => shiki.Highlighter | undefined>();

export default function HighlighterProvider(props: HighlighterProviderProps): JSX.Element {
  let highlighter = $signal<shiki.Highlighter>();

  $effect(() => {
    shiki.getHighlighter({
      langs: ['tsx', 'jsx'],
      themes: ['github-dark', 'github-light'],
    }).then((result) => {
      highlighter = result;
    }).catch(() => {
      //
    });
  });

  return (
    <HighlighterContext.Provider value={$get(highlighter)}>
      {props.children}
    </HighlighterContext.Provider>
  );
}

export function useHighlighter(): () => shiki.Highlighter | undefined {
  const ctx = useContext(HighlighterContext);

  if (!ctx) {
    throw new Error('Missing HighlighterProvider');
  }
  return ctx;
}
