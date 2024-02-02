import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import type {
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createActiveState,
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

export type AccordionButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<SelectOptionStateRenderProps, ButtonProps<T>>
  >;

export function AccordionButton<T extends ValidConstructor = 'button'>(
  props: AccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useAccordionContext('AccordionButton');
  const itemContext = useAccordionItemContext('AccordionButton');
  const state = useSelectOptionState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    state.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();

    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        if (!isDisabled()) {
          state.select();
        }
      });
      useEventListener(current, 'focus', () => {
        if (!isDisabled()) {
          state.focus();
        }
      });
      useEventListener(current, 'blur', () => {
        if (!isDisabled()) {
          state.blur();
        }
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['children', 'ref', 'disabled']),
      ACCORDION_BUTTON_TAG,
      {
        id: itemContext.buttonID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isSelected() && itemContext.panelID;
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
