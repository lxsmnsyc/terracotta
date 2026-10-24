import { fireEvent, render, screen } from '@solidjs/testing-library';
import { Portal } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { activeElement, settle } from './aria';
import { Button } from '../src/components/button';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '../src/components/combobox';
import { ContextMenu, ContextMenuBoundary, ContextMenuPanel } from '../src/components/context-menu';
import { Dialog, DialogPanel, DialogTitle } from '../src/components/dialog';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '../src/components/listbox';
import { Popover, PopoverButton, PopoverPanel } from '../src/components/popover';

/**
 * A panel rendered into a `Portal` is no longer inside the element of the panel
 * it opened from. These tests pin that it still counts as inside: moving focus
 * or clicking into it leaves the outer panel open, and an outer modal does not
 * make it inert.
 */

const FRUITS = ['apple', 'banana', 'cherry'];

function renderPopoverInPopover(): void {
  render(() => (
    <>
      <Popover defaultOpen>
        <PopoverButton data-testid="outer-button">Outer</PopoverButton>
        <PopoverPanel data-testid="outer-panel">
          <Popover defaultOpen={false}>
            <PopoverButton data-testid="inner-button">Inner</PopoverButton>
            <Portal>
              <PopoverPanel data-testid="inner-panel">
                <Button data-testid="inner-action">Action</Button>
              </PopoverPanel>
            </Portal>
          </Popover>
        </PopoverPanel>
      </Popover>
      <Button data-testid="outside">Outside</Button>
    </>
  ));
}

describe('Popover inside a Popover, in a Portal', () => {
  it('keeps the outer popover open while focus is in the inner one', async () => {
    renderPopoverInPopover();
    await settle();

    fireEvent.click(screen.getByTestId('inner-button'));
    await settle();

    const innerPanel = screen.getByTestId('inner-panel');
    expect(screen.getByTestId('outer-panel').contains(innerPanel)).toBe(false);
    expect(await activeElement()).toBe(screen.getByTestId('inner-action'));
    expect(screen.getByTestId('outer-panel')).toBeInTheDocument();
  });

  it('closes both popovers when focus leaves the inner one for the page', async () => {
    renderPopoverInPopover();
    await settle();
    fireEvent.click(screen.getByTestId('inner-button'));
    await settle();

    screen.getByTestId('outside').focus();
    await settle();

    expect(screen.queryByTestId('inner-panel')).not.toBeInTheDocument();
    expect(screen.queryByTestId('outer-panel')).not.toBeInTheDocument();
  });

  it('closes only the inner popover when focus moves back to the outer one', async () => {
    renderPopoverInPopover();
    await settle();
    fireEvent.click(screen.getByTestId('inner-button'));
    await settle();

    screen.getByTestId('inner-button').focus();
    await settle();

    expect(screen.queryByTestId('inner-panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('outer-panel')).toBeInTheDocument();
  });
});

describe('Listbox inside a Popover, in a Portal', () => {
  it('keeps the popover open while focus is in the options', async () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverButton>More</PopoverButton>
        <PopoverPanel data-testid="popover-panel">
          <Listbox defaultOpen={false} defaultValue="banana">
            <ListboxButton data-testid="listbox-button">Pick one</ListboxButton>
            <Portal>
              <ListboxOptions data-testid="listbox-options">
                {FRUITS.map((fruit) => (
                  <ListboxOption value={fruit}>{fruit}</ListboxOption>
                ))}
              </ListboxOptions>
            </Portal>
          </Listbox>
        </PopoverPanel>
      </Popover>
    ));
    await settle();

    fireEvent.click(screen.getByTestId('listbox-button'));
    await settle();

    expect(screen.getByTestId('listbox-options').contains(await activeElement())).toBe(true);
    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
  });
});

describe('Combobox inside a Popover, in a Portal', () => {
  it('keeps the popover open when focus passes through the options', async () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverButton>More</PopoverButton>
        <PopoverPanel data-testid="popover-panel">
          <Combobox
            defaultOpen={false}
            defaultValue="apple"
            matchBy={(value: string, query) => value.includes(query)}
          >
            <ComboboxInput data-testid="combobox-input" />
            <Portal>
              <ComboboxOptions data-testid="combobox-options">
                {FRUITS.map((fruit) => (
                  <ComboboxOption value={fruit}>{fruit}</ComboboxOption>
                ))}
              </ComboboxOptions>
            </Portal>
          </Combobox>
        </PopoverPanel>
      </Popover>
    ));
    await settle();

    fireEvent.click(screen.getByTestId('combobox-input'));
    await settle();

    // A press on the options focuses them for a moment before they hand focus
    // back to the input.
    screen.getByTestId('combobox-options').focus();
    await settle();

    expect(screen.getByTestId('popover-panel')).toBeInTheDocument();
    expect(await activeElement()).toBe(screen.getByTestId('combobox-input'));
  });
});

describe('Popover inside a ContextMenu, in a Portal', () => {
  it('keeps the context menu open on a click in the popover', async () => {
    render(() => (
      <ContextMenu defaultOpen>
        <ContextMenuBoundary>Right-click here</ContextMenuBoundary>
        <ContextMenuPanel data-testid="menu-panel">
          <Popover defaultOpen>
            <PopoverButton>More</PopoverButton>
            <Portal>
              <PopoverPanel data-testid="popover-panel">
                <Button data-testid="popover-action">Action</Button>
              </PopoverPanel>
            </Portal>
          </Popover>
        </ContextMenuPanel>
      </ContextMenu>
    ));
    await settle();

    fireEvent.click(screen.getByTestId('popover-action'));
    await settle();

    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
  });
});

describe('panels inside a Dialog, in a Portal', () => {
  it('leaves a popover panel kept mounted in a Portal usable', async () => {
    const [open, setOpen] = createSignal(false);
    render(() => (
      <Dialog
        isOpen={open()}
        unmount={false}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogPanel>
          <DialogTitle>Settings</DialogTitle>
          <Popover defaultOpen={false}>
            <PopoverButton>More</PopoverButton>
            <Portal>
              <PopoverPanel data-testid="popover-panel" unmount={false}>
                <Button>Action</Button>
              </PopoverPanel>
            </Portal>
          </Popover>
        </DialogPanel>
      </Dialog>
    ));
    await settle();

    // The panel is in the page before the dialog opens, so opening the dialog
    // would otherwise mark it inert with the rest of the page.
    setOpen(true);
    await settle();

    expect(screen.getByTestId('popover-panel').closest('[inert]')).toBeNull();
  });

  it('makes the outer dialog inert while a nested dialog is open, and gives it back', async () => {
    render(() => (
      <Dialog defaultOpen data-testid="outer">
        <DialogPanel>
          <DialogTitle>Outer</DialogTitle>
          <Button data-testid="open-inner">Open</Button>
          <Portal>
            <Dialog defaultOpen data-testid="inner">
              <DialogPanel>
                <DialogTitle>Inner</DialogTitle>
                <Button data-testid="inner-action">Action</Button>
              </DialogPanel>
            </Dialog>
          </Portal>
        </DialogPanel>
      </Dialog>
    ));
    await settle();

    const inner = screen.getByTestId('inner');
    expect(inner.closest('[inert]')).toBeNull();
    expect(screen.getByTestId('outer').closest('[inert]')).not.toBeNull();

    fireEvent.keyDown(screen.getByTestId('inner-action'), { key: 'Escape' });
    await settle();

    expect(screen.queryByTestId('inner')).not.toBeInTheDocument();
    expect(screen.getByTestId('outer').closest('[inert]')).toBeNull();
  });
});
