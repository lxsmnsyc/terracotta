import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';
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

  const rest = omit(props, 'as');
  return (
    <Dynamic component={props.as || 'div'} id={alertID} {...rest} {...ALERT_TAG} role="alert" />
  );
}
