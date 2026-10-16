import type { JSX } from '@solidjs/web';
import { createContext, createMemo, useContext } from 'solid-js';
import assert from '../../utils/assert';
import { renderChildren } from '../../utils/render-children';

export interface CarouselStateProperties {
  /** The index of the slide on screen, from 0. */
  index(): number;
  /** How many slides there are. */
  count(): number;
  /** Whether the slides rotate on their own. */
  isRotating(): boolean;
  /** Whether rotation is held while the pointer is over the carousel. */
  isPaused(): boolean;
  /** Whether there is a slide before the current one. */
  hasPrevious(): boolean;
  /** Whether there is a slide after the current one. */
  hasNext(): boolean;
  /** Shows a slide. */
  show(index: number): void;
  previous(): void;
  next(): void;
  /** Starts automatic rotation. */
  start(): void;
  /** Stops automatic rotation. */
  stop(): void;
}

export interface CarouselContextData {
  state: CarouselStateProperties;
  slidesID: string;
  slideID(index: number): string;
  /** Adds a slide index until the returned function is called. */
  register(index: number): () => void;
}

export const CarouselContext = createContext<CarouselContextData | null>(null);

/**
 * Reads the nearest `Carousel`'s internal context. Throws when called outside
 * a `Carousel`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function useCarouselContext(componentName: string): CarouselContextData {
  const context = useContext(CarouselContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Carousel>`));
  return context;
}

/**
 * Reads the nearest carousel's state. Throws when called outside a `Carousel`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function useCarouselState(): CarouselStateProperties {
  return useCarouselContext('useCarouselState').state;
}

export interface CarouselStateRenderProps {
  children?: JSX.Element | ((state: CarouselStateProperties) => JSX.Element);
}

/**
 * Passes the nearest carousel's state to a render prop.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function CarouselStateChild(props: CarouselStateRenderProps): JSX.Element {
  const state = useCarouselState();
  // A memo, so a render prop that returns text, such as a label that depends on
  // the state, updates with it.
  return createMemo(() => renderChildren(props.children, state)) as unknown as JSX.Element;
}
