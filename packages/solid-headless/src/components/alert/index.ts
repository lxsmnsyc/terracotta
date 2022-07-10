import {
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';

export type AlertProps<T extends ValidConstructor = 'div'> = HeadlessProps<T>;

export function Alert<T extends ValidConstructor = 'div'>(
  props: AlertProps<T>,
): JSX.Element {
  const alertID = createUniqueId();

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
      {
        id: alertID,
      },
      omitProps(props, ['as']),
      {
        role: 'alert',
        'data-sh-alert': alertID,
      },
    ) as DynamicProps<T>,
  );
}
