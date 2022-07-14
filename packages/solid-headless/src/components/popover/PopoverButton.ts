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
  createHeadlessDisclosureChildProps,
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
import { POPOVER_BUTTON_TAG } from './tags';

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
    POPOVER_BUTTON_TAG,
    {
      id: context.buttonID,
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
    createDisabled(() => {
      const internalDisabled = properties.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => properties.isOpen()),
    createHeadlessDisclosureChildProps(props),
  ) as ButtonProps<T>);
}
