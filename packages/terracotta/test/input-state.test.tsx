import { flush } from 'solid-js';
import { withRoot } from './reactive';
import { describe, expect, it, vi } from 'vitest';
import { createInputState } from '../src/states';

describe('Input state', () => {
  it('starts with the default value', () => {
    const [state, dispose] = withRoot(() => createInputState({ defaultValue: 'hello' }));
    expect(state.value()).toBe('hello');
    dispose();
  });

  it('accepts an undefined default', () => {
    const [state, dispose] = withRoot(() => createInputState({ defaultValue: undefined }));
    expect(state.value()).toBeUndefined();
    dispose();
  });

  it('writes the new value and reports it', () => {
    const onChange = vi.fn<(state?: string) => void>();
    const [state, dispose] = withRoot(() => createInputState({ defaultValue: '', onChange }));
    state.setState('typed');
    flush();
    expect(state.value()).toBe('typed');
    expect(onChange).toHaveBeenCalledWith('typed');
    dispose();
  });

  it('can be cleared back to undefined', () => {
    const [state, dispose] = withRoot(() => createInputState({ defaultValue: 'hello' }));
    state.setState(undefined);
    flush();
    expect(state.value()).toBeUndefined();
    dispose();
  });

  it('ignores writes while disabled', () => {
    const onChange = vi.fn<(state?: string) => void>();
    const [state, dispose] = withRoot(() =>
      createInputState({
        defaultValue: 'hello',
        disabled: true,
        onChange,
      }),
    );
    state.setState('typed');
    flush();
    expect(state.value()).toBe('hello');
    expect(state.disabled()).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    dispose();
  });

  it('reports not disabled by default', () => {
    const [state, dispose] = withRoot(() => createInputState({ defaultValue: '' }));
    expect(state.disabled()).toBe(false);
    dispose();
  });

  it('leaves a controlled value to the owner and only reports the change', () => {
    const onChange = vi.fn<(state?: string) => void>();
    const [state, dispose] = withRoot(() => createInputState({ value: 'fixed', onChange }));
    state.setState('typed');
    flush();
    // The prop never changed, so neither did the value.
    expect(state.value()).toBe('fixed');
    expect(onChange).toHaveBeenCalledWith('typed');
    dispose();
  });

  it('tracks a controlled value as it changes', () => {
    let current = 'first';
    const [state, dispose] = withRoot(() =>
      createInputState({
        get value() {
          return current;
        },
      }),
    );
    expect(state.value()).toBe('first');
    current = 'second';
    expect(state.value()).toBe('second');
    dispose();
  });
});
