import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';
import { Transition } from 'terracotta/transition';

// A slow fade, so a spec can sample frames while the panel is entering.
const STYLES = `
  .fade { transition: opacity 600ms linear; }
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

export default function PopoverTransitionCase(): JSX.Element {
  const [bare, setBare] = createSignal(false);

  return (
    <div>
      <style>{STYLES}</style>

      {/* No popover involved: a transition on its own, mounted on show. */}
      <button
        type="button"
        data-testid="bare-button"
        onClick={() => {
          setBare((value) => !value);
        }}
      >
        Bare
      </button>
      <Transition show={bare()} data-testid="bare-panel" {...CLASSES}>
        <Button data-testid="bare-inside">Inside</Button>
      </Transition>

      {/* The documented shape: the transition owns the mounting, the panel stays put. */}
      <Popover defaultOpen={false}>
        {({ isOpen }): JSX.Element => (
          <>
            <PopoverButton data-testid="wrapped-button">Wrapped</PopoverButton>
            <Transition show={isOpen()} data-testid="wrapped-transition" {...CLASSES}>
              <PopoverPanel unmount={false} data-testid="wrapped-panel">
                <Button data-testid="wrapped-inside">Inside</Button>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>

      {/* The same thing, but the panel is removed while closed. */}
      <Popover defaultOpen={false}>
        {({ isOpen }): JSX.Element => (
          <>
            <PopoverButton data-testid="unmounting-button">Unmounting</PopoverButton>
            <Transition
              show={isOpen()}
              as={PopoverPanel}
              data-testid="unmounting-panel"
              {...CLASSES}
            >
              <Button data-testid="unmounting-inside">Inside</Button>
            </Transition>
          </>
        )}
      </Popover>

      {/* The same thing as one element. */}
      <Popover defaultOpen={false}>
        {({ isOpen }): JSX.Element => (
          <>
            <PopoverButton data-testid="polymorphic-button">Polymorphic</PopoverButton>
            <Transition
              show={isOpen()}
              as={PopoverPanel}
              unmount={false}
              data-testid="polymorphic-panel"
              {...CLASSES}
            >
              <Button data-testid="polymorphic-inside">Inside</Button>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
