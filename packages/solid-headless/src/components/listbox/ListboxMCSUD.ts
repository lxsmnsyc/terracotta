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
  HeadlessDisclosureUncontrolledOptions,
} from '../../headless/disclosure';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
} from '../../headless/select/HeadlessSelectRoot';
import {
  HeadlessSelectMultipleControlledOptions,
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

// MCSUD = Multiple, Controlled Select, Uncontrolled Disclosure

type ListboxMCSUDBaseProps<V> =
  & ListboxBaseProps
  & ListboxMultipleBaseProps<V>
  & Omit<HeadlessSelectMultipleControlledOptions<V>, 'onChange'>
  & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'>
  & { children?: JSX.Element };

export type ListboxMCSUDProps<V, T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, ListboxMCSUDBaseProps<V>>;

export function ListboxMCSUD<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxMCSUDProps<V, T>,
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
            'defaultOpen',
            'multiple',
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
                multiple: true,
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
