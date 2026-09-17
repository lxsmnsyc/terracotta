import type { JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { useSelectState } from '../../states/create-select-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { OmitAndMerge } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useListboxContext } from './ListboxContext';
import { LISTBOX_BUTTON_TAG } from './tags';

export type ListboxButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>
>;

/**
 * The trigger of a `Listbox`. Carries `aria-expanded` and `aria-haspopup`, and
 * opens the popup with the arrow keys as well as by click.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/listbox.md}
 */
export function ListboxButton<T extends ValidComponent = 'button'>(
  props: ListboxButtonProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxButton');
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => disclosureState.disabled() || props.disabled;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      context.buttonHovering = false;

      return mergeFunc(
        useEventListener(current, 'click', () => {
          if (!isDisabled()) {
            disclosureState.toggle();
          }
        }),
        useEventListener(current, 'keydown', (e) => {
          if (!isDisabled()) {
            switch (e.key) {
              case 'ArrowUp':
              case 'ArrowDown': {
                e.preventDefault();
                disclosureState.toggle();
                break;
              }
            }
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          context.buttonHovering = true;
        }),
        useEventListener(current, 'mouseleave', () => {
          context.buttonHovering = false;
        }),
        () => {
          context.buttonHovering = false;
        },
      );
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
      LISTBOX_BUTTON_TAG,
      {
        id: context.buttonID,
        'aria-haspopup': 'listbox',
        'aria-controls': context.optionsID,
        ref: setInternalRef,
      },
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createExpandedState(() => disclosureState.isOpen()),
      createARIAExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => selectState.hasSelected()),
      createHasActiveState(() => selectState.hasActive()),
      omit(props, 'children', 'ref'),
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
