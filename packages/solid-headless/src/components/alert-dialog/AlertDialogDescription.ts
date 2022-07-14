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
import { ALERT_DIALOG_DESCRIPTION } from './tags';

export type AlertDialogDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function AlertDialogDescription<T extends ValidConstructor = 'p'>(
  props: AlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogDescription');
  return createDynamic(
    () => props.as ?? ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      ALERT_DIALOG_DESCRIPTION,
      {
        id: context.descriptionID,
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
