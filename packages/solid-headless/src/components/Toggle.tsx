import {
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  untrack,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  DynamicNode,
  ValidConstructor,
  WithRef,
  createRef,
} from '../utils/dynamic-prop';
import {
  Button,
  ButtonProps,
} from './Button';

export type ToggleProps<T extends ValidConstructor = 'button'> = {
  defaultPressed?: boolean;
  pressed?: boolean;
  onChange?: (value: boolean) => void;
} & Omit<ButtonProps<T>, 'defaultPressed' | 'pressed' | 'onChange'>
  & WithRef<T>;

export function Toggle<T extends ValidConstructor = 'button'>(
  props: ToggleProps<T>,
): JSX.Element {
  const [state, setState] = createSignal(untrack(() => !!props.defaultPressed));
  const toggleID = createUniqueId();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        setState(!state());

        props.onChange?.(state());
      };

      ref.addEventListener('click', onClick);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
      });
    }
  });

  return (
    <Dynamic
      component={Button}
      as={props.as}
      {...omitProps(props, [
        'defaultPressed',
        'onChange',
        'pressed',
        'ref',
      ])}
      data-sh-toggle={toggleID}
      aria-pressed={state()}
      data-sh-pressed={state()}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    />
  );
}
