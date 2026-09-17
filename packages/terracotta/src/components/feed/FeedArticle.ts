import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createUniqueId, merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { FeedArticleContext } from './FeedArticleContext';
import { useFeedContext } from './FeedContext';
import { FEED_ARTICLE_TAG } from './tags';

export type FeedArticleProps<T extends ValidComponent = 'article'> = HeadlessPropsWithRef<
  T,
  { index: number }
>;

/**
 * One entry in a `Feed`. The required `index` prop is its zero-based position,
 * which becomes `aria-posinset`.
 *
 * Renders an `<article>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedArticle<T extends ValidComponent = 'article'>(
  props: FeedArticleProps<T>,
): JSX.Element {
  const rootContext = useFeedContext('FeedArticle');

  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const descriptionID = createUniqueId();

  return createComponent(FeedArticleContext, {
    value: {
      ownerID,
      labelID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as || ('article' as T),
        merge(
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
              return rootContext.getSize();
            },
          },
          omit(props, 'as'),
        ) as ComponentProps<T>,
      );
    },
  });
}
