import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { CarouselStateRenderProps } from './CarouselContext';
import { CarouselStateChild, useCarouselContext } from './CarouselContext';
import { CAROUSEL_SLIDE_TAG } from './tags';

export type CarouselSlideProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  Prettify<{ index: number } & UnmountableProps & CarouselStateRenderProps>
>;

/**
 * One slide, with `role="group"` and `aria-roledescription="slide"`. It is
 * named "2 of 5" unless you give it a name, and it is shown while it is the
 * current slide.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function CarouselSlide<T extends ValidComponent = 'div'>(
  props: CarouselSlideProps<T>,
): JSX.Element {
  const context = useCarouselContext('CarouselSlide');
  const state = context.state;

  // Registered here, outside the part that unmounts, so the carousel counts
  // every slide.
  createEffect(
    () => props.index,
    (index) => context.register(index),
  );

  const isCurrent = (): boolean => state.index() === props.index;

  const rest = omit(props, 'as', 'children', 'index', 'unmount');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={isCurrent()}>
      <Root
        {...CAROUSEL_SLIDE_TAG}
        id={context.slideID(props.index)}
        role="group"
        aria-roledescription="slide"
        aria-label={`${props.index + 1} of ${state.count()}`}
        // A slide kept mounted while off screen is out of reach.
        inert={isCurrent() ? undefined : true}
        aria-hidden={isCurrent() ? undefined : 'true'}
        tc-current={isCurrent() ? '' : undefined}
        {...rest}
      >
        <CarouselStateChild>{props.children}</CarouselStateChild>
      </Root>
    </Unmountable>
  );
}
