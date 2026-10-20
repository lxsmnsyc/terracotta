import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import {
  Grid,
  GridBody,
  GridCell,
  GridColumnHeader,
  GridHead,
  GridRow,
  GridRowHeader,
} from '../src/components/grid';
import { pressKeyOnFocused, settle } from './aria';

const PEOPLE = [
  { name: 'Ada', role: 'Engineer' },
  { name: 'Grace', role: 'Admiral' },
  { name: 'Katherine', role: 'Mathematician' },
];

function renderGrid(options: { wrap?: boolean; pageSize?: number } = {}): void {
  render(() => (
    <Grid aria-label="People" wrap={options.wrap} pageSize={options.pageSize}>
      <GridHead>
        <GridRow>
          <GridColumnHeader>Name</GridColumnHeader>
          <GridColumnHeader>Role</GridColumnHeader>
          <GridColumnHeader>Profile</GridColumnHeader>
        </GridRow>
      </GridHead>
      <GridBody>
        {PEOPLE.map((person) => (
          <GridRow>
            <GridRowHeader>{person.name}</GridRowHeader>
            <GridCell>{person.role}</GridCell>
            <GridCell>
              <a href={`#${person.name}`}>{`${person.name}'s profile`}</a>
            </GridCell>
          </GridRow>
        ))}
      </GridBody>
    </Grid>
  ));
}

function cell(name: string): HTMLElement {
  return screen.getByRole('gridcell', { name });
}

describe('Grid accessibility', () => {
  it('uses the grid, row and cell roles', () => {
    renderGrid();

    expect(screen.getByRole('grid', { name: 'People' })).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('rowheader')).toHaveLength(3);
  });

  it('groups the rows with rowgroup', () => {
    renderGrid();

    const groups = screen.getAllByRole('rowgroup');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toContainElement(screen.getByRole('columnheader', { name: 'Name' }));
  });

  it('keeps the roles when built from divs', async () => {
    render(() => (
      <Grid as="div" aria-label="Recipients">
        <GridBody as="div">
          <GridRow as="div">
            <GridCell as="div">Ada</GridCell>
            <GridCell as="div">Grace</GridCell>
          </GridRow>
        </GridBody>
      </Grid>
    ));
    await settle();

    expect(screen.getByRole('grid', { name: 'Recipients' })).toBeInTheDocument();
    expect(screen.getByRole('rowgroup')).toBeInTheDocument();
    screen.getByRole('gridcell', { name: 'Ada' }).focus();
    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(screen.getByRole('gridcell', { name: 'Grace' }));
  });

  it('is one tab stop, on the first cell', async () => {
    renderGrid();
    await settle();

    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('tabindex', '0');
    expect(cell('Engineer')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('link', { name: "Ada's profile" })).toHaveAttribute('tabindex', '-1');
  });

  it('puts focus on the one widget in a cell, not the cell', async () => {
    renderGrid();
    await settle();
    cell('Engineer').focus();

    pressKeyOnFocused('ArrowRight');

    const link = screen.getByRole('link', { name: "Ada's profile" });
    expect(document.activeElement).toBe(link);
    // The link keeps its own place in the tab sequence.
    expect(link).not.toHaveAttribute('tabindex', '-1');
    expect(link.parentElement).not.toHaveAttribute('tabindex');
  });
});

describe('Grid keyboard', () => {
  it('moves between cells with the arrow keys, and stops at the edges', async () => {
    renderGrid();
    await settle();
    screen.getByRole('rowheader', { name: 'Ada' }).focus();

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(cell('Engineer'));

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(cell('Admiral'));

    pressKeyOnFocused('ArrowUp');
    pressKeyOnFocused('ArrowUp');
    expect(document.activeElement).toBe(screen.getByRole('columnheader', { name: 'Role' }));

    pressKeyOnFocused('ArrowUp');
    expect(document.activeElement).toBe(screen.getByRole('columnheader', { name: 'Role' }));

    pressKeyOnFocused('ArrowLeft');
    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(screen.getByRole('columnheader', { name: 'Name' }));
  });

  it('goes to the ends of a row with Home and End, and of the grid with Ctrl', async () => {
    renderGrid();
    await settle();
    cell('Admiral').focus();

    pressKeyOnFocused('Home');
    expect(document.activeElement).toBe(screen.getByRole('rowheader', { name: 'Grace' }));

    pressKeyOnFocused('End');
    expect(document.activeElement).toBe(screen.getByRole('link', { name: "Grace's profile" }));

    pressKeyOnFocused('Home', { ctrlKey: true });
    expect(document.activeElement).toBe(screen.getByRole('columnheader', { name: 'Name' }));

    pressKeyOnFocused('End', { ctrlKey: true });
    expect(document.activeElement).toBe(screen.getByRole('link', { name: "Katherine's profile" }));
  });

  it('moves by pageSize rows with Page Down and Page Up', async () => {
    renderGrid({ pageSize: 2 });
    await settle();
    screen.getByRole('columnheader', { name: 'Role' }).focus();

    pressKeyOnFocused('PageDown');
    expect(document.activeElement).toBe(cell('Admiral'));

    pressKeyOnFocused('PageDown');
    expect(document.activeElement).toBe(cell('Mathematician'));

    pressKeyOnFocused('PageUp');
    expect(document.activeElement).toBe(cell('Engineer'));
  });

  it('wraps across rows in a layout grid', async () => {
    renderGrid({ wrap: true });
    await settle();
    screen.getByRole('link', { name: "Ada's profile" }).focus();

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(screen.getByRole('rowheader', { name: 'Grace' }));

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(screen.getByRole('link', { name: "Ada's profile" }));
  });

  it('moves the tab stop with focus', async () => {
    renderGrid();
    await settle();
    cell('Admiral').focus();
    await settle();

    expect(cell('Admiral')).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('tabindex', '-1');
  });

  it('leaves the arrow keys to a text field in a cell', async () => {
    render(() => (
      <Grid aria-label="Edit">
        <GridBody>
          <GridRow>
            <GridCell>
              <input aria-label="Note" />
            </GridCell>
            <GridCell>Done</GridCell>
          </GridRow>
        </GridBody>
      </Grid>
    ));
    await settle();
    const field = screen.getByRole('textbox', { name: 'Note' });
    field.focus();

    pressKeyOnFocused('ArrowRight');

    expect(document.activeElement).toBe(field);
  });
});
