import { fireEvent, render, screen } from '@solidjs/testing-library';
import { activeElement, settle } from './aria';
import { describe, expect, it } from 'vitest';
import { Select, SelectOption } from '../src/components/select';

const COLORS = ['red', 'green', 'blue'];

function renderSelect(
  props: { value?: string; horizontal?: boolean; disabled?: string[] } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Select defaultValue={props.value} horizontal={props.horizontal}>
      {COLORS.map((color) => (
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
  it('exposes an always-visible listbox with options', async () => {
    renderSelect();
    await settle();

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(COLORS.length);
  });

  it('reports its orientation', async () => {
    renderSelect();
    await settle();
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'vertical');

    screen.getByRole('listbox').remove();
    renderSelect({ horizontal: true });
    await settle();
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('marks the selected option', async () => {
    renderSelect({ value: 'green' });
    await settle();

    expect(getOption('green')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('red')).toHaveAttribute('aria-selected', 'false');
  });

  it('is a single tab stop that delegates to its options', async () => {
    renderSelect();
    await settle();

    expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '0');
    for (const color of COLORS) {
      expect(getOption(color)).toHaveAttribute('tabindex', '-1');
    }
  });

  it('focuses the selected option when the listbox receives focus', async () => {
    renderSelect({ value: 'blue' });
    await settle();

    fireEvent.focus(screen.getByRole('listbox'));

    expect(await activeElement()).toBe(getOption('blue'));
  });

  it('selects an option on click', async () => {
    renderSelect();
    await settle();

    getOption('blue').click();

    expect(getOption('blue')).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus with the vertical arrow keys', async () => {
    renderSelect();
    await settle();
    getOption('red').focus();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(await activeElement()).toBe(getOption('green'));

    fireEvent.keyDown(list, { key: 'ArrowUp' });
    expect(await activeElement()).toBe(getOption('red'));
  });

  it('ignores the cross-axis arrows', async () => {
    renderSelect();
    await settle();
    getOption('red').focus();

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowRight' });

    expect(await activeElement()).toBe(getOption('red'));
  });

  it('jumps to the first and last option with Home and End', async () => {
    renderSelect();
    await settle();
    getOption('green').focus();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'End' });
    expect(await activeElement()).toBe(getOption('blue'));

    fireEvent.keyDown(list, { key: 'Home' });
    expect(await activeElement()).toBe(getOption('red'));
  });

  it('marks disabled options and skips them while navigating', async () => {
    renderSelect({ disabled: ['green'] });
    await settle();
    getOption('red').focus();

    expect(getOption('green')).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    expect(await activeElement()).toBe(getOption('blue'));
  });

  it('advertises multi-select and keeps several options selected', () => {
    render(() => (
      <Select multiple={true} defaultValue={[]}>
        {COLORS.map((color) => (
          <SelectOption value={color}>{color}</SelectOption>
        ))}
      </Select>
    ));

    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');

    getOption('red').click();
    getOption('blue').click();

    expect(getOption('red')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('blue')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('green')).toHaveAttribute('aria-selected', 'false');
  });
});
