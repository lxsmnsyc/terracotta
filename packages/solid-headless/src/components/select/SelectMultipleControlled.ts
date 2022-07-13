import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  SelectBaseProps,
} from './types';
import {
  HeadlessSelectMultipleControlledOptions,
  HeadlessSelectRoot,
  HeadlessSelectRootChildren,
  HeadlessSelectRootProps,
} from '../../headless/select';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  focusFirst,
  focusLast,
  focusMatch,
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import {
  querySelectOptions,
} from '../../utils/query-nodes';
import {
  SelectContext,
} from './SelectContext';
import createDynamic from '../../utils/create-dynamic';
import { createDisabled } from '../../utils/state-props';

type SelectMultipleControlledBaseProps<V> =
  & SelectBaseProps
  & HeadlessSelectMultipleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type SelectMultipleControlledProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, SelectMultipleControlledBaseProps<V>>;

export function SelectMultipleControlled<V, T extends ValidConstructor = 'ul'>(
  props: SelectMultipleControlledProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusNext(
        querySelectOptions(internalRef, ownerID),
        node,
      );
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusPrev(
        querySelectOptions(internalRef, ownerID),
        node,
      );
    }
  }

  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      focusFirst(querySelectOptions(internalRef, ownerID));
    }
  }

  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      focusLast(querySelectOptions(internalRef, ownerID));
    }
  }

  function setFirstMatch(character: string) {
    if (internalRef instanceof HTMLElement) {
      focusMatch(querySelectOptions(internalRef, ownerID), character);
    }
  }

  return createComponent(SelectContext.Provider, {
    value: {
      ownerID,
      setFirstChecked,
      setLastChecked,
      setNextChecked,
      setPrevChecked,
      setFirstMatch,
      get horizontal() {
        return !!props.horizontal;
      },
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('ul' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'toggleable',
            'value',
            'onChange',
            'multiple',
            'horizontal',
            'disabled',
            'ref',
          ]),
          {
            id: ownerID,
            role: 'listbox',
            'data-sh-select': ownerID,
            'aria-multiselectable': true,
            ref: createRef(props, (e) => {
              internalRef = e;
            }),
            get 'aria-orientation'() {
              return props.horizontal ? 'horizontal' : 'vertical';
            },
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return createComponent(HeadlessSelectRoot, {
                multiple: true,
                onChange: props.onChange,
                get value() {
                  return props.value;
                },
                get toggleable() {
                  return props.toggleable;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                },
              } as HeadlessSelectRootProps<V>);
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
