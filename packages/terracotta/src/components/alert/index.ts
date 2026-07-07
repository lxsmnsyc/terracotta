import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createUniqueId, merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const ALERT_TAG = createTag('alert');

export type AlertProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

export function Alert<T extends ValidComponent = 'div'>(
  props: AlertProps<T>,
): JSX.Element {
  const alertID = createUniqueId();

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      {
        id: alertID,
      },
      omit(props, 'as'),
      ALERT_TAG,
      {
        role: 'alert',
      },
    ) as ComponentProps<T>,
  );
}
