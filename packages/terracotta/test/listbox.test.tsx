import { fireEvent, render, screen } from '@solidjs/testing-library';
import { activeElement, settle } from './aria';
import { describe, expect, it } from 'vitest';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '../src/components/listbox';

const FRUITS = ['apple', 'banana', 'cherry'];

function renderListbox(
  props: {
    open?: boolean;
    value?: string;
    disabled?: string[];
    horizontal?: boolean;
  } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Listbox
      defaultOpen={props.open ?? false}
      defaultValue={props.value}
      horizontal={props.horizontal}
    >
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxButton>Pick one</ListboxButton>
      <ListboxOptions>
        {FRUITS.map((fruit) => (
          <ListboxOption value={fruit} disabled={props.disabled?.includes(fruit)}>
            {fruit}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  ));
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('option', { name });
}

describe('Listbox accessibility', () => {
  it('marks the trigger as a listbox popup owner', async () => {
    renderListbox();
    await settle();
    const button = screen.getByRole('button', { name: 'Pick one' });

    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls');
  });

  it('does not render the option list while closed', async () => {
    renderListbox();
    await settle();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens on click and marks the trigger as expanded', async () => {
    renderListbox();
    await settle();
    const button = screen.getByRole('button', { name: 'Pick one' });

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens with ArrowDown on the trigger', async () => {
    renderListbox();
    await settle();
    const button = screen.getByRole('button', { name: 'Pick one' });

    fireEvent.keyDown(button, { key: 'ArrowDown' });

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('names the option list from the trigger and reports orientation', async () => {
    renderListbox({ open: true });
    await settle();
    const list = screen.getByRole('listbox');

    expect(list).toHaveAttribute(
      'aria-labelledby',
      screen.getByRole('button', { name: 'Pick one' }).id,
    );
    expect(list).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('reports a horizontal option list when asked', async () => {
    renderListbox({ open: true, horizontal: true });
    await settle();

    expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('exposes every option with a selection state', async () => {
    renderListbox({ open: true, value: 'banana' });
    await settle();

    expect(screen.getAllByRole('option')).toHaveLength(FRUITS.length);
    expect(getOption('banana')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('apple')).toHaveAttribute('aria-selected', 'false');
  });

  it('keeps options out of the tab order and manages focus itself', async () => {
    renderListbox({ open: true });
    await settle();

    for (const fruit of FRUITS) {
      expect(getOption(fruit)).toHaveAttribute('tabindex', '-1');
    }
  });

  it('focuses the selected option when opened', async () => {
    renderListbox({ open: true, value: 'cherry' });
    await settle();

    expect(await activeElement()).toBe(getOption('cherry'));
  });

  it('moves focus with the vertical arrow keys', async () => {
    renderListbox({ open: true, value: 'apple' });
    await settle();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(await activeElement()).toBe(getOption('banana'));

    fireEvent.keyDown(list, { key: 'ArrowUp' });
    expect(await activeElement()).toBe(getOption('apple'));
  });

  it('jumps to the first and last option with Home and End', async () => {
    renderListbox({ open: true, value: 'banana' });
    await settle();
    const list = screen.getByRole('listbox');

    fireEvent.keyDown(list, { key: 'End' });
    expect(await activeElement()).toBe(getOption('cherry'));

    fireEvent.keyDown(list, { key: 'Home' });
    expect(await activeElement()).toBe(getOption('apple'));
  });

  it('selects an option on click and closes the single-select popup', async () => {
    renderListbox({ open: true });
    await settle();

    getOption('banana').click();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pick one' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('closes on Escape', async () => {
    renderListbox({ open: true });
    await settle();

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks disabled options and skips them while navigating', async () => {
    renderListbox({ open: true, value: 'apple', disabled: ['banana'] });
    await settle();

    expect(getOption('banana')).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    expect(await activeElement()).toBe(getOption('cherry'));
  });

  it('advertises multi-select and keeps the popup open on selection', () => {
    render(() => (
      <Listbox multiple={true} defaultOpen={true} defaultValue={[]}>
        <ListboxButton>Pick many</ListboxButton>
        <ListboxOptions>
          {FRUITS.map((fruit) => (
            <ListboxOption value={fruit}>{fruit}</ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    ));
    const list = screen.getByRole('listbox');

    expect(list).toHaveAttribute('aria-multiselectable', 'true');

    getOption('apple').click();
    getOption('cherry').click();

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(getOption('apple')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('cherry')).toHaveAttribute('aria-selected', 'true');
    expect(getOption('banana')).toHaveAttribute('aria-selected', 'false');
  });
});
