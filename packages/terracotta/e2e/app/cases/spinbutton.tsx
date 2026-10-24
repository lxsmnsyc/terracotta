import type { JSX } from '@solidjs/web';
import {
  Spinbutton,
  SpinbuttonDecrement,
  SpinbuttonIncrement,
  SpinbuttonInput,
  SpinbuttonLabel,
} from 'terracotta/spinbutton';

export default function SpinbuttonCase(): JSX.Element {
  return (
    <div>
      <button type="button">Before</button>
      <Spinbutton defaultValue={2} min={0} max={10}>
        <SpinbuttonLabel>Adults</SpinbuttonLabel>
        <SpinbuttonDecrement aria-label="Decrease">−</SpinbuttonDecrement>
        <SpinbuttonInput />
        <SpinbuttonIncrement aria-label="Increase">+</SpinbuttonIncrement>
      </Spinbutton>
      <button type="button">After</button>
    </div>
  );
}
