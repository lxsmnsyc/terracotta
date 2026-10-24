import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
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
  // An expanded section that cannot collapse stays focusable, but reports
  // that it cannot be activated.
  const isLocked = (): boolean => state.isSelected() && !rootContext.isToggleable();

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

  const rest = omit(props, 'children', 'ref', 'disabled') as ButtonProps<T>;
  const ownerAttribute = createOwnerAttribute(rootContext.navigator.getId());
  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const ariaExpandedState = createARIAExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  return (
    <Button
      {...rest}
      {...ACCORDION_BUTTON_TAG}
      id={itemContext.buttonID}
      ref={setInternalRef}
      aria-controls={itemContext.hasPanel() ? itemContext.panelID : undefined}
      {...ownerAttribute}
      {...disabledState}
      {...ariaDisabledState}
      aria-disabled={isDisabled() || isLocked() ? 'true' : 'false'}
      {...selectedState}
      {...expandedState}
      {...ariaExpandedState}
      {...activeState}
    >
      <SelectOptionStateChild>{props.children}</SelectOptionStateChild>
    </Button>
  );
}
