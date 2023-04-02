import {
  onCleanup,
  createEffect,
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
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActive,
  createDisabled,
  createSelected,
} from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useListboxContext,
} from './ListboxContext';
import {
  useListboxOptionsContext,
} from './ListboxOptionsContext';
import { LISTBOX_OPTION_TAG } from './tags';
import { useDisclosureState } from '../../states/create-disclosure-state';
import {
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
  createSelectOptionState,
} from '../../states/create-select-option-state';

export type ListboxOptionBaseProps<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type ListboxOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<ListboxOptionBaseProps<V>, ButtonProps<T>>>;

export function ListboxOption<V, T extends ValidConstructor = 'li'>(
  props: ListboxOptionProps<V, T>,
): JSX.Element {
  const rootContext = useListboxContext('ListboxOptions');
  const context = useListboxOptionsContext('ListboxOptions');
  const disclosure = useDisclosureState();
  const state = createSelectOptionState(props);

  const [internalRef, setInternalRef] = createForwardRef(props);

  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!state.disabled()) {
          switch (e.key) {
            case 'ArrowLeft':
              if (rootContext.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case 'ArrowUp':
              if (!rootContext.horizontal) {
                e.preventDefault();
                context.setPrevChecked(ref);
              }
              break;
            case 'ArrowRight':
              if (rootContext.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case 'ArrowDown':
              if (!rootContext.horizontal) {
                e.preventDefault();
                context.setNextChecked(ref);
              }
              break;
            case 'Home':
              e.preventDefault();
              context.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
              context.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.setFirstMatch(characters);
                  characters = '';
                }, 100);
              }
              break;
          }
        }
      };
      const onClick = () => {
        state.select();
        if (!rootContext.multiple) {
          disclosure.close();
        }
      };
      const onFocus = () => {
        state.focus();
      };
      const onBlur = () => {
        state.blur();
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'as',
      'children',
      'disabled',
      'value',
      'ref',
    ]),
    LISTBOX_OPTION_TAG,
    createOwnerAttribute(context.getId()),
    {
      role: 'option',
      tabindex: -1,
      ref: setInternalRef,
      get as() {
        return props.as || ('li' as T);
      },
    },
    createDisabled(() => state.disabled()),
    createSelected(() => state.isSelected()),
    createActive(() => state.isActive()),
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
  ) as ButtonProps<T>);
}
