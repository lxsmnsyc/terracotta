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
  DynamicNode,
  ValidConstructor,
  WithRef,
  createRef,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';
import {
  TailwindButton,
  TailwindButtonProps,
} from './Button';

export type TailwindToggleProps<T extends ValidConstructor = 'button'> = {
  defaultPressed?: boolean;
  pressed?: boolean;
  onChange?: (value: boolean) => void;
} & Omit<TailwindButtonProps<T>, 'defaultPressed' | 'pressed' | 'onChange'>
  & WithRef<T>;

export function TailwindToggle<T extends ValidConstructor = 'button'>(
  props: TailwindToggleProps<T>,
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
      component={TailwindButton}
      as={props.as}
      {...excludeProps(props, [
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
