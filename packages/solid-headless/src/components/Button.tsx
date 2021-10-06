import {
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
} from 'solid-js';
import {
  JSX,
} from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';

export type ButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T,
  disabled?: boolean;
} & WithRef<T> & Omit<DynamicProps<T>, 'as' | 'disabled' | 'ref'>;

export function Button<T extends ValidConstructor = 'button'>(
  props: ButtonProps<T>,
): JSX.Element {
  const buttonID = createUniqueId();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      // This behavior is redundant for buttons
      if (ref.tagName !== 'BUTTON') {
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            ref.click();
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
        });
      }
    }
  });

  return (
    <Dynamic
      component={props.as ?? 'button'}
      id={buttonID}
      tabindex={0}
      role="button"
      disabled={props.disabled}
      {...excludeProps(props, [
        'as',
        'disabled',
        'ref',
      ])}
      aria-disabled={props.disabled}
      data-sh-disabled={props.disabled}
      data-sh-button={buttonID}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    />
  );
}
