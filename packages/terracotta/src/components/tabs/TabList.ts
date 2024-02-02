import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps, onCleanup } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { SelectStateRenderProps } from '../../states/create-select-state';
import {
  SelectStateChild,
  useSelectState,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useTabGroupContext } from './TabGroupContext';
import { TabListContext, createTabFocusNavigator } from './TabListContext';
import { TAB_LIST_TAG } from './tags';

export type TabListProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function TabList<V, T extends ValidConstructor = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();
  const state = useSelectState();
  const [ref, setRef] = createForwardRef(props);

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      onCleanup(() => {
        controller.clearRef();
      });
      useEventListener(current, 'keydown', e => {
        if (!state.disabled()) {
          switch (e.key) {
            case 'ArrowUp': {
              if (!rootContext.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            }
            case 'ArrowLeft': {
              if (rootContext.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            }
            case 'ArrowDown': {
              if (!rootContext.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            }
            case 'ArrowRight': {
              if (rootContext.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            }
            case 'Home': {
              e.preventDefault();
              controller.setFirstChecked();
              break;
            }
            case 'End': {
              e.preventDefault();
              controller.setLastChecked();
              break;
            }
          }
        }
      });
      useEventListener(current, 'focusin', e => {
        if (e.target && e.target !== current) {
          controller.setCurrent(e.target as HTMLElement);
        }
      });
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
          createHasSelectedState(() => state.hasSelected()),
          createHasActiveState(() => state.hasActive()),
        ) as DynamicProps<T>,
      );
    },
  });
}
