import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectChildProps,
  createHeadlessSelectChild,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
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
  HeadlessPropsWithRef<T, HeadlessSelectChildProps<V>>;

export function TabList<V, T extends ValidConstructor = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();

  return createComponent(TabListContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref', 'children']),
          TAB_LIST_TAG,
          {
            role: 'tablist',
            get 'aria-orientation'() {
              return rootContext.horizontal ? 'horizontal' : 'vertical';
            },
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
          },
          createHeadlessSelectChild(props),
        ) as DynamicProps<T>,
      );
    },
  });
}
