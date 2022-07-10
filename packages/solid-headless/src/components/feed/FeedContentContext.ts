import {
  createContext,
  useContext,
} from 'solid-js';

interface FeedContentContext {
  focusPrev: (el: Element) => void;
  focusNext: (el: Element) => void;
}

export const FeedContentContext = createContext<FeedContentContext>();

export function useFeedContentContext(componentName: string): FeedContentContext {
  const context = useContext(FeedContentContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}
