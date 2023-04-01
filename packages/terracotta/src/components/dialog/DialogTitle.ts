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
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDialogContext,
} from './DialogContext';
import { DIALOG_TITLE_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
} from '../../states/create-disclosure-state';

export type DialogTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function DialogTitle<T extends ValidConstructor = 'h2'>(
  props: DialogTitleProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogTitle');
  return createDynamic(
    () => props.as || ('h2' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      DIALOG_TITLE_TAG,
      {
        id: context.titleID,
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
