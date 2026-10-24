import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createDependencyList } from '../../utils/create-dependency-list';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { SliderStateRenderProps } from './SliderContext';
import { SliderStateChild, useSliderContext } from './SliderContext';
import { SLIDER_THUMB_TAG } from './tags';

export interface SliderThumbOptions {
  /**
   * Which value the thumb sets, from 0. Only needed when the slider has more
   * than one thumb.
   */
  index?: number;
}

export type SliderThumbProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SliderThumbOptions & SliderStateRenderProps
>;

/**
 * The part the user moves, with `role="slider"`. It holds focus and takes the
 * keyboard. Position it yourself from the slider's `percent(index)`.
 *
 * With several thumbs, give each an `index` and a name of its own, such as
 * `aria-label="Minimum price"`.
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
  const index = (): number => props.index ?? 0;

  const [internalRef, setInternalRef] = createForwardRef(props);

  // Registers again when `index` changes, so a press on the track focuses the
  // thumb that now holds that index.
  createEffect(
    createDependencyList(() => [internalRef(), index()] as const),
    ([current, position]) => {
      if (current instanceof HTMLElement) {
        context.addThumb(position, current);
        return mergeFunc(
          () => {
            context.removeThumb(position, current);
          },
          useEventListener(current, 'keydown', (e) => {
            if (state.disabled()) {
              return;
            }
            switch (e.key) {
              case 'ArrowRight':
              case 'ArrowUp':
                state.increment(1, index());
                break;
              case 'ArrowLeft':
              case 'ArrowDown':
                state.decrement(1, index());
                break;
              case 'PageUp':
                state.increment(context.largeStep(), index());
                break;
              case 'PageDown':
                state.decrement(context.largeStep(), index());
                break;
              case 'Home':
                state.setThumbValue(index(), state.thumbMin(index()));
                break;
              case 'End':
                state.setThumbValue(index(), state.thumbMax(index()));
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
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = omit(props, 'as', 'children', 'ref', 'index');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...SLIDER_THUMB_TAG}
      id={context.thumbID(index())}
      role="slider"
      tabindex={state.disabled() ? -1 : 0}
      aria-valuenow={state.values()[index()]}
      aria-valuemin={state.thumbMin(index())}
      aria-valuemax={state.thumbMax(index())}
      aria-valuetext={context.valueText(index())}
      aria-orientation={context.isVertical() ? 'vertical' : undefined}
      aria-labelledby={
        !context.isGroup() && context.label.isPresent() ? context.labelID : undefined
      }
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
    >
      <SliderStateChild>{props.children}</SliderStateChild>
    </Root>
  );
}
