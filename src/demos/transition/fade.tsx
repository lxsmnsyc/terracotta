import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Transition } from 'terracotta/transition';

export default function FadeTransition(): JSX.Element {
  const [show, setShow] = createSignal(true);

  return (
    <div class="stack">
      <button type="button" class="button" onClick={() => setShow((value) => !value)}>
        {show() ? 'Hide' : 'Show'}
      </button>

      <Transition
        show={show()}
        enter="fade-enter"
        enterFrom="fade-from"
        enterTo="fade-to"
        leave="fade-leave"
        leaveFrom="fade-to"
        leaveTo="fade-from"
      >
        <div class="transition-box">
          The element stays mounted until the leave transition has finished.
        </div>
      </Transition>
    </div>
  );
}
