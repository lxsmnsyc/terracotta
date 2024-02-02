import type { JSX } from 'solid-js';
import { createComponent, createUniqueId, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { FeedArticleContext } from './FeedArticleContext';
import { useFeedContext } from './FeedContext';
import { FEED_ARTICLE_TAG } from './tags';

export type FeedArticleProps<T extends ValidConstructor = 'article'> =
  HeadlessPropsWithRef<T, { index: number }>;

export function FeedArticle<T extends ValidConstructor = 'article'>(
  props: FeedArticleProps<T>,
): JSX.Element {
  const rootContext = useFeedContext('FeedArticle');

  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const descriptionID = createUniqueId();

  return createComponent(FeedArticleContext.Provider, {
    value: {
      ownerID,
      labelID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as || ('article' as T),
        mergeProps(
          omitProps(props, ['as']),
          FEED_ARTICLE_TAG,
          createOwnerAttribute(rootContext.ownerID),
          {
            id: ownerID,
            'aria-labelledby': labelID,
            'aria-describedby': descriptionID,
            tabindex: 0,
            get 'aria-posinset'() {
              return props.index + 1;
            },
            get 'aria-setsize'() {
              return rootContext.size;
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
