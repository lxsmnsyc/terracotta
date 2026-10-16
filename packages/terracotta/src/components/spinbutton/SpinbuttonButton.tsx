import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { SpinbuttonStateRenderProps } from './SpinbuttonContext';
import { SpinbuttonStateChild, useSpinbuttonContext } from './SpinbuttonContext';
import { SPINBUTTON_DECREMENT_TAG, SPINBUTTON_INCREMENT_TAG } from './tags';

export type SpinbuttonButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  SpinbuttonStateRenderProps
>;

function createStepButton(direction: 1 | -1) {
  const name = direction === 1 ? 'SpinbuttonIncrement' : 'SpinbuttonDecrement';
  const tag = direction === 1 ? SPINBUTTON_INCREMENT_TAG : SPINBUTTON_DECREMENT_TAG;

  return function StepButton<T extends ValidComponent = 'button'>(
    props: SpinbuttonButtonProps<T>,
  ): JSX.Element {
    const context = useSpinbuttonContext(name);
    const state = context.state;

    const [internalRef, setInternalRef] = createForwardRef(props);

    const canStep = (): boolean => (direction === 1 ? state.canIncrement() : state.canDecrement());

    createEffect(internalRef, (current) => {
      if (current instanceof HTMLElement) {
        return mergeFunc(
          // Pressing the button leaves focus in the field.
          useEventListener(current, 'pointerdown', (e) => {
            e.preventDefault();
          }),
          useEventListener(current, 'click', () => {
            if (!canStep()) {
              return;
            }
            if (direction === 1) {
              state.increment();
            } else {
              state.decrement();
            }
            context.focusInput();
          }),
        );
      }
      return undefined;
    });

    const disabledState = createDisabledState(() => !canStep());
    const rest = omit(props, 'as', 'children', 'ref');
    const Root = dynamic(() => props.as || 'button');
    return (
      <Root
        {...tag}
        type="button"
        tabindex={-1}
        aria-controls={context.inputID}
        disabled={!canStep()}
        ref={setInternalRef}
        {...disabledState}
        {...rest}
      >
        <SpinbuttonStateChild>{props.children}</SpinbuttonStateChild>
      </Root>
    );
  };
}

/**
 * Raises the value by one step. It is out of the tab sequence, since the arrow
 * keys do the same in the field, and pressing it leaves focus in the field.
 * Give it a name, such as `aria-label="Increase"`. It is disabled at the
 * maximum.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export const SpinbuttonIncrement = createStepButton(1);

/**
 * Lowers the value by one step. It is out of the tab sequence, since the arrow
 * keys do the same in the field, and pressing it leaves focus in the field.
 * Give it a name, such as `aria-label="Decrease"`. It is disabled at the
 * minimum.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export const SpinbuttonDecrement = createStepButton(-1);
