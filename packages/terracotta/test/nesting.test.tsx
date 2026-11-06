import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, settle } from './aria';
import { Button } from '../src/components/button';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '../src/components/combobox';
import { Dialog, DialogPanel, DialogTitle } from '../src/components/dialog';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../src/components/disclosure';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '../src/components/listbox';
import { Popover, PopoverButton, PopoverPanel } from '../src/components/popover';

const FRUITS = ['apple', 'banana', 'cherry'];

/**
 * A popup inside a `Dialog` shares its keyboard with the dialog's focus trap:
 * both are listening for the same `Tab` and `Escape` on the way up the tree.
 * These tests pin which one wins.
 */
function renderPopoverInDialog(): void {
  render(() => (
    <Dialog defaultOpen>
      <DialogPanel data-testid="dialog-panel">
        <DialogTitle>Settings</DialogTitle>
        <Popover defaultOpen={false}>
          <PopoverButton data-testid="popover-button">More</PopoverButton>
          <PopoverPanel data-testid="popover-panel">
            <Button data-testid="rename">Rename</Button>
            <Button data-testid="duplicate">Duplicate</Button>
          </PopoverPanel>
        </Popover>
        <Button data-testid="dialog-action">Close</Button>
      </DialogPanel>
    </Dialog>
  ));
}

function renderListboxInDialog(): void {
  render(() => (
    <Dialog defaultOpen>
      <DialogPanel data-testid="dialog-panel">
        <Listbox defaultOpen={false} defaultValue="banana">
          <ListboxButton data-testid="listbox-button">Pick one</ListboxButton>
          <ListboxOptions data-testid="listbox-options">
            {FRUITS.map((fruit) => (
              <ListboxOption value={fruit}>{fruit}</ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        <Button data-testid="dialog-action">Close</Button>
      </DialogPanel>
    </Dialog>
  ));
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('option', { name });
}

describe('Popover inside a Dialog', () => {
  it('opens on click and moves focus into its own panel', async () => {
    renderPopoverInDialog();
    await settle();

    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
    expect(await activeElement()).toBe(screen.getByTestId('rename'));
  });

  it('traps Tab inside the popover rather than the dialog', async () => {
    renderPopoverInDialog();
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('rename'), { key: 'Tab' });

    // The dialog traps Tab as well, so without the popover keeping the key to
    // itself focus would move twice and land outside the popover — which its
    // own `focusout` would then read as a reason to close.
    expect(await activeElement()).toBe(screen.getByTestId('duplicate'));
    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('duplicate'), { key: 'Tab' });

    expect(await activeElement()).toBe(screen.getByTestId('rename'));
  });

  it('closes only the popover on Escape', async () => {
    renderPopoverInDialog();
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('rename'), { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('popover-panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('dialog-panel')).toBeInTheDocument();
    expect(await activeElement()).toBe(screen.getByTestId('popover-button'));
  });

  it('closes the dialog on Escape once the popover is closed', async () => {
    renderPopoverInDialog();
    await settle();

    fireEvent.keyDown(screen.getByTestId('popover-button'), { key: 'Escape' });
    await settle();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the popover, but not the dialog, when focus moves back into the dialog', async () => {
    renderPopoverInDialog();
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    screen.getByTestId('dialog-action').focus();
    await settle();

    expect(screen.queryByTestId('popover-panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('dialog-panel')).toBeInTheDocument();
  });
});

describe('Listbox inside a Dialog', () => {
  it('opens with the selected option focused', async () => {
    renderListboxInDialog();
    await settle();

    fireEvent.click(screen.getByTestId('listbox-button'));

    expect(await activeElement()).toBe(getOption('banana'));
  });

  it('moves through the options with the arrow keys', async () => {
    renderListboxInDialog();
    await settle();
    fireEvent.click(screen.getByTestId('listbox-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('listbox-options'), { key: 'ArrowDown' });

    expect(await activeElement()).toBe(getOption('cherry'));
  });

  it('closes only the popup on Escape', async () => {
    renderListboxInDialog();
    await settle();
    fireEvent.click(screen.getByTestId('listbox-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('listbox-options'), { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('listbox-options')).not.toBeInTheDocument();
    expect(screen.getByTestId('dialog-panel')).toBeInTheDocument();
  });
});

describe('Combobox inside a Dialog', () => {
  function renderComboboxInDialog(): void {
    render(() => (
      <Dialog defaultOpen>
        <DialogPanel data-testid="dialog-panel">
          <Combobox
            defaultOpen={false}
            defaultValue="apple"
            matchBy={(value: string, query) => value.toLowerCase().includes(query.toLowerCase())}
          >
            <ComboboxInput data-testid="combobox-input" />
            <ComboboxOptions data-testid="combobox-options">
              {FRUITS.map((fruit) => (
                <ComboboxOption value={fruit}>{fruit}</ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </DialogPanel>
      </Dialog>
    ));
  }

  it('opens the popup on ArrowDown while focus stays on the input', async () => {
    renderComboboxInDialog();
    await settle();
    const input = screen.getByTestId('combobox-input');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await settle();

    expect(screen.getByTestId('combobox-options')).toBeInTheDocument();
    expect(await activeElement()).toBe(input);
    expect(input).toHaveAttribute('aria-activedescendant');
  });

  it('closes only the popup on Escape', async () => {
    renderComboboxInDialog();
    await settle();
    const input = screen.getByTestId('combobox-input');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await settle();

    fireEvent.keyDown(input, { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('combobox-options')).not.toBeInTheDocument();
    expect(screen.getByTestId('dialog-panel')).toBeInTheDocument();
  });
});

describe('nested inside a Popover', () => {
  function renderListboxInPopover(): void {
    render(() => (
      <Popover defaultOpen={false}>
        <PopoverButton data-testid="popover-button">More</PopoverButton>
        <PopoverPanel data-testid="popover-panel">
          <Listbox defaultOpen={false} defaultValue="banana">
            <ListboxButton data-testid="listbox-button">Pick one</ListboxButton>
            <ListboxOptions data-testid="listbox-options">
              {FRUITS.map((fruit) => (
                <ListboxOption value={fruit}>{fruit}</ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </PopoverPanel>
      </Popover>
    ));
  }

  it('keeps the popover open while a Listbox inside it opens', async () => {
    renderListboxInPopover();
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    fireEvent.click(screen.getByTestId('listbox-button'));
    await settle();

    // The popup is inside the panel, so the popover never sees focus leave.
    expect(screen.getByTestId('listbox-options')).toBeInTheDocument();
    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
    expect(await activeElement()).toBe(getOption('banana'));
  });

  it('closes only the Listbox on Escape', async () => {
    renderListboxInPopover();
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();
    fireEvent.click(screen.getByTestId('listbox-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('listbox-options'), { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('listbox-options')).not.toBeInTheDocument();
    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
  });

  it('keeps the popover open while a Disclosure inside it toggles', async () => {
    render(() => (
      <Popover defaultOpen={false}>
        <PopoverButton data-testid="popover-button">More</PopoverButton>
        <PopoverPanel data-testid="popover-panel">
          <Disclosure defaultOpen={false}>
            <DisclosureButton data-testid="disclosure-button">Details</DisclosureButton>
            <DisclosurePanel data-testid="disclosure-panel">Body</DisclosurePanel>
          </Disclosure>
        </PopoverPanel>
      </Popover>
    ));
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    fireEvent.click(screen.getByTestId('disclosure-button'));
    await settle();

    expect(screen.getByTestId('disclosure-panel')).toBeInTheDocument();
    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
  });

  it('closes the popover on Escape, since a Disclosure does not handle it', async () => {
    render(() => (
      <Popover defaultOpen={false}>
        <PopoverButton data-testid="popover-button">More</PopoverButton>
        <PopoverPanel data-testid="popover-panel">
          <Disclosure defaultOpen>
            <DisclosureButton data-testid="disclosure-button">Details</DisclosureButton>
            <DisclosurePanel data-testid="disclosure-panel">Body</DisclosurePanel>
          </Disclosure>
        </PopoverPanel>
      </Popover>
    ));
    await settle();
    fireEvent.click(screen.getByTestId('popover-button'));
    await settle();

    fireEvent.keyDown(screen.getByTestId('disclosure-button'), { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('popover-panel')).not.toBeInTheDocument();
  });
});
