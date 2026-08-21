import { fireEvent, render, screen } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { createMemo, createSignal, Loading } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { settle } from './aria';
import { Dialog, DialogPanel } from '../src/components/dialog';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../src/components/disclosure';
import { Transition } from '../src/components/transition';

const CLASSES = {
  enter: 'enter',
  enterFrom: 'enter-from',
  enterTo: 'enter-to',
  entered: 'entered',
  leave: 'leave',
  leaveFrom: 'leave-from',
  leaveTo: 'leave-to',
};

/**
 * An async read that resolves when the test says so, so each assertion can be
 * made at a known point: while the boundary is still held back, or after it has
 * resolved.
 *
 * A memo with an async compute is Solid 2's suspending read — it throws while
 * the promise is outstanding, and the nearest `Loading` catches that.
 */
function gate(): { read: () => string | undefined; resolve: () => void } {
  let settleGate!: () => void;
  const promise = new Promise<string>((resolvePromise) => {
    settleGate = (): void => {
      resolvePromise('loaded');
    };
  });
  const read = createMemo<string>(async (): Promise<string> => promise);
  return { read, resolve: settleGate };
}

/** The element the transition is driving, or `null` once it has unmounted. */
function transitioned(): Element | null {
  return document.body.querySelector('[tc-transition]');
}

function state(): string | null | undefined {
  return transitioned()?.getAttribute('tc-transition');
}

describe('Suspense and Transition', () => {
  it('transitions the wrapper while the content inside it is still loading', async () => {
    const content = gate();

    render(() => (
      <Transition show {...CLASSES}>
        <Loading fallback={<span data-testid="fallback">loading</span>}>
          <span data-testid="content">{content.read()}</span>
        </Loading>
      </Transition>
    ));

    await settle();

    // The transition is on the wrapper, so it runs on its own schedule and is
    // done before the resource is.
    expect(state()).toBe('entered');
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    content.resolve();
    await settle();

    // Swapping the fallback for the content leaves the transition alone.
    expect(state()).toBe('entered');
    expect(screen.getByTestId('content')).toHaveTextContent('loaded');
  });

  it('runs the transition once a boundary above it resolves', async () => {
    const content = gate();

    render(() => (
      <Loading fallback={<span data-testid="fallback">loading</span>}>
        <Transition show {...CLASSES}>
          <span data-testid="content">{content.read()}</span>
        </Transition>
      </Loading>
    ));

    await settle();

    // Suspended, the transitioning element is not in the document at all, so
    // there is nothing to animate yet.
    expect(transitioned()).toBeNull();
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    content.resolve();
    await settle();

    // Solid holds back the effects created under a suspended boundary. The
    // transition picks up where it left off rather than staying unstarted.
    expect(state()).toBe('entered');
    expect(screen.getByTestId('content')).toHaveTextContent('loaded');
  });

  it('unmounts cleanly when it is hidden before the content arrives', async () => {
    const content = gate();
    const [show, setShow] = createSignal(true);

    render(() => (
      <Transition show={show()} {...CLASSES}>
        <Loading fallback={<span data-testid="fallback">loading</span>}>
          <span data-testid="content">{content.read()}</span>
        </Loading>
      </Transition>
    ));

    await settle();
    setShow(false);
    await settle();

    // The leave transition does not wait on the resource, and takes the
    // pending boundary with it.
    expect(transitioned()).toBeNull();
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

    content.resolve();
    await settle();

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });
});

describe('Suspense and disclosures', () => {
  function AsyncDisclosure(props: { content: { read: () => string | undefined } }): JSX.Element {
    return (
      <Disclosure defaultOpen>
        {({ isOpen }): JSX.Element => (
          <>
            <DisclosureButton>Toggle</DisclosureButton>
            <Transition show={isOpen()} {...CLASSES}>
              <DisclosurePanel unmount={false}>
                <Loading fallback={<span data-testid="fallback">loading</span>}>
                  <span data-testid="content">{props.content.read()}</span>
                </Loading>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  }

  it('opens a transitioned panel whose content has not loaded yet', async () => {
    const content = gate();

    render(() => <AsyncDisclosure content={content} />);

    await settle();

    expect(state()).toBe('entered');
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    content.resolve();
    await settle();

    expect(state()).toBe('entered');
    expect(screen.getByTestId('content')).toHaveTextContent('loaded');
  });

  it('opens a panel that a suspended boundary is holding back', async () => {
    const content = gate();

    render(() => (
      <Disclosure defaultOpen>
        {({ isOpen }): JSX.Element => (
          <>
            <DisclosureButton>Toggle</DisclosureButton>
            <Loading fallback={<span data-testid="fallback">loading</span>}>
              <Transition show={isOpen()} {...CLASSES}>
                <DisclosurePanel unmount={false} data-testid="panel">
                  <span data-testid="content">{content.read()}</span>
                </DisclosurePanel>
              </Transition>
            </Loading>
          </>
        )}
      </Disclosure>
    ));

    await settle();

    // The panel is built under the suspended boundary, so neither it nor the
    // transition around it is in the document yet.
    expect(transitioned()).toBeNull();
    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    content.resolve();
    await settle();

    // Everything the boundary held back arrives at once, transition included:
    // the panel is mounted and the transition has taken it through to the end.
    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(state()).toBe('entered');
    expect(screen.getByTestId('content')).toHaveTextContent('loaded');

    // The disclosure still drives it once it is here.
    fireEvent.click(screen.getByText('Toggle'));
    await settle();

    expect(transitioned()).toBeNull();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('closes a transitioned panel while its content is still loading', async () => {
    const content = gate();

    render(() => <AsyncDisclosure content={content} />);

    await settle();
    fireEvent.click(screen.getByText('Toggle'));
    await settle();

    // `unmount={false}` on the panel keeps it alive for the leave transition,
    // and the transition then removes it, pending resource and all.
    expect(transitioned()).toBeNull();
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

    content.resolve();
    await settle();

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });
});

describe('Suspense and panel focus', () => {
  it('does not move focus into a panel whose content is still loading', async () => {
    const content = gate();

    render(() => (
      <Dialog isOpen>
        <DialogPanel>
          <Loading fallback={<span data-testid="fallback">loading</span>}>
            <button type="button" data-testid="async">
              {content.read()}
            </button>
          </Loading>
        </DialogPanel>
      </Dialog>
    ));

    await settle();

    // A panel looks for something to focus once, as it opens. The fallback
    // holds nothing focusable, so there is nothing to move to.
    expect(document.activeElement).toBe(document.body);

    content.resolve();
    await settle();

    // The button that arrives with the resource does not get focus either: no
    // second look is taken. The WAI-ARIA dialog pattern asks for focus inside
    // the dialog when it opens, so an async panel is left outside it.
    expect(screen.getByTestId('async')).toBeInTheDocument();
    expect(document.activeElement).toBe(document.body);
  });

  it('focuses a panel that arrives with the boundary it was behind', async () => {
    const content = gate();

    render(() => (
      <Dialog isOpen>
        <Loading fallback={<span data-testid="fallback">loading</span>}>
          <Transition show {...CLASSES}>
            <DialogPanel>
              <button type="button" data-testid="async">
                {content.read()}
              </button>
            </DialogPanel>
          </Transition>
        </Loading>
      </Dialog>
    ));

    await settle();

    expect(document.activeElement).toBe(document.body);

    content.resolve();
    await settle();

    // The panel is built once the boundary resolves, so its one look for
    // something to focus happens with the content already in place.
    expect(state()).toBe('entered');
    expect(document.activeElement).toBe(screen.getByTestId('async'));
  });

  it('does not focus a panel behind a boundary, even with the value resolved', async () => {
    const content = gate();
    content.resolve();
    await settle();

    render(() => (
      <Dialog isOpen>
        <DialogPanel>
          <Loading fallback={<span data-testid="fallback">loading</span>}>
            <button type="button" data-testid="async">
              {content.read()}
            </button>
          </Loading>
        </DialogPanel>
      </Dialog>
    ));

    await settle();

    // An async read always defers, settled or not, so the boundary shows its
    // fallback for the render the panel takes its one look at. Resolving the
    // value before mounting does not buy the panel anything: hoisting the
    // boundary above the `Dialog` is what does, as the case above shows.
    expect(screen.getByTestId('async')).toHaveTextContent('loaded');
    expect(document.activeElement).toBe(document.body);
  });
});
