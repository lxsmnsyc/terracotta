import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import {
  createComponent,
  createEffect,
  createUniqueId,
  merge,
  omit,
} from 'solid-js';
import type {
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import {
  createSingleSelectState,
  SelectStateProvider,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { RadioGroupContext } from './RadioGroupContext';
import {
  createRadioGroupOptionFocusNavigator,
  RadioGroupRootContext,
} from './RadioGroupRootContext';
import { RADIO_GROUP_TAG } from './tags';

export type RadioGroupControlledBaseProps<V> = Prettify<
  SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupControlledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, RadioGroupControlledBaseProps<V>>;

export type RadioGroupUncontrolledBaseProps<V> = Prettify<
  SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupUncontrolledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, RadioGroupUncontrolledBaseProps<V>>;

export type RadioGroupProps<V, T extends ValidComponent = 'div'> =
  | RadioGroupControlledProps<V, T>
  | RadioGroupUncontrolledProps<V, T>;

function isRadioGroupUncontrolled<V, T extends ValidComponent = 'div'>(
  props: RadioGroupProps<V, T>,
): props is RadioGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

/**
 * A single-choice group. The whole group is one tab stop; the arrow keys move
 * between options and select as they go.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
export function RadioGroup<V, T extends ValidComponent = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();
  const state = createSingleSelectState(props);

  const [ref, setRef] = createForwardRef(props);

  createEffect(ref, current => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', e => {
          if (!state.disabled()) {
            switch (e.key) {
              case 'ArrowLeft':
              case 'ArrowUp': {
                e.preventDefault();
                controller.setPrevChecked(true);
                break;
              }
              case 'ArrowRight':
              case 'ArrowDown': {
                e.preventDefault();
                controller.setNextChecked(true);
                break;
              }
            }
          }
        }),
        useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(RadioGroupRootContext, {
    value: controller,
    get children() {
      return createComponent(RadioGroupContext, {
        value: {
          descriptionID,
          labelID,
        },
        get children() {
          return createDynamic(
            () => props.as || ('div' as T),
            merge(
              RADIO_GROUP_TAG,
              {
                role: 'radiogroup',
                'aria-labelledby': labelID,
                'aria-describedby': descriptionID,
                ref: setRef,
              },
              createDisabledState(() => state.disabled()),
              createARIADisabledState(() => state.disabled()),
              createHasActiveState(() => state.hasActive()),
              createHasSelectedState(() => state.hasSelected()),
              isRadioGroupUncontrolled(props)
                ? omit(
                    props,
                    'as',
                    'by',
                    'children',
                    'defaultValue',
                    'disabled',
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
                    'multiple',
                    'onChange',
                    'ref',
                    'toggleable',
                  ),
              {
                get children() {
                  return createComponent(SelectStateProvider, {
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
    },
  });
}
