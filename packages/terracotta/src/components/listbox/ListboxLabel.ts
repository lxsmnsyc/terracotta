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
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { useSelectState } from '../../states/create-select-state';
import {
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';

export type ListboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function ListboxLabel<T extends ValidConstructor = 'label'>(
  props: ListboxLabelProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxLabel');
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();

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
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => selectState.hasSelected()),
      createHasActiveState(() => selectState.hasActive()),
    ) as DynamicProps<T>,
  );
}
