import {
  createSignal,
  onCleanup,
  createEffect,
  untrack,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
import {
  HeadlessSelectOptionProps,
  HeadlessSelectOption,
} from '../../headless/select/HeadlessSelectOption';
import {
  useHeadlessSelectProperties,
} from '../../headless/select/useHeadlessSelectProperties';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
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

export type ListboxOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, ButtonProps<T> & HeadlessSelectOptionProps<V>>;

export function ListboxOption<V, T extends ValidConstructor = 'li'>(
  props: ListboxOptionProps<V, T>,
): JSX.Element {
  const rootContext = useListboxContext('ListboxOptions');
  const context = useListboxOptionsContext('ListboxOptions');
  const disclosure = useHeadlessDisclosureProperties();
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
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              properties.select(props.value);
              if (!rootContext.multiple) {
                disclosure.setState(false);
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
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
          if (!rootContext.multiple) {
            disclosure.setState(false);
          }
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

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (disclosure.isOpen()
        && untrack(() => properties.isSelected(props.value))
        && !(properties.disabled() || props.disabled)
      ) {
        ref.focus();
      }
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'as',
      'children',
      'value',
      'ref',
    ]),
    {
      role: 'option',
      tabindex: -1,
      'data-sh-listbox-option': rootContext.ownerID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      get as() {
        return props.as ?? ('li' as T);
      },
      get disabled() {
        return props.disabled;
      },
      get 'aria-disabled'() {
        return props.disabled;
      },
      get 'data-sh-disabled'() {
        return props.disabled;
      },
      get 'aria-selected'() {
        return properties.isSelected(props.value);
      },
      get 'data-sh-selected'() {
        return properties.isSelected(props.value);
      },
      get children() {
        return createComponent(HeadlessSelectOption, {
          get value() {
            return props.value;
          },
          get disabled() {
            return props.disabled;
          },
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
