import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge, omit } from 'solid-js';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useFeedContext } from './FeedContext';
import { FEED_LABEL_TAG } from './tags';

export type FeedLabelProps<T extends ValidComponent = 'span'> =
  HeadlessProps<T>;

export function FeedLabel<T extends ValidComponent = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  return createDynamic(
    () => props.as || ('span' as T),
    merge(
      FEED_LABEL_TAG,
      {
        id: context.labelID,
      },
      omit(props, 'as'),
    ) as ComponentProps<T>,
  );
}
