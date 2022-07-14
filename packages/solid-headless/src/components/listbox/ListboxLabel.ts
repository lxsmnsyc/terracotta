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
  useListboxContext,
} from './ListboxContext';
import { LISTBOX_LABEL_TAG } from './tags';

export type ListboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function ListboxLabel<T extends ValidConstructor = 'label'>(
  props: ListboxLabelProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxLabel');

  return createDynamic(
    () => props.as ?? ('label' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      LISTBOX_LABEL_TAG,
      {
        id: context.labelID,
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
