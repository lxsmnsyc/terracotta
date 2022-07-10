import {
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  ValidConstructor,
  HeadlessProps,
} from '../../utils/dynamic-prop';
import {
  useAlertDialogContext,
} from './AlertDialogContext';

export type AlertDialogTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function AlertDialogTitle<T extends ValidConstructor = 'h2'>(
  props: AlertDialogTitleProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.titleID}
      data-sh-alert-dialog-title={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
