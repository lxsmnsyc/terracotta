import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { labelledBy } from './aria';
import {
  Command,
  CommandInput,
  CommandLabel,
  CommandOption,
  CommandOptions,
} from '../src/components/command';

const ACTIONS = ['open file', 'close file', 'rename file'];

function renderCommand(props: { value?: string } = {}): ReturnType<typeof render> {
  return render(() => (
    <Command
      data-testid="palette"
      defaultValue={props.value}
      matchBy={(value: string, query) => value.toLowerCase().includes(query.toLowerCase())}
    >
      <CommandLabel>Command palette</CommandLabel>
      <CommandInput />
      <CommandOptions>
        {ACTIONS.map((action) => (
          <CommandOption value={action}>{action}</CommandOption>
        ))}
      </CommandOptions>
    </Command>
  ));
}

function getInput(): HTMLElement {
  return screen.getByRole('combobox');
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('option', { name });
}

describe('Command accessibility', () => {
  it('wires the input to the option list', () => {
    renderCommand();
    const input = getInput();

    expect(input).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
    // The list is always visible, so the combobox is permanently expanded.
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps the input in the tab order and the options out of it', () => {
    renderCommand();

    expect(getInput()).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '-1');
    for (const action of ACTIONS) {
      expect(getOption(action)).toHaveAttribute('tabindex', '-1');
    }
  });

  it('names the palette from its label', () => {
    renderCommand();

    expect(labelledBy(screen.getByTestId('palette'))).toHaveTextContent('Command palette');
  });

  it('marks the selected option', () => {
    renderCommand({ value: 'close file' });

    expect(getOption('close file')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('open file')).toHaveAttribute('aria-selected', 'false');
  });

  it('tracks the active option with `aria-activedescendant`', () => {
    renderCommand();

    fireEvent.focus(getInput());

    expect(getInput()).toHaveAttribute('aria-activedescendant', getOption('open file').id);
  });

  it('moves the active option with the arrow keys without moving DOM focus', () => {
    renderCommand();
    const input = getInput();
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant', getOption('close file').id);

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveAttribute('aria-activedescendant', getOption('open file').id);
  });

  it('selects the active option with Enter', () => {
    renderCommand();
    const input = getInput();
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getOption('close file')).toHaveAttribute('aria-selected', 'true');
  });

  it('flags which options match the current query', async () => {
    renderCommand();

    fireEvent.input(getInput(), { target: { value: 'rename' } });

    // Query reads are debounced so that typing does not thrash the list.
    await waitFor(() => {
      expect(getOption('open file')).not.toHaveAttribute('tc-matches');
    });
    expect(getOption('rename file')).toHaveAttribute('tc-matches');
  });

  it('selects an option on click', () => {
    renderCommand();

    getOption('rename file').click();

    expect(getOption('rename file')).toHaveAttribute('aria-selected', 'true');
  });
});
