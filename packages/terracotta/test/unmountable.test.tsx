import { render, screen } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { settle } from './aria';
import { Dialog, Popover, PopoverButton, PopoverPanel, Transition, TransitionChild } from '../src';
import type { UnmountableProps } from '../src/utils/create-unmountable';
import { createUnmountable } from '../src/utils/create-unmountable';

/**
 * `unmount` decides what happens to the children of a hidden disclosure, and
 * the three modes differ in what survives: `true` throws the subtree away,
 * `false` leaves it in the document, and `'offscreen'` keeps it alive but
 * detached, so whatever state it holds is still there when it comes back.
 */
function setup(mode?: boolean | 'offscreen'): {
  show: (value: boolean) => void;
  builds: () => number;
  disposals: () => number;
} {
  let builds = 0;
  let disposals = 0;
  const [shown, setShown] = createSignal(true);

  function Body(): JSX.Element {
    builds += 1;
    onCleanup(() => {
      disposals += 1;
    });
    return <div data-testid="body">body</div>;
  }

  function Harness(props: UnmountableProps): JSX.Element {
    return createUnmountable(props, shown, () => <Body />);
  }

  render(() => <Harness unmount={mode} />);

  return {
    show: (value: boolean): void => {
      setShown(value);
    },
    builds: () => builds,
    disposals: () => disposals,
  };
}

const mounted = (): boolean => screen.queryByTestId('body') !== null;

describe('createUnmountable', () => {
  it.each([undefined, true] as const)(
    'removes and rebuilds the children with unmount=%s',
    (mode) => {
      const harness = setup(mode);
      expect(mounted()).toBe(true);

      harness.show(false);

      expect(mounted()).toBe(false);
      expect(harness.disposals()).toBe(1);

      harness.show(true);

      // A fresh subtree: whatever the old one held is gone.
      expect(mounted()).toBe(true);
      expect(harness.builds()).toBe(2);
    },
  );

  it('keeps the children in the document with unmount={false}', () => {
    const harness = setup(false);

    harness.show(false);

    expect(mounted()).toBe(true);
    expect(harness.disposals()).toBe(0);
    expect(harness.builds()).toBe(1);
  });

  it('detaches the children but keeps them alive with unmount="offscreen"', () => {
    const harness = setup('offscreen');
    const first = screen.getByTestId('body');

    harness.show(false);

    expect(mounted()).toBe(false);
    // Detached, not disposed — the subtree was never torn down.
    expect(harness.disposals()).toBe(0);

    harness.show(true);

    expect(harness.builds()).toBe(1);
    expect(screen.getByTestId('body')).toBe(first);
  });

  it('keeps running the effects of a detached offscreen subtree', () => {
    const [shown, setShown] = createSignal(true);
    const [tick, setTick] = createSignal(0);
    let runs = 0;

    render(() =>
      createUnmountable({ unmount: 'offscreen' }, shown, () => {
        createEffect(() => {
          tick();
          runs += 1;
        });
        return <div data-testid="body">body</div>;
      }),
    );

    expect(runs).toBe(1);

    setShown(false);
    setTick(1);

    // Detached is not disposed, so the subtree keeps reacting to its sources
    // while nothing of it is on screen. Documented as the cost of the mode.
    expect(mounted()).toBe(false);
    expect(runs).toBe(2);
  });
});

describe('offscreen panels', () => {
  it('reuses the same element across a close and reopen', () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverButton data-testid="button">Toggle</PopoverButton>
        <PopoverPanel unmount="offscreen" data-testid="panel">
          Body
        </PopoverPanel>
      </Popover>
    ));
    const first = screen.getByTestId('panel');

    screen.getByTestId('button').click();
    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();

    screen.getByTestId('button').click();

    expect(screen.getByTestId('panel')).toBe(first);
  });

  it('transitions an offscreen child that is the only child of a Dialog', async () => {
    render(() => (
      <Transition show>
        <Dialog isOpen unmount={false}>
          <TransitionChild
            unmount="offscreen"
            data-testid="target"
            enter="enter"
            enterFrom="enter-from"
            enterTo="enter-to"
            entered="entered"
            leave="leave"
            leaveFrom="leave-from"
            leaveTo="leave-to"
          >
            Body
          </TransitionChild>
        </Dialog>
      </Transition>
    ));
    await settle();

    expect(screen.getByTestId('target')).toHaveClass('entered');
  });
});
