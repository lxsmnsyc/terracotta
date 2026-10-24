import type { JSX } from '@solidjs/web';
import { createContext, useContext } from 'solid-js';
import assert from '../../utils/assert';
import type { Presence } from '../../utils/create-presence';
import { renderChildren } from '../../utils/render-children';

export interface SliderStateProperties {
  /** The current value. */
  value(): number;
  min(): number;
  max(): number;
  step(): number;
  /** Where the value sits between `min` and `max`, from 0 to 100. */
  percent(): number;
  disabled(): boolean;
  /** Sets the value, snapped to the step and kept in range. */
  setValue(value: number): void;
  /** Moves the value by a number of steps. */
  increment(steps?: number): void;
  decrement(steps?: number): void;
}

export interface SliderContextData {
  state: SliderStateProperties;
  labelID: string;
  thumbID: string;
  label: Presence;
  isVertical(): boolean;
  /** Steps moved by Page Up and Page Down. */
  largeStep(): number;
  /** Text for `aria-valuetext`, when the slider has a formatter. */
  valueText(): string | undefined;
  /** Moves focus to the thumb, after the pointer sets a value. */
  focusThumb(): void;
  setThumb(element: HTMLElement | undefined): void;
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
