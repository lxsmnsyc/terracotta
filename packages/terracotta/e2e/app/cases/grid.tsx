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
  { name: 'Ada', role: 'Engineer' },
  { name: 'Grace', role: 'Admiral' },
];

export default function GridCase(): JSX.Element {
  return (
    <div>
      <button type="button">Before</button>
      <Grid aria-label="People">
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
      <button type="button">After</button>
    </div>
  );
}
