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

export type FeedArticleDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T>;

export function FeedArticleDescription<T extends ValidConstructor = 'p'>(
  props: FeedArticleDescriptionProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleDescription');
  return createDynamic(
    () => props.as ?? ('p' as T),
    mergeProps(
      omitProps(props, ['as']),
      {
        id: context.descriptionID,
        'data-sh-feed-article-description': context.ownerID,
      },
    ) as DynamicProps<T>,
  );
}
