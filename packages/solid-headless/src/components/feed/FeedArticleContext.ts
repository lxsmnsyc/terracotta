import {
  createContext,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';

interface FeedArticleContext {
  ownerID: string;
  labelID: string;
  descriptionID: string;
}

export const FeedArticleContext = createContext<FeedArticleContext>();

export function useFeedArticleContext(componentName: string): FeedArticleContext {
  const context = useContext(FeedArticleContext);
  assert(context, new Error(`<${componentName}> must be used inside a <FeedArticle>`));
  return context;
}
