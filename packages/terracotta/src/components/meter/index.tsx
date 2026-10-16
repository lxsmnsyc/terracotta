import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createContext, createMemo, createUniqueId, omit, useContext } from 'solid-js';
import assert from '../../utils/assert';
import { createPresence, type Presence } from '../../utils/create-presence';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import { renderChildren } from '../../utils/render-children';

const METER_TAG = createTag('meter');
const METER_LABEL_TAG = createTag('meter-label');

export interface MeterStateProperties {
  /** The value, kept between `min` and `max`. */
  value(): number;
  min(): number;
  max(): number;
  /** Where the value sits between `min` and `max`, from 0 to 100. */
  percent(): number;
}

interface MeterContextData {
  labelID: string;
  label: Presence;
}

const MeterContext = createContext<MeterContextData | null>(null);

export interface MeterOptions {
  value: number;
  /** The lowest value. Defaults to 0. */
  min?: number;
  /** The highest value. Defaults to 100. */
  max?: number;
  /** Turns the value into text for `aria-valuetext`, such as "6 hours left". */
  getValueText?: (value: number) => string;
  children?: JSX.Element | ((state: MeterStateProperties) => JSX.Element);
}

export type MeterProps<T extends ValidComponent = 'div'> = HeadlessProps<T, MeterOptions>;

/**
 * Shows a value within a known range, such as a battery level, following the
 * ARIA meter pattern. Use it for a measurement, not for progress through a
 * task, which is a progress bar.
 *
 * Renders a `<div>` by default, with `role="meter"`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/meter.md}
 */
export function Meter<T extends ValidComponent = 'div'>(props: MeterProps<T>): JSX.Element {
  const labelID = createUniqueId();
  const label = createPresence();

  const min = (): number => props.min ?? 0;
  const max = (): number => {
    const hi = props.max ?? 100;
    return hi > min() ? hi : min() + 1;
  };
  const value = createMemo((): number => Math.min(max(), Math.max(min(), props.value)));

  const state: MeterStateProperties = {
    value,
    min,
    max,
    percent: () => ((value() - min()) / (max() - min())) * 100,
  };

  const rest = omit(props, 'as', 'children', 'value', 'min', 'max', 'getValueText');
  const Root = dynamic(() => props.as || 'div');
  return (
    <MeterContext value={{ labelID, label }}>
      <Root
        {...METER_TAG}
        role="meter"
        aria-valuenow={value()}
        aria-valuemin={min()}
        aria-valuemax={max()}
        aria-valuetext={props.getValueText?.(value())}
        aria-labelledby={label.isPresent() ? labelID : undefined}
        {...rest}
      >
        {renderChildren(props.children, state)}
      </Root>
    </MeterContext>
  );
}

export type MeterLabelProps<T extends ValidComponent = 'span'> = HeadlessProps<T>;

/**
 * The visible label of a `Meter`. The meter points `aria-labelledby` at it
 * while it is mounted. Put it inside the `Meter`.
 *
 * Renders a `<span>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/meter.md}
 */
export function MeterLabel<T extends ValidComponent = 'span'>(
  props: MeterLabelProps<T>,
): JSX.Element {
  const context = useContext(MeterContext);
  assert(context, new Error('<MeterLabel> must be used inside a <Meter>'));
  context.label.register();

  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'span');
  return <Root {...METER_LABEL_TAG} id={context.labelID} {...rest} />;
}
