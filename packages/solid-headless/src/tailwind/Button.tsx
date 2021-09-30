import { createEffect, createSignal, createUniqueId, onCleanup } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';

export type TailwindButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T,
  disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>

export function TailwindButton<T extends ValidConstructor = 'button'>(
  props: TailwindButtonProps<T>,
): JSX.Element {
  const buttonID = createUniqueId();

  const [internalRef, setInternalRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const ref = internalRef();
    if (ref) {
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
      disabled={(props.as ?? 'button') === 'button' ? props.disabled : undefined}
      {...excludeProps(props, [
        'as',
      ])}
      aria-disabled={props.disabled}
      data-sh-disabled={props.disabled}
      data-sh-button={buttonID}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        setInternalRef(e);
      }}
    />
  );
}
