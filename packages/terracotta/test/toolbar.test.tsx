import { fireEvent, render, screen } from '@solidjs/testing-library';
import { activeElement } from './aria';
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

  it('is a single tab stop', () => {
    renderToolbar();

    expect(screen.getByRole('toolbar')).toHaveAttribute('tabindex', '0');
  });

  it('focuses the first action when the toolbar itself is focused', async () => {
    renderToolbar();

    fireEvent.focus(screen.getByRole('toolbar'));

    expect(await activeElement()).toBe(getAction('Bold'));
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
