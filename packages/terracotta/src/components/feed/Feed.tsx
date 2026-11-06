import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { FeedContext } from './FeedContext';
import { createPresence } from '../../utils/create-presence';
import { FEED_TAG } from './tags';

export interface FeedBaseProps {
  size: number;
  busy?: boolean;
}

export type FeedProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<T, FeedBaseProps>;

/**
 * A stream of articles with the feed keyboard pattern: <kbd>Page Down</kbd>
 * and <kbd>Page Up</kbd> move between articles,
 * <kbd>Ctrl</kbd>+<kbd>Home</kbd> and <kbd>Ctrl</kbd>+<kbd>End</kbd> jump to
 * the ends. Set `size` to the total number of articles, or `-1` when it is
 * unknown, and `busy` while more are loading.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function Feed<T extends ValidComponent = 'div'>(props: FeedProps<T>): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const contentID = createUniqueId();

  const [, setRef] = createForwardRef(props);
  const label = createPresence();

  const rest = omit(props, 'as', 'busy', 'size', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <FeedContext
      value={{
        ownerID,
        labelID,
        contentID,
        getSize() {
          return props.size;
        },
        isBusy() {
          return !!props.busy;
        },
        hasLabel: label.isPresent,
        registerLabel: label.register,
      }}
    >
      <Root {...FEED_TAG} id={ownerID} ref={setRef} {...rest} />
    </FeedContext>
  );
}
