import type { JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import { useDisclosureState } from '../../states/create-disclosure-state';
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
import type { OmitAndMerge, Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useListboxContext } from './ListboxContext';
import { useListboxOptionsContext } from './ListboxOptionsContext';
import { LISTBOX_OPTION_TAG } from './tags';

export type ListboxOptionBaseProps<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type ListboxOptionProps<V, T extends ValidComponent = 'li'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<ListboxOptionBaseProps<V>, ButtonProps<T>>
>;

/**
 * One option of a `Listbox`. The required `value` prop is what selecting it
 * produces.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/listbox.md}
 */
export function ListboxOption<V, T extends ValidComponent = 'li'>(
  props: ListboxOptionProps<V, T>,
): JSX.Element {
  const rootContext = useListboxContext('ListboxOptions');
  const context = useListboxOptionsContext('ListboxOptions');
  const disclosure = useDisclosureState();
  const state = createSelectOptionState(props);

  const [internalRef, setInternalRef] = createForwardRef(props);

  // I would really love to use createEffect but for some reason
  // the timing is never accurate
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'click', () => {
          if (!state.disabled()) {
            state.select();
            if (!rootContext.multiple) {
              disclosure.close();
            }
          }
        }),
        useEventListener(current, 'focus', () => {
          state.focus();
        }),
        useEventListener(current, 'blur', () => {
          state.blur();
        }),
        useEventListener(current, 'mouseenter', () => {
          if (!state.disabled()) {
            current.focus({ preventScroll: true });
          }
        }),
        useEventListener(current, 'mouseleave', () => {
          if (!state.disabled()) {
            state.blur();
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
      LISTBOX_OPTION_TAG,
      createOwnerAttribute(context.getId()),
      {
        get as() {
          return props.as || ('li' as T);
        },
        role: 'option',
        tabindex: -1,
        ref: setInternalRef,
      },
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createSelectedState(() => state.isSelected()),
      createARIASelectedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
      omit(props, 'as', 'children', 'disabled', 'value', 'ref'),
      {
        get children() {
          return createComponent(SelectOptionStateProvider, {
            state,
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
