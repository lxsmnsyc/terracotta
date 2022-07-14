import {
  createComponent,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessSelectOptionProps,
  HeadlessSelectOptionProps,
  useHeadlessSelectProperties,
} from '../../headless/select';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { createDisabled, createSelected } from '../../utils/state-props';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useSelectContext,
} from './SelectContext';
import { SELECT_OPTION_TAG } from './tags';

export type SelectOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, HeadlessSelectOptionProps<V> & ButtonProps<T>>;

export function SelectOption<V, T extends ValidConstructor = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('Select');
  const properties = useHeadlessSelectProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

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
        if (!(properties.disabled() || props.disabled)) {
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
              properties.select(props.value);
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
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus(props.value);
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };
      const onMouseEnter = () => {
        if (!(properties.disabled() || props.disabled)) {
          ref.focus();
        }
      };
      const onMouseLeave = () => {
        if (!(properties.disabled() || props.disabled)) {
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
    createDisabled(() => props.disabled),
    createSelected(() => properties.isSelected(props.value)),
    createHeadlessSelectOptionProps(props),
  ) as ButtonProps<T>);
}
