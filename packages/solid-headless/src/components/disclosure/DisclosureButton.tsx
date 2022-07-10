import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
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
  ButtonProps,
  Button,
} from '../button';
import {
  useDisclosureContext,
} from './DisclosureContext';

export type DisclosureButtonProps<T extends ValidConstructor = typeof Button> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps & ButtonProps<T>>;

export function DisclosureButton<T extends ValidConstructor = typeof Button>(
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

  return (
    <Dynamic
      component={Button}
      {...omitProps(props, [
        'children',
        'ref',
      ])}
      id={context.buttonID}
      aria-disabled={properties.disabled() || props.disabled}
      aria-expanded={properties.isOpen()}
      aria-controls={properties.isOpen() && context.panelID}
      data-sh-expanded={properties.isOpen()}
      data-sh-disabled={properties.disabled() || props.disabled}
      disabled={properties.disabled() || props.disabled}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
      data-sh-disclosure-button={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
