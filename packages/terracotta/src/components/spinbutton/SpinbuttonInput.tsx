import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useSpinbuttonContext } from './SpinbuttonContext';
import { SPINBUTTON_INPUT_TAG } from './tags';

export type SpinbuttonInputProps<T extends ValidComponent = 'input'> = HeadlessPropsWithRef<T>;

/**
 * The text field of a `Spinbutton`, with `role="spinbutton"`. It holds focus
 * and takes the keyboard. Typed text sets the value while it is a value in
 * range, and is turned into the value on blur and <kbd>Enter</kbd>.
 *
 * Renders an `<input>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function SpinbuttonInput<T extends ValidComponent = 'input'>(
  props: SpinbuttonInputProps<T>,
): JSX.Element {
  const context = useSpinbuttonContext('SpinbuttonInput');
  const state = context.state;

  const [internalRef, setInternalRef] = createForwardRef(props);

  function inRange(value: number): boolean {
    const lo = state.min();
    const hi = state.max();
    return (lo == null || value >= lo) && (hi == null || value <= hi);
  }

  // Typed text that is not a number, or is out of range.
  const isInvalid = (): boolean => {
    const text = context.draft();
    if (text === undefined) {
      return false;
    }
    const parsed = context.parse(text);
    return !Number.isFinite(parsed) || !inRange(parsed);
  };

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.setInput(current);
      return mergeFunc(
        () => {
          context.setInput(undefined);
        },
        useEventListener(current, 'input', () => {
          if (!(current instanceof HTMLInputElement)) {
            return;
          }
          const text = current.value;
          context.setDraft(text);
          const parsed = context.parse(text);
          // A value in range and on a step updates at once. Other text, such as
          // "1." or the "3" of "35" with a step of 5, waits for the commit, so
          // the value is not snapped while the user is still typing.
          if (Number.isFinite(parsed) && inRange(parsed) && context.snap(parsed) === parsed) {
            state.setValue(parsed);
          }
        }),
        useEventListener(current, 'blur', () => {
          context.commit();
        }),
        useEventListener(current, 'keydown', (e) => {
          if (state.disabled()) {
            return;
          }
          switch (e.key) {
            case 'Enter':
              // The form still submits, with the committed value.
              context.commit();
              return;
            case 'ArrowUp':
              state.increment();
              break;
            case 'ArrowDown':
              state.decrement();
              break;
            case 'PageUp':
              state.increment(context.largeStep());
              break;
            case 'PageDown':
              state.decrement(context.largeStep());
              break;
            case 'Home': {
              // Without a minimum, Home moves the caret as usual.
              const lo = state.min();
              if (lo == null) {
                return;
              }
              context.commit();
              state.setValue(lo);
              break;
            }
            case 'End': {
              const hi = state.max();
              if (hi == null) {
                return;
              }
              context.commit();
              state.setValue(hi);
              break;
            }
            default:
              return;
          }
          e.preventDefault();
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'input');
  return (
    <Root
      {...SPINBUTTON_INPUT_TAG}
      id={context.inputID}
      type="text"
      inputmode="decimal"
      autocomplete="off"
      role="spinbutton"
      value={context.draft() ?? context.format(state.value())}
      aria-valuenow={state.value()}
      aria-valuemin={state.min()}
      aria-valuemax={state.max()}
      aria-valuetext={context.valueText()}
      aria-invalid={isInvalid() ? 'true' : undefined}
      aria-labelledby={context.label.isPresent() ? context.labelID : undefined}
      disabled={state.disabled()}
      ref={setInternalRef}
      {...disabledState}
      {...rest}
    />
  );
}
