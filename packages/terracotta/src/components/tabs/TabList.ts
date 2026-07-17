import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { SelectStateRenderProps } from '../../states/create-select-state';
import {
  SelectStateChild,
  useSelectState,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useTabGroupContext } from './TabGroupContext';
import { createTabFocusNavigator, TabListContext } from './TabListContext';
import { TAB_LIST_TAG } from './tags';

export type TabListProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function TabList<V, T extends ValidComponent = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();
  const state = useSelectState();
  const [ref, setRef] = createForwardRef(props);

  createEffect(ref, current => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', e => {
          if (!state.disabled()) {
            switch (e.key) {
              case 'ArrowUp': {
                if (!rootContext.isHorizontal()) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              }
              case 'ArrowLeft': {
                if (rootContext.isHorizontal()) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              }
              case 'ArrowDown': {
                if (!rootContext.isHorizontal()) {
                  e.preventDefault();
                  controller.setNextChecked(true);
                }
                break;
              }
              case 'ArrowRight': {
                if (rootContext.isHorizontal()) {
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
        }),
        useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(TabListContext, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          TAB_LIST_TAG,
          {
            role: 'tablist',
            get 'aria-orientation'() {
              return rootContext.isHorizontal() ? 'horizontal' : 'vertical';
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
          omit(props, 'as', 'ref', 'children'),
        ) as ComponentProps<T>,
      );
    },
  });
}
