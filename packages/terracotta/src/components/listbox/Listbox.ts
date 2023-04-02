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
import Fragment from '../../utils/Fragment';
import {
  createDisabled,
} from '../../utils/state-props';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  ListboxContext,
} from './ListboxContext';
import { LISTBOX_TAG } from './tags';
import {
  ListboxBaseProps,
  ListboxMultipleBaseProps,
  ListboxSingleBaseProps,
} from './types';
import {
  createMultipleSelectState,
  createSingleSelectState,
  MultipleSelectStateControlledOptions,
  MultipleSelectStateUncontrolledOptions,
  SelectStateProvider,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import {
  createDisclosureState,
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import { Prettify } from '../../utils/types';

// SCSCD = Single, Controlled Select, Controlled Disclosure
export type ListboxSCSCDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<SingleSelectStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxSCSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSCSCDBaseProps<V>>;

// SCSCD = Single, Controlled Select, Uncontrolled Disclosure
export type ListboxSCSUDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<SingleSelectStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxSCSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSCSUDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Controlled Disclosure
export type ListboxSUSCDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<SingleSelectStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxSUSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSUSCDBaseProps<V>>;

// SCSCD = Single, Uncontrolled Select, Uncontrolled Disclosure
export type ListboxSUSUDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<SingleSelectStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxSUSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSUSUDBaseProps<V>>;

export type ListboxSingleProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxSCSCDProps<V, T>
  | ListboxSCSUDProps<V, T>
  | ListboxSUSCDProps<V, T>
  | ListboxSUSUDProps<V, T>;

// MCSCD = Multiple, Controlled Select, Controlled Disclosure
export type ListboxMCSCDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<MultipleSelectStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxMCSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMCSCDBaseProps<V>>;

// MCSCD = Multiple, Controlled Select, Uncontrolled Disclosure
export type ListboxMCSUDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<MultipleSelectStateControlledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxMCSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMCSUDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Controlled Disclosure
export type ListboxMUSCDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<MultipleSelectStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateControlledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxMUSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMUSCDBaseProps<V>>;

// MCSCD = Multiple, Uncontrolled Select, Uncontrolled Disclosure
export type ListboxMUSUDBaseProps<V> = Prettify<
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<MultipleSelectStateUncontrolledOptions<V>, 'onChange'>
  & Omit<DisclosureStateUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element }
>;

export type ListboxMUSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMUSUDBaseProps<V>>;

export type ListboxMultipleProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMCSCDProps<V, T>
  | ListboxMCSUDProps<V, T>
  | ListboxMUSCDProps<V, T>
  | ListboxMUSUDProps<V, T>;

type ListboxSelectUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMUSCDProps<V, T>
  | ListboxMUSUDProps<V, T>
  | ListboxSUSCDProps<V, T>
  | ListboxSUSUDProps<V, T>;

type ListboxDisclosureUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMCSUDProps<V, T>
  | ListboxMUSUDProps<V, T>
  | ListboxSCSUDProps<V, T>
  | ListboxSUSUDProps<V, T>;

export type ListboxProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMultipleProps<V, T>
  | ListboxSingleProps<V, T>;

function isListboxMultiple<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxMultipleProps<V, T> {
  return !!props.multiple;
}

function isListboxSelectUncontrolled<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isListboxDisclosureUncontrolled<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxDisclosureUncontrolledProps<V, T> {
  return 'defaultOpen' in props;
}

function getProps<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
) {
  if (isListboxSelectUncontrolled(props)) {
    if (isListboxDisclosureUncontrolled(props)) {
      return omitProps(props, [
        'as',
        'by',
        'children',
        'defaultOpen',
        'defaultValue',
        'disabled',
        'horizontal',
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
      'isOpen',
      'defaultValue',
      'disabled',
      'horizontal',
      'multiple',
      'onClose',
      'onDisclosureChange',
      'onOpen',
      'onSelectChange',
      'toggleable',
    ]);
  }
  if (isListboxDisclosureUncontrolled(props)) {
    return omitProps(props, [
      'as',
      'by',
      'children',
      'defaultOpen',
      'value',
      'disabled',
      'horizontal',
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
    'isOpen',
    'value',
    'disabled',
    'horizontal',
    'multiple',
    'onClose',
    'onDisclosureChange',
    'onOpen',
    'onSelectChange',
    'toggleable',
  ]);
}

export function Listbox<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const [hovering, setHovering] = createSignal(false);
    const ownerID = createUniqueId();
    const labelID = createUniqueId();
    const buttonID = createUniqueId();
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
      isListboxMultiple(props)
        ? createMultipleSelectState(
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
        : createSingleSelectState(
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

    const fsp = useFocusStartPoint();

    createEffect(() => {
      if (disclosureState.isOpen()) {
        fsp.save();
      } else {
        fsp.load();
      }
    });

    return createComponent(ListboxContext.Provider, {
      value: {
        multiple: false,
        ownerID,
        labelID,
        buttonID,
        optionsID,
        get horizontal() {
          return props.horizontal;
        },
        get hovering() {
          return hovering();
        },
        set hovering(value: boolean) {
          setHovering(value);
        },
      },
      get children() {
        return createDynamic(
          () => props.as || (Fragment as T),
          mergeProps(
            getProps(props),
            LISTBOX_TAG,
            {
              'aria-labelledby': labelID,
            },
            createDisabled(() => selectState.disabled()),
            {
              get children() {
                return createComponent(SelectStateProvider, {
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