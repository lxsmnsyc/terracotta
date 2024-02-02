import type { JSX } from 'solid-js';
import { createUniqueId, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const ALERT_TAG = createTag('alert');

export type AlertProps<T extends ValidConstructor = 'div'> = HeadlessProps<T>;

export function Alert<T extends ValidConstructor = 'div'>(
  props: AlertProps<T>,
): JSX.Element {
  const alertID = createUniqueId();

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      {
        id: alertID,
      },
      omitProps(props, ['as']),
      ALERT_TAG,
      {
        role: 'alert',
      },
    ) as DynamicProps<T>,
  );
}
