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
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useListboxContext,
} from './ListboxContext';
import { LISTBOX_LABEL_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
} from '../../states/create-disclosure-state';

export type ListboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function ListboxLabel<T extends ValidConstructor = 'label'>(
  props: ListboxLabelProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxLabel');

  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      LISTBOX_LABEL_TAG,
      {
        id: context.labelID,
      },
      {
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
