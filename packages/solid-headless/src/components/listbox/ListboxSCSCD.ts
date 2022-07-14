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
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  HeadlessSelectSingleControlledOptions,
} from '../../headless/select';
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
  ListboxSingleBaseProps,
} from './types';

// SCSCD = Single, Controlled Select, Controlled Disclosure

type ListboxSCSCDBaseProps<V> =
  & ListboxBaseProps
  & ListboxSingleBaseProps<V>
  & Omit<HeadlessSelectSingleControlledOptions<V>, 'onChange'>
  & Omit<HeadlessDisclosureControlledOptions, 'onChange'>
  & { children?: JSX.Element };

export type ListboxSCSCDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxSCSCDBaseProps<V>>;

export function ListboxSCSCD<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxSCSCDProps<V, T>,
): JSX.Element {
  const [hovering, setHovering] = createSignal(false);
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const buttonID = createUniqueId();
  const optionsID = createUniqueId();

  const fsp = useFocusStartPoint();

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
            'isOpen',
            'onDisclosureChange',
            'onSelectChange',
            'toggleable',
            'value',
          ]),
          LISTBOX_TAG,
          {
            'aria-labelledby': labelID,
          },
          createDisabled(() => props.disabled),
          {
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
                    onChange(value) {
                      if (value) {
                        fsp.save();
                      }
                      props.onDisclosureChange?.(value);
                      if (!value) {
                        fsp.load();
                      }
                    },
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
