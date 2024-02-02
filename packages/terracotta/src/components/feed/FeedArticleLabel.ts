import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_LABEL_TAG } from './tags';

export type FeedArticleLabelProps<T extends ValidConstructor = 'span'> =
  HeadlessProps<T>;

export function FeedArticleLabel<T extends ValidConstructor = 'span'>(
  props: FeedArticleLabelProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleLabel');
  return createDynamic(
    () => props.as || ('span' as T),
    mergeProps(omitProps(props, ['as']), FEED_ARTICLE_LABEL_TAG, {
      id: context.labelID,
    }) as DynamicProps<T>,
  );
}
