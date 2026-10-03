import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedArticleContext } from './FeedArticleContext';
import { FEED_ARTICLE_LABEL_TAG } from './tags';

export type FeedArticleLabelProps<T extends ValidComponent = 'span'> = HeadlessProps<T>;

/**
 * The accessible name of a `FeedArticle`, wired up through `aria-labelledby`.
 *
 * Renders a `<span>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedArticleLabel<T extends ValidComponent = 'span'>(
  props: FeedArticleLabelProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleLabel');
  const rest = omit(props, 'as');
  return (
    <Dynamic
      component={props.as || 'span'}
      {...FEED_ARTICLE_LABEL_TAG}
      id={context.labelID}
      {...rest}
    />
  );
}
