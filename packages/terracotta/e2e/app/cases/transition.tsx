import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';
import { Transition } from 'terracotta/transition';

// A slow fade, so a spec can observe the leave phase rather than race it.
const STYLES = `
  .fade { transition: opacity 600ms linear; }
  .fade-from { opacity: 0; }
  .fade-to { opacity: 1; }
`;

export default function TransitionCase(): JSX.Element {
  const [show, setShow] = createSignal(true);
  // A settled-state marker, so a spec can wait for a transition to finish
  // instead of sleeping for the fade.
  const [lifecycle, setLifecycle] = createSignal('entering');

  return (
    <div>
      <style>{STYLES}</style>
      <button
        type="button"
        data-testid="toggle"
        onClick={() => {
          setShow((value) => !value);
        }}
      >
        Toggle
      </button>
      <Transition
        show={show()}
        appear
        unmount={false}
        data-testid="panel"
        afterEnter={() => {
          setLifecycle('entered');
        }}
        beforeLeave={() => {
          setLifecycle('leaving');
        }}
        afterLeave={() => {
          setLifecycle('left');
        }}
        beforeEnter={() => {
          setLifecycle('entering');
        }}
        enter="fade"
        enterFrom="fade-from"
        enterTo="fade-to"
        leave="fade"
        leaveFrom="fade-to"
        leaveTo="fade-from"
      >
        <Button data-testid="inside">Inside</Button>
      </Transition>
      <button type="button" data-testid="after">
        After
      </button>
      <div data-testid="lifecycle">{lifecycle()}</div>
    </div>
  );
}
