import { render, screen } from '@solidjs/testing-library';
import type { JSX } from '@solidjs/web';
import { describe, expect, it, vi } from 'vitest';
import {
  TreeGrid,
  TreeGridBody,
  TreeGridCell,
  TreeGridColumnHeader,
  TreeGridHead,
  TreeGridHeaderRow,
  TreeGridRow,
  useTreeGridState,
} from '../src/components/treegrid';
import { pressKeyOnFocused, settle } from './aria';

function Rows(): JSX.Element {
  const state = useTreeGridState<string>();
  return (
    <TreeGridBody>
      <TreeGridRow value="inbox" expandable aria-label="Inbox">
        <TreeGridCell>Inbox</TreeGridCell>
        <TreeGridCell>3</TreeGridCell>
      </TreeGridRow>
      {state.isExpanded('inbox') && (
        <TreeGridRow value="mail-1" level={2} aria-label="Lunch">
          <TreeGridCell>Lunch</TreeGridCell>
          <TreeGridCell>
            <button type="button">Reply</button>
          </TreeGridCell>
        </TreeGridRow>
      )}
      <TreeGridRow value="sent" aria-label="Sent">
        <TreeGridCell>Sent</TreeGridCell>
        <TreeGridCell>0</TreeGridCell>
      </TreeGridRow>
    </TreeGridBody>
  );
}

function renderTreeGrid(
  options: { expanded?: string[]; onExpandedChange?: (v: string[]) => void } = {},
): void {
  render(() => (
    <TreeGrid
      aria-label="Mail"
      defaultExpanded={options.expanded}
      onExpandedChange={options.onExpandedChange}
    >
      <TreeGridHead>
        <TreeGridHeaderRow>
          <TreeGridColumnHeader>Folder</TreeGridColumnHeader>
          <TreeGridColumnHeader>Unread</TreeGridColumnHeader>
        </TreeGridHeaderRow>
      </TreeGridHead>
      <Rows />
    </TreeGrid>
  ));
}

function row(name: string): HTMLElement {
  return screen.getByRole('row', { name });
}

describe('TreeGrid accessibility', () => {
  it('uses the treegrid role, and sets aria-level on rows', async () => {
    renderTreeGrid({ expanded: ['inbox'] });
    await settle();

    expect(screen.getByRole('treegrid', { name: 'Mail' })).toBeInTheDocument();
    expect(row('Inbox')).toHaveAttribute('aria-level', '1');
    expect(row('Lunch')).toHaveAttribute('aria-level', '2');
  });

  it('puts aria-expanded on parent rows only', async () => {
    renderTreeGrid();
    await settle();

    expect(row('Inbox')).toHaveAttribute('aria-expanded', 'false');
    expect(row('Sent')).not.toHaveAttribute('aria-expanded');
  });

  it('is one tab stop, on the first row', async () => {
    renderTreeGrid();
    await settle();

    expect(row('Inbox')).toHaveAttribute('tabindex', '0');
    expect(row('Sent')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('gridcell', { name: 'Inbox' })).toHaveAttribute('tabindex', '-1');
  });
});

describe('TreeGrid keyboard on rows', () => {
  it('opens a collapsed row with Right, then moves to its first cell', async () => {
    renderTreeGrid();
    await settle();
    row('Inbox').focus();

    pressKeyOnFocused('ArrowRight');
    await settle();
    expect(row('Inbox')).toHaveAttribute('aria-expanded', 'true');
    expect(row('Lunch')).toBeInTheDocument();
    expect(document.activeElement).toBe(row('Inbox'));

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(screen.getByRole('gridcell', { name: 'Inbox' }));
  });

  it('closes an expanded row with Left, and stays on a closed row', async () => {
    renderTreeGrid({ expanded: ['inbox'] });
    await settle();
    row('Inbox').focus();

    pressKeyOnFocused('ArrowLeft');
    await settle();
    expect(row('Inbox')).toHaveAttribute('aria-expanded', 'false');

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(row('Inbox'));
  });

  it('moves between rows with Up, Down, Home and End', async () => {
    renderTreeGrid({ expanded: ['inbox'] });
    await settle();
    row('Inbox').focus();

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(row('Lunch'));

    pressKeyOnFocused('End');
    expect(document.activeElement).toBe(row('Sent'));

    pressKeyOnFocused('Home');
    expect(document.activeElement).toBe(row('Inbox'));

    pressKeyOnFocused('ArrowUp');
    expect(document.activeElement).toBe(row('Inbox'));
  });

  it('toggles a parent row with Enter', async () => {
    const onExpandedChange = vi.fn<(value: string[]) => void>();
    renderTreeGrid({ onExpandedChange });
    await settle();
    row('Inbox').focus();

    pressKeyOnFocused('Enter');

    expect(onExpandedChange).toHaveBeenCalledWith(['inbox']);
  });
});

describe('TreeGrid keyboard on cells', () => {
  it('moves between cells, and from the first cell back to the row', async () => {
    renderTreeGrid({ expanded: ['inbox'] });
    await settle();
    screen.getByRole('gridcell', { name: 'Lunch' }).focus();

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Reply' }));

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(screen.getByRole('gridcell', { name: 'Lunch' }));

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(row('Lunch'));
  });

  it('moves up and down a column, including the header row', async () => {
    renderTreeGrid();
    await settle();
    screen.getByRole('gridcell', { name: '3' }).focus();

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(screen.getByRole('gridcell', { name: '0' }));

    pressKeyOnFocused('Home', { ctrlKey: true });
    expect(document.activeElement).toBe(screen.getByRole('columnheader', { name: 'Unread' }));
  });

  it('keeps the widgets of the focused row in the tab sequence', async () => {
    renderTreeGrid({ expanded: ['inbox'] });
    await settle();
    const reply = screen.getByRole('button', { name: 'Reply' });

    expect(reply).toHaveAttribute('tabindex', '-1');

    row('Lunch').focus();
    await settle();

    expect(reply).not.toHaveAttribute('tabindex', '-1');
  });
});
