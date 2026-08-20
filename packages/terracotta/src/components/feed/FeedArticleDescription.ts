import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type { DynamicProps, HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_DESCRIPTION_TAG } from './tags';

export type FeedArticleDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T>;

/**
 * The accessible description of a `FeedArticle`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedArticleDescription<T extends ValidConstructor = 'p'>(
  props: FeedArticleDescriptionProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleDescription');
  return createDynamic(
    () => props.as ?? ('p' as T),
    mergeProps(
      FEED_ARTICLE_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
      },
      omitProps(props, ['as']),
    ) as DynamicProps<T>,
  );
}
