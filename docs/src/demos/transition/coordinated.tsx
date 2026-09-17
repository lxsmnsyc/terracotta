import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Transition, TransitionChild } from 'terracotta/transition';

/**
 * One `show` flag, several elements, different timings. `TransitionChild`
 * shares the parent's state instead of tracking its own.
 */
export default function CoordinatedTransition(): JSX.Element {
  const [show, setShow] = createSignal(false);

  return (
    <div class="stack">
      <button type="button" class="button" onClick={() => setShow((value) => !value)}>
        {show() ? 'Close' : 'Open'}
      </button>

      <Transition show={show()}>
        <div class="transition-stage">
          <TransitionChild
            enter="fade-enter"
            enterFrom="fade-from"
            enterTo="fade-to"
            leave="fade-leave"
            leaveFrom="fade-to"
            leaveTo="fade-from"
          >
            <div class="transition-backdrop" />
          </TransitionChild>

          <TransitionChild
            enter="slide-enter"
            enterFrom="slide-from"
            enterTo="slide-to"
            leave="slide-leave"
            leaveFrom="slide-to"
            leaveTo="slide-from"
          >
            <div class="transition-card">The card arrives after the backdrop.</div>
          </TransitionChild>
        </div>
      </Transition>
    </div>
  );
}
