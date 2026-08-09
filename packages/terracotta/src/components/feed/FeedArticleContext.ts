import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface FeedArticleContextData {
  ownerID: string;
  labelID: string;
  descriptionID: string;
}

export const FeedArticleContext = createContext<FeedArticleContextData>();

/**
 * Reads the nearest `FeedArticle`'s internal context, which holds the
 * generated ids for its label and description. Throws when called outside a
 * `FeedArticle`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function useFeedArticleContext(componentName: string): FeedArticleContextData {
  const context = useContext(FeedArticleContext);
  assert(context, new Error(`<${componentName}> must be used inside a <FeedArticle>`));
  return context;
}
