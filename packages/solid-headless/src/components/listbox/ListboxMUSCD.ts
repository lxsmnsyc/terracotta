import {
  createComponent,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureRoot,
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
} from '../../headless/select/HeadlessSelectRoot';
import {
  HeadlessSelectMultipleUncontrolledOptions,
} from '../../headless/select/useHeadlessSelectMultiple';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  ListboxContext,
} from './ListboxContext';
import {
  ListboxBaseProps,
  ListboxMultipleBaseProps,
} from './types';

// MUSCD = Multiple, Uncontrolled Select, Controlled Disclosure

type ListboxMUSCDBaseProps<V> =
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<HeadlessSelectMultipleUncontrolledOptions<V>, 'onChange'>
  & Omit<HeadlessDisclosureControlledOptions, 'onChange'>
  & { children?: JSX.Element };

export type ListboxMUSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMUSCDBaseProps<V>>;

export function ListboxMUSCD<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxMUSCDProps<V, T>,
): JSX.Element {
  const [hovering, setHovering] = createSignal(false);
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const buttonID = createUniqueId();
  const optionsID = createUniqueId();

  return createComponent(ListboxContext.Provider, {
    value: {
      multiple: true,
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
        () => props.as ?? (Fragment as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'disabled',
            'horizontal',
            'isOpen',
            'multiple',
            'onDisclosureChange',
            'onSelectChange',
            'toggleable',
            'defaultValue',
          ]),
          {
            'aria-labelledby': labelID,
            'data-sh-listbox': ownerID,
            get disabled() {
              return props.disabled;
            },
            get 'aria-disabled'() {
              return props.disabled;
            },
            get 'data-sh-disabled'() {
              return props.disabled;
            },
            get children() {
              return createComponent(HeadlessSelectRoot, {
                multiple: true,
                onChange: props.onSelectChange,
                get toggleable() {
                  return props.toggleable;
                },
                get defaultValue() {
                  return props.defaultValue;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return createComponent(HeadlessDisclosureRoot, {
                    onChange: props.onDisclosureChange,
                    get isOpen() {
                      return props.isOpen;
                    },
                    get disabled() {
                      return props.disabled;
                    },
                    get children() {
                      return props.children;
                    },
                  });
                },
              } as HeadlessSelectRootProps<V>);
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
