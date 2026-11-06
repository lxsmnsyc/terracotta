import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import getFocusableElements from '../../utils/focus-query';
import useEventListener from '../../utils/use-event-listener';
import { createFeedArticleFocusNavigator, FeedContentContext } from './FeedContentContext';
import { useFeedContext } from './FeedContext';
import { FEED_CONTENT_TAG } from './tags';

const enum Direction {
  Before = 0,
  After = 1,
}

/**
 * Focuses the nearest focusable element before or after the feed. Elements
 * inside the feed are skipped.
 */
function focusOutside(feed: HTMLElement, direction: Direction): void {
  const nodes = getFocusableElements(document.documentElement, feed);
  const position =
    direction === Direction.Before
      ? Node.DOCUMENT_POSITION_PRECEDING
      : Node.DOCUMENT_POSITION_FOLLOWING;
  const candidates = nodes.filter((node) => feed.compareDocumentPosition(node) & position);
  const target = direction === Direction.Before ? candidates.at(-1) : candidates.at(0);
  target?.focus();
}

export type FeedContentProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<T>;

/**
 * The scrolling region that holds the articles of a `Feed`. Everything outside
 * it, such as a load-more button, stays out of the feed's navigation.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedContent<T extends ValidComponent = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');
  const controller = createFeedArticleFocusNavigator(context.ownerID);

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', (e) => {
          if (e.ctrlKey) {
            switch (e.key) {
              case 'Home': {
                e.preventDefault();
                focusOutside(current, Direction.Before);
                break;
              }
              case 'End': {
                e.preventDefault();
                focusOutside(current, Direction.After);
                break;
              }
              default:
                break;
            }
          }
          switch (e.key) {
            case 'PageUp': {
              e.preventDefault();
              controller.setPrevChecked(false);
              break;
            }
            case 'PageDown': {
              e.preventDefault();
              controller.setNextChecked(false);
              break;
            }
            default:
              break;
          }
        }),
        useEventListener(current, 'focusin', (e) => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <FeedContentContext value={controller}>
      <Root
        {...FEED_CONTENT_TAG}
        id={context.contentID}
        role="feed"
        aria-labelledby={context.hasLabel() ? context.labelID : undefined}
        aria-busy={context.isBusy() ? 'true' : 'false'}
        ref={setInternalRef}
        {...rest}
      />
    </FeedContentContext>
  );
}
