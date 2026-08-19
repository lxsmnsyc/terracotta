import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createUniqueId, merge, omit } from 'solid-js';
import type {
  CheckStateControlledOptions,
  CheckStateRenderProps,
  CheckStateUncontrolledOptions,
} from '../../states/create-check-state';
import {
  CheckStateProvider,
  createCheckState,
} from '../../states/create-check-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { CheckboxContext } from './CheckboxContext';
import { CHECKBOX_TAG } from './tags';

export type CheckboxControlledBaseProps = Prettify<
  CheckStateControlledOptions & CheckStateRenderProps
>;

export type CheckboxControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, CheckboxControlledBaseProps>;

export type CheckboxUncontrolledBaseProps = Prettify<
  CheckStateUncontrolledOptions & CheckStateRenderProps
>;

export type CheckboxUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, CheckboxUncontrolledBaseProps>;

export type CheckboxProps<T extends ValidComponent = 'div'> =
  | CheckboxControlledProps<T>
  | CheckboxUncontrolledProps<T>;

function isCheckboxUncontrolled<T extends ValidComponent = 'div'>(
  props: CheckboxProps<T>,
): props is CheckboxUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

/**
 * A checkbox that can be checked, unchecked, or indeterminate. It is a wrapper
 * only: the tickable control is `CheckboxIndicator`, and the state lives in
 * `defaultChecked`/`checked`, where `undefined` means indeterminate.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function Checkbox<T extends ValidComponent = 'div'>(
  props: CheckboxProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();

  const state = createCheckState(props);

  return createComponent(CheckboxContext, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as || 'div',
        merge(
          CHECKBOX_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createCheckedState(() => state.checked()),
          isCheckboxUncontrolled(props)
            ? omit(
                props,
                'as',
                'children',
                'defaultChecked',
                'disabled',
                'onChange',
              )
            : omit(props, 'as', 'children', 'checked', 'disabled', 'onChange'),
          {
            get children() {
              return createComponent(CheckStateProvider, {
                state,
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as ComponentProps<T>,
      );
    },
  });
}
