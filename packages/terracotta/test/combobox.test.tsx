import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { labelledBy, settle } from './aria';
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '../src';

const PEOPLE = ['ada', 'grace', 'katherine'];

function renderCombobox(props: { open?: boolean; value?: string } = {}): ReturnType<typeof render> {
  return render(() => (
    <Combobox
      defaultOpen={props.open ?? false}
      defaultValue={props.value}
      matchBy={(value: string, query) => value.toLowerCase().includes(query.toLowerCase())}
    >
      <ComboboxLabel>Assignee</ComboboxLabel>
      <ComboboxInput />
      <ComboboxOptions>
        {PEOPLE.map((person) => (
          <ComboboxOption value={person}>{person}</ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  ));
}

function getInput(): HTMLElement {
  return screen.getByRole('combobox');
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('option', { name });
}

describe('Combobox accessibility', () => {
  it('exposes a combobox input that owns a listbox popup', () => {
    renderCombobox();
    const input = getInput();

    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-controls');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('names the input from the label', () => {
    renderCombobox();

    expect(labelledBy(getInput())).toHaveTextContent('Assignee');
  });

  it('does not render the option list while collapsed', () => {
    renderCombobox();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('expands on ArrowDown', () => {
    renderCombobox();
    const input = getInput();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('expands when the user types', async () => {
    renderCombobox();
    const input = getInput();

    fireEvent.input(input, { target: { value: 'gr' } });

    // Query reads are debounced so that typing does not thrash the list.
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('collapses on Escape', () => {
    renderCombobox({ open: true });
    const input = getInput();

    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('activates the selected option when the popup opens', async () => {
    renderCombobox({ open: true, value: 'grace' });
    await settle();

    expect(getInput()).toHaveAttribute('aria-activedescendant', getOption('grace').id);
  });

  it('activates the first option when the popup opens with nothing selected', async () => {
    renderCombobox({ open: true });
    await settle();

    expect(getInput()).toHaveAttribute('aria-activedescendant', getOption('ada').id);
  });

  it('keeps DOM focus on the input and tracks the active option virtually', () => {
    renderCombobox({ open: true });
    const input = getInput();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant');
    expect(document.activeElement).not.toBe(getOption('ada'));
  });

  it('marks the selected option', () => {
    renderCombobox({ open: true, value: 'grace' });

    expect(getOption('grace')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('ada')).toHaveAttribute('aria-selected', 'false');
  });

  it('flags which options match the current query', async () => {
    renderCombobox({ open: true });

    fireEvent.input(getInput(), { target: { value: 'kath' } });

    await waitFor(() => {
      expect(getOption('ada')).not.toHaveAttribute('tc-matches');
    });
    expect(getOption('katherine')).toHaveAttribute('tc-matches');
  });

  it('keeps the option list out of the tab order', () => {
    renderCombobox({ open: true });

    expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '-1');
    for (const person of PEOPLE) {
      expect(getOption(person)).toHaveAttribute('tabindex', '-1');
    }
  });
});
