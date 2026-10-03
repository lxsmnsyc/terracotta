import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_DESCRIPTION_TAG } from './tags';

export type FeedArticleDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<T>;

/**
 * The accessible description of a `FeedArticle`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedArticleDescription<T extends ValidComponent = 'p'>(
  props: FeedArticleDescriptionProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleDescription');
  const rest = omit(props, 'as');
  return (
    <Dynamic
      component={props.as || 'p'}
      {...FEED_ARTICLE_DESCRIPTION_TAG}
      id={context.descriptionID}
      {...rest}
    />
  );
}
