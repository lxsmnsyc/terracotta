import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useFeedContext,
} from './FeedContext';

export type FeedLabelProps<T extends ValidConstructor = 'span'> = HeadlessProps<T>;

export function FeedLabel<T extends ValidConstructor = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  return createDynamic(
    () => props.as ?? ('span' as T),
    mergeProps(
      omitProps(props, ['as']),
      {
        id: context.labelID,
        'data-sh-feed-label': context.ownerID,
      },
    ) as DynamicProps<T>,
  );
}
