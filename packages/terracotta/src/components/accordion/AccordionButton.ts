import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  ValidConstructor,
  HeadlessPropsWithRef,
  createForwardRef,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  ButtonProps,
  Button,
} from '../button';
import {
  useAccordionContext,
} from './AccordionContext';
import {
  useAccordionItemContext,
} from './AccordionItemContext';
import { ACCORDION_BUTTON_TAG } from './tags';
import {
  SelectOptionStateChild,
  SelectOptionStateRenderProps,
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

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        if (!(state.disabled() || props.disabled)) {
          state.select();
        }
      };
      const onFocus = () => {
        if (!(state.disabled() || props.disabled)) {
          state.focus();
        }
      };
      const onBlur = () => {
        if (!(state.disabled() || props.disabled)) {
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
    createDisabledState(() => state.disabled() || props.disabled),
    createExpandedState(() => state.isSelected()),
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
