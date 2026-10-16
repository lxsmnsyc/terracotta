import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { CAROUSEL_PICKER_TAG } from './tags';

export type CarouselPickerProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<T>;

/**
 * Groups the slide picker buttons, with `role="group"`. Name it after what the
 * buttons do, such as `aria-label="Choose slide to display"`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function CarouselPicker<T extends ValidComponent = 'div'>(
  props: CarouselPickerProps<T>,
): JSX.Element {
  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'div');
  return <Root {...CAROUSEL_PICKER_TAG} role="group" {...rest} />;
}
