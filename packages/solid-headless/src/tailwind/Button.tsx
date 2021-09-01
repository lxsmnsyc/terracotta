import { createEffect, createUniqueId, onCleanup } from 'solid-js';
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

  let internalRef: HTMLElement;

  createEffect(() => {
    // This behavior is redundant for buttons
    if (internalRef.tagName !== 'BUTTON') {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          internalRef.click();
        }
      };

      internalRef.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        internalRef.removeEventListener('keydown', onKeyDown);
      });
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
      data-sh-button={buttonID}
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
