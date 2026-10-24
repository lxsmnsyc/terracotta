import type { JSX } from '@solidjs/web';
import { createContext, createMemo, useContext } from 'solid-js';
import assert from '../../utils/assert';
import type { Presence } from '../../utils/create-presence';
import { renderChildren } from '../../utils/render-children';

export interface SpinbuttonStateProperties {
  /** The current value. */
  value(): number;
  /** The lowest value, if there is one. */
  min(): number | undefined;
  /** The highest value, if there is one. */
  max(): number | undefined;
  step(): number;
  disabled(): boolean;
  /** Whether the value can go up by a step. */
  canIncrement(): boolean;
  /** Whether the value can go down by a step. */
  canDecrement(): boolean;
  /** Sets the value, snapped to the step and kept in range. */
  setValue(value: number): void;
  /** Moves the value by a number of steps, after committing typed text. */
  increment(steps?: number): void;
  decrement(steps?: number): void;
}

export interface SpinbuttonContextData {
  state: SpinbuttonStateProperties;
  labelID: string;
  inputID: string;
  label: Presence;
  largeStep(): number;
  valueText(): string | undefined;
  format(value: number): string;
  parse(text: string): number;
  /** Rounds a value to the nearest step and keeps it in range. */
  snap(value: number): number;
  /** The text typed into the field, until it is committed. */
  draft(): string | undefined;
  setDraft(text: string | undefined): void;
  /**
   * Turns the typed text into the value, or drops it if it is not a number.
   * Returns the value after the commit, since a read of the state in the same
   * update still sees the old one.
   */
  commit(): number;
  /** Moves focus to the text field. */
  focusInput(): void;
  setInput(element: HTMLElement | undefined): void;
}

export const SpinbuttonContext = createContext<SpinbuttonContextData | null>(null);

/**
 * Reads the nearest `Spinbutton`'s internal context. Throws when called outside
 * a `Spinbutton`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function useSpinbuttonContext(componentName: string): SpinbuttonContextData {
  const context = useContext(SpinbuttonContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Spinbutton>`));
  return context;
}

/**
 * Reads the nearest spinbutton's state. Throws when called outside a
 * `Spinbutton`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function useSpinbuttonState(): SpinbuttonStateProperties {
  return useSpinbuttonContext('useSpinbuttonState').state;
}

export interface SpinbuttonStateRenderProps {
  children?: JSX.Element | ((state: SpinbuttonStateProperties) => JSX.Element);
}

/**
 * Passes the nearest spinbutton's state to a render prop.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function SpinbuttonStateChild(props: SpinbuttonStateRenderProps): JSX.Element {
  const state = useSpinbuttonState();
  // A memo, so a render prop that returns text, such as a label that depends on
  // the state, updates with it.
  return createMemo(() => renderChildren(props.children, state)) as unknown as JSX.Element;
}
