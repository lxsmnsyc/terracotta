import {
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  createComponent,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessSelectRootSingleUncontrolledProps,
  HeadlessSelectRootChildren,
  HeadlessSelectSingleUncontrolledOptions,
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
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import {
  queryRadios,
} from '../../utils/query-nodes';
import {
  createDisabled,
} from '../../utils/state-props';
import {
  RadioGroupContext,
} from './RadioGroupContext';
import {
  RadioGroupRootContext,
} from './RadioGroupRootContext';

export type RadioGroupUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<
    T,
    HeadlessSelectSingleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>
  >;

export function RadioGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupUncontrolledProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusNext(
        queryRadios(internalRef, ownerID),
        node,
      );
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      focusPrev(
        queryRadios(internalRef, ownerID),
        node,
      );
    }
  }

  return createComponent(RadioGroupRootContext.Provider, {
    value: {
      ownerID,
      setChecked,
      setNextChecked,
      setPrevChecked,
    },
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: {
          descriptionID,
          labelID,
        },
        get children() {
          return createDynamic(
            () => props.as ?? ('div' as T),
            mergeProps(
              omitProps(props, [
                'as',
                'children',
                'defaultValue',
                'disabled',
                'onChange',
                'ref',
              ]),
              {
                role: 'radiogroup',
                'data-sh-radio-group': ownerID,
                'aria-labelledby': labelID,
                'aria-describedby': descriptionID,
                ref: createRef(props, (e) => {
                  internalRef = e;
                }),
              },
              createDisabled(() => props.disabled),
              createHeadlessSelectRootSingleUncontrolledProps(props),
            ) as DynamicProps<T>,
          );
        },
      });
    },
  });
}
