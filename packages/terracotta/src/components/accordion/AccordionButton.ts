import type { JSX } from 'solid-js';
import {
  createEffect,
  onCleanup,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import type {
  ValidConstructor,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import {
  createForwardRef,
} from '../../utils/dynamic-prop';
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
import type { ButtonProps } from '../button';
import {
  Button,
} from '../button';
import {
  useAccordionContext,
} from './AccordionContext';
import {
  useAccordionItemContext,
} from './AccordionItemContext';
import { ACCORDION_BUTTON_TAG } from './tags';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';

export type AccordionButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<SelectOptionStateRenderProps, ButtonProps<T>>>;

export function AccordionButton<T extends ValidConstructor = 'button'>(
  props: AccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useAccordionContext('AccordionButton');
  const itemContext = useAccordionItemContext('AccordionButton');
  const state = useSelectOptionState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = (): void => {
        if (!isDisabled()) {
          state.select();
        }
      };
      const onFocus = (): void => {
        if (!isDisabled()) {
          state.focus();
        }
      };
      const onBlur = (): void => {
        if (!isDisabled()) {
          state.blur();
        }
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  return createComponent(Button, mergeProps(
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
  ) as ButtonProps<T>);
}
