import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useFeedArticleContext,
} from './FeedArticleContext';

export type FeedArticleLabelProps<T extends ValidConstructor = 'span'> = HeadlessProps<T>;

export function FeedArticleLabel<T extends ValidConstructor = 'span'>(
  props: FeedArticleLabelProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleLabel');
  return createDynamic(
    () => props.as ?? ('span' as T),
    mergeProps(
      omitProps(props, ['as']),
      {
        id: context.labelID,
        'data-sh-feed-article-label': context.ownerID,
      },
    ) as DynamicProps<T>,
  );
}
