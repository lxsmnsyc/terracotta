import {
  createContext,
  useContext,
} from 'solid-js';

interface FeedArticleContext {
  ownerID: string;
  labelID: string;
  descriptionID: string;
}

export const FeedArticleContext = createContext<FeedArticleContext>();

export function useFeedArticleContext(componentName: string): FeedArticleContext {
  const context = useContext(FeedArticleContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}
