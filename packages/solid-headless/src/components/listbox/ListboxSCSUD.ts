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
  HeadlessDisclosureUncontrolledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
} from '../../headless/select/HeadlessSelectRoot';
import {
  HeadlessSelectSingleControlledOptions,
} from '../../headless/select/useHeadlessSelectSingle';
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
  ListboxSingleBaseProps,
} from './types';

// SCSUD = Single, Controlled Select, Uncontrolled Disclosure

type ListboxSCSUDBaseProps<V> =
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<HeadlessSelectSingleControlledOptions<V>, 'onChange'>
  & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element };

export type ListboxSCSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSCSUDBaseProps<V>>;

export function ListboxSCSUD<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxSCSUDProps<V, T>,
): JSX.Element {
  const [hovering, setHovering] = createSignal(false);
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const buttonID = createUniqueId();
  const optionsID = createUniqueId();

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
        () => props.as ?? (Fragment as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'disabled',
            'horizontal',
            'defaultOpen',
            'onDisclosureChange',
            'onSelectChange',
            'toggleable',
            'value',
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
                onChange: props.onSelectChange,
                get toggleable() {
                  return props.toggleable;
                },
                get value() {
                  return props.value;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return createComponent(HeadlessDisclosureRoot, {
                    onChange: props.onDisclosureChange,
                    get defaultOpen() {
                      return props.defaultOpen;
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
