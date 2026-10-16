import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import useEventListener from '../../utils/use-event-listener';
import type { CarouselStateProperties, CarouselStateRenderProps } from './CarouselContext';
import { CarouselStateChild, useCarouselContext } from './CarouselContext';
import {
  CAROUSEL_NEXT_TAG,
  CAROUSEL_PICKER_BUTTON_TAG,
  CAROUSEL_PREVIOUS_TAG,
  CAROUSEL_ROTATION_TAG,
} from './tags';

export type CarouselButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  CarouselStateRenderProps
>;

interface ButtonSetup {
  name: string;
  tag: Record<string, string>;
  /** Whether the button can act. While it cannot, it is `aria-disabled`. */
  enabled: (state: CarouselStateProperties) => boolean;
  act: (state: CarouselStateProperties) => void;
}

function createCarouselButton(setup: ButtonSetup) {
  return function CarouselButton<T extends ValidComponent = 'button'>(
    props: CarouselButtonProps<T>,
  ): JSX.Element {
    const context = useCarouselContext(setup.name);
    const state = context.state;

    const [internalRef, setInternalRef] = createForwardRef(props);

    createEffect(internalRef, (current) => {
      if (current instanceof HTMLElement) {
        return useEventListener(current, 'click', () => {
          if (setup.enabled(state)) {
            setup.act(state);
          }
        });
      }
      return undefined;
    });

    const rest = omit(props, 'as', 'children', 'ref');
    const Root = dynamic(() => props.as || 'button');
    return (
      <Root
        {...setup.tag}
        type="button"
        aria-controls={context.slidesID}
        // `aria-disabled` rather than `disabled`, so the button keeps focus
        // when it reaches the end.
        aria-disabled={setup.enabled(state) ? undefined : 'true'}
        tc-disabled={setup.enabled(state) ? undefined : ''}
        ref={setInternalRef}
        {...rest}
      >
        <CarouselStateChild>{props.children}</CarouselStateChild>
      </Root>
    );
  };
}

/**
 * Shows the previous slide. It does not move focus, so it can be pressed again
 * and again. Without `loop`, it is `aria-disabled` on the first slide.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export const CarouselPrevious = createCarouselButton({
  name: 'CarouselPrevious',
  tag: CAROUSEL_PREVIOUS_TAG,
  enabled: (state) => state.hasPrevious(),
  act: (state) => {
    state.previous();
  },
});

/**
 * Shows the next slide. It does not move focus, so it can be pressed again and
 * again. Without `loop`, it is `aria-disabled` on the last slide.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export const CarouselNext = createCarouselButton({
  name: 'CarouselNext',
  tag: CAROUSEL_NEXT_TAG,
  enabled: (state) => state.hasNext(),
  act: (state) => {
    state.next();
  },
});

/**
 * Stops and starts automatic rotation. Its label should say what pressing it
 * does, such as "Stop slide rotation", so it carries no `aria-pressed`. Use
 * the render prop's `isRotating()` to change the label. Put it first in the
 * carousel, before the slides.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export const CarouselRotation = createCarouselButton({
  name: 'CarouselRotation',
  tag: CAROUSEL_ROTATION_TAG,
  enabled: () => true,
  act: (state) => {
    if (state.isRotating()) {
      state.stop();
    } else {
      state.start();
    }
  },
});

export type CarouselPickerButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  { index: number } & CarouselStateRenderProps
>;

/**
 * Shows one slide. It is named "2 of 5" unless you give it a name, and it is
 * `aria-disabled` while its slide is on screen, so it stays in the tab
 * sequence.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function CarouselPickerButton<T extends ValidComponent = 'button'>(
  props: CarouselPickerButtonProps<T>,
): JSX.Element {
  const context = useCarouselContext('CarouselPickerButton');
  const state = context.state;

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isCurrent = (): boolean => state.index() === props.index;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.show(props.index);
      });
    }
    return undefined;
  });

  const rest = omit(props, 'as', 'children', 'ref', 'index');
  const Root = dynamic(() => props.as || 'button');
  return (
    <Root
      {...CAROUSEL_PICKER_BUTTON_TAG}
      type="button"
      aria-label={`${props.index + 1} of ${state.count()}`}
      aria-controls={context.slideID(props.index)}
      aria-disabled={isCurrent() ? 'true' : undefined}
      tc-current={isCurrent() ? '' : undefined}
      ref={setInternalRef}
      {...rest}
    >
      <CarouselStateChild>{props.children}</CarouselStateChild>
    </Root>
  );
}
