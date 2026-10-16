import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createMemo, createSignal, createUniqueId, omit, untrack } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { renderChildren } from '../../utils/render-children';
import useEventListener from '../../utils/use-event-listener';
import type { CarouselStateProperties, CarouselStateRenderProps } from './CarouselContext';
import { CarouselContext } from './CarouselContext';
import { CAROUSEL_TAG } from './tags';

interface CarouselBaseOptions {
  /** Whether the last slide leads back to the first. Defaults to true. */
  loop?: boolean;
  /** Starts rotating the slides on its own. */
  autoRotate?: boolean;
  /** Milliseconds each slide stays on screen while rotating. Defaults to 5000. */
  interval?: number;
  onChange?: (index: number) => void;
}

export interface CarouselControlledOptions extends CarouselBaseOptions {
  /** The index of the slide on screen, controlled. */
  value: number;
}

export interface CarouselUncontrolledOptions extends CarouselBaseOptions {
  /** The index of the first slide on screen. */
  defaultValue: number;
}

export type CarouselControlledProps<T extends ValidComponent = 'section'> = HeadlessPropsWithRef<
  T,
  CarouselControlledOptions & CarouselStateRenderProps
>;

export type CarouselUncontrolledProps<T extends ValidComponent = 'section'> = HeadlessPropsWithRef<
  T,
  CarouselUncontrolledOptions & CarouselStateRenderProps
>;

export type CarouselProps<T extends ValidComponent = 'section'> =
  | CarouselControlledProps<T>
  | CarouselUncontrolledProps<T>;

function isCarouselUncontrolled<T extends ValidComponent = 'section'>(
  props: CarouselProps<T>,
): props is CarouselUncontrolledProps<T> {
  return 'defaultValue' in props;
}

const CAROUSEL_OPTIONS = ['loop', 'autoRotate', 'interval', 'onChange'] as const;

/**
 * Shows a set of slides one at a time, following the ARIA carousel pattern.
 * Previous and next buttons, a rotation control and slide picker buttons are
 * all optional parts.
 *
 * When it rotates on its own, rotation stops for good once focus enters the
 * carousel, and pauses while the pointer is over it.
 *
 * Renders a `<section>` by default, with `role="region"`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/carousel.md}
 */
export function Carousel<T extends ValidComponent = 'section'>(
  props: CarouselProps<T>,
): JSX.Element {
  const slidesID = createUniqueId();
  const slideBaseID = createUniqueId();

  const [ref, setRef] = createForwardRef(props);

  const [indices, setIndices] = createSignal<number[]>([]);
  const count = createMemo((): number => indices().reduce((max, i) => Math.max(max, i + 1), 0));

  const [internal, setInternal] = createSignal(
    untrack(() => (isCarouselUncontrolled(props) ? props.defaultValue : props.value)),
  );
  const index = createMemo((): number =>
    isCarouselUncontrolled(props) ? internal() : props.value,
  );

  const loop = (): boolean => props.loop ?? true;

  const [rotating, setRotating] = createSignal(untrack(() => !!props.autoRotate));
  const [paused, setPaused] = createSignal(false);

  function show(next: number): void {
    const total = untrack(count);
    if (total === 0 || next === untrack(index)) {
      return;
    }
    if (next < 0 || next >= total) {
      return;
    }
    if (isCarouselUncontrolled(props)) {
      setInternal(next);
    }
    props.onChange?.(next);
  }

  function step(direction: 1 | -1): void {
    const total = untrack(count);
    if (total === 0) {
      return;
    }
    let next = untrack(index) + direction;
    if (untrack(loop)) {
      next = (next + total) % total;
    }
    show(next);
  }

  const state: CarouselStateProperties = {
    index,
    count,
    isRotating: rotating,
    isPaused: paused,
    hasPrevious: () => loop() || index() > 0,
    hasNext: () => loop() || index() < count() - 1,
    show,
    previous(): void {
      step(-1);
    },
    next(): void {
      step(1);
    },
    start(): void {
      setRotating(true);
    },
    stop(): void {
      setRotating(false);
    },
  };

  // Rotation runs while it is on, the pointer is away, and there is more than
  // one slide.
  createEffect(
    () => rotating() && !paused() && count() > 1,
    (active) => {
      if (!active) {
        return undefined;
      }
      const timer = setInterval(
        () => {
          // A carousel that cannot loop stops at its last slide.
          if (!loop() && index() >= count() - 1) {
            setRotating(false);
            return;
          }
          step(1);
        },
        untrack(() => props.interval ?? 5000),
      );
      return () => {
        clearInterval(timer);
      };
    },
  );

  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        // Focus anywhere in the carousel stops rotation until the user starts
        // it again with the rotation control.
        useEventListener(current, 'focusin', () => {
          setRotating(false);
        }),
        useEventListener(current, 'pointerenter', () => {
          setPaused(true);
        }),
        useEventListener(current, 'pointerleave', () => {
          setPaused(false);
        }),
      );
    }
    return undefined;
  });

  const rest = isCarouselUncontrolled(props)
    ? omit(props, 'as', 'children', 'ref', 'defaultValue', ...CAROUSEL_OPTIONS)
    : omit(props, 'as', 'children', 'ref', 'value', ...CAROUSEL_OPTIONS);
  const Root = dynamic(() => props.as || 'section');
  return (
    <CarouselContext
      value={{
        state,
        slidesID,
        slideID: (i) => `${slideBaseID}-${i}`,
        register(i): () => void {
          setIndices((list) => [...list, i]);
          return () => {
            setIndices((list) => {
              const position = list.indexOf(i);
              return position === -1
                ? list
                : [...list.slice(0, position), ...list.slice(position + 1)];
            });
          };
        },
      }}
    >
      <Root
        {...CAROUSEL_TAG}
        role="region"
        aria-roledescription="carousel"
        tc-rotating={rotating() ? '' : undefined}
        ref={setRef}
        {...rest}
      >
        {renderChildren(props.children, state)}
      </Root>
    </CarouselContext>
  );
}
