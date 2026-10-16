import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import useEventListener from '../../utils/use-event-listener';
import { useSliderContext } from './SliderContext';
import { SLIDER_LABEL_TAG } from './tags';

export type SliderLabelProps<T extends ValidComponent = 'label'> = HeadlessPropsWithRef<T>;

/**
 * The visible label of a `Slider`. The thumb points `aria-labelledby` at it,
 * and clicking it moves focus to the thumb.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function SliderLabel<T extends ValidComponent = 'label'>(
  props: SliderLabelProps<T>,
): JSX.Element {
  const context = useSliderContext('SliderLabel');
  context.label.register();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        context.focusThumb();
      });
    }
    return undefined;
  });

  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'label');
  return <Root {...SLIDER_LABEL_TAG} id={context.labelID} ref={setInternalRef} {...rest} />;
}
