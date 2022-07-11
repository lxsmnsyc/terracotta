import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDialogContext,
} from './DialogContext';

export type DialogDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function DialogDescription<T extends ValidConstructor = 'p'>(
  props: DialogDescriptionProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogDescription');
  return createDynamic(
    () => props.as ?? ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      {
        id: context.descriptionID,
        'data-sh-dialog-description': context.ownerID,
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
