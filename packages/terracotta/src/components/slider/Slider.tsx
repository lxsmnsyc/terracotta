import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId, For, omit, untrack } from 'solid-js';
import { createPresence } from '../../utils/create-presence';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { renderChildren } from '../../utils/render-children';
import { createDisabledState } from '../../utils/state-props';
import type { SliderStateProperties, SliderStateRenderProps } from './SliderContext';
import { SliderContext } from './SliderContext';
import { SLIDER_TAG } from './tags';

/** One value, or one value per thumb. */
export type SliderValue = number | readonly number[];

interface SliderBaseOptions<V extends SliderValue> {
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
  /**
   * Turns a thumb's value into text for `aria-valuetext`, such as "20 °C".
   * `index` is the thumb's position, from 0.
   */
  getValueText?: (value: number, index: number) => string;
  /** Submits the value with a form under this name, one input per thumb. */
  name?: string;
  onChange?: (value: V) => void;
}

export interface SliderControlledOptions<
  V extends SliderValue = number,
> extends SliderBaseOptions<V> {
  value: V;
}

export interface SliderUncontrolledOptions<
  V extends SliderValue = number,
> extends SliderBaseOptions<V> {
  defaultValue: V;
}

export type SliderControlledProps<
  V extends SliderValue = number,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, SliderControlledOptions<V> & SliderStateRenderProps>;

export type SliderUncontrolledProps<
  V extends SliderValue = number,
  T extends ValidComponent = 'div',
> = HeadlessProps<T, SliderUncontrolledOptions<V> & SliderStateRenderProps>;

export type SliderProps<V extends SliderValue = number, T extends ValidComponent = 'div'> =
  | SliderControlledProps<V, T>
  | SliderUncontrolledProps<V, T>;

function isSliderUncontrolled<V extends SliderValue, T extends ValidComponent>(
  props: SliderProps<V, T>,
): props is SliderUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function toArray(value: SliderValue): number[] {
  return typeof value === 'number' ? [value] : [...value];
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

/** The number of decimals in `step`, so snapped values do not drift. */
function decimalsOf(step: number): number {
  const text = String(step);
  const index = text.indexOf('.');
  return index === -1 ? 0 : text.length - index - 1;
}

/**
 * Picks a number from a range, following the ARIA slider pattern. The value is
 * set with the arrow keys, Home, End, Page Up and Page Down on a thumb, or by
 * pressing and dragging on the track.
 *
 * Pass an array as the value for one thumb per value, following the ARIA
 * multi-thumb slider pattern. The thumbs cannot pass each other.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function Slider<V extends SliderValue = number, T extends ValidComponent = 'div'>(
  props: SliderProps<V, T>,
): JSX.Element {
  const labelID = createUniqueId();
  const thumbBaseID = createUniqueId();
  const label = createPresence();

  const min = (): number => props.min ?? 0;
  const max = (): number => Math.max(min(), props.max ?? 100);
  const step = (): number => (props.step && props.step > 0 ? props.step : 1);
  const disabled = (): boolean => !!props.disabled;

  function snap(value: number): number {
    const lo = min();
    const hi = max();
    const size = step();
    const snapped = Math.round((value - lo) / size) * size + lo;
    const clamped = Math.min(hi, Math.max(lo, snapped));
    return Number(clamped.toFixed(decimalsOf(size)));
  }

  function normalize(value: SliderValue): number[] {
    return toArray(value)
      .map(snap)
      .sort((a, b) => a - b);
  }

  const initial = untrack(() => (isSliderUncontrolled(props) ? props.defaultValue : props.value));
  // Whether the value is an array is fixed by the first value.
  const isArray = typeof initial !== 'number';

  const [internal, setInternal] = createSignal(untrack(() => normalize(initial)));

  const values = createMemo((): number[] =>
    isSliderUncontrolled(props) ? internal() : normalize(props.value),
  );

  function thumbMin(index: number): number {
    return index > 0 ? (values()[index - 1] ?? min()) : min();
  }

  function thumbMax(index: number): number {
    return values()[index + 1] ?? max();
  }

  function setThumbValue(index: number, next: number): void {
    if (untrack(disabled)) {
      return;
    }
    const current = untrack(values);
    if (index < 0 || index >= current.length) {
      return;
    }
    const value = untrack(() => Math.min(thumbMax(index), Math.max(thumbMin(index), snap(next))));
    if (value === current[index]) {
      return;
    }
    const updated = [...current];
    updated[index] = value;
    if (isSliderUncontrolled(props)) {
      setInternal(updated);
    }
    props.onChange?.((isArray ? updated : updated[0]) as V);
  }

  function valueAt(index: number): number {
    return values()[index] ?? min();
  }

  const state: SliderStateProperties = {
    value: () => valueAt(0),
    values,
    min,
    max,
    step,
    percent(index = 0): number {
      const range = max() - min();
      return range === 0 ? 0 : ((valueAt(index) - min()) / range) * 100;
    },
    disabled,
    setValue(value): void {
      setThumbValue(0, value);
    },
    setThumbValue,
    thumbMin,
    thumbMax,
    increment(steps = 1, index = 0): void {
      setThumbValue(index, untrack(() => valueAt(index)) + untrack(step) * steps);
    },
    decrement(steps = 1, index = 0): void {
      setThumbValue(index, untrack(() => valueAt(index)) - untrack(step) * steps);
    },
  };

  const thumbs = new Map<number, HTMLElement>();

  // With several thumbs, the label names the group, and each thumb needs a
  // name of its own.
  const isGroup = (): boolean => values().length > 1;

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
        thumbID: (index) => `${thumbBaseID}-${index}`,
        label,
        isGroup,
        isVertical: () => !!props.vertical,
        largeStep: () => props.largeStep ?? 10,
        valueText: (index) => props.getValueText?.(valueAt(index), index),
        focusThumb(index): void {
          thumbs.get(index)?.focus();
        },
        setThumb(index, element): void {
          if (element) {
            thumbs.set(index, element);
          } else {
            thumbs.delete(index);
          }
        },
      }}
    >
      <Root
        {...SLIDER_TAG}
        role={isGroup() ? 'group' : undefined}
        aria-labelledby={isGroup() && label.isPresent() ? labelID : undefined}
        tc-vertical={props.vertical ? '' : undefined}
        {...disabledState}
        {...rest}
      >
        {renderChildren(props.children, state)}
        {props.name != null && (
          <For each={values()}>
            {(value) => <input type="hidden" name={props.name} value={value} />}
          </For>
        )}
      </Root>
    </SliderContext>
  );
}
