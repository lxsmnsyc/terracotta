import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId, omit, untrack } from 'solid-js';
import { createPresence } from '../../utils/create-presence';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { renderChildren } from '../../utils/render-children';
import { createDisabledState } from '../../utils/state-props';
import type { SliderStateProperties, SliderStateRenderProps } from './SliderContext';
import { SliderContext } from './SliderContext';
import { SLIDER_TAG } from './tags';

interface SliderBaseOptions {
  /** The lowest value. Defaults to 0. */
  min?: number;
  /** The highest value. Defaults to 100. */
  max?: number;
  /** The distance between allowed values. Defaults to 1. */
  step?: number;
  /** Steps moved by Page Up and Page Down. Defaults to 10. */
  largeStep?: number;
  /** Lays the slider out from bottom to top. Defaults to horizontal. */
  vertical?: boolean;
  disabled?: boolean;
  /** Turns the value into text for `aria-valuetext`, such as "20 °C". */
  getValueText?: (value: number) => string;
  /** Submits the value with a form under this name. */
  name?: string;
  onChange?: (value: number) => void;
}

export interface SliderControlledOptions extends SliderBaseOptions {
  value: number;
}

export interface SliderUncontrolledOptions extends SliderBaseOptions {
  defaultValue: number;
}

export type SliderControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  SliderControlledOptions & SliderStateRenderProps
>;

export type SliderUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  SliderUncontrolledOptions & SliderStateRenderProps
>;

export type SliderProps<T extends ValidComponent = 'div'> =
  | SliderControlledProps<T>
  | SliderUncontrolledProps<T>;

function isSliderUncontrolled<T extends ValidComponent = 'div'>(
  props: SliderProps<T>,
): props is SliderUncontrolledProps<T> {
  return 'defaultValue' in props;
}

const SLIDER_OPTIONS = [
  'min',
  'max',
  'step',
  'largeStep',
  'vertical',
  'disabled',
  'getValueText',
  'name',
  'onChange',
] as const;

/**
 * The number of decimals in `value`, so snapped values do not drift. It reads
 * exponent forms such as `1e-7` too.
 */
function decimalsOf(value: number): number {
  const [mantissa, exponent] = String(value).split('e');
  const index = mantissa.indexOf('.');
  const digits = index === -1 ? 0 : mantissa.length - index - 1;
  return Math.max(0, digits - Number(exponent ?? 0));
}

/**
 * Picks a number from a range, following the ARIA slider pattern. The value is
 * set with the arrow keys, Home, End, Page Up and Page Down on the thumb, or by
 * pressing and dragging on the track.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function Slider<T extends ValidComponent = 'div'>(props: SliderProps<T>): JSX.Element {
  const labelID = createUniqueId();
  const thumbID = createUniqueId();
  const label = createPresence();

  const min = (): number => props.min ?? 0;
  const max = (): number => Math.max(min(), props.max ?? 100);
  const step = (): number => (props.step && props.step > 0 ? props.step : 1);
  const disabled = (): boolean => !!props.disabled;

  function snap(value: number): number {
    const lo = min();
    const hi = max();
    const size = step();
    // The maximum is always a stop, even when it is not on the step grid, so
    // End reaches it.
    if (value >= hi) {
      return hi;
    }
    const snapped = Math.round((value - lo) / size) * size + lo;
    const clamped = Math.min(hi, Math.max(lo, snapped));
    // The grid starts at `lo`, so its decimals count as much as the step's.
    return Number(clamped.toFixed(Math.max(decimalsOf(lo), decimalsOf(size))));
  }

  const [internal, setInternal] = createSignal(
    untrack(() => snap(isSliderUncontrolled(props) ? props.defaultValue : props.value)),
  );

  const value = createMemo((): number =>
    isSliderUncontrolled(props) ? internal() : snap(props.value),
  );

  function setValue(next: number): void {
    if (untrack(disabled)) {
      return;
    }
    const snapped = untrack(() => snap(next));
    if (snapped === untrack(value)) {
      return;
    }
    if (isSliderUncontrolled(props)) {
      setInternal(snapped);
    }
    props.onChange?.(snapped);
  }

  const state: SliderStateProperties = {
    value,
    min,
    max,
    step,
    percent(): number {
      const range = max() - min();
      return range === 0 ? 0 : ((value() - min()) / range) * 100;
    },
    disabled,
    setValue,
    increment(steps = 1): void {
      setValue(untrack(value) + untrack(step) * steps);
    },
    decrement(steps = 1): void {
      setValue(untrack(value) - untrack(step) * steps);
    },
  };

  let thumb: HTMLElement | undefined;

  const disabledState = createDisabledState(disabled);
  const rest = isSliderUncontrolled(props)
    ? omit(props, 'as', 'children', 'defaultValue', ...SLIDER_OPTIONS)
    : omit(props, 'as', 'children', 'value', ...SLIDER_OPTIONS);
  const Root = dynamic(() => props.as || 'div');
  return (
    <SliderContext
      value={{
        state,
        labelID,
        thumbID,
        label,
        isVertical: () => !!props.vertical,
        focusThumb(): void {
          thumb?.focus();
        },
        setThumb(element): void {
          thumb = element;
        },
        largeStep: () => props.largeStep ?? 10,
        valueText: () => props.getValueText?.(value()),
      }}
    >
      <Root
        {...SLIDER_TAG}
        tc-vertical={props.vertical ? '' : undefined}
        {...disabledState}
        {...rest}
      >
        {renderChildren(props.children, state)}
        {props.name != null && <input type="hidden" name={props.name} value={value()} />}
      </Root>
    </SliderContext>
  );
}
