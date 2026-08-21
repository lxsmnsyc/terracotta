import { render, screen } from '@solidjs/testing-library';
import { createSignal, flush } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { Transition, TransitionChild } from '../src/components/transition';

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
 * The transition drives its class swap off `waitForTransition`, which resolves
 * on a microtask once the element has no running animation.
 *
 * There is no `transitionend` to fire here: with no animation to wait on, each
 * step settles on its own. So these tests assert the start and end states and
 * the callback order, not an intermediate `enter-to` step that only exists
 * while a real animation is running.
 */
async function settle(): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Advancing the transition is written out at each site rather than wrapped in a
 * helper, because awaiting a helper costs a microtask of its own and that extra
 * tick lands mid-phase.
 *
 * A phase costs two microtasks with nothing animating: one for the yield the
 * state takes before it reads the element's animations, and one for resuming
 * the step. A leave opens with one microtask instead, for the `Promise.all`
 * that lets any nested children leave first. `tc-transition` is written from a
 * signal on top of that, so the attribute only reaches the DOM on the flush
 * that follows.
 */

const MISSING_ROOT = /must be used inside a <Transition>/;

describe('Transition', () => {
  it('renders nothing while hidden', () => {
    render(() => (
      <Transition show={false} {...CLASSES}>
        Panel
      </Transition>
    ));

    expect(screen.queryByText('Panel')).not.toBeInTheDocument();
  });

  it('keeps the element mounted but hidden when `unmount` is false', () => {
    render(() => (
      <Transition show={false} unmount={false} {...CLASSES}>
        Panel
      </Transition>
    ));

    expect(screen.getByText('Panel')).toBeInTheDocument();
  });

  it('applies the enter classes before the first frame', () => {
    render(() => (
      <Transition show appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    expect(panel).toHaveClass('enter', 'enter-from');
    expect(panel).not.toHaveClass('entered');
    expect(panel).toHaveAttribute('tc-transition', 'enter-from');
  });

  it('swaps enter-from for enter-to once the element has nothing left to animate', async () => {
    render(() => (
      <Transition show appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await Promise.resolve();
    await Promise.resolve();
    flush();

    expect(panel).not.toHaveClass('enter-from');
    expect(panel).toHaveClass('enter', 'enter-to');
    expect(panel).toHaveAttribute('tc-transition', 'enter-to');
  });

  it('settles into the entered class', async () => {
    render(() => (
      <Transition show appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await settle();

    expect(panel).not.toHaveClass('enter', 'enter-from');
    expect(panel).toHaveClass('entered');
    expect(panel).toHaveAttribute('tc-transition', 'entered');
  });

  it('calls beforeEnter before the classes go on, and afterEnter at the end', async () => {
    const beforeEnter = vi.fn<() => void>();
    const afterEnter = vi.fn<() => void>();
    render(() => (
      <Transition show appear beforeEnter={beforeEnter} afterEnter={afterEnter} {...CLASSES}>
        Panel
      </Transition>
    ));

    expect(beforeEnter).toHaveBeenCalled();
    expect(afterEnter).not.toHaveBeenCalled();

    await settle();

    expect(afterEnter).toHaveBeenCalled();
  });

  it('applies the leave classes while the element is still mounted', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await settle();

    setShow(false);
    flush();
    // The leave waits on `waitForTransition`, so its classes land a step later
    // rather than in the same tick as the signal write.
    await Promise.resolve();
    flush();

    expect(panel).toBeInTheDocument();
    expect(panel).not.toHaveClass('entered');
    expect(panel).toHaveClass('leave', 'leave-from');
    expect(panel).toHaveAttribute('tc-transition', 'leave-from');

    await Promise.resolve();
    await Promise.resolve();
    flush();

    expect(panel).not.toHaveClass('leave-from');
    expect(panel).toHaveClass('leave', 'leave-to');
    expect(panel).toHaveAttribute('tc-transition', 'leave-to');
  });

  it('stays mounted for the leave, then unmounts', async () => {
    const [show, setShow] = createSignal(true);
    const afterLeave = vi.fn<() => void>();
    render(() => (
      <Transition show={show()} appear afterLeave={afterLeave} {...CLASSES}>
        Panel
      </Transition>
    ));
    await settle();

    setShow(false);
    flush();

    expect(screen.getByText('Panel')).toBeInTheDocument();
    expect(afterLeave).not.toHaveBeenCalled();

    await settle();

    expect(screen.queryByText('Panel')).not.toBeInTheDocument();
    expect(afterLeave).toHaveBeenCalled();
  });

  it('calls beforeLeave as the leave starts', async () => {
    const [show, setShow] = createSignal(true);
    const beforeLeave = vi.fn<() => void>();
    render(() => (
      <Transition show={show()} appear beforeLeave={beforeLeave} {...CLASSES}>
        Panel
      </Transition>
    ));
    await settle();

    expect(beforeLeave).not.toHaveBeenCalled();

    setShow(false);
    flush();

    expect(beforeLeave).toHaveBeenCalled();
  });

  it('re-runs the enter transition on a later show', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} appear unmount={false} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await settle();
    setShow(false);
    flush();
    await settle();

    setShow(true);
    flush();

    expect(panel).toHaveClass('enter', 'enter-from');
  });

  it('runs the enter transition again after unmounting and remounting', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} appear {...CLASSES}>
        Panel
      </Transition>
    ));
    await settle();
    setShow(false);
    flush();
    await settle();
    expect(screen.queryByText('Panel')).not.toBeInTheDocument();

    setShow(true);
    flush();

    // The element that mounts is a new one, so the transition has to run
    // against it rather than the detached element the ref still held.
    expect(screen.getByText('Panel')).toHaveClass('enter', 'enter-from');

    await settle();

    expect(screen.getByText('Panel')).toHaveClass('entered');
  });

  it('does not restart the enter transition when a class prop changes', async () => {
    const [enter, setEnter] = createSignal('enter');
    render(() => (
      <Transition show appear {...CLASSES} enter={enter()}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await settle();
    expect(panel).toHaveClass('entered');

    setEnter('enter-slow');
    flush();

    expect(panel).toHaveClass('entered');
    expect(panel).not.toHaveClass('enter-from');
  });

  // jsdom has no `inert` support, so nothing here is actually made
  // non-interactive: the assertions check that the attribute is written, and
  // the browser-level behaviour is covered by `e2e/specs/transition.spec.ts`.
  it('marks an element that is mounted but hidden as inert', () => {
    render(() => (
      <Transition show={false} unmount={false} {...CLASSES}>
        Panel
      </Transition>
    ));

    expect(screen.getByText('Panel')).toHaveAttribute('inert');
  });

  it('stays interactive while entering and once entered', async () => {
    render(() => (
      <Transition show appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    expect(panel).not.toHaveAttribute('inert');

    await settle();

    expect(panel).not.toHaveAttribute('inert');
  });

  it('goes inert while leaving and stays inert once hidden', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} appear unmount={false} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await settle();

    setShow(false);
    flush();
    await Promise.resolve();
    flush();

    expect(panel).toHaveAttribute('inert');

    await settle();

    expect(panel).toHaveAttribute('inert');
  });

  it('reverses a leave that is still running', async () => {
    const [show, setShow] = createSignal(true);
    const afterLeave = vi.fn<() => void>();
    render(() => (
      <Transition show={show()} appear afterLeave={afterLeave} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await settle();

    setShow(false);
    flush();
    await Promise.resolve();
    flush();
    expect(panel).toHaveAttribute('tc-transition', 'leave-from');

    setShow(true);
    flush();

    // The leave stops where it is instead of finishing and unmounting.
    expect(panel).toHaveAttribute('tc-transition', 'enter-from');
    expect(panel).not.toHaveClass('leave', 'leave-from', 'leave-to');
    expect(panel).not.toHaveAttribute('inert');

    await settle();

    expect(afterLeave).not.toHaveBeenCalled();
    expect(screen.getByText('Panel')).toHaveClass('entered');
  });

  it('reverses an enter that is still running', async () => {
    const [show, setShow] = createSignal(true);
    const afterEnter = vi.fn<() => void>();
    render(() => (
      <Transition show={show()} appear afterEnter={afterEnter} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    expect(panel).toHaveAttribute('tc-transition', 'enter-from');

    setShow(false);
    flush();
    // The leave starts by letting any nested children leave first, so its own
    // classes land a step later.
    await Promise.resolve();
    flush();

    expect(panel).toHaveAttribute('tc-transition', 'leave-from');
    expect(panel).not.toHaveClass('enter', 'enter-from', 'enter-to');
    expect(panel).toHaveAttribute('inert');

    await settle();

    expect(afterEnter).not.toHaveBeenCalled();
    expect(screen.queryByText('Panel')).not.toBeInTheDocument();
  });

  it('renders as another element when asked', () => {
    render(() => (
      <Transition as="section" show appear {...CLASSES}>
        Panel
      </Transition>
    ));

    expect(screen.getByText('Panel').tagName).toBe('SECTION');
  });
});

describe('TransitionChild', () => {
  it('follows the parent transition rather than its own show prop', () => {
    render(() => (
      <Transition show>
        <TransitionChild appear {...CLASSES}>
          Child
        </TransitionChild>
      </Transition>
    ));

    expect(screen.getByText('Child')).toHaveClass('enter', 'enter-from');
  });

  it('stays mounted for its own leave, then unmounts', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()}>
        <TransitionChild appear {...CLASSES}>
          Child
        </TransitionChild>
      </Transition>
    ));
    await settle();

    setShow(false);
    flush();

    expect(screen.getByText('Child')).toBeInTheDocument();

    await settle();

    expect(screen.queryByText('Child')).not.toBeInTheDocument();
  });

  it('goes inert when the transition leaves', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} unmount={false}>
        <TransitionChild appear unmount={false} {...CLASSES}>
          Child
        </TransitionChild>
      </Transition>
    ));
    const child = screen.getByText('Child');
    await settle();

    expect(child).not.toHaveAttribute('inert');

    setShow(false);
    flush();
    await settle();

    expect(child).toHaveAttribute('inert');
  });

  it('requires a surrounding Transition', () => {
    expect(() => render(() => <TransitionChild>Orphan</TransitionChild>)).toThrow(MISSING_ROOT);
  });
});
