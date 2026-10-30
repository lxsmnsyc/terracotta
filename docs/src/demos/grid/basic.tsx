import type { JSX } from '@solidjs/web';
import {
  Grid,
  GridBody,
  GridCell,
  GridColumnHeader,
  GridHead,
  GridRow,
  GridRowHeader,
} from 'terracotta/grid';

const PEOPLE = [
  { name: 'Ada Lovelace', role: 'Engineer', email: 'ada@example.com' },
  { name: 'Grace Hopper', role: 'Admiral', email: 'grace@example.com' },
  { name: 'Katherine Johnson', role: 'Mathematician', email: 'katherine@example.com' },
];

/**
 * One tab stop for the whole table. The arrow keys move between cells, and a
 * cell with a link puts focus on the link.
 */
export default function BasicGrid(): JSX.Element {
  return (
    <div class="stack">
      <Grid class="grid" aria-label="People">
        <GridHead>
          <GridRow>
            <GridColumnHeader class="grid-header" aria-sort="ascending">
              Name
            </GridColumnHeader>
            <GridColumnHeader class="grid-header">Role</GridColumnHeader>
            <GridColumnHeader class="grid-header">Email</GridColumnHeader>
          </GridRow>
        </GridHead>
        <GridBody>
          {PEOPLE.map((person) => (
            <GridRow>
              <GridRowHeader class="grid-cell grid-row-header">{person.name}</GridRowHeader>
              <GridCell class="grid-cell">{person.role}</GridCell>
              <GridCell class="grid-cell">
                <a class="grid-link" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </GridCell>
            </GridRow>
          ))}
        </GridBody>
      </Grid>
      <p class="hint">
        Tab in once, then use the arrow keys, <kbd>Home</kbd>, <kbd>End</kbd> and <kbd>Ctrl</kbd>+
        <kbd>Home</kbd>.
      </p>
    </div>
  );
}
