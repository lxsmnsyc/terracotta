import { fireEvent, render, screen } from '@solidjs/testing-library';
import { activeElement } from './aria';
import { createSignal, flush, Show } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/components/button';
import { Toolbar } from '../src/components/toolbar';

const ACTIONS = ['Bold', 'Italic', 'Underline'];

function renderToolbar(props: { horizontal?: boolean } = {}): ReturnType<typeof render> {
  return render(() => (
    <Toolbar horizontal={props.horizontal}>
      {ACTIONS.map((action) => (
        <Button>{action}</Button>
      ))}
    </Toolbar>
  ));
}

function getAction(name: string): HTMLElement {
  return screen.getByRole('button', { name });
}

describe('Toolbar accessibility', () => {
  it('exposes the toolbar role', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('defaults to a horizontal orientation', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('reports a vertical orientation when asked', () => {
    renderToolbar({ horizontal: false });

    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('is not a tab stop itself', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).not.toHaveAttribute('tabindex');
  });

  it('leaves only the first action in the tab sequence', () => {
    renderToolbar();

    expect(getAction('Bold')).toHaveAttribute('tabindex', '0');
    expect(getAction('Italic')).toHaveAttribute('tabindex', '-1');
    expect(getAction('Underline')).toHaveAttribute('tabindex', '-1');
  });

  it('skips disabled actions when picking the tab stop', () => {
    render(() => (
      <Toolbar>
        <Button disabled>Bold</Button>
        <Button>Italic</Button>
      </Toolbar>
    ));

    expect(getAction('Italic')).toHaveAttribute('tabindex', '0');
  });

  it('moves the tab stop with focus', async () => {
    renderToolbar();
    getAction('Bold').focus();

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'End' });
    expect(await activeElement()).toBe(getAction('Underline'));

    expect(getAction('Underline')).toHaveAttribute('tabindex', '0');
    expect(getAction('Bold')).toHaveAttribute('tabindex', '-1');
    expect(getAction('Italic')).toHaveAttribute('tabindex', '-1');
  });

  it('keeps the last focused action as the tab stop after focus leaves', async () => {
    renderToolbar();
    getAction('Italic').focus();
    getAction('Italic').blur();
    await activeElement();

    expect(getAction('Italic')).toHaveAttribute('tabindex', '0');
    expect(getAction('Bold')).toHaveAttribute('tabindex', '-1');
  });

  it('moves the tab stop when the focused action is removed', async () => {
    const [show, setShow] = createSignal(true);
    render(() => (
      <Toolbar>
        <Button>Bold</Button>
        <Show when={show()}>
          <Button>Italic</Button>
        </Show>
      </Toolbar>
    ));
    getAction('Italic').focus();
    getAction('Italic').blur();

    setShow(false);
    flush();
    // MutationObserver callbacks run as a microtask.
    await activeElement();

    expect(getAction('Bold')).toHaveAttribute('tabindex', '0');
  });

  it('moves focus with ArrowRight and ArrowLeft when horizontal', async () => {
    renderToolbar();
    getAction('Bold').focus();

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(await activeElement()).toBe(getAction('Italic'));

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowLeft' });
    expect(await activeElement()).toBe(getAction('Bold'));
  });

  it('moves focus with ArrowDown and ArrowUp when vertical', async () => {
    renderToolbar({ horizontal: false });
    getAction('Bold').focus();

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowDown' });
    expect(await activeElement()).toBe(getAction('Italic'));

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowUp' });
    expect(await activeElement()).toBe(getAction('Bold'));
  });

  it('jumps to the first and last action with Home and End', async () => {
    renderToolbar();
    getAction('Italic').focus();

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'End' });
    expect(await activeElement()).toBe(getAction('Underline'));

    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'Home' });
    expect(await activeElement()).toBe(getAction('Bold'));
  });
});
