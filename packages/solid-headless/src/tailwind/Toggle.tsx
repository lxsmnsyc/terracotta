import {
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  untrack,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import { ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import { TailwindButton, TailwindButtonProps } from './Button';

export type TailwindToggleProps<T extends ValidConstructor = 'button'> = {
  defaultPressed?: boolean;
  pressed?: boolean;
  onChange?: (value: boolean) => void;
} & Omit<TailwindButtonProps<T>, 'defaultPressed' | 'pressed' | 'onChange'>

export function TailwindToggle<T extends ValidConstructor = 'button'>(
  props: TailwindToggleProps<T>,
): JSX.Element {
  const [state, setState] = createSignal(untrack(() => !!props.defaultPressed));
  const toggleID = createUniqueId();

  let internalRef: HTMLElement;

  createEffect(() => {
    const onClick = () => {
      setState(!state());

      props.onChange?.(state());
    };

    internalRef.addEventListener('click', onClick);
    onCleanup(() => {
      internalRef.removeEventListener('click', onClick);
    });
  });

  return (
    <Dynamic
      component={TailwindButton}
      as={props.as}
      {...excludeProps(props, [
        'defaultPressed',
        'onChange',
        'pressed',
      ])}
      data-sh-toggle={toggleID}
      aria-pressed={state()}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
    />
  );
}
