import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, labelledBy, settle } from './aria';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '../src/components/combobox';

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

  it('keeps DOM focus on the input and tracks the active option virtually', async () => {
    renderCombobox({ open: true });
    const input = getInput();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant');
    expect(await activeElement()).not.toBe(getOption('ada'));
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

  it('declares list autocompletion on the input', () => {
    renderCombobox();

    expect(getInput()).toHaveAttribute('aria-autocomplete', 'list');
  });

  it('carries its own input tag', () => {
    renderCombobox();

    expect(getInput()).toHaveAttribute('tc-combobox-input');
    expect(getInput()).not.toHaveAttribute('tc-command-input');
  });

  it('names the option list from the label', async () => {
    renderCombobox({ open: true });
    await settle();

    expect(labelledBy(screen.getByRole('listbox'))).toHaveTextContent('Assignee');
  });

  it('leaves out aria-labelledby when there is no label', async () => {
    render(() => (
      <Combobox
        defaultOpen={true}
        defaultValue={undefined as string | undefined}
        matchBy={(value: string, query) => value.includes(query)}
      >
        <ComboboxInput aria-label="Assignee" />
        <ComboboxOptions aria-label="People">
          <ComboboxOption value="ada">ada</ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    ));
    await settle();

    expect(getInput()).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('listbox')).not.toHaveAttribute('aria-labelledby');
  });

  it('keeps naming and disabled attributes off the generic root', async () => {
    render(() => (
      <Combobox
        data-testid="root"
        disabled={true}
        defaultOpen={false}
        defaultValue={undefined as string | undefined}
        matchBy={(value: string, query) => value.includes(query)}
      >
        <ComboboxLabel>Assignee</ComboboxLabel>
        <ComboboxInput />
      </Combobox>
    ));
    await settle();
    const root = screen.getByTestId('root');

    expect(root).not.toHaveAttribute('aria-labelledby');
    expect(root).not.toHaveAttribute('aria-disabled');
    expect(root).not.toHaveAttribute('disabled');
    expect(root).toHaveAttribute('tc-disabled');
  });

  it('clears aria-activedescendant when the popup closes', async () => {
    renderCombobox({ open: true });
    await settle();
    const input = getInput();
    expect(input).toHaveAttribute('aria-activedescendant', getOption('ada').id);

    fireEvent.keyDown(input, { key: 'Escape' });
    await settle();

    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('clears aria-activedescendant when the popup closes but stays mounted', async () => {
    render(() => (
      <Combobox
        defaultOpen={true}
        defaultValue={undefined as string | undefined}
        matchBy={(value: string, query) => value.includes(query)}
      >
        <ComboboxLabel>Assignee</ComboboxLabel>
        <ComboboxInput />
        <ComboboxOptions unmount={false}>
          {PEOPLE.map((person) => (
            <ComboboxOption value={person}>{person}</ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    ));
    await settle();
    const input = getInput();
    expect(input).toHaveAttribute('aria-activedescendant');

    fireEvent.keyDown(input, { key: 'Escape' });
    await settle();

    expect(input).not.toHaveAttribute('aria-activedescendant');
    expect(document.querySelector('[tc-active]')).toBeNull();
  });

  it('clears aria-activedescendant when nothing matches the query', async () => {
    renderCombobox({ open: true });
    await settle();
    const input = getInput();
    expect(input).toHaveAttribute('aria-activedescendant');

    fireEvent.input(input, { target: { value: 'zzz' } });

    await waitFor(() => {
      expect(getOption('ada')).not.toHaveAttribute('tc-matches');
    });
    await settle();
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('lets Escape reach outer handlers while the popup is closed', () => {
    let reached = 0;
    render(() => (
      <div
        onKeyDown={() => {
          reached += 1;
        }}
      >
        <Combobox
          defaultOpen={false}
          defaultValue={undefined as string | undefined}
          matchBy={(value: string, query) => value.includes(query)}
        >
          <ComboboxInput />
        </Combobox>
      </div>
    ));

    fireEvent.keyDown(getInput(), { key: 'Escape' });

    expect(reached).toBe(1);
  });

  it('stops Escape from reaching outer handlers while the popup is open', () => {
    let reached = 0;
    render(() => (
      <div
        onKeyDown={() => {
          reached += 1;
        }}
      >
        <Combobox
          defaultOpen={true}
          defaultValue={undefined as string | undefined}
          matchBy={(value: string, query) => value.includes(query)}
        >
          <ComboboxInput />
        </Combobox>
      </div>
    ));

    fireEvent.keyDown(getInput(), { key: 'Escape' });

    expect(reached).toBe(0);
    expect(getInput()).toHaveAttribute('aria-expanded', 'false');
  });

  it('leaves Enter alone while the popup is closed so forms can submit', () => {
    renderCombobox();

    // `fireEvent` returns false when the event was cancelled.
    expect(fireEvent.keyDown(getInput(), { key: 'Enter' })).toBe(true);
  });

  it('takes Enter while the popup is open', () => {
    renderCombobox({ open: true });

    expect(fireEvent.keyDown(getInput(), { key: 'Enter' })).toBe(false);
  });
});
