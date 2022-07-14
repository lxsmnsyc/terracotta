import {
  createSignal,
  createEffect,
  onCleanup,
  createComponent,
  mergeProps,
  JSX,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  Button,
  ButtonProps,
} from '../button';
import { TOGGLE_TAG } from './tags';

interface ToggleControlledBaseProps {
  pressed: boolean;
  onChange?: (value: boolean) => void;
}

export type ToggleControlledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, ButtonProps<T> & ToggleControlledBaseProps>;

export function ToggleControlled<T extends ValidConstructor = 'button'>(
  props: ToggleControlledProps<T>,
): JSX.Element {
  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        props.onChange?.(!props.pressed);
      };

      ref.addEventListener('click', onClick);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'onChange',
      'pressed',
      'ref',
    ]),
    TOGGLE_TAG,
    {
      get 'aria-pressed'() {
        return props.pressed;
      },
      get 'data-sh-pressed'() {
        return props.pressed;
      },
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
    },
  ) as DynamicProps<T>);
}
