import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import {
  CheckStateChild,
  useCheckState,
} from '../../states/create-check-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_LABEL } from './tags';

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, CheckStateRenderProps>;

export function CheckboxLabel<T extends ValidConstructor = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  const state = useCheckState();
  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, ['as', 'children']),
      CHECKBOX_LABEL,
      {
        id: context.labelID,
        for: context.indicatorID,
        get children() {
          return createComponent(CheckStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      createCheckedState(() => state.checked()),
    ) as DynamicProps<T>,
  );
}
