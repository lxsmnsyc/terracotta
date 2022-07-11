import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  createComponent,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import {
  createRef,
  DynamicNode,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  ButtonProps,
  Button,
} from '../button';
import {
  useDisclosureContext,
} from './DisclosureContext';

export type DisclosureButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & ButtonProps<T>>;

export function DisclosureButton<T extends ValidConstructor = 'button'>(
  props: DisclosureButtonProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosureButton');
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
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'children',
      'ref',
    ]),
    {
      id: context.buttonID,
      'data-sh-disclosure-button': context.ownerID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
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
      get 'aria-controls'() {
        return properties.isOpen() && context.panelID;
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
