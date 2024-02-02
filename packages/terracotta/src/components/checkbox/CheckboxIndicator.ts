import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import {
  CheckStateChild,
  useCheckState,
} from '../../states/create-check-state';
import type {
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_INDICATOR } from './tags';

export type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, CheckStateRenderProps>;

export function CheckboxIndicator<T extends ValidConstructor = 'button'>(
  props: CheckboxIndicatorProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxIndicator');
  const state = useCheckState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        state.toggle();
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['children', 'ref']),
      CHECKBOX_INDICATOR,
      {
        id: context.indicatorID,
        role: 'checkbox',
        'aria-labelledby': context.labelID,
        'aria-describedby': context.descriptionID,
        ref: setInternalRef,
      },
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createCheckedState(() => state.checked()),
      {
        get children() {
          return createComponent(CheckStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
