import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { SelectOptionStateOptions } from '../../states/create-select-option-state';
import {
  SelectOptionStateProvider,
  createSelectOptionState,
} from '../../states/create-select-option-state';
import createDynamic from '../../utils/create-dynamic';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
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

export type TabPanelProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, TabPanelBaseProps<V>>;

export function TabPanel<V, T extends ValidConstructor = 'div'>(
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
        mergeProps(
          omitProps(props, ['as', 'disabled', 'unmount', 'value']),
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
        ) as DynamicProps<T>,
      ),
  );
}
