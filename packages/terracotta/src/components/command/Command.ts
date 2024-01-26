import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  AutocompleteStateRenderProps,
  MultipleAutocompleteStateControlledOptions,
  MultipleAutocompleteStateUncontrolledOptions,
  SingleAutocompleteStateControlledOptions,
  SingleAutocompleteStateUncontrolledOptions,
} from '../../states/create-autocomplete-state';
import {
  AutocompleteStateProvider,
  createMultipleAutocompleteState,
  createSingleAutocompleteState,
} from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import {
  CommandContext,
  createCommandOptionFocusNavigator,
} from './CommandContext';
import { COMMAND_TAG } from './tags';

export interface CommandBaseProps {
  horizontal?: boolean;
}

export type SingleCommandControlledBaseProps<V> = Prettify<
  CommandBaseProps &
    SingleAutocompleteStateControlledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type SingleCommandControlledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, SingleCommandControlledBaseProps<V>>;

export type SingleCommandUncontrolledBaseProps<V> = Prettify<
  CommandBaseProps &
    SingleAutocompleteStateUncontrolledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type SingleCommandUncontrolledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, SingleCommandUncontrolledBaseProps<V>>;

export type SingleCommandProps<V, T extends ValidConstructor = 'div'> =
  | SingleCommandControlledProps<V, T>
  | SingleCommandUncontrolledProps<V, T>;

export type MultipleCommandControlledBaseProps<V> = Prettify<
  CommandBaseProps &
    MultipleAutocompleteStateControlledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type MultipleCommandControlledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, MultipleCommandControlledBaseProps<V>>;

export type MultipleCommandUncontrolledBaseProps<V> = Prettify<
  CommandBaseProps &
    MultipleAutocompleteStateUncontrolledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type MultipleCommandUncontrolledProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, MultipleCommandUncontrolledBaseProps<V>>;

export type MultipleCommandProps<V, T extends ValidConstructor = 'div'> =
  | MultipleCommandControlledProps<V, T>
  | MultipleCommandUncontrolledProps<V, T>;

export type CommandProps<V, T extends ValidConstructor = 'div'> =
  | SingleCommandProps<V, T>
  | MultipleCommandProps<V, T>;

function isCommandMultiple<V, T extends ValidConstructor = 'div'>(
  props: CommandProps<V, T>,
): props is MultipleCommandProps<V, T> {
  return !!props.multiple;
}

function isCommandUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: CommandProps<V, T>,
): props is
  | SingleCommandUncontrolledProps<V, T>
  | MultipleCommandUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function Command<V, T extends ValidConstructor = 'div'>(
  props: CommandProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const controller = createCommandOptionFocusNavigator();
    const state = isCommandMultiple(props)
      ? createMultipleAutocompleteState(props)
      : createSingleAutocompleteState(props);
    const [activeDescendant, setActiveDescendant] = createSignal<string>();
    const [selectedDescendant, setSelectedDescendant] = createSignal<
      string | undefined
    >(undefined, {
      equals: false,
    });

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
        optionsHovering: false,
      },
      get children() {
        return createDynamic(
          () => props.as || 'div',
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
              'aria-labelledby': labelID,
            },
            createDisabledState(() => state.disabled()),
            createARIADisabledState(() => state.disabled()),
            createHasSelectedState(() => state.hasSelected()),
            createHasActiveState(() => state.hasActive()),
            createHasQueryState(() => state.hasQuery()),
            {
              get children() {
                return createComponent(AutocompleteStateProvider, {
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
