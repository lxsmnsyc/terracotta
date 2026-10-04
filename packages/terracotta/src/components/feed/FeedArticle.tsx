import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';
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

  const ownerAttribute = createOwnerAttribute(rootContext.ownerID);
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'article');
  return (
    <FeedArticleContext
      value={{
        ownerID,
        labelID,
        descriptionID,
      }}
    >
      <Root
        {...FEED_ARTICLE_TAG}
        {...ownerAttribute}
        id={ownerID}
        aria-labelledby={labelID}
        aria-describedby={descriptionID}
        tabindex={0}
        aria-posinset={props.index + 1}
        aria-setsize={rootContext.getSize()}
        {...rest}
      />
    </FeedArticleContext>
  );
}
