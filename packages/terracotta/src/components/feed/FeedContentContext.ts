import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const FeedContentContext = createContext<FocusNavigator>();

/**
 * Reads the nearest `FeedContent`'s internal context, which holds the focus
 * navigator shared by its articles. Throws when called outside a
 * `FeedContent`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function useFeedContentContext(componentName: string): FocusNavigator {
  const context = useContext(FeedContentContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <FeedContent>`),
  );
  return context;
}

export function createFeedArticleFocusNavigator(owner: string): FocusNavigator {
  return new FocusNavigator(owner);
}
