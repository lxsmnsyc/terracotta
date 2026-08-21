import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { Transition, TransitionChild } from 'terracotta/transition';

// Two children of one transition, on the same deliberately slow fade: a
// sibling that lags is then a whole fade behind, which a spec can catch with a
// short timeout rather than a sampled screenshot.
const STYLES = `
  .fade { transition: opacity 1200ms linear; }
  .fade-from { opacity: 0; }
  .fade-to { opacity: 1; }
`;

const CLASSES = {
  enter: 'fade',
  enterFrom: 'fade-from',
  enterTo: 'fade-to',
  leave: 'fade',
  leaveFrom: 'fade-to',
  leaveTo: 'fade-from',
};

export default function TransitionGroupCase(): JSX.Element {
  const [show, setShow] = createSignal(false);

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
      {/* The children mount as part of the enter, which is what puts a style
          read between one sibling applying its classes and the next. */}
      <Transition show={show()}>
        <TransitionChild data-testid="first" {...CLASSES}>
          First
        </TransitionChild>
        <TransitionChild data-testid="second" {...CLASSES}>
          Second
        </TransitionChild>
      </Transition>
    </div>
  );
}
