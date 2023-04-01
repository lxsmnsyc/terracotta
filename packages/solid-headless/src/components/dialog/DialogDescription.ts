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
  useDialogContext,
} from './DialogContext';
import { DIALOG_DESCRIPTION_TAG } from './tags';
import { DisclosureStateChild, DisclosureStateRenderProps } from '../../states/create-disclosure-state';

export type DialogDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function DialogDescription<T extends ValidConstructor = 'p'>(
  props: DialogDescriptionProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogDescription');
  return createDynamic(
    () => props.as || ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      DIALOG_DESCRIPTION_TAG,
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
