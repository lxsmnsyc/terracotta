import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_DESCRIPTION_TAG } from './tags';

export type FeedArticleDescriptionProps<T extends ValidComponent = 'p'> =
  HeadlessProps<T>;

export function FeedArticleDescription<T extends ValidComponent = 'p'>(
  props: FeedArticleDescriptionProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleDescription');
  return createDynamic(
    () => props.as || ('p' as T),
    merge(
      FEED_ARTICLE_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
      },
      omitProps(props, ['as']),
    ) as ComponentProps<T>,
  );
}
