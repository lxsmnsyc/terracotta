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
 * The transition advances its class swap inside `requestAnimationFrame`.
 *
 * There is no `transitionend` to fire here: the implementation measures the
 * element, finds no CSS duration, and settles in a single frame rather than
 * waiting for an event that would never arrive. So these tests assert the
 * start and end states and the callback order, not an intermediate `enter-to`
 * step that only exists while a real animation is running.
 */
function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

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

  it('settles into the entered class on the next frame', async () => {
    render(() => (
      <Transition show appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();

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

    await nextFrame();

    expect(afterEnter).toHaveBeenCalled();
  });

  it('applies the leave classes before the first frame', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} appear {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await nextFrame();

    setShow(false);
    flush();
    // The leave waits on `waitForTransition`, so its classes land a microtask
    // later rather than in the same tick as the signal write.
    await Promise.resolve();
    // `tc-transition` is written from a signal, so it needs one more flush to
    // reach the DOM after the classes have gone on.
    flush();

    expect(panel).toBeInTheDocument();
    // `entered` is left in place through the leave rather than removed first,
    // so leave classes have to be specific enough to override it.
    expect(panel).toHaveClass('leave', 'leave-from');
    expect(panel).toHaveAttribute('tc-transition', 'leave-from');
  });

  it('stays mounted for the leave, then unmounts', async () => {
    const [show, setShow] = createSignal(true);
    const afterLeave = vi.fn<() => void>();
    render(() => (
      <Transition show={show()} appear afterLeave={afterLeave} {...CLASSES}>
        Panel
      </Transition>
    ));
    await nextFrame();

    setShow(false);

    flush();

    expect(screen.getByText('Panel')).toBeInTheDocument();
    expect(afterLeave).not.toHaveBeenCalled();

    await nextFrame();

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
    await nextFrame();

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
    await nextFrame();
    setShow(false);
    flush();
    await nextFrame();

    setShow(true);

    flush();

    expect(panel).toHaveClass('enter', 'enter-from');
  });

  it('does not restart the enter transition when a class prop changes', async () => {
    const [enter, setEnter] = createSignal('enter');
    render(() => (
      <Transition show appear {...CLASSES} enter={enter()}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await nextFrame();
    expect(panel).toHaveClass('entered');

    setEnter('enter-slow');

    flush();

    expect(panel).toHaveClass('entered');
    expect(panel).not.toHaveClass('enter-from');
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
    await nextFrame();

    setShow(false);

    flush();

    expect(screen.getByText('Child')).toBeInTheDocument();

    await nextFrame();

    expect(screen.queryByText('Child')).not.toBeInTheDocument();
  });

  it('requires a surrounding Transition', () => {
    expect(() => render(() => <TransitionChild>Orphan</TransitionChild>)).toThrow(MISSING_ROOT);
  });
});
