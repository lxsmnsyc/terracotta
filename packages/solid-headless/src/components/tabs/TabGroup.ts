import {
  createComponent,
  createMemo,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  createSingleSelectState,
  SelectStateProvider,
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createDisabled } from '../../utils/state-props';
import { Prettify } from '../../utils/types';
import { TabGroupContext } from './TabGroupContext';
import { TAB_GROUP_TAG } from './tags';

export interface TabGroupBaseProps {
  horizontal: boolean;
}

export type TabGroupControlledBaseProps<V> = Prettify<
  TabGroupBaseProps
  & SingleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type TabGroupControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, TabGroupControlledBaseProps<V>>;

export type TabGroupUncontrolledBaseProps<V> =
  TabGroupBaseProps
  & SingleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>;

export type TabGroupUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, TabGroupUncontrolledBaseProps<V>>;

export type TabGroupProps<V, T extends ValidConstructor = 'div'> =
  | TabGroupControlledProps<V, T>
  | TabGroupUncontrolledProps<V, T>;

function isTabGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: TabGroupProps<V, T>,
): props is TabGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function TabGroup<V, T extends ValidConstructor = 'div'>(
  props: TabGroupProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const ownerID = createUniqueId();
    const state = createSingleSelectState(props);

    let id = 0;
    const ids = new Map<V, number>();

    return createComponent(TabGroupContext.Provider, {
      value: {
        get horizontal() {
          return props.horizontal ?? true;
        },
        getId(kind: string, value: V): string {
          let currentID = ids.get(value);
          if (!currentID) {
            currentID = id;
            ids.set(value, currentID);
            id += 1;
          }
          return `${ownerID}__${kind}-${currentID}`;
        },
      },
      get children() {
        return createDynamic(
          () => props.as || ('div' as T),
          mergeProps(
            isTabGroupUncontrolled(props)
              ? omitProps(props, [
                'as',
                'children',
                'defaultValue',
                'disabled',
                'onChange',
              ])
              : omitProps(props, [
                'as',
                'children',
                'value',
                'disabled',
                'onChange',
              ]),
            TAB_GROUP_TAG,
            createDisabled(() => state.disabled()),
            {
              get children() {
                return createComponent(SelectStateProvider, {
                  state,
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
  }) as unknown as JSX.Element;
}
