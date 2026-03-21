import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
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
import { Button } from '../button';
import { useTabGroupContext } from './TabGroupContext';
import { useTabListContext } from './TabListContext';
import { TAB_TAG } from './tags';

export type TabBaseProps<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type TabProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, TabBaseProps<V>>;

export function Tab<V, T extends ValidComponent = 'div'>(
  props: TabProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('Tab');
  const listContext = useTabListContext('Tab');

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(internalRef, current => {
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
  return createComponent(
    Button,
    merge(
      TAB_TAG,
      createOwnerAttribute(listContext.getId()),
      {
        get as() {
          return props.as || ('div' as T);
        },
        role: 'tab',
        ref: setInternalRef,
        get id() {
          return rootContext.getId('tab', props.value);
        },
        get 'aria-controls'() {
          return rootContext.getId('tab-panel', props.value);
        },
        get tabindex() {
          const selected = state.isSelected();
          return state.disabled() || !selected ? -1 : 0;
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
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createSelectedState(() => state.isSelected()),
      createARIASelectedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
      omit(props, 'as', 'children', 'value', 'disabled', 'ref'),
    ) as ComponentProps<T>,
  );
}
