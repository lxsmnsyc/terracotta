import { fireEvent, render, screen } from '@solidjs/testing-library';
import { flush } from 'solid-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Dialog, DialogPanel, DialogTitle } from '../src/components/dialog';
import { Tooltip, TooltipPanel, TooltipTrigger } from '../src/components/tooltip';

function renderTooltip(props: { open?: boolean; disabled?: boolean } = {}): void {
  render(() => (
    <Tooltip defaultOpen={props.open ?? false} disabled={props.disabled} openDelay={300}>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipPanel>Saves the file</TooltipPanel>
    </Tooltip>
  ));
}

function getTrigger(): HTMLElement {
  return screen.getByRole('button', { name: 'Save' });
}

describe('Tooltip accessibility', () => {
  it('renders nothing while closed', () => {
    renderTooltip();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(getTrigger()).not.toHaveAttribute('aria-describedby');
  });

  it('uses the tooltip role and describes the trigger while open', () => {
    renderTooltip({ open: true });
    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).toHaveTextContent('Saves the file');
    expect(getTrigger()).toHaveAttribute('aria-describedby', tooltip.id);
    expect(getTrigger()).toHaveAccessibleDescription('Saves the file');
  });

  it('does not take focus', () => {
    renderTooltip({ open: true });

    expect(screen.getByRole('tooltip')).not.toHaveAttribute('tabindex');
  });
});

// `settle()` waits on a real timer, which fake timers hold back.
async function tick(): Promise<void> {
  flush();
  await vi.advanceTimersByTimeAsync(0);
  flush();
}

describe('Tooltip behaviour', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays open while the trigger has focus and the pointer leaves', async () => {
    renderTooltip();

    getTrigger().focus();
    await tick();
    fireEvent.pointerEnter(getTrigger());
    fireEvent.pointerLeave(getTrigger());
    await vi.advanceTimersByTimeAsync(1000);
    flush();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    getTrigger().blur();
    await tick();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens when the trigger is focused, and closes on blur', async () => {
    renderTooltip();

    getTrigger().focus();
    await tick();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    getTrigger().blur();
    await tick();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens after the open delay when the pointer enters', async () => {
    renderTooltip();

    fireEvent.pointerEnter(getTrigger());
    vi.advanceTimersByTime(299);
    await tick();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    vi.advanceTimersByTime(1);
    await tick();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('does not open if the pointer leaves before the delay', async () => {
    renderTooltip();

    fireEvent.pointerEnter(getTrigger());
    vi.advanceTimersByTime(100);
    fireEvent.pointerLeave(getTrigger());
    vi.advanceTimersByTime(1000);
    await tick();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('stays open while the pointer moves onto the tooltip', async () => {
    renderTooltip({ open: true });

    fireEvent.pointerLeave(getTrigger());
    fireEvent.pointerEnter(screen.getByRole('tooltip'));
    vi.advanceTimersByTime(1000);
    await tick();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.pointerLeave(screen.getByRole('tooltip'));
    vi.advanceTimersByTime(100);
    await tick();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on Escape without moving focus', async () => {
    renderTooltip();
    getTrigger().focus();
    await tick();

    fireEvent.keyDown(getTrigger(), { key: 'Escape' });
    await tick();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(getTrigger());
  });

  it('closes only itself on Escape inside a dialog', async () => {
    render(() => (
      <Dialog defaultOpen={true}>
        <DialogPanel>
          <DialogTitle>Edit</DialogTitle>
          <Tooltip defaultOpen={true}>
            <TooltipTrigger>Save</TooltipTrigger>
            <TooltipPanel>Saves the file</TooltipPanel>
          </Tooltip>
        </DialogPanel>
      </Dialog>
    ));
    await tick();

    fireEvent.keyDown(getTrigger(), { key: 'Escape' });
    await tick();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not open while disabled', async () => {
    renderTooltip({ disabled: true });

    getTrigger().focus();
    fireEvent.pointerEnter(getTrigger());
    vi.advanceTimersByTime(1000);
    await tick();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
