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
  ButtonProps,
  Button,
} from '../button';
import {
  useDisclosureContext,
} from './DisclosureContext';
import { DISCLOSURE_BUTTON_TAG } from './tags';

export type DisclosureButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<HeadlessDisclosureChildProps, ButtonProps<T>>>;

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
    DISCLOSURE_BUTTON_TAG,
    {
      id: context.buttonID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
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
