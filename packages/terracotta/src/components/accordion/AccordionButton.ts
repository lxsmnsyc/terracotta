import type { JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { mergeFunc } from '../../utils/merge-func';
import {
  createActiveState,
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import type { OmitAndMerge } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_BUTTON_TAG } from './tags';

export type AccordionButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<SelectOptionStateRenderProps, ButtonProps<T>>
>;

/**
 * The control that expands and collapses its `AccordionItem`. Carries `aria-
 * expanded` and `aria-controls`, and takes part in the accordion's arrow-key
 * navigation.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function AccordionButton<T extends ValidComponent = 'button'>(
  props: AccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useAccordionContext('AccordionButton');
  const itemContext = useAccordionItemContext('AccordionButton');
  const state = useSelectOptionState();

  const [internalRef, setInternalRef] = createForwardRef<T>(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'click', () => {
          if (!isDisabled()) {
            state.select();
          }
        }),
        useEventListener(current, 'focus', () => {
          if (!isDisabled()) {
            state.focus();
          }
        }),
        useEventListener(current, 'blur', () => {
          if (!isDisabled()) {
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
      omit(props, 'children', 'ref', 'disabled'),
      ACCORDION_BUTTON_TAG,
      {
        id: itemContext.buttonID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isSelected() ? itemContext.panelID : undefined;
        },
      },
      createOwnerAttribute(rootContext.getId()),
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createSelectedState(() => state.isSelected()),
      createExpandedState(() => state.isSelected()),
      createARIAExpandedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
      {
        get children() {
          return createComponent(SelectOptionStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
