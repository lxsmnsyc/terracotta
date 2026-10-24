import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId, omit, untrack } from 'solid-js';
import { createPresence } from '../../utils/create-presence';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { renderChildren } from '../../utils/render-children';
import { createDisabledState } from '../../utils/state-props';
import type { SpinbuttonStateProperties, SpinbuttonStateRenderProps } from './SpinbuttonContext';
import { SpinbuttonContext } from './SpinbuttonContext';
import { SPINBUTTON_TAG } from './tags';

interface SpinbuttonBaseOptions {
  /** The lowest value. Without it, the value has no lower limit. */
  min?: number;
  /** The highest value. Without it, the value has no upper limit. */
  max?: number;
  /** The distance between allowed values. Defaults to 1. */
  step?: number;
  /** Steps moved by Page Up and Page Down. Defaults to 10. */
  largeStep?: number;
  disabled?: boolean;
  /** Turns the value into the text shown in the field. Defaults to `String`. */
  formatValue?: (value: number) => string;
  /**
   * Turns the text in the field into a number. Return `NaN` for text that is
   * not a value. Defaults to `Number`, with empty text as `NaN`.
   */
  parseValue?: (text: string) => number;
  /** Turns the value into text for `aria-valuetext`, such as "Monday". */
  getValueText?: (value: number) => string;
  onChange?: (value: number) => void;
}

export interface SpinbuttonControlledOptions extends SpinbuttonBaseOptions {
  value: number;
}

export interface SpinbuttonUncontrolledOptions extends SpinbuttonBaseOptions {
  defaultValue: number;
}

export type SpinbuttonControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  SpinbuttonControlledOptions & SpinbuttonStateRenderProps
>;

export type SpinbuttonUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  SpinbuttonUncontrolledOptions & SpinbuttonStateRenderProps
>;

export type SpinbuttonProps<T extends ValidComponent = 'div'> =
  | SpinbuttonControlledProps<T>
  | SpinbuttonUncontrolledProps<T>;

function isSpinbuttonUncontrolled<T extends ValidComponent = 'div'>(
  props: SpinbuttonProps<T>,
): props is SpinbuttonUncontrolledProps<T> {
  return 'defaultValue' in props;
}

const SPINBUTTON_OPTIONS = [
  'min',
  'max',
  'step',
  'largeStep',
  'disabled',
  'formatValue',
  'parseValue',
  'getValueText',
  'onChange',
] as const;

/**
 * The number of decimals in `value`, so stepped values do not drift. It reads
 * exponent forms such as `1e-7` too.
 */
function decimalsOf(value: number): number {
  const [mantissa, exponent] = String(value).split('e');
  const index = mantissa.indexOf('.');
  const digits = index === -1 ? 0 : mantissa.length - index - 1;
  return Math.max(0, digits - Number(exponent ?? 0));
}

function defaultParse(text: string): number {
  return text.trim() === '' ? Number.NaN : Number(text);
}

/**
 * A number field that steps through a range, following the ARIA spinbutton
 * pattern. The field takes typing and the arrow keys, and focus stays in it.
 * Increment and decrement buttons are optional.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function Spinbutton<T extends ValidComponent = 'div'>(
  props: SpinbuttonProps<T>,
): JSX.Element {
  const labelID = createUniqueId();
  const inputID = createUniqueId();
  const label = createPresence();

  const min = (): number | undefined => props.min;
  const max = (): number | undefined => {
    const lo = props.min;
    const hi = props.max;
    return hi != null && lo != null ? Math.max(lo, hi) : hi;
  };
  const step = (): number => (props.step && props.step > 0 ? props.step : 1);
  const disabled = (): boolean => !!props.disabled;

  function clamp(value: number): number {
    const lo = min();
    const hi = max();
    let result = value;
    if (lo != null && result < lo) {
      result = lo;
    }
    if (hi != null && result > hi) {
      result = hi;
    }
    return result;
  }

  // Snaps to the step counted from the minimum, or from 0 without one.
  function snap(value: number): number {
    const hi = max();
    // The maximum is always a stop, even when it is not on the step grid, so
    // End reaches it.
    if (hi != null && value >= hi) {
      return hi;
    }
    const base = min() ?? 0;
    const size = step();
    const snapped = Math.round((value - base) / size) * size + base;
    // The grid starts at `base`, so its decimals count as much as the step's.
    return Number(clamp(snapped).toFixed(Math.max(decimalsOf(base), decimalsOf(size))));
  }

  const [internal, setInternal] = createSignal(
    untrack(() => snap(isSpinbuttonUncontrolled(props) ? props.defaultValue : props.value)),
  );

  // A controlled value is snapped too, so `aria-valuenow` stays in range.
  const value = createMemo((): number =>
    isSpinbuttonUncontrolled(props) ? internal() : snap(props.value),
  );

  // Returns the value it settled on.
  function setValue(next: number): number {
    const current = untrack(value);
    if (untrack(disabled) || !Number.isFinite(next)) {
      return current;
    }
    const result = untrack(() => snap(next));
    if (result === current) {
      return current;
    }
    if (isSpinbuttonUncontrolled(props)) {
      setInternal(result);
    }
    props.onChange?.(result);
    return result;
  }

  const state: SpinbuttonStateProperties = {
    value,
    min,
    max,
    step,
    disabled,
    canIncrement(): boolean {
      const hi = max();
      return !disabled() && (hi == null || value() < hi);
    },
    canDecrement(): boolean {
      const lo = min();
      return !disabled() && (lo == null || value() > lo);
    },
    setValue(next): void {
      setValue(next);
    },
    increment(steps = 1): void {
      setValue(commit() + untrack(step) * steps);
    },
    decrement(steps = 1): void {
      setValue(commit() - untrack(step) * steps);
    },
  };

  let input: HTMLElement | undefined;

  const [draft, setDraft] = createSignal<string>();

  function parseText(text: string): number {
    return (props.parseValue ?? defaultParse)(text);
  }

  function commit(): number {
    const text = untrack(draft);
    if (text === undefined) {
      return untrack(value);
    }
    setDraft(undefined);
    return setValue(parseText(text));
  }

  const disabledState = createDisabledState(disabled);
  const rest = isSpinbuttonUncontrolled(props)
    ? omit(props, 'as', 'children', 'defaultValue', ...SPINBUTTON_OPTIONS)
    : omit(props, 'as', 'children', 'value', ...SPINBUTTON_OPTIONS);
  const Root = dynamic(() => props.as || 'div');
  return (
    <SpinbuttonContext
      value={{
        state,
        labelID,
        inputID,
        label,
        largeStep: () => props.largeStep ?? 10,
        valueText: () => props.getValueText?.(value()),
        format: (current) => (props.formatValue ?? String)(current),
        parse: parseText,
        snap: (current) => untrack(() => snap(current)),
        draft,
        setDraft,
        commit,
        focusInput(): void {
          input?.focus();
        },
        setInput(element): void {
          input = element;
        },
      }}
    >
      <Root {...SPINBUTTON_TAG} {...disabledState} {...rest}>
        {renderChildren(props.children, state)}
      </Root>
    </SpinbuttonContext>
  );
}
