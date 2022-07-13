import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  createHeadlessDisclosureChildProps,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useAlertDialogContext,
} from './AlertDialogContext';
import { ALERT_DIALOG_TITLE } from './tags';

export type AlertDialogTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function AlertDialogTitle<T extends ValidConstructor = 'h2'>(
  props: AlertDialogTitleProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogTitle');
  return createDynamic(
    () => props.as ?? ('h2' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      {
        id: context.titleID,
      },
      ALERT_DIALOG_TITLE,
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
