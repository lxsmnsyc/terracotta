import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createMemo, omit } from 'solid-js';
import type {
  MultipleSelectStateControlledOptions,
  MultipleSelectStateUncontrolledOptions,
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import {
  createMultipleSelectState,
  createSingleSelectState,
  SelectStateProvider,
} from '../../states/create-select-state';
import createTypeAhead from '../../utils/create-type-ahead';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { createSelectOptionFocusNavigator, SelectContext } from './SelectContext';
import { SELECT_TAG } from './tags';

export interface SelectBaseProps {
  horizontal?: boolean;
}

export type SingleSelectControlledBaseProps<V> = Prettify<
  SelectBaseProps & SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type SingleSelectControlledProps<V, T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  SingleSelectControlledBaseProps<V>
>;

export type SingleSelectUncontrolledBaseProps<V> = Prettify<
  SelectBaseProps & SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type SingleSelectUncontrolledProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, SingleSelectUncontrolledBaseProps<V>>;

export type SingleSelectProps<V, T extends ValidComponent = 'ul'> =
  | SingleSelectControlledProps<V, T>
  | SingleSelectUncontrolledProps<V, T>;

export type MultipleSelectControlledBaseProps<V> = Prettify<
  SelectBaseProps & MultipleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type MultipleSelectControlledProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, MultipleSelectControlledBaseProps<V>>;

export type MultipleSelectUncontrolledBaseProps<V> = Prettify<
  SelectBaseProps & MultipleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type MultipleSelectUncontrolledProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, MultipleSelectUncontrolledBaseProps<V>>;

export type MultipleSelectProps<V, T extends ValidComponent = 'ul'> =
  | MultipleSelectControlledProps<V, T>
  | MultipleSelectUncontrolledProps<V, T>;

export type SelectProps<V, T extends ValidComponent = 'ul'> =
  | SingleSelectProps<V, T>
  | MultipleSelectProps<V, T>;

function isSelectMultiple<V, T extends ValidComponent = 'ul'>(
  props: SelectProps<V, T>,
): props is MultipleSelectProps<V, T> {
  return !!props.multiple;
}

function isSelectUncontrolled<V, T extends ValidComponent = 'ul'>(
  props: SelectProps<V, T>,
): props is SingleSelectUncontrolledProps<V, T> | MultipleSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

/**
 * An always-visible listbox. The same selection behaviour as `Listbox` without
 * the popup, so it has one state instead of two and a single `onChange`.
 *
 * Renders a `<ul>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/select.md}
 */
export function Select<V, T extends ValidComponent = 'ul'>(props: SelectProps<V, T>): JSX.Element {
  return createMemo(() => {
    const controller = createSelectOptionFocusNavigator();
    const [ref, setRef] = createForwardRef(props);
    const state = isSelectMultiple(props)
      ? createMultipleSelectState(props)
      : createSingleSelectState(props);

    const pushCharacter = createTypeAhead((value) => {
      controller.setFirstMatch(value);
    });

    createEffect(ref, (current) => {
      if (current instanceof HTMLElement) {
        controller.setRef(current);
        return mergeFunc(
          () => {
            controller.clearRef();
          },
          useEventListener(current, 'keydown', (e) => {
            if (!state.disabled()) {
              switch (e.key) {
                case 'ArrowUp': {
                  if (!props.horizontal) {
                    e.preventDefault();
                    controller.setPrevChecked(true);
                  }
                  break;
                }
                case 'ArrowLeft': {
                  if (props.horizontal) {
                    e.preventDefault();
                    controller.setPrevChecked(true);
                  }
                  break;
                }
                case 'ArrowDown': {
                  if (!props.horizontal) {
                    e.preventDefault();
                    controller.setNextChecked(true);
                  }
                  break;
                }
                case 'ArrowRight': {
                  if (props.horizontal) {
                    e.preventDefault();
                    controller.setNextChecked(true);
                  }
                  break;
                }
                case 'Home': {
                  e.preventDefault();
                  controller.setFirstChecked();
                  break;
                }
                case 'End': {
                  e.preventDefault();
                  controller.setLastChecked();
                  break;
                }
                case ' ':
                case 'Enter': {
                  e.preventDefault();
                  break;
                }
                default: {
                  if (e.key.length === 1) {
                    pushCharacter(e.key);
                  }
                  break;
                }
              }
            }
          }),
          useEventListener(current, 'focus', () => {
            if (state.hasSelected()) {
              controller.setFirstChecked(SELECTED_NODE);
            } else {
              controller.setFirstChecked();
            }
          }),
          useEventListener(current, 'focusin', (e) => {
            if (e.target && e.target !== current) {
              controller.setCurrent(e.target as HTMLElement);
            }
          }),
        );
      }
      return undefined;
    });

    const controllerId = controller.getId();
    const disabledState = createDisabledState(() => state.disabled());
    const ariaDisabledState = createARIADisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    const rest = isSelectUncontrolled(props)
      ? omit(
          props,
          'as',
          'by',
          'children',
          'defaultValue',
          'disabled',
          'horizontal',
          'multiple',
          'onChange',
          'ref',
          'toggleable',
        )
      : omit(
          props,
          'as',
          'by',
          'children',
          'value',
          'disabled',
          'horizontal',
          'multiple',
          'onChange',
          'ref',
          'toggleable',
        );
    return (
      <SelectContext value={controller}>
        <Dynamic
          component={props.as || 'ul'}
          {...SELECT_TAG}
          id={controllerId}
          role="listbox"
          aria-multiselectable={props.multiple ? 'true' : 'false'}
          ref={setRef}
          aria-orientation={props.horizontal ? 'horizontal' : 'vertical'}
          tabindex={state.hasActive() ? -1 : 0}
          {...disabledState}
          {...ariaDisabledState}
          {...hasSelectedState}
          {...hasActiveState}
          {...rest}
        >
          <SelectStateProvider state={state}>{props.children}</SelectStateProvider>
        </Dynamic>
      </SelectContext>
    );
  }) as unknown as JSX.Element;
}
