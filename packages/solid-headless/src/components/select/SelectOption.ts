import {
  createComponent,
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createSelectOptionState,
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createForwardRef,
  createRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { createActive, createDisabled, createSelected } from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useSelectContext,
} from './SelectContext';
import { SELECT_OPTION_TAG } from './tags';

export type SelectOptionBaseProps<V> = Prettify<
  SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type SelectOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<SelectOptionBaseProps<V>, ButtonProps<T>>>;

export function SelectOption<V, T extends ValidConstructor = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('Select');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

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
            case 'ArrowUp':
              if (!context.horizontal) {
                e.preventDefault();
                context.controller.setPrevChecked(ref);
              }
              break;
            case 'ArrowLeft':
              if (context.horizontal) {
                e.preventDefault();
                context.controller.setPrevChecked(ref);
              }
              break;
            case 'ArrowDown':
              if (!context.horizontal) {
                e.preventDefault();
                context.controller.setNextChecked(ref);
              }
              break;
            case 'ArrowRight':
              if (context.horizontal) {
                e.preventDefault();
                context.controller.setNextChecked(ref);
              }
              break;
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              state.select();
              break;
            case 'Home':
              e.preventDefault();
              context.controller.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
              context.controller.setLastChecked();
              break;
            default:
              if (e.key.length === 1) {
                characters = `${characters}${e.key}`;
                if (timeout) {
                  clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                  context.controller.setFirstMatch(characters);
                  characters = '';
                }, 100);
              }
              break;
          }
        }
      };
      const onClick = () => {
        state.select();
      };
      const onFocus = () => {
        state.focus();
      };
      const onBlur = () => {
        state.blur();
      };
      const onMouseEnter = () => {
        if (!state.disabled()) {
          ref.focus();
        }
      };
      const onMouseLeave = () => {
        if (!state.disabled()) {
          ref.blur();
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return createComponent(Button, mergeProps(
    {
      get as() {
        return props.as ?? ('li' as T);
      },
    },
    omitProps(props, [
      'as',
      'children',
      'value',
      'ref',
    ]),
    SELECT_OPTION_TAG,
    createOwnerAttribute(context.controller.getId()),
    {
      role: 'option',
      tabindex: -1,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
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
