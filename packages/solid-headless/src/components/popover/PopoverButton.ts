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
  HeadlessDisclosureChild,
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
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
import {
  Button,
  ButtonProps,
} from '../button';
import {
  usePopoverContext,
} from './PopoverContext';

export type PopoverButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, ButtonProps<T> & HeadlessDisclosureChildProps>;

export function PopoverButton<T extends ValidConstructor = 'button'>(
  props: PopoverButtonProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverButton');
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

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
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
      'data-sh-popover-button': context.ownerID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
        if (e instanceof HTMLElement) {
          context.anchor = e;
        }
      }),
      get 'aria-controls'() {
        return properties.isOpen() && context.panelID;
      },
    },
    createDisabled(() => properties.disabled() || props.disabled),
    createExpanded(() => properties.isOpen()),
    {
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
