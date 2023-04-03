import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import createDynamic from '../../utils/create-dynamic';
import { createDisabledState } from '../../utils/state-props';
import {
  createSingleSelectState,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
  SelectStateProvider,
  SelectStateRenderProps,
  MultipleSelectStateUncontrolledOptions,
  MultipleSelectStateControlledOptions,
  createMultipleSelectState,
} from '../../states/create-select-state';
import { Prettify } from '../../utils/types';
import { CommandContext, createCommandOptionFocusNavigator } from './CommandContext';
import { COMMAND_TAG } from './tags';
import Fragment from '../../utils/Fragment';

export interface CommandBaseProps {
  horizontal?: boolean;
}

export type SingleCommandControlledBaseProps<V> = Prettify<
  & CommandBaseProps
  & SingleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type SingleCommandControlledProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, SingleCommandControlledBaseProps<V>>;

export type SingleCommandUncontrolledBaseProps<V> = Prettify<
  & CommandBaseProps
  & SingleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type SingleCommandUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, SingleCommandUncontrolledBaseProps<V>>;

export type SingleCommandProps<V, T extends ValidConstructor = typeof Fragment> =
  | SingleCommandControlledProps<V, T>
  | SingleCommandUncontrolledProps<V, T>

export type MultipleCommandControlledBaseProps<V> = Prettify<
  & CommandBaseProps
  & MultipleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type MultipleCommandControlledProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, MultipleCommandControlledBaseProps<V>>;

export type MultipleCommandUncontrolledBaseProps<V> = Prettify<
  & CommandBaseProps
  & MultipleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type MultipleCommandUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, MultipleCommandUncontrolledBaseProps<V>>;

export type MultipleCommandProps<V, T extends ValidConstructor = typeof Fragment> =
  | MultipleCommandControlledProps<V, T>
  | MultipleCommandUncontrolledProps<V, T>;

export type CommandProps<V, T extends ValidConstructor = typeof Fragment> =
  | SingleCommandProps<V, T>
  | MultipleCommandProps<V, T>;

function isCommandMultiple<V, T extends ValidConstructor = typeof Fragment>(
  props: CommandProps<V, T>,
): props is MultipleCommandProps<V, T> {
  return !!props.multiple;
}

function isCommandUncontrolled<V, T extends ValidConstructor = typeof Fragment>(
  props: CommandProps<V, T>,
): props is SingleCommandUncontrolledProps<V, T> | MultipleCommandUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function Command<V, T extends ValidConstructor = typeof Fragment>(
  props: CommandProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const controller = createCommandOptionFocusNavigator();
    const state = isCommandMultiple(props)
      ? createMultipleSelectState(props)
      : createSingleSelectState(props);
    const [activeDescendant, setActiveDescendant] = createSignal<string>();
    const [selectedDescendant, setSelectedDescendant] = createSignal<string | undefined>(
      undefined,
      {
        equals: false,
      },
    );

    const inputID = createUniqueId();
    const optionsID = createUniqueId();
    const labelID = createUniqueId();

    createEffect(() => {
      if (!state.hasActive()) {
        setActiveDescendant(undefined);
      }
    });

    return createComponent(CommandContext.Provider, {
      value: {
        multiple: !!props.multiple,
        controller,
        get activeDescendant() {
          return activeDescendant();
        },
        set activeDescendant(value: string | undefined) {
          setActiveDescendant(value);
        },
        get selectedDescendant() {
          return selectedDescendant();
        },
        set selectedDescendant(value: string | undefined) {
          setSelectedDescendant(value);
        },
        inputID,
        optionsID,
        labelID,
      },
      get children() {
        return createDynamic(
          () => props.as || Fragment,
          mergeProps(
            isCommandUncontrolled(props)
              ? omitProps(props, [
                'as',
                'by',
                'children',
                'defaultValue',
                'disabled',
                'horizontal',
                'multiple',
                'onChange',
                'toggleable',
              ])
              : omitProps(props, [
                'as',
                'by',
                'children',
                'value',
                'disabled',
                'horizontal',
                'multiple',
                'onChange',
                'toggleable',
              ]),
            COMMAND_TAG,
            {
              id: controller.getId(),
            },
            createDisabledState(() => state.disabled()),
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
  }) as unknown as JSX.Element;
}
