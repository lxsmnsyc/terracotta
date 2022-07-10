import {
  createContext,
  useContext,
} from 'solid-js';

interface FeedContext {
  ownerID: string;
  labelID: string;
  contentID: string;
  size: number;
  busy: boolean;
  focusPrev: () => void;
  focusNext: () => void;
}

export const FeedContext = createContext<FeedContext>();

export function useFeedContext(componentName: string): FeedContext {
  const context = useContext(FeedContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Feed>`);
}
