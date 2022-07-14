import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
  createHeadlessDisclosureChildProps,
} from '../../headless/disclosure';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
  createExpanded,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  Button, ButtonProps,
} from '../button';
import {
  useListboxContext,
} from './ListboxContext';
import { LISTBOX_BUTTON_TAG } from './tags';

export type ListboxButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<HeadlessDisclosureChildProps, ButtonProps<T>>>;

export function ListboxButton<T extends ValidConstructor = 'button'>(
  props: ListboxButtonProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxButton');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.setState(!properties.isOpen());
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
              e.preventDefault();
              toggle();
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
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
        if (e instanceof HTMLElement) {
          context.anchor = e;
        }
      }),
    },
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isOpen()),
    createHeadlessDisclosureChildProps(props),
  ) as ButtonProps<T>);
}
