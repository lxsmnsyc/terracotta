import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId, omit, untrack } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { renderChildren } from '../../utils/render-children';
import { createDisabledState } from '../../utils/state-props';
import type { SplitterStateProperties, SplitterStateRenderProps } from './SplitterContext';
import { SplitterContext } from './SplitterContext';
import { SPLITTER_TAG } from './tags';

interface SplitterBaseOptions {
  /** The smallest size of the primary pane. Defaults to 0. */
  min?: number;
  /** The largest size of the primary pane. Defaults to 100. */
  max?: number;
  /** How far the arrow keys move the separator. Defaults to 5. */
  step?: number;
  /**
   * Stacks the panes, so the separator is a horizontal line that moves up and
   * down. By default the panes sit side by side.
   */
  horizontal?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export interface SplitterControlledOptions extends SplitterBaseOptions {
  value: number;
}

export interface SplitterUncontrolledOptions extends SplitterBaseOptions {
  defaultValue: number;
}

export type SplitterControlledProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SplitterControlledOptions & SplitterStateRenderProps
>;

export type SplitterUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SplitterUncontrolledOptions & SplitterStateRenderProps
>;

export type SplitterProps<T extends ValidComponent = 'div'> =
  | SplitterControlledProps<T>
  | SplitterUncontrolledProps<T>;

function isSplitterUncontrolled<T extends ValidComponent = 'div'>(
  props: SplitterProps<T>,
): props is SplitterUncontrolledProps<T> {
  return 'defaultValue' in props;
}

const SPLITTER_OPTIONS = ['min', 'max', 'step', 'horizontal', 'disabled', 'onChange'] as const;

/**
 * Two panes with a movable separator between them, following the ARIA window
 * splitter pattern. The value is the size of the primary pane, from `min` to
 * `max`, which defaults to a percentage. Size the panes yourself from it.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function Splitter<T extends ValidComponent = 'div'>(props: SplitterProps<T>): JSX.Element {
  const paneID = createUniqueId();

  const [ref, setRef] = createForwardRef(props);

  const min = (): number => props.min ?? 0;
  const max = (): number => Math.max(min(), props.max ?? 100);
  const step = (): number => (props.step && props.step > 0 ? props.step : 5);
  const disabled = (): boolean => !!props.disabled;

  function clamp(value: number): number {
    return Math.min(max(), Math.max(min(), value));
  }

  const [internal, setInternal] = createSignal(
    untrack(() => clamp(isSplitterUncontrolled(props) ? props.defaultValue : props.value)),
  );

  const value = createMemo((): number =>
    isSplitterUncontrolled(props) ? internal() : clamp(props.value),
  );

  // The size to go back to after Enter collapses the pane.
  let restoreTo: number | undefined;

  function setValue(next: number): void {
    if (untrack(disabled) || !Number.isFinite(next)) {
      return;
    }
    const result = untrack(() => clamp(next));
    if (result === untrack(value)) {
      return;
    }
    if (isSplitterUncontrolled(props)) {
      setInternal(result);
    }
    props.onChange?.(result);
  }

  const state: SplitterStateProperties = {
    value,
    min,
    max,
    step,
    disabled,
    collapsed: () => value() <= min(),
    setValue,
    grow(steps = 1): void {
      setValue(untrack(value) + untrack(step) * steps);
    },
    shrink(steps = 1): void {
      setValue(untrack(value) - untrack(step) * steps);
    },
    toggle(): void {
      const current = untrack(value);
      if (current > untrack(min)) {
        restoreTo = current;
        setValue(untrack(min));
      } else {
        setValue(restoreTo ?? untrack(() => (min() + max()) / 2));
      }
    },
  };

  const disabledState = createDisabledState(disabled);
  const rest = isSplitterUncontrolled(props)
    ? omit(props, 'as', 'children', 'ref', 'defaultValue', ...SPLITTER_OPTIONS)
    : omit(props, 'as', 'children', 'ref', 'value', ...SPLITTER_OPTIONS);
  const Root = dynamic(() => props.as || 'div');
  return (
    <SplitterContext
      value={{
        state,
        paneID,
        isHorizontal: () => !!props.horizontal,
        root: () => {
          const current = ref();
          return current instanceof HTMLElement ? current : undefined;
        },
      }}
    >
      <Root
        {...SPLITTER_TAG}
        tc-horizontal={props.horizontal ? '' : undefined}
        ref={setRef}
        {...disabledState}
        {...rest}
      >
        {renderChildren(props.children, state)}
      </Root>
    </SplitterContext>
  );
}
