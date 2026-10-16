import type { JSX } from '@solidjs/web';
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselRotation,
  CarouselSlide,
  CarouselSlides,
} from 'terracotta/carousel';

const SLIDES = ['Mountains', 'Lakes', 'Forests'];

export default function CarouselCase(): JSX.Element {
  return (
    <div>
      <button type="button">Before</button>
      <Carousel aria-label="Holiday photos" defaultValue={0} autoRotate interval={400}>
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
      </Carousel>
    </div>
  );
}
