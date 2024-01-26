import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  mergeProps,
  onCleanup,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import {
  SelectStateProvider,
  createSingleSelectState,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
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
  RadioGroupRootContext,
  createRadioGroupOptionFocusNavigator,
} from './RadioGroupRootContext';
import { RADIO_GROUP_TAG } from './tags';

export type RadioGroupControlledBaseProps<V> = Prettify<
  SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupControlledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessPropsWithRef<T, RadioGroupControlledBaseProps<V>>;

export type RadioGroupUncontrolledBaseProps<V> = Prettify<
  SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupUncontrolledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessPropsWithRef<T, RadioGroupUncontrolledBaseProps<V>>;

export type RadioGroupProps<V, T extends ValidConstructor = 'div'> =
  | RadioGroupControlledProps<V, T>
  | RadioGroupUncontrolledProps<V, T>;

function isRadioGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): props is RadioGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function RadioGroup<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();
  const state = createSingleSelectState(props);

  const [ref, setRef] = createForwardRef(props);

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      onCleanup(() => {
        controller.clearRef();
      });
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
      });
      useEventListener(current, 'focusin', e => {
        if (e.target && e.target !== current) {
          controller.setCurrent(e.target as HTMLElement);
        }
      });
    }
  });

  return createComponent(RadioGroupRootContext.Provider, {
    value: controller,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID,
        },
        get children() {
          return createDynamic(
            () => props.as || ('div' as T),
            mergeProps(
              isRadioGroupUncontrolled(props)
                ? omitProps(props, [
                    'as',
                    'by',
                    'children',
                    'defaultValue',
                    'disabled',
                    'multiple',
                    'onChange',
                    'ref',
                    'toggleable',
                  ])
                : omitProps(props, [
                    'as',
                    'by',
                    'children',
                    'value',
                    'disabled',
                    'multiple',
                    'onChange',
                    'ref',
                    'toggleable',
                  ]),
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
            ) as DynamicProps<T>,
          );
        },
      });
    },
  });
}
