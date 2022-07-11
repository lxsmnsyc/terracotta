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
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  Button, ButtonProps,
} from '../button';
import {
  useListboxContext,
} from './ListboxContext';

export type ListboxButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & ButtonProps<T>>;

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
    {
      id: context.buttonID,
      'data-sh-listbox-button': context.ownerID,
      'aria-haspopup': 'listbox',
      'aria-controls': context.optionsID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
        if (e instanceof HTMLElement) {
          context.anchor = e;
        }
      }),
      get disabled() {
        return properties.disabled() || props.disabled;
      },
      get 'aria-disabled'() {
        return properties.disabled() || props.disabled;
      },
      get 'data-sh-disabled'() {
        return properties.disabled() || props.disabled;
      },
      get 'aria-expanded'() {
        return properties.isOpen();
      },
      get 'data-sh-expanded'() {
        return properties.isOpen();
      },
      get children() {
        return createComponent(HeadlessDisclosureChild, {
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
