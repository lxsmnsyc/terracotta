import { render, screen } from '@solidjs/testing-library';
import { flush } from 'solid-js';
import { withRoot } from './reactive';
import { describe, expect, it, vi } from 'vitest';
import { Select, SelectOption } from '../src/components/select';
import {
  SelectStateChild,
  createMultipleSelectState,
  createSingleSelectState,
} from '../src/states';

interface User {
  id: number;
  name: string;
}

const ADA: User = { id: 1, name: 'Ada' };
/** Same id as ADA, different object, so only `by` can tell they match. */
const ADA_AGAIN: User = { id: 1, name: 'Ada' };
const GRACE: User = { id: 2, name: 'Grace' };

const byId = (a: User, b: User): boolean => a.id === b.id;

describe('Single select state', () => {
  it('starts with the default value selected', () => {
    const [state, dispose] = withRoot(() => createSingleSelectState({ defaultValue: 'b' }));
    expect(state.isSelected('b')).toBe(true);
    expect(state.isSelected('a')).toBe(false);
    expect(state.hasSelected()).toBe(true);
    dispose();
  });

  it('reports nothing selected when the default value is undefined', () => {
    const [state, dispose] = withRoot(() =>
      createSingleSelectState<string>({ defaultValue: undefined }),
    );
    expect(state.hasSelected()).toBe(false);
    dispose();
  });

  it('replaces the selection and reports the new value', () => {
    const onChange = vi.fn<(value?: string) => void>();
    const [state, dispose] = withRoot(() =>
      createSingleSelectState({ defaultValue: 'a', onChange }),
    );
    state.select('b');
    flush();
    expect(state.isSelected('b')).toBe(true);
    expect(state.isSelected('a')).toBe(false);
    expect(onChange).toHaveBeenCalledWith('b');
    dispose();
  });

  it('keeps the selection when the same value is selected again', () => {
    const [state, dispose] = withRoot(() => createSingleSelectState({ defaultValue: 'a' }));
    state.select('a');
    flush();
    expect(state.isSelected('a')).toBe(true);
    dispose();
  });

  it('clears the selection when a toggleable state re-selects the same value', () => {
    const onChange = vi.fn<(value?: string) => void>();
    const [state, dispose] = withRoot(() =>
      createSingleSelectState({
        defaultValue: 'a',
        toggleable: true,
        onChange,
      }),
    );
    state.select('a');
    flush();
    expect(state.hasSelected()).toBe(false);
    expect(onChange).toHaveBeenCalledWith(undefined);
    dispose();
  });

  it('uses `by` to decide which value a toggleable state clears', () => {
    const [state, dispose] = withRoot(() =>
      createSingleSelectState<User>({
        defaultValue: ADA,
        toggleable: true,
        by: byId,
      }),
    );
    // A different object with the same id still counts as the selected one.
    state.select(ADA_AGAIN);
    flush();
    expect(state.hasSelected()).toBe(false);
    dispose();
  });

  it('uses `by` for the active value', () => {
    const [state, dispose] = withRoot(() =>
      createSingleSelectState<User>({
        defaultValue: undefined,
        by: byId,
      }),
    );
    state.focus(ADA);
    flush();
    expect(state.isActive(ADA_AGAIN)).toBe(true);
    expect(state.isActive(GRACE)).toBe(false);
    dispose();
  });

  it('compares `isSelected` by reference even when `by` is given', () => {
    const [state, dispose] = withRoot(() =>
      createSingleSelectState<User>({ defaultValue: ADA, by: byId }),
    );
    // Documented quirk: in single mode `isSelected` ignores `by`, so an equal
    // but distinct object reads as unselected. See docs/states.md.
    expect(state.isSelected(ADA)).toBe(true);
    expect(state.isSelected(ADA_AGAIN)).toBe(false);
    dispose();
  });

  it('tracks the active value independently of the selected one', () => {
    const [state, dispose] = withRoot(() => createSingleSelectState({ defaultValue: 'a' }));
    expect(state.hasActive()).toBe(false);
    state.focus('b');
    flush();
    expect(state.hasActive()).toBe(true);
    expect(state.isActive('b')).toBe(true);
    expect(state.isSelected('a')).toBe(true);
    state.blur();
    flush();
    expect(state.hasActive()).toBe(false);
    dispose();
  });

  it('blocks selection and focus while disabled', () => {
    const onChange = vi.fn<(value?: string) => void>();
    const [state, dispose] = withRoot(() =>
      createSingleSelectState({
        defaultValue: 'a',
        disabled: true,
        onChange,
      }),
    );
    state.select('b');
    flush();
    state.focus('b');
    flush();
    expect(state.isSelected('a')).toBe(true);
    expect(state.hasActive()).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
    dispose();
  });

  it('leaves a controlled value to the owner and only reports the change', () => {
    const onChange = vi.fn<(value?: string) => void>();
    const [state, dispose] = withRoot(() => createSingleSelectState({ value: 'a', onChange }));
    state.select('b');
    flush();
    // The prop never changed, so neither did the state.
    expect(state.isSelected('a')).toBe(true);
    expect(onChange).toHaveBeenCalledWith('b');
    dispose();
  });
});

describe('Multiple select state', () => {
  it('starts with every default value selected', () => {
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState({
        multiple: true,
        defaultValue: ['a', 'c'],
      }),
    );
    expect(state.isSelected('a')).toBe(true);
    expect(state.isSelected('c')).toBe(true);
    expect(state.isSelected('b')).toBe(false);
    dispose();
  });

  it('adds to the selection instead of replacing it', () => {
    const onChange = vi.fn<(value: string[]) => void>();
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState({
        multiple: true,
        defaultValue: ['a'],
        onChange,
      }),
    );
    state.select('b');
    flush();
    expect(state.isSelected('a')).toBe(true);
    expect(state.isSelected('b')).toBe(true);
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
    dispose();
  });

  it('removes an already-selected value when toggleable', () => {
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState({
        multiple: true,
        defaultValue: ['a', 'b'],
        toggleable: true,
      }),
    );
    state.select('a');
    flush();
    expect(state.isSelected('a')).toBe(false);
    expect(state.isSelected('b')).toBe(true);
    dispose();
  });

  it('keeps a value selected when re-selected without `toggleable`', () => {
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState({
        multiple: true,
        defaultValue: ['a'],
      }),
    );
    state.select('a');
    flush();
    expect(state.isSelected('a')).toBe(true);
    dispose();
  });

  it('uses `by` for membership, unlike single mode', () => {
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState<User>({
        multiple: true,
        defaultValue: [ADA],
        by: byId,
      }),
    );
    expect(state.isSelected(ADA_AGAIN)).toBe(true);
    expect(state.isSelected(GRACE)).toBe(false);
    dispose();
  });

  it('does not add a duplicate when `by` says the value is already there', () => {
    const onChange = vi.fn<(value: User[]) => void>();
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState<User>({
        multiple: true,
        defaultValue: [ADA],
        by: byId,
        onChange,
      }),
    );
    state.select(ADA_AGAIN);
    flush();
    expect(onChange).toHaveBeenCalledWith([ADA]);
    dispose();
  });

  it('reports an empty selection through `hasSelected`', () => {
    const [state, dispose] = withRoot(() =>
      createMultipleSelectState<string>({
        multiple: true,
        defaultValue: [],
      }),
    );
    expect(state.hasSelected()).toBe(false);
    state.select('a');
    flush();
    expect(state.hasSelected()).toBe(true);
    dispose();
  });
});

describe('SelectStateChild', () => {
  it('passes the state to a one-parameter render prop', () => {
    render(() => (
      <Select defaultValue="b">
        <SelectOption value="a">A</SelectOption>
        <SelectOption value="b">B</SelectOption>
        <SelectStateChild>
          {(state) => <p>{state.isSelected('b') ? 'b selected' : 'nothing selected'}</p>}
        </SelectStateChild>
      </Select>
    ));

    expect(screen.getByText('b selected')).toBeInTheDocument();
  });

  it('renders a zero-parameter function as a plain child instead of a render prop', () => {
    render(() => (
      <Select defaultValue="a">
        <SelectOption value="a">A</SelectOption>
        <SelectStateChild>{() => <p>plain child</p>}</SelectStateChild>
      </Select>
    ));

    expect(screen.getByText('plain child')).toBeInTheDocument();
  });
});
