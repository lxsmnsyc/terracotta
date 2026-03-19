import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { SelectOptionStateOptions } from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createActiveState,
  createSelectedState,
} from '../../utils/state-props';
import { useTabGroupContext } from './TabGroupContext';
import { TAB_PANEL_TAG } from './tags';

export interface TabPanelBaseProps<V>
  extends Exclude<SelectOptionStateOptions<V>, 'disabled'> {
  unmount?: boolean;
}

export type TabPanelProps<V, T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  TabPanelBaseProps<V>
>;

export function TabPanel<V, T extends ValidComponent = 'div'>(
  props: TabPanelProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabPanel');
  const state = createSelectOptionState(props);

  return createUnmountable(
    props,
    () => state.isSelected(),
    () =>
      createDynamic(
        () => props.as || ('div' as T),
        merge(
          TAB_PANEL_TAG,
          {
            role: 'tabpanel',
            get tabindex() {
              return state.isSelected() ? 0 : -1;
            },
            get id() {
              return rootContext.getId('tab-panel', props.value);
            },
            get 'aria-labelledby'() {
              return rootContext.getId('tab', props.value);
            },
            get children() {
              return createComponent(SelectOptionStateProvider, {
                state,
                get children() {
                  return props.children;
                },
              });
            },
          },
          createSelectedState(() => state.isSelected()),
          createActiveState(() => state.isActive()),
          omitProps(props, ['as', 'disabled', 'unmount', 'value']),
        ) as ComponentProps<T>,
      ),
  );
}
