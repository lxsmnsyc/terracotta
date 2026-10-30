import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { SelectOptionStateOptions } from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createActiveState, createSelectedState } from '../../utils/state-props';
import { useTabGroupContext } from './TabGroupContext';
import { TAB_PANEL_TAG } from './tags';
import { Unmountable } from '../../utils/unmountable';

export interface TabPanelBaseProps<V> extends Exclude<SelectOptionStateOptions<V>, 'disabled'> {
  unmount?: boolean;
}

export type TabPanelProps<V, T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  TabPanelBaseProps<V>
>;

/**
 * The content shown for the `Tab` with the same `value`. Unmounts while its
 * tab is unselected unless `unmount={false}` is set.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function TabPanel<V, T extends ValidComponent = 'div'>(
  props: TabPanelProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabPanel');
  const state = createSelectOptionState(props);

  // `unmount={false}` keeps the panel in the DOM. Otherwise it is only there
  // while selected.
  rootContext.registerPanel(props.value, () => props.unmount === false || state.isSelected());

  const selectedState = createSelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(props, 'as', 'disabled', 'unmount', 'value');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={state.isSelected()}>
      <Root
        {...TAB_PANEL_TAG}
        role="tabpanel"
        tabindex={state.isSelected() ? 0 : -1}
        id={rootContext.getId('tab-panel', props.value)}
        aria-labelledby={rootContext.getId('tab', props.value)}
        children={
          <SelectOptionStateProvider state={state}>{props.children}</SelectOptionStateProvider>
        }
        {...selectedState}
        {...activeState}
        {...rest}
      />
    </Unmountable>
  );
}
