import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface FeedContextData {
  ownerID: string;
  labelID: string;
  contentID: string;
  size: number;
  busy: boolean;
  focusPrev: () => void;
  focusNext: () => void;
}

export const FeedContext = createContext<FeedContextData>();

export function useFeedContext(componentName: string): FeedContextData {
  const context = useContext(FeedContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Feed>`));
  return context;
}
