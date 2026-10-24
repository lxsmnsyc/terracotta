import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { SliderStateRenderProps } from './SliderContext';
import { SliderStateChild, useSliderContext } from './SliderContext';
import { SLIDER_THUMB_TAG } from './tags';

export type SliderThumbProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SliderStateRenderProps
>;

/**
 * The part the user moves, with `role="slider"`. It holds focus and takes the
 * keyboard. Position it yourself from the slider's `percent()`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function SliderThumb<T extends ValidComponent = 'div'>(
  props: SliderThumbProps<T>,
): JSX.Element {
  const context = useSliderContext('SliderThumb');
  const state = context.state;

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.setThumb(current);
      return mergeFunc(
        () => {
          context.setThumb(undefined);
        },
        useEventListener(current, 'keydown', (e) => {
          if (state.disabled()) {
            return;
          }
          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
              state.increment();
              break;
            case 'ArrowLeft':
            case 'ArrowDown':
              state.decrement();
              break;
            case 'PageUp':
              state.increment(context.largeStep());
              break;
            case 'PageDown':
              state.decrement(context.largeStep());
              break;
            case 'Home':
              state.setValue(state.min());
              break;
            case 'End':
              state.setValue(state.max());
              break;
            default:
              return;
          }
          // The keys would otherwise scroll the page.
          e.preventDefault();
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...SLIDER_THUMB_TAG}
      id={context.thumbID}
      role="slider"
      tabindex={state.disabled() ? -1 : 0}
      aria-valuenow={state.value()}
      aria-valuemin={state.min()}
      aria-valuemax={state.max()}
      aria-valuetext={context.valueText()}
      aria-orientation={context.isVertical() ? 'vertical' : undefined}
      aria-labelledby={context.label.isPresent() ? context.labelID : undefined}
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
    >
      <SliderStateChild>{props.children}</SliderStateChild>
    </Root>
  );
}
