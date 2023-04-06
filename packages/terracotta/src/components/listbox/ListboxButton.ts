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
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  Button, ButtonProps,
} from '../button';
import {
  useListboxContext,
} from './ListboxContext';
import { LISTBOX_BUTTON_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { useSelectState } from '../../states/create-select-state';

export type ListboxButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>>;

export function ListboxButton<T extends ValidConstructor = 'button'>(
  props: ListboxButtonProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxButton');
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = () => disclosureState.disabled() || props.disabled;

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      context.anchor = ref;

      const toggle = () => {
        if (!isDisabled()) {
          disclosureState.toggle();
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (!isDisabled()) {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
              e.preventDefault();
              disclosureState.toggle();
              break;
            default:
              break;
          }
        }
      };

      ref.addEventListener('click', toggle);
      ref.addEventListener('keydown', onKeyDown);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
        ref.removeEventListener('keydown', onKeyDown);
      });

      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
        context.hovering = false;
      };

      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'children',
      'ref',
    ]),
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
    {
      get children() {
        return createComponent(DisclosureStateChild, {
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
