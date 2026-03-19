import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_LABEL_TAG } from './tags';

export type FeedArticleLabelProps<T extends ValidComponent = 'span'> =
  HeadlessProps<T>;

export function FeedArticleLabel<T extends ValidComponent = 'span'>(
  props: FeedArticleLabelProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleLabel');
  return createDynamic(
    () => props.as || ('span' as T),
    merge(
      FEED_ARTICLE_LABEL_TAG,
      {
        id: context.labelID,
      },
      omitProps(props, ['as']),
    ) as ComponentProps<T>,
  );
}
