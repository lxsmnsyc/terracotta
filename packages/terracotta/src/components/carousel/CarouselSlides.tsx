import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import type { CarouselStateRenderProps } from './CarouselContext';
import { CarouselStateChild, useCarouselContext } from './CarouselContext';
import { CAROUSEL_SLIDES_TAG } from './tags';

export type CarouselSlidesProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  CarouselStateRenderProps
>;

/**
 * Holds the slides. It announces a new slide politely, except while the
 * carousel rotates on its own, when announcing every change would interrupt
 * the user.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function CarouselSlides<T extends ValidComponent = 'div'>(
  props: CarouselSlidesProps<T>,
): JSX.Element {
  const context = useCarouselContext('CarouselSlides');

  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...CAROUSEL_SLIDES_TAG}
      id={context.slidesID}
      aria-live={context.state.isRotating() ? 'off' : 'polite'}
      aria-atomic="false"
      {...rest}
    >
      <CarouselStateChild>{props.children}</CarouselStateChild>
    </Root>
  );
}
