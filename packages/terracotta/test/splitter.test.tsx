import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { Splitter, SplitterPane, SplitterSeparator } from '../src/components/splitter';
import { pressKeyOnFocused } from './aria';

type Options = {
  value?: number;
  min?: number;
  max?: number;
  horizontal?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
};

function renderSplitter(options: Options = {}): void {
  render(() => (
    <Splitter
      data-testid="splitter"
      defaultValue={options.value ?? 30}
      min={options.min}
      max={options.max}
      horizontal={options.horizontal}
      disabled={options.disabled}
      onChange={options.onChange}
    >
      <SplitterPane>Contents</SplitterPane>
      <SplitterSeparator aria-label="Contents" />
      <div>Chapter</div>
    </Splitter>
  ));
}

function getSeparator(): HTMLElement {
  return screen.getByRole('separator', { name: 'Contents' });
}

describe('Splitter accessibility', () => {
  it('makes the separator a focusable widget with a value', () => {
    renderSplitter();

    expect(getSeparator()).toHaveAttribute('tabindex', '0');
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '30');
    expect(getSeparator()).toHaveAttribute('aria-valuemin', '0');
    expect(getSeparator()).toHaveAttribute('aria-valuemax', '100');
    expect(getSeparator()).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('points aria-controls at the primary pane', () => {
    renderSplitter();

    expect(getSeparator()).toHaveAttribute('aria-controls', screen.getByText('Contents').id);
  });

  it('is horizontal when the panes are stacked', () => {
    renderSplitter({ horizontal: true });

    expect(getSeparator()).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('is out of the tab sequence while disabled', () => {
    renderSplitter({ disabled: true });

    expect(getSeparator()).toHaveAttribute('tabindex', '-1');
    expect(getSeparator()).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('Splitter keyboard', () => {
  it.each([
    ['ArrowRight', 35],
    ['ArrowLeft', 25],
    ['Home', 0],
    ['End', 100],
  ])('handles %s side by side', (key, expected) => {
    renderSplitter();
    getSeparator().focus();

    pressKeyOnFocused(key);

    expect(getSeparator()).toHaveAttribute('aria-valuenow', String(expected));
  });

  it('ignores Up and Down side by side', () => {
    renderSplitter();
    getSeparator().focus();

    pressKeyOnFocused('ArrowUp');

    expect(getSeparator()).toHaveAttribute('aria-valuenow', '30');
  });

  it('moves with Up and Down when stacked', () => {
    renderSplitter({ horizontal: true });
    getSeparator().focus();

    pressKeyOnFocused('ArrowDown');
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '35');

    pressKeyOnFocused('ArrowLeft');
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '35');
  });

  it('collapses with Enter, and restores the size with Enter again', () => {
    renderSplitter();
    getSeparator().focus();

    pressKeyOnFocused('Enter');
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '0');
    expect(getSeparator()).toHaveAttribute('tc-collapsed');

    pressKeyOnFocused('Enter');
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '30');
  });

  it('stays within min and max', () => {
    renderSplitter({ value: 22, min: 20, max: 80 });
    getSeparator().focus();

    pressKeyOnFocused('ArrowLeft');

    expect(getSeparator()).toHaveAttribute('aria-valuenow', '20');
  });
});

describe('Splitter state', () => {
  it('reports changes through onChange', () => {
    const onChange = vi.fn<(value: number) => void>();
    renderSplitter({ onChange });
    getSeparator().focus();

    pressKeyOnFocused('ArrowRight');

    expect(onChange).toHaveBeenCalledWith(35);
  });

  it('follows value when controlled', async () => {
    const [value, setValue] = createSignal(50);
    render(() => (
      <Splitter
        value={value()}
        onChange={(next) => {
          setValue(next);
        }}
      >
        <SplitterPane />
        <SplitterSeparator aria-label="Sidebar" />
      </Splitter>
    ));
    const separator = screen.getByRole('separator', { name: 'Sidebar' });
    separator.focus();

    pressKeyOnFocused('ArrowLeft');
    await Promise.resolve();

    expect(value()).toBe(45);
    expect(separator).toHaveAttribute('aria-valuenow', '45');
  });

  it('follows a drag of the separator', () => {
    renderSplitter();
    const splitter = screen.getByTestId('splitter');
    vi.spyOn(splitter, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 400, height: 200 }),
    );

    fireEvent.pointerDown(getSeparator(), { button: 0, pointerId: 1, clientX: 120 });
    expect(document.activeElement).toBe(getSeparator());

    fireEvent.pointerMove(getSeparator(), { pointerId: 1, clientX: 200 });
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '50');

    fireEvent.pointerUp(getSeparator(), { pointerId: 1 });
    fireEvent.pointerMove(getSeparator(), { pointerId: 1, clientX: 300 });
    expect(getSeparator()).toHaveAttribute('aria-valuenow', '50');
  });

  it('passes its state to a render prop', () => {
    render(() => (
      <Splitter defaultValue={40}>
        {(state) => (
          <SplitterPane style={{ 'flex-basis': `${state.value()}%` }} data-testid="pane" />
        )}
      </Splitter>
    ));

    expect(screen.getByTestId('pane')).toHaveStyle({ 'flex-basis': '40%' });
  });
});

describe('SplitterStateChild', () => {
  it('updates a render prop that returns text', () => {
    render(() => (
      <Splitter defaultValue={30}>
        <SplitterPane />
        <SplitterSeparator aria-label="Sidebar">
          {(state) => (state.collapsed() ? 'Show' : 'Hide')}
        </SplitterSeparator>
      </Splitter>
    ));
    const separator = screen.getByRole('separator', { name: 'Sidebar' });
    expect(separator).toHaveTextContent('Hide');

    separator.focus();
    pressKeyOnFocused('Enter');

    expect(separator).toHaveTextContent('Show');
  });

  it('keeps the elements of a render prop that returns JSX', () => {
    render(() => (
      <Splitter defaultValue={30}>
        <SplitterPane />
        <SplitterSeparator aria-label="Sidebar">
          {(state) => <span data-testid="handle" data-value={state.value()} />}
        </SplitterSeparator>
      </Splitter>
    ));
    const separator = screen.getByRole('separator', { name: 'Sidebar' });
    const handle = screen.getByTestId('handle');

    separator.focus();
    pressKeyOnFocused('ArrowRight');

    expect(screen.getByTestId('handle')).toBe(handle);
    expect(handle).not.toHaveAttribute('data-value', '30');
  });
});
