import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { mergeFunc } from '../../utils/merge-func';
import {
  createActiveState,
  createARIADisabledState,
  createARIASelectedState,
  createDisabledState,
  createSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { Button, type ButtonProps } from '../button';
import { useTabGroupContext } from './TabGroupContext';
import { useTabListContext } from './TabListContext';
import { TAB_TAG } from './tags';

export type TabBaseProps<V> = Prettify<SelectOptionStateOptions<V> & SelectOptionStateRenderProps>;

export type TabProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  TabBaseProps<V>
>;

/**
 * One tab in a `TabList`. The required `value` prop links it to the `TabPanel`
 * with the same value.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tabs.md}
 */
export function Tab<V, T extends ValidComponent = 'div'>(props: TabProps<V, T>): JSX.Element {
  const rootContext = useTabGroupContext('Tab');
  const listContext = useTabListContext('Tab');

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'click', () => {
          state.select();
        }),
        useEventListener(current, 'focus', () => {
          state.focus();
          state.select();
        }),
        useEventListener(current, 'blur', () => {
          state.blur();
          state.select();
        }),
      );
    }
    return undefined;
  });
  const ownerAttribute = createOwnerAttribute(listContext.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(
    props,
    'as',
    'children',
    'value',
    'disabled',
    'ref',
  ) as unknown as ButtonProps<T>;
  return (
    <Button
      {...TAB_TAG}
      {...ownerAttribute}
      as={props.as || ('div' as T)}
      role="tab"
      ref={setInternalRef}
      id={rootContext.getId('tab', props.value)}
      aria-controls={rootContext.getId('tab-panel', props.value)}
      tabindex={state.disabled() || !state.isSelected() ? -1 : 0}
      {...disabledState}
      {...ariaDisabledState}
      {...selectedState}
      {...ariaSelectedState}
      {...activeState}
      {...rest}
    >
      <SelectOptionStateProvider state={state}>{props.children}</SelectOptionStateProvider>
    </Button>
  );
}
