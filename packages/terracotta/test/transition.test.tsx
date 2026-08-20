import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { Transition, TransitionChild } from '../src';

const CLASSES = {
  enter: 'enter',
  enterFrom: 'enter-from',
  enterTo: 'enter-to',
  entered: 'entered',
  leave: 'leave',
  leaveFrom: 'leave-from',
  leaveTo: 'leave-to',
};

/** Transition advances its class swap inside `requestAnimationFrame`. */
async function nextFrame(): Promise<void> {
  await new Promise<void>((resolve) => {
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
      <Transition show {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    expect(panel).toHaveClass('enter', 'enter-from');
    expect(panel).not.toHaveClass('enter-to');
    expect(panel).toHaveAttribute('tc-transition', 'enter-from');
  });

  it('swaps enter-from for enter-to on the next frame', async () => {
    render(() => (
      <Transition show {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();

    expect(panel).not.toHaveClass('enter-from');
    expect(panel).toHaveClass('enter', 'enter-to');
    expect(panel).toHaveAttribute('tc-transition', 'enter-to');
  });

  it('settles into the entered class once the transition ends', async () => {
    render(() => (
      <Transition show {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();
    fireEvent.transitionEnd(panel);

    expect(panel).not.toHaveClass('enter', 'enter-to');
    expect(panel).toHaveClass('entered');
    expect(panel).toHaveAttribute('tc-transition', 'entered');
  });

  it('accepts an animation ending the transition too', async () => {
    render(() => (
      <Transition show {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();
    fireEvent.animationEnd(panel);

    expect(panel).toHaveClass('entered');
  });

  it('calls beforeEnter before the classes go on, and afterEnter at the end', async () => {
    const beforeEnter = vi.fn();
    const afterEnter = vi.fn();
    render(() => (
      <Transition
        show
        beforeEnter={() => {
          beforeEnter();
        }}
        afterEnter={() => {
          afterEnter();
        }}
        {...CLASSES}
      >
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    expect(beforeEnter).toHaveBeenCalled();
    expect(afterEnter).not.toHaveBeenCalled();

    await nextFrame();
    fireEvent.transitionEnd(panel);

    expect(afterEnter).toHaveBeenCalled();
  });

  it('applies the leave classes and keeps the element mounted meanwhile', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await nextFrame();
    fireEvent.transitionEnd(panel);

    setShow(false);

    expect(panel).toBeInTheDocument();
    expect(panel).not.toHaveClass('entered');
    expect(panel).toHaveClass('leave', 'leave-from');
    expect(panel).toHaveAttribute('tc-transition', 'leave-from');

    await nextFrame();

    expect(panel).not.toHaveClass('leave-from');
    expect(panel).toHaveClass('leave', 'leave-to');
    expect(panel).toHaveAttribute('tc-transition', 'leave-to');
  });

  it('unmounts only once the leave transition ends', async () => {
    const [show, setShow] = createSignal(true);
    const afterLeave = vi.fn();
    render(() => (
      <Transition
        show={show()}
        afterLeave={() => {
          afterLeave();
        }}
        {...CLASSES}
      >
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');
    await nextFrame();
    fireEvent.transitionEnd(panel);

    setShow(false);
    await nextFrame();

    expect(screen.getByText('Panel')).toBeInTheDocument();
    expect(afterLeave).not.toHaveBeenCalled();

    fireEvent.transitionEnd(panel);

    expect(screen.queryByText('Panel')).not.toBeInTheDocument();
    expect(afterLeave).toHaveBeenCalled();
  });

  it('calls beforeLeave as the leave starts', async () => {
    const [show, setShow] = createSignal(true);
    const beforeLeave = vi.fn();
    render(() => (
      <Transition
        show={show()}
        beforeLeave={() => {
          beforeLeave();
        }}
        {...CLASSES}
      >
        Panel
      </Transition>
    ));
    await nextFrame();

    expect(beforeLeave).not.toHaveBeenCalled();

    setShow(false);

    expect(beforeLeave).toHaveBeenCalled();
  });

  it('re-runs the enter transition on a later show', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()} unmount={false} {...CLASSES}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();
    fireEvent.transitionEnd(panel);
    setShow(false);
    await nextFrame();
    fireEvent.transitionEnd(panel);

    setShow(true);

    // The element was never unmounted, so the enter has to be armed again by
    // the leave finishing rather than by a fresh mount.
    expect(panel).toHaveClass('enter', 'enter-from');
  });

  it('does not restart the enter transition when a class prop changes', async () => {
    const [enter, setEnter] = createSignal('enter');
    render(() => (
      <Transition show {...CLASSES} enter={enter()}>
        Panel
      </Transition>
    ));
    const panel = screen.getByText('Panel');

    await nextFrame();
    fireEvent.transitionEnd(panel);
    expect(panel).toHaveClass('entered');

    // `props.enter` is read on the enter path, so this re-runs the effect.
    setEnter('enter-slow');

    expect(panel).toHaveClass('entered');
    expect(panel).not.toHaveClass('enter-from');
  });

  it('renders as another element when asked', () => {
    render(() => (
      <Transition as="section" show {...CLASSES}>
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
        <TransitionChild {...CLASSES}>Child</TransitionChild>
      </Transition>
    ));
    const child = screen.getByText('Child');

    expect(child).toHaveClass('enter', 'enter-from');
  });

  it('stays mounted until its own leave transition ends', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Transition show={show()}>
        <TransitionChild {...CLASSES}>Child</TransitionChild>
      </Transition>
    ));
    const child = screen.getByText('Child');
    await nextFrame();
    fireEvent.transitionEnd(child);

    setShow(false);
    await nextFrame();

    expect(screen.getByText('Child')).toBeInTheDocument();

    fireEvent.transitionEnd(child);

    expect(screen.queryByText('Child')).not.toBeInTheDocument();
  });

  it('requires a surrounding Transition', () => {
    expect(() => render(() => <TransitionChild>Orphan</TransitionChild>)).toThrow(MISSING_ROOT);
  });
});
