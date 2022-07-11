import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import {
  HeadlessSelectChildProps,
  HeadlessSelectChild,
  useHeadlessSelectProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
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
  queryListboxOptions,
} from '../../utils/query-nodes';
import { createDisabled } from '../../utils/state-props';
import {
  useListboxContext,
} from './ListboxContext';
import {
  ListboxOptionsContext,
} from './ListboxOptionsContext';

export type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, HeadlessSelectChildProps<V>>;

export function ListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useListboxContext('ListboxOptions');
  const selectProperties = useHeadlessSelectProperties();
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      focusNext(
        queryListboxOptions(ref, context.ownerID),
        node,
      );
    }
  }

  function setPrevChecked(node: Element) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      focusPrev(
        queryListboxOptions(ref, context.ownerID),
        node,
      );
    }
  }

  function setFirstChecked() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      focusFirst(queryListboxOptions(ref, context.ownerID));
    }
  }

  function setLastChecked() {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      focusLast(queryListboxOptions(ref, context.ownerID));
    }
  }

  function setFirstMatch(character: string) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      focusMatch(
        queryListboxOptions(ref, context.ownerID),
        character,
      );
    }
  }

  createEffect(() => {
    if (!selectProperties.hasSelected()) {
      setFirstChecked();
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onBlur = (e: FocusEvent) => {
        if (context.hovering) {
          return;
        }
        if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
          properties.setState(false);
        }
      };
      ref.addEventListener('focusout', onBlur);
      onCleanup(() => {
        ref.removeEventListener('focusout', onBlur);
      });
    }
  });

  return createComponent(ListboxOptionsContext.Provider, {
    value: {
      setChecked,
      setFirstChecked,
      setLastChecked,
      setNextChecked,
      setPrevChecked,
      setFirstMatch,
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('ul' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'ref',
          ]),
          {
            id: context.optionsID,
            role: 'listbox',
            'aria-multiselectable': context.multiple,
            'aria-labelledby': context.buttonID,
            'data-sh-listbox-options': context.ownerID,
            tabindex: 0,
            ref: createRef(props, (e) => {
              setInternalRef(() => e);
            }),
            get 'aria-orientation'() {
              return context.horizontal ? 'horizontal' : 'vertical';
            },
          },
          createDisabled(() => properties.disabled() || props.disabled),
          {
            get children() {
              return createComponent(HeadlessSelectChild, {
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
}
