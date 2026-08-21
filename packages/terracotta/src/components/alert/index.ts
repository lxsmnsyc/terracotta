import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createUniqueId, merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const ALERT_TAG = createTag('alert');

export type AlertProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

/**
 * A live region for a message that needs attention as soon as it appears, such
 * as a form error. Assistive technology announces its content without moving
 * focus.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert.md}
 */
export function Alert<T extends ValidComponent = 'div'>(props: AlertProps<T>): JSX.Element {
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
