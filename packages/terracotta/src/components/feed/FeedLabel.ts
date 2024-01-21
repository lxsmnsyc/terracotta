import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { useFeedContext } from './FeedContext';
import { FEED_LABEL_TAG } from './tags';

export type FeedLabelProps<T extends ValidConstructor = 'span'> =
  HeadlessProps<T>;

export function FeedLabel<T extends ValidConstructor = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  return createDynamic(
    () => props.as || ('span' as T),
    mergeProps(omitProps(props, ['as']), FEED_LABEL_TAG, {
      id: context.labelID,
    }) as DynamicProps<T>,
  );
}
