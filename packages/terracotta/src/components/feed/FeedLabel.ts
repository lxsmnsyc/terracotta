import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type { DynamicProps, HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { useFeedContext } from './FeedContext';
import { FEED_LABEL_TAG } from './tags';

export type FeedLabelProps<T extends ValidConstructor = 'span'> = HeadlessProps<T>;

/**
 * The accessible name of a `Feed`, wired up through `aria-labelledby`.
 *
 * Renders a `<span>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/feed.md}
 */
export function FeedLabel<T extends ValidConstructor = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  return createDynamic(
    () => props.as ?? ('span' as T),
    mergeProps(
      FEED_LABEL_TAG,
      {
        id: context.labelID,
      },
      omitProps(props, ['as']),
    ) as DynamicProps<T>,
  );
}
