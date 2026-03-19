import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  merge,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
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
import type {
  DisclosureStateControlledOptions,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import {
  ComboboxContext,
  createComboboxOptionFocusNavigator,
} from './ComboboxContext';
import { COMBOBOX_TAG } from './tags';

export interface ComboboxBaseProps {
  onDisclosureChange?: (value: boolean) => void;
}

export interface ComboboxMultipleBaseProps<V> {
  onSelectChange?: (value: V[]) => void;
}

export interface ComboboxSingleBaseProps<V> {
  onSelectChange?: (value?: V) => void;
}

// SCSCD = Single, Controlled Select, Controlled Disclosure
export type ComboboxSCSCDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxSingleBaseProps<V> &
    Omit<SingleAutocompleteStateControlledOptions<V>, 'onChange'> &
    Omit<DisclosureStateControlledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxSCSCDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxSCSCDBaseProps<V>>;

// SCSCD = Single, Controlled Select, Uncontrolled Disclosure
export type ComboboxSCSUDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxSingleBaseProps<V> &
    Omit<SingleAutocompleteStateControlledOptions<V>, 'onChange'> &
    Omit<DisclosureStateUncontrolledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxSCSUDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxSCSUDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Controlled Disclosure
export type ComboboxSUSCDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxSingleBaseProps<V> &
    Omit<SingleAutocompleteStateUncontrolledOptions<V>, 'onChange'> &
    Omit<DisclosureStateControlledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxSUSCDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxSUSCDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Uncontrolled Disclosure
export type ComboboxSUSUDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxSingleBaseProps<V> &
    Omit<SingleAutocompleteStateUncontrolledOptions<V>, 'onChange'> &
    Omit<DisclosureStateUncontrolledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxSUSUDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxSUSUDBaseProps<V>>;

export type ComboboxSingleProps<V, T extends ValidComponent = 'div'> =
  | ComboboxSCSCDProps<V, T>
  | ComboboxSCSUDProps<V, T>
  | ComboboxSUSCDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

// MCSCD = Multiple, Controlled Select, Controlled Disclosure
export type ComboboxMCSCDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxMultipleBaseProps<V> &
    Omit<MultipleAutocompleteStateControlledOptions<V>, 'onChange'> &
    Omit<DisclosureStateControlledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxMCSCDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxMCSCDBaseProps<V>>;

// MCSCD = Multiple, Controlled Select, Uncontrolled Disclosure
export type ComboboxMCSUDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxMultipleBaseProps<V> &
    Omit<MultipleAutocompleteStateControlledOptions<V>, 'onChange'> &
    Omit<DisclosureStateUncontrolledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxMCSUDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxMCSUDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Controlled Disclosure
export type ComboboxMUSCDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxMultipleBaseProps<V> &
    Omit<MultipleAutocompleteStateUncontrolledOptions<V>, 'onChange'> &
    Omit<DisclosureStateControlledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxMUSCDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxMUSCDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Uncontrolled Disclosure
export type ComboboxMUSUDBaseProps<V> = Prettify<
  ComboboxBaseProps &
    ComboboxMultipleBaseProps<V> &
    Omit<MultipleAutocompleteStateUncontrolledOptions<V>, 'onChange'> &
    Omit<DisclosureStateUncontrolledOptions, 'onChange'> & {
      children?: JSX.Element;
    }
>;

export type ComboboxMUSUDProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, ComboboxMUSUDBaseProps<V>>;

export type ComboboxMultipleProps<V, T extends ValidComponent = 'div'> =
  | ComboboxMCSCDProps<V, T>
  | ComboboxMCSUDProps<V, T>
  | ComboboxMUSCDProps<V, T>
  | ComboboxMUSUDProps<V, T>;

type ComboboxSelectUncontrolledProps<V, T extends ValidComponent = 'div'> =
  | ComboboxMUSCDProps<V, T>
  | ComboboxMUSUDProps<V, T>
  | ComboboxSUSCDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

type ComboboxDisclosureUncontrolledProps<V, T extends ValidComponent = 'div'> =
  | ComboboxMCSUDProps<V, T>
  | ComboboxMUSUDProps<V, T>
  | ComboboxSCSUDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

export type ComboboxProps<V, T extends ValidComponent = 'div'> =
  | ComboboxMultipleProps<V, T>
  | ComboboxSingleProps<V, T>;

function isComboboxMultiple<V, T extends ValidComponent = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxMultipleProps<V, T> {
  return !!props.multiple;
}

function isComboboxSelectUncontrolled<V, T extends ValidComponent = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isComboboxDisclosureUncontrolled<V, T extends ValidComponent = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxDisclosureUncontrolledProps<V, T> {
  return 'defaultOpen' in props;
}

function getProps<V, T extends ValidComponent = 'div'>(
  props: ComboboxProps<V, T>,
): ComponentProps<T> {
  if (isComboboxSelectUncontrolled(props)) {
    if (isComboboxDisclosureUncontrolled(props)) {
      return omitProps(props, [
        'as',
        'by',
        'children',
        'defaultOpen',
        'defaultValue',
        'disabled',
        'matchBy',
        'multiple',
        'onClose',
        'onDisclosureChange',
        'onOpen',
        'onSelectChange',
        'toggleable',
      ]) as ComponentProps<T>;
    }
    return omitProps(props, [
      'as',
      'by',
      'children',
      'defaultValue',
      'disabled',
      'isOpen',
      'matchBy',
      'multiple',
      'onClose',
      'onDisclosureChange',
      'onOpen',
      'onSelectChange',
      'toggleable',
    ]) as ComponentProps<T>;
  }
  if (isComboboxDisclosureUncontrolled(props)) {
    return omitProps(props, [
      'as',
      'by',
      'children',
      'defaultOpen',
      'disabled',
      'matchBy',
      'multiple',
      'onClose',
      'onDisclosureChange',
      'onOpen',
      'onSelectChange',
      'toggleable',
      'value',
    ]) as ComponentProps<T>;
  }
  return omitProps(props, [
    'as',
    'by',
    'children',
    'disabled',
    'isOpen',
    'matchBy',
    'multiple',
    'onClose',
    'onDisclosureChange',
    'onOpen',
    'onSelectChange',
    'toggleable',
    'value',
  ]) as ComponentProps<T>;
}

export function Combobox<V, T extends ValidComponent = 'div'>(
  props: ComboboxProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const labelID = createUniqueId();
    const inputID = createUniqueId();
    const optionsID = createUniqueId();

    const disclosureState = createDisclosureState(
      merge(props, {
        onChange(value: boolean) {
          if (props.onDisclosureChange) {
            props.onDisclosureChange(value);
          }
        },
      }),
    );

    const autocompleteState = isComboboxMultiple(props)
      ? createMultipleAutocompleteState(
          merge(props, {
            onChange(value: V[]) {
              if (props.onSelectChange) {
                props.onSelectChange(value);
              }
            },
          }),
        )
      : createSingleAutocompleteState(
          merge(props, {
            onChange(value?: V) {
              if (props.onSelectChange) {
                props.onSelectChange(value);
              }
            },
          }),
        );

    const controller = createComboboxOptionFocusNavigator();
    const [activeDescendant, setActiveDescendant] = createSignal<string>();
    const [selectedDescendant, setSelectedDescendant] = createSignal<
      string | undefined
    >(undefined, {
      equals: false,
    });

    createEffect(
      () => !autocompleteState.hasActive(),
      value => {
        if (value) {
          setActiveDescendant(undefined);
        }
      },
    );

    return createComponent(ComboboxContext, {
      value: {
        get multiple() {
          return props.multiple;
        },
        labelID,
        inputID,
        optionsID,
        controller,
        inputHovering: false,
        optionsHovering: false,
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
      },
      get children() {
        return createComponent(AutocompleteStateProvider, {
          state: autocompleteState,
          get children() {
            return createComponent(DisclosureStateProvider, {
              state: disclosureState,
              get children() {
                return createDynamic(
                  () => props.as || 'div',
                  merge(
                    COMBOBOX_TAG,
                    {
                      'aria-labelledby': labelID,
                      get children() {
                        return props.children;
                      },
                    },
                    createDisabledState(() => autocompleteState.disabled()),
                    createARIADisabledState(() => autocompleteState.disabled()),
                    createHasSelectedState(() =>
                      autocompleteState.hasSelected(),
                    ),
                    createHasActiveState(() => autocompleteState.hasActive()),
                    createExpandedState(() => disclosureState.isOpen()),
                    getProps(props),
                  ) as ComponentProps<T>,
                );
              },
            });
          },
        });
      },
    });
  }) as unknown as JSX.Element;
}
