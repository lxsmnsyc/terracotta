import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge, omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import {
  CheckStateChild,
  useCheckState,
} from '../../states/create-check-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_LABEL } from './tags';

export type CheckboxLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T, CheckStateRenderProps>;

export function CheckboxLabel<T extends ValidComponent = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  const state = useCheckState();
  return createDynamic(
    () => props.as || ('label' as T),
    merge(
      omit(props, 'as', 'children'),
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
    ) as ComponentProps<T>,
  );
}
