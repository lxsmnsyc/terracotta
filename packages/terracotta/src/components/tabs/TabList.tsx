import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { SelectStateRenderProps } from '../../states/create-select-state';
import { SelectStateChild, useSelectState } from '../../states/create-select-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createHasActiveState, createHasSelectedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useTabGroupContext } from './TabGroupContext';
import { createTabFocusNavigator, TabListContext } from './TabListContext';
import { TAB_LIST_TAG } from './tags';

export type TabListProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SelectStateRenderProps<V>
>;

/**
 * The row of tabs in a `TabGroup`, and the element that owns their arrow-key
 * navigation.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function TabList<V, T extends ValidComponent = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();
  const state = useSelectState();
  const [ref, setRef] = createForwardRef(props);

  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', (e) => {
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
        useEventListener(current, 'focusin', (e) => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const rest = omit(props, 'as', 'ref', 'children');
  return (
    <TabListContext value={controller}>
      <Dynamic
        component={props.as || 'div'}
        {...TAB_LIST_TAG}
        role="tablist"
        aria-orientation={rootContext.isHorizontal() ? 'horizontal' : 'vertical'}
        ref={setRef}
        {...hasSelectedState}
        {...hasActiveState}
        {...rest}
      >
        <SelectStateChild>{props.children}</SelectStateChild>
      </Dynamic>
    </TabListContext>
  );
}
