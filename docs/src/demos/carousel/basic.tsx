import type { JSX } from '@solidjs/web';
import {
  Carousel,
  CarouselNext,
  CarouselPicker,
  CarouselPickerButton,
  CarouselPrevious,
  CarouselRotation,
  CarouselSlide,
  CarouselSlides,
} from 'terracotta/carousel';

const SLIDES = [
  { title: 'Mountains', text: 'Three days on the ridge trail.' },
  { title: 'Lakes', text: 'A morning swim before the crowds.' },
  { title: 'Forests', text: 'Moss, ferns and very little signal.' },
];

/**
 * It rotates on its own until focus enters it. The rotation control comes
 * first, so it is the first thing a keyboard user reaches.
 */
export default function BasicCarousel(): JSX.Element {
  return (
    <Carousel class="carousel" aria-label="Holiday photos" defaultValue={0} autoRotate>
      <div class="carousel-controls">
        <CarouselRotation class="button">
          {(state) => (state.isRotating() ? 'Stop slide rotation' : 'Start slide rotation')}
        </CarouselRotation>
        <CarouselPrevious class="button">Previous slide</CarouselPrevious>
        <CarouselNext class="button">Next slide</CarouselNext>
      </div>
      <CarouselSlides class="carousel-slides">
        {SLIDES.map((slide, index) => (
          <CarouselSlide class="carousel-slide" index={index}>
            <p class="carousel-title">{slide.title}</p>
            <p class="hint">{slide.text}</p>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselPicker class="carousel-picker" aria-label="Choose slide to display">
        {SLIDES.map((_, index) => (
          <CarouselPickerButton class="carousel-dot" index={index} />
        ))}
      </CarouselPicker>
    </Carousel>
  );
}
