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
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import {
  ComboboxContext,
  createComboboxOptionFocusNavigator,
} from './ComboboxContext';
import {
  createMultipleAutocompleteState,
  createSingleAutocompleteState,
  MultipleAutocompleteStateControlledOptions,
  MultipleAutocompleteStateUncontrolledOptions,
  AutocompleteStateProvider,
  SingleAutocompleteStateControlledOptions,
  SingleAutocompleteStateUncontrolledOptions,
} from '../../states/create-autocomplete-state';
import {
  createDisclosureState,
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import { Prettify } from '../../utils/types';
import { COMBOBOX_TAG } from './tags';

export interface ComboboxBaseProps {
  onDisclosureChange?: (value: boolean) => void
}

export interface ComboboxMultipleBaseProps<V> {
  onSelectChange?: (value: V[]) => void;
}

export interface ComboboxSingleBaseProps<V> {
  onSelectChange?: (value?: V) => void;
}

// SCSCD = Single, Controlled Select, Controlled Disclosure
export type ComboboxSCSCDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxSingleBaseProps<V>
  & Omit<SingleAutocompleteStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxSCSCDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxSCSCDBaseProps<V>>;

// SCSCD = Single, Controlled Select, Uncontrolled Disclosure
export type ComboboxSCSUDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxSingleBaseProps<V>
  & Omit<SingleAutocompleteStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxSCSUDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxSCSUDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Controlled Disclosure
export type ComboboxSUSCDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxSingleBaseProps<V>
  & Omit<SingleAutocompleteStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxSUSCDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxSUSCDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Uncontrolled Disclosure
export type ComboboxSUSUDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxSingleBaseProps<V>
  & Omit<SingleAutocompleteStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxSUSUDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxSUSUDBaseProps<V>>;

export type ComboboxSingleProps<V, T extends ValidConstructor = 'div'> =
  | ComboboxSCSCDProps<V, T>
  | ComboboxSCSUDProps<V, T>
  | ComboboxSUSCDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

// MCSCD = Multiple, Controlled Select, Controlled Disclosure
export type ComboboxMCSCDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxMultipleBaseProps<V>
  & Omit<MultipleAutocompleteStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxMCSCDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxMCSCDBaseProps<V>>;

// MCSCD = Multiple, Controlled Select, Uncontrolled Disclosure
export type ComboboxMCSUDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxMultipleBaseProps<V>
  & Omit<MultipleAutocompleteStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxMCSUDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxMCSUDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Controlled Disclosure
export type ComboboxMUSCDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxMultipleBaseProps<V>
  & Omit<MultipleAutocompleteStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxMUSCDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxMUSCDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Uncontrolled Disclosure
export type ComboboxMUSUDBaseProps<V> = Prettify<
  & ComboboxBaseProps
  & ComboboxMultipleBaseProps<V>
  & Omit<MultipleAutocompleteStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ComboboxMUSUDProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ComboboxMUSUDBaseProps<V>>;

export type ComboboxMultipleProps<V, T extends ValidConstructor = 'div'> =
  | ComboboxMCSCDProps<V, T>
  | ComboboxMCSUDProps<V, T>
  | ComboboxMUSCDProps<V, T>
  | ComboboxMUSUDProps<V, T>;

type ComboboxSelectUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  | ComboboxMUSCDProps<V, T>
  | ComboboxMUSUDProps<V, T>
  | ComboboxSUSCDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

type ComboboxDisclosureUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  | ComboboxMCSUDProps<V, T>
  | ComboboxMUSUDProps<V, T>
  | ComboboxSCSUDProps<V, T>
  | ComboboxSUSUDProps<V, T>;

export type ComboboxProps<V, T extends ValidConstructor = 'div'> =
  | ComboboxMultipleProps<V, T>
  | ComboboxSingleProps<V, T>;

function isComboboxMultiple<V, T extends ValidConstructor = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxMultipleProps<V, T> {
  return !!props.multiple;
}

function isComboboxSelectUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isComboboxDisclosureUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: ComboboxProps<V, T>,
): props is ComboboxDisclosureUncontrolledProps<V, T> {
  return 'defaultOpen' in props;
}

function getProps<V, T extends ValidConstructor = 'div'>(
  props: ComboboxProps<V, T>,
) {
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
      ]);
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
    ]);
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
    ]);
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
  ]);
}

export function Combobox<V, T extends ValidConstructor = 'div'>(
  props: ComboboxProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const [hovering, setHovering] = createSignal(false);
    const labelID = createUniqueId();
    const inputID = createUniqueId();
    const optionsID = createUniqueId();

    const disclosureState = createDisclosureState(
      mergeProps(
        props,
        {
          onChange(value: boolean) {
            if (props.onDisclosureChange) {
              props.onDisclosureChange(value);
            }
          },
        },
      ),
    );

    const selectState = (
      isComboboxMultiple(props)
        ? createMultipleAutocompleteState(
          mergeProps(
            props,
            {
              onChange(value: V[]) {
                if (props.onSelectChange) {
                  props.onSelectChange(value);
                }
              },
            },
          ),
        )
        : createSingleAutocompleteState(
          mergeProps(
            props,
            {
              onChange(value?: V) {
                if (props.onSelectChange) {
                  props.onSelectChange(value);
                }
              },
            },
          ),
        )
    );

    const controller = createComboboxOptionFocusNavigator();
    const [activeDescendant, setActiveDescendant] = createSignal<string>();
    const [selectedDescendant, setSelectedDescendant] = createSignal<string | undefined>(
      undefined,
      {
        equals: false,
      },
    );

    createEffect(() => {
      if (!selectState.hasActive()) {
        setActiveDescendant(undefined);
      }
    });

    return createComponent(ComboboxContext.Provider, {
      value: {
        multiple: !!props.multiple,
        labelID,
        inputID,
        optionsID,
        get hovering() {
          return hovering();
        },
        set hovering(value: boolean) {
          setHovering(value);
        },
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
      },
      get children() {
        return createDynamic(
          () => props.as || 'div',
          mergeProps(
            getProps(props),
            COMBOBOX_TAG,
            {
              'aria-labelledby': labelID,
            },
            createDisabledState(() => selectState.disabled()),
            createHasSelectedState(() => selectState.hasSelected()),
            createHasActiveState(() => selectState.hasActive()),
            createExpandedState(() => disclosureState.isOpen()),
            {
              get children() {
                return createComponent(AutocompleteStateProvider, {
                  state: selectState,
                  get children() {
                    return createComponent(DisclosureStateProvider, {
                      state: disclosureState,
                      get children() {
                        return props.children;
                      },
                    });
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
