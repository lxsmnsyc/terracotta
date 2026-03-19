import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
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
      omitProps(props, ['as']),
    ) as ComponentProps<T>,
  );
}
