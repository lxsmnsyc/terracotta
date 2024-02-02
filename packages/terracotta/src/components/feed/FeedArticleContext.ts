import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';

interface FeedArticleContextData {
  ownerID: string;
  labelID: string;
  descriptionID: string;
}

export const FeedArticleContext = createContext<FeedArticleContextData>();

export function useFeedArticleContext(
  componentName: string,
): FeedArticleContextData {
  const context = useContext(FeedArticleContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <FeedArticle>`),
  );
  return context;
}
