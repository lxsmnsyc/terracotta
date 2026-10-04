import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createMemo, createUniqueId, omit } from 'solid-js';
import type {
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import { createSingleSelectState, SelectStateProvider } from '../../states/create-select-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { TabGroupContext } from './TabGroupContext';
import { TAB_GROUP_TAG } from './tags';

export interface TabGroupBaseProps {
  horizontal: boolean;
}

export type TabGroupControlledBaseProps<V> = Prettify<
  TabGroupBaseProps & SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type TabGroupControlledProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  TabGroupControlledBaseProps<V>
>;

export type TabGroupUncontrolledBaseProps<V> = Prettify<
  TabGroupBaseProps & SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type TabGroupUncontrolledProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  TabGroupUncontrolledBaseProps<V>
>;

export type TabGroupProps<V, T extends ValidComponent = 'div'> =
  | TabGroupControlledProps<V, T>
  | TabGroupUncontrolledProps<V, T>;

function isTabGroupUncontrolled<V, T extends ValidComponent = 'div'>(
  props: TabGroupProps<V, T>,
): props is TabGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

/**
 * A tabbed interface. The `value` is the id of the selected tab, and the
 * arrow keys select as they move. The `horizontal` prop is required: it picks
 * which arrow keys navigate, and sets `aria-orientation`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function TabGroup<V, T extends ValidComponent = 'div'>(
  props: TabGroupProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const ownerID = createUniqueId();
    const state = createSingleSelectState(props);
    const [, setInternalRef] = createForwardRef(props);

    const ids = new Map<V, number>();

    const disabledState = createDisabledState(() => state.disabled());
    const ariaDisabledState = createARIADisabledState(() => state.disabled());
    const hasSelectedState = createHasSelectedState(() => state.hasSelected());
    const hasActiveState = createHasActiveState(() => state.hasActive());
    const rest = isTabGroupUncontrolled(props)
      ? omit(
          props,
          'as',
          'children',
          'defaultValue',
          'disabled',
          'onChange',
          'by',
          'ref',
          'toggleable',
          'horizontal',
        )
      : omit(
          props,
          'as',
          'children',
          'value',
          'disabled',
          'onChange',
          'by',
          'ref',
          'toggleable',
          'horizontal',
        );
    const Root = dynamic(() => props.as || 'div');
    return (
      <TabGroupContext
        value={{
          isHorizontal() {
            return props.horizontal;
          },
          getId(kind: string, value: V): string {
            let currentID = ids.get(value);
            if (currentID == null) {
              currentID = ids.size;
              ids.set(value, currentID);
            }
            return `${ownerID}__${kind}-${currentID}`;
          },
        }}
      >
        <Root
          {...TAB_GROUP_TAG}
          {...disabledState}
          {...ariaDisabledState}
          {...hasSelectedState}
          {...hasActiveState}
          ref={setInternalRef}
          {...rest}
        >
          <SelectStateProvider state={state}>{props.children}</SelectStateProvider>
        </Root>
      </TabGroupContext>
    );
  }) as unknown as JSX.Element;
}
