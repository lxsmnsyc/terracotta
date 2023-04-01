import {
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useAlertDialogContext,
} from './AlertDialogContext';
import { ALERT_DIALOG_DESCRIPTION_TAG } from './tags';
import { DisclosureStateChild, DisclosureStateRenderProps } from '../../states/create-disclosure-state';

export type AlertDialogDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function AlertDialogDescription<T extends ValidConstructor = 'p'>(
  props: AlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogDescription');
  return createDynamic(
    () => props.as || ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      ALERT_DIALOG_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
