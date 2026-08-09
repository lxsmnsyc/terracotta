import type { JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import {
  CheckStateChild,
  useCheckState,
} from '../../states/create-check-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIACheckedState,
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_INDICATOR } from './tags';

export type CheckboxIndicatorProps<T extends ValidComponent = 'button'> =
  HeadlessPropsWithRef<T, CheckStateRenderProps>;

/**
 * The control the user actually clicks. Carries `role="checkbox"` and `aria-
 * checked`, which is `"mixed"` while the state is indeterminate.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function CheckboxIndicator<T extends ValidComponent = 'button'>(
  props: CheckboxIndicatorProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxIndicator');
  const state = useCheckState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.toggle();
      });
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
      omit(props, 'children', 'ref'),
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
      createARIACheckedState(() => state.checked()),
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
