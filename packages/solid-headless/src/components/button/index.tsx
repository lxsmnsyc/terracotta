import {
  createEffect,
  createSignal,
  createUniqueId,
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
  createRef,
  DynamicComponentWithRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';

interface ButtonBaseProps {
  disabled?: boolean;
}

export type ButtonProps<T extends ValidConstructor = 'button'> =
  OmitAndMerge<ButtonBaseProps & DynamicComponentWithRef<T>, DynamicProps<T>>;

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
      {...omitProps(props, [
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
