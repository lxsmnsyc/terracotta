import type { JSX } from '@solidjs/web';
import {
  Spinbutton,
  SpinbuttonDecrement,
  SpinbuttonIncrement,
  SpinbuttonInput,
  SpinbuttonLabel,
} from 'terracotta/spinbutton';

/**
 * Only the field takes focus. The buttons step the value without moving focus
 * out of the field, and the arrow keys do the same.
 */
export default function BasicSpinbutton(): JSX.Element {
  return (
    <div class="stack">
      <Spinbutton class="spinbutton" defaultValue={2} min={1} max={8}>
        <SpinbuttonLabel class="spinbutton-label">Adults</SpinbuttonLabel>
        <div class="spinbutton-group">
          <SpinbuttonDecrement class="spinbutton-button" aria-label="Fewer adults">
            −
          </SpinbuttonDecrement>
          <SpinbuttonInput class="spinbutton-input" />
          <SpinbuttonIncrement class="spinbutton-button" aria-label="More adults">
            +
          </SpinbuttonIncrement>
        </div>
      </Spinbutton>
      <p class="hint">
        <kbd>↑</kbd> and <kbd>↓</kbd> step, <kbd>Home</kbd> and <kbd>End</kbd> jump to the limits.
      </p>
    </div>
  );
}
