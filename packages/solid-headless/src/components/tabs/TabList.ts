import {
  createComponent,
  createRenderEffect,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import { SelectStateChild, SelectStateRenderProps } from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { useTabGroupContext } from './TabGroupContext';
import {
  createTabFocusNavigator,
  TabListContext,
} from './TabListContext';
import { TAB_LIST_TAG } from './tags';

export type TabListProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function TabList<V, T extends ValidConstructor = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();
  const [ref, setRef] = createForwardRef(props);

  createRenderEffect(() => {
    const current = ref();
    if (current) {
      controller.setRef(current);
    }
  });

  return createComponent(TabListContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref', 'children']),
          TAB_LIST_TAG,
          {
            role: 'tablist',
            get 'aria-orientation'() {
              return rootContext.horizontal ? 'horizontal' : 'vertical';
            },
            ref: setRef,
            get children() {
              return createComponent(SelectStateChild, {
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
