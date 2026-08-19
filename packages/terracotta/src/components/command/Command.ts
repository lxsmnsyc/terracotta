import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  merge,
  omit,
} from 'solid-js';
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
import type { HeadlessProps } from '../../utils/dynamic-prop';
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
  T extends ValidComponent = 'div',
> = HeadlessProps<T, SingleCommandControlledBaseProps<V>>;

export type SingleCommandUncontrolledBaseProps<V> = Prettify<
  CommandBaseProps &
    SingleAutocompleteStateUncontrolledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type SingleCommandUncontrolledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, SingleCommandUncontrolledBaseProps<V>>;

export type SingleCommandProps<V, T extends ValidComponent = 'div'> =
  | SingleCommandControlledProps<V, T>
  | SingleCommandUncontrolledProps<V, T>;

export type MultipleCommandControlledBaseProps<V> = Prettify<
  CommandBaseProps &
    MultipleAutocompleteStateControlledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type MultipleCommandControlledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, MultipleCommandControlledBaseProps<V>>;

export type MultipleCommandUncontrolledBaseProps<V> = Prettify<
  CommandBaseProps &
    MultipleAutocompleteStateUncontrolledOptions<V> &
    AutocompleteStateRenderProps<V>
>;

export type MultipleCommandUncontrolledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, MultipleCommandUncontrolledBaseProps<V>>;

export type MultipleCommandProps<V, T extends ValidComponent = 'div'> =
  | MultipleCommandControlledProps<V, T>
  | MultipleCommandUncontrolledProps<V, T>;

export type CommandProps<V, T extends ValidComponent = 'div'> =
  | SingleCommandProps<V, T>
  | MultipleCommandProps<V, T>;

function isCommandMultiple<V, T extends ValidComponent = 'div'>(
  props: CommandProps<V, T>,
): props is MultipleCommandProps<V, T> {
  return !!props.multiple;
}

function isCommandUncontrolled<V, T extends ValidComponent = 'div'>(
  props: CommandProps<V, T>,
): props is
  | SingleCommandUncontrolledProps<V, T>
  | MultipleCommandUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

/**
 * An always-visible filtered listbox — the body of a command palette. Same
 * autocomplete state as `Combobox`, but with no popup of its own, so it can be
 * dropped inside a `CommandBar` or rendered inline.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command.md}
 */
export function Command<V, T extends ValidComponent = 'div'>(
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

    createEffect(
      () => !state.hasActive(),
      flag => {
        if (flag) {
          setActiveDescendant(undefined);
        }
      },
    );

    return createComponent(CommandContext, {
      value: {
        multiple: !!props.multiple,
        controller,
        inputID,
        optionsID,
        labelID,
        optionsHovering: false,
        getActiveDescendant: activeDescendant,
        setActiveDescendant,
        getSelectedDescendant: selectedDescendant,
        setSelectedDescendant,
      },
      get children() {
        return createDynamic(
          () => props.as || 'div',
          merge(
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
            isCommandUncontrolled(props)
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
                  'toggleable',
                ),
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
          ) as ComponentProps<T>,
        );
      },
    });
  }) as unknown as JSX.Element;
}
