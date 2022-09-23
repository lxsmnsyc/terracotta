import {
  createSignal,
  onCleanup,
  createEffect,
  untrack,
  JSX,
  createComponent,
  mergeProps,
  batch,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import {
  HeadlessSelectOptionProps,
  useHeadlessSelectProperties,
  createHeadlessSelectOptionProps,
} from '../../headless/select';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActive,
  createDisabled,
  createSelected,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
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

export type ListboxOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<HeadlessSelectOptionProps<V>, ButtonProps<T>>>;

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

  const isDisabled = () => {
    const parent = properties.disabled();
    const local = props.disabled;
    return parent || local;
  };

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!isDisabled()) {
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
              batch(() => {
                properties.select(props.value);
                if (!rootContext.multiple) {
                  e.preventDefault();
                  disclosure.setState(false);
                }
              });
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
        if (!isDisabled()) {
          batch(() => {
            properties.select(props.value);
            if (!rootContext.multiple) {
              disclosure.setState(false);
            }
          });
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          properties.focus(props.value);
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
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
        && !isDisabled()
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
    LISTBOX_OPTION_TAG,
    createOwnerAttribute(context.getId()),
    {
      role: 'option',
      tabindex: -1,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      get as() {
        return props.as ?? ('li' as T);
      },
    },
    createDisabled(isDisabled),
    createSelected(() => properties.isSelected(props.value)),
    createActive(() => properties.isActive(props.value)),
    createHeadlessSelectOptionProps(props),
  ) as ButtonProps<T>);
}
