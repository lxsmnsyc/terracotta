import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedContext } from './FeedContext';
import { FEED_LABEL_TAG } from './tags';

export type FeedLabelProps<T extends ValidComponent = 'span'> = HeadlessProps<T>;

/**
 * The accessible name of a `Feed`, wired up through `aria-labelledby`.
 *
 * Renders a `<span>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedLabel<T extends ValidComponent = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  context.registerLabel();
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'span');
  return <Root {...FEED_LABEL_TAG} id={context.labelID} {...rest} />;
}
