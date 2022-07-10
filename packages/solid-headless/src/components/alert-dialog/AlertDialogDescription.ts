import {
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useAlertDialogContext,
} from './AlertDialogContext';

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
      {
        id: context.descriptionID,
        'data-sh-alert-dialog-description': context.ownerID,
        get children() {
          return createComponent(HeadlessDisclosureChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
