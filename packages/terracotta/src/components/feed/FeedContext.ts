import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface FeedContextData {
  ownerID: string;
  labelID: string;
  contentID: string;
  getSize(): number;
  isBusy(): boolean;
  /** Whether a `FeedLabel` is mounted. */
  hasLabel(): boolean;
  registerLabel(): void;
}

export const FeedContext = createContext<FeedContextData | null>(null);

/**
 * Reads the nearest `Feed`'s internal context, which holds the generated ids.
 * Throws when called outside a `Feed`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function useFeedContext(componentName: string): FeedContextData {
  const context = useContext(FeedContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Feed>`));
  return context;
}
