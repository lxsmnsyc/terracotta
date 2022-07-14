import {
  createSignal,
  createEffect,
  onCleanup,
  createComponent,
  mergeProps,
  JSX,
  untrack,
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

interface ToggleUncontrolledBaseProps {
  defaultPressed: boolean;
  onChange?: (value: boolean) => void;
}

export type ToggleUncontrolledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, ButtonProps<T> & ToggleUncontrolledBaseProps>;

export function ToggleUncontrolled<T extends ValidConstructor = 'button'>(
  props: ToggleUncontrolledProps<T>,
): JSX.Element {
  const [state, setState] = createSignal(!!props.defaultPressed);
  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        const current = !untrack(state);
        setState(current);
        props.onChange?.(current);
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
      'defaultPressed',
      'ref',
    ]),
    TOGGLE_TAG,
    {
      get 'aria-pressed'() {
        return state();
      },
      get 'data-sh-pressed'() {
        return state();
      },
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
    },
  ) as DynamicProps<T>);
}
