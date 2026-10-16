import { fireEvent, render, screen } from '@solidjs/testing-library';
import { flush } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Carousel,
  CarouselNext,
  CarouselPicker,
  CarouselPickerButton,
  CarouselPrevious,
  CarouselRotation,
  CarouselSlide,
  CarouselSlides,
} from '../src/components/carousel';
import { settle } from './aria';

const SLIDES = ['Mountains', 'Lakes', 'Forests'];

function renderCarousel(
  options: { loop?: boolean; autoRotate?: boolean; onChange?: (index: number) => void } = {},
): void {
  render(() => (
    <Carousel
      aria-label="Holiday photos"
      defaultValue={0}
      loop={options.loop}
      autoRotate={options.autoRotate}
      interval={1000}
      onChange={options.onChange}
    >
      <CarouselRotation>
        {(state) => (state.isRotating() ? 'Stop slide rotation' : 'Start slide rotation')}
      </CarouselRotation>
      <CarouselPrevious>Previous slide</CarouselPrevious>
      <CarouselNext>Next slide</CarouselNext>
      <CarouselSlides>
        {SLIDES.map((name, index) => (
          <CarouselSlide index={index}>
            <p>{name}</p>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselPicker aria-label="Choose slide to display">
        {SLIDES.map((_, index) => (
          <CarouselPickerButton index={index} />
        ))}
      </CarouselPicker>
    </Carousel>
  ));
}

function currentSlide(): HTMLElement {
  return screen.getByRole('group', { name: /of 3$/ });
}

afterEach(() => {
  vi.useRealTimers();
});

describe('Carousel accessibility', () => {
  it('describes the container and slides with aria-roledescription', async () => {
    renderCarousel();
    await settle();

    const carousel = screen.getByRole('region', { name: 'Holiday photos' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(currentSlide()).toHaveAttribute('aria-roledescription', 'slide');
    expect(currentSlide()).toHaveAccessibleName('1 of 3');
    expect(currentSlide()).toHaveTextContent('Mountains');
  });

  it('announces slide changes politely while not rotating', async () => {
    renderCarousel();
    await settle();

    const slides = currentSlide().parentElement;
    expect(slides).toHaveAttribute('aria-live', 'polite');
    expect(slides).toHaveAttribute('aria-atomic', 'false');
  });

  it('turns announcements off while rotating', async () => {
    renderCarousel({ autoRotate: true });
    await settle();

    expect(currentSlide().parentElement).toHaveAttribute('aria-live', 'off');
  });

  it('names the picker buttons after their slides', async () => {
    renderCarousel();
    await settle();

    const picker = screen.getByRole('group', { name: 'Choose slide to display' });
    expect(picker).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1 of 3' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: '2 of 3' })).not.toHaveAttribute('aria-disabled');
  });
});

describe('Carousel controls', () => {
  it('moves with the previous and next buttons, and keeps focus on them', async () => {
    renderCarousel();
    await settle();
    const next = screen.getByRole('button', { name: 'Next slide' });
    next.focus();

    fireEvent.click(next);
    await settle();
    expect(currentSlide()).toHaveTextContent('Lakes');
    expect(document.activeElement).toBe(next);

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    await settle();
    expect(currentSlide()).toHaveTextContent('Mountains');
  });

  it('loops from the first slide to the last', async () => {
    renderCarousel();
    await settle();

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    await settle();

    expect(currentSlide()).toHaveTextContent('Forests');
  });

  it('stops at the ends without loop', async () => {
    renderCarousel({ loop: false });
    await settle();
    const previous = screen.getByRole('button', { name: 'Previous slide' });

    expect(previous).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(previous);
    await settle();

    expect(currentSlide()).toHaveTextContent('Mountains');
  });

  it('shows a slide from the picker', async () => {
    const onChange = vi.fn<(index: number) => void>();
    renderCarousel({ onChange });
    await settle();

    fireEvent.click(screen.getByRole('button', { name: '3 of 3' }));
    await settle();

    expect(onChange).toHaveBeenCalledWith(2);
    expect(currentSlide()).toHaveTextContent('Forests');
    expect(screen.getByRole('button', { name: '3 of 3' })).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('Carousel rotation', () => {
  async function tick(ms: number): Promise<void> {
    await vi.advanceTimersByTimeAsync(ms);
    flush();
  }

  it('rotates on its own', async () => {
    vi.useFakeTimers();
    renderCarousel({ autoRotate: true });
    await tick(0);

    await tick(1000);
    expect(currentSlide()).toHaveTextContent('Lakes');
  });

  it('labels the rotation control by what it will do', async () => {
    vi.useFakeTimers();
    renderCarousel({ autoRotate: true });
    await tick(0);
    const control = screen.getByRole('button', { name: 'Stop slide rotation' });

    expect(control).not.toHaveAttribute('aria-pressed');

    fireEvent.click(control);
    await tick(0);
    expect(control).toHaveAccessibleName('Start slide rotation');
  });

  it('stops for good when focus enters the carousel', async () => {
    vi.useFakeTimers();
    renderCarousel({ autoRotate: true });
    await tick(0);

    screen.getByRole('button', { name: 'Next slide' }).focus();
    await tick(0);
    screen.getByRole('button', { name: 'Next slide' }).blur();
    await tick(3000);

    expect(currentSlide()).toHaveTextContent('Mountains');
    expect(screen.getByRole('button', { name: 'Start slide rotation' })).toBeInTheDocument();
  });

  it('pauses while the pointer is over it', async () => {
    vi.useFakeTimers();
    renderCarousel({ autoRotate: true });
    await tick(0);
    const carousel = screen.getByRole('region', { name: 'Holiday photos' });

    fireEvent.pointerEnter(carousel);
    await tick(3000);
    expect(currentSlide()).toHaveTextContent('Mountains');

    fireEvent.pointerLeave(carousel);
    await tick(1000);
    expect(currentSlide()).toHaveTextContent('Lakes');
  });

  it('restarts from the rotation control', async () => {
    vi.useFakeTimers();
    renderCarousel();
    await tick(0);
    const control = screen.getByRole('button', { name: 'Start slide rotation' });

    fireEvent.click(control);
    await tick(1000);

    expect(currentSlide()).toHaveTextContent('Lakes');
  });
});
