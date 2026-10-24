import type { JSX } from '@solidjs/web';
import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import type { Presence } from '../../utils/create-presence';
import { renderChildren } from '../../utils/render-children';

export interface SliderStateProperties {
  /** The value of the first thumb. */
  value(): number;
  /** The values of every thumb, in thumb order. */
  values(): number[];
  min(): number;
  max(): number;
  step(): number;
  /** Where a thumb's value sits between `min` and `max`, from 0 to 100. */
  percent(index?: number): number;
  disabled(): boolean;
  /** Sets the first thumb's value, snapped to the step and kept in range. */
  setValue(value: number): void;
  /**
   * Sets one thumb's value, snapped to the step. It stays between the values
   * of the thumbs on either side.
   */
  setThumbValue(index: number, value: number): void;
  /** The lowest value a thumb can take, given the thumb before it. */
  thumbMin(index: number): number;
  /** The highest value a thumb can take, given the thumb after it. */
  thumbMax(index: number): number;
  /** Moves a thumb by a number of steps. */
  increment(steps?: number, index?: number): void;
  decrement(steps?: number, index?: number): void;
}

export interface SliderContextData {
  state: SliderStateProperties;
  labelID: string;
  /** The id of a thumb. */
  thumbID(index: number): string;
  label: Presence;
  /** Whether the slider has several thumbs, so the label names the group. */
  isGroup(): boolean;
  isVertical(): boolean;
  /** Steps moved by Page Up and Page Down. */
  largeStep(): number;
  /** Text for a thumb's `aria-valuetext`, when the slider has a formatter. */
  valueText(index: number): string | undefined;
  /** Moves focus to a thumb, after the pointer sets its value. */
  focusThumb(index: number): void;
  /** Registers a thumb's element under its index. */
  addThumb(index: number, element: HTMLElement): void;
  /**
   * Removes a thumb's element. It does nothing when another thumb has taken
   * the index since, as when two thumbs swap indexes.
   */
  removeThumb(index: number, element: HTMLElement): void;
}

export const SliderContext = createContext<SliderContextData | null>(null);

/**
 * Reads the nearest `Slider`'s internal context. Throws when called outside a
 * `Slider`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function useSliderContext(componentName: string): SliderContextData {
  const context = useContext(SliderContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Slider>`));
  return context;
}

/**
 * Reads the nearest slider's state. Throws when called outside a `Slider`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function useSliderState(): SliderStateProperties {
  return useSliderContext('useSliderState').state;
}

export interface SliderStateRenderProps {
  children?: JSX.Element | ((state: SliderStateProperties) => JSX.Element);
}

/**
 * Passes the nearest slider's state to a render prop.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function SliderStateChild(props: SliderStateRenderProps): JSX.Element {
  const state = useSliderState();
  return renderChildren(props.children, state);
}
