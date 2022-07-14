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
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDialogContext,
} from './DialogContext';
import { DIALOG_DESCRIPTION_TAG } from './tags';

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
      DIALOG_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
