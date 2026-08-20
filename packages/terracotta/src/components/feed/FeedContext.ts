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

/**
 * Reads the nearest `Feed`'s internal context, which holds the generated ids
 * and the focus navigator shared by its articles. Throws when called outside a
 * `Feed`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function useFeedContext(componentName: string): FeedContextData {
  const context = useContext(FeedContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Feed>`));
  return context;
}
