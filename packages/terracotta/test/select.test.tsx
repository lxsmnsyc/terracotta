import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Select, SelectOption } from '../src';

const COLORS = ['red', 'green', 'blue'];

function renderSelect(
  props: { value?: string; horizontal?: boolean; disabled?: string[] } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Select defaultValue={props.value} horizontal={props.horizontal}>
      {COLORS.map(color => (
        <SelectOption value={color} disabled={props.disabled?.includes(color)}>
          {color}
        </SelectOption>
      ))}
    </Select>
  ));
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('option', { name });
}

describe('Select accessibility', () => {
  it('exposes an always-visible listbox with options', () => {
    renderSelect();

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(COLORS.length);
  });

  it('reports its orientation', () => {
    renderSelect();
    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );

    screen.getByRole('listbox').remove();
    renderSelect({ horizontal: true });
    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('marks the selected option', () => {
    renderSelect({ value: 'green' });

    expect(getOption('green')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('red')).toHaveAttribute('aria-selected', 'false');
  });

  it('is a single tab stop that delegates to its options', () => {
    renderSelect();

    expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '0');
    for (const color of COLORS) {
      expect(getOption(color)).toHaveAttribute('tabindex', '-1');
    }
  });

  it('focuses the selected option when the listbox receives focus', () => {
    renderSelect({ value: 'blue' });

    fireEvent.focus(screen.getByRole('listbox'));

    expect(document.activeElement).toBe(getOption('blue'));
  });

  it('selects an option on click', () => {
    renderSelect();

    getOption('blue').click();

    expect(getOption('blue')).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus with the vertical arrow keys', () => {
    renderSelect();
    getOption('red').focus();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(getOption('green'));

    fireEvent.keyDown(list, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(getOption('red'));
  });

  it('ignores the cross-axis arrows', () => {
    renderSelect();
    getOption('red').focus();

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowRight' });

    expect(document.activeElement).toBe(getOption('red'));
  });

  it('jumps to the first and last option with Home and End', () => {
    renderSelect();
    getOption('green').focus();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'End' });
    expect(document.activeElement).toBe(getOption('blue'));

    fireEvent.keyDown(list, { key: 'Home' });
    expect(document.activeElement).toBe(getOption('red'));
  });

  it('marks disabled options and skips them while navigating', () => {
    renderSelect({ disabled: ['green'] });
    getOption('red').focus();

    expect(getOption('green')).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    expect(document.activeElement).toBe(getOption('blue'));
  });

  it('advertises multi-select and keeps several options selected', () => {
    render(() => (
      <Select multiple={true} defaultValue={[]}>
        {COLORS.map(color => (
          <SelectOption value={color}>{color}</SelectOption>
        ))}
      </Select>
    ));

    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-multiselectable',
      'true',
    );

    getOption('red').click();
    getOption('blue').click();

    expect(getOption('red')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('blue')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('green')).toHaveAttribute('aria-selected', 'false');
  });
});
