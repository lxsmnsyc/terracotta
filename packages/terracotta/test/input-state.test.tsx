import { createRoot } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { createInputState } from '../src';

describe('Input state', () => {
  it('starts with the default value', () => {
    createRoot((dispose) => {
      const state = createInputState({ defaultValue: 'hello' });

      expect(state.value()).toBe('hello');
      dispose();
    });
  });

  it('accepts an undefined default', () => {
    createRoot((dispose) => {
      const state = createInputState({ defaultValue: undefined });

      expect(state.value()).toBeUndefined();
      dispose();
    });
  });

  it('writes the new value and reports it', () => {
    createRoot((dispose) => {
      const onChange = vi.fn<(state?: string) => void>();
      const state = createInputState({ defaultValue: '', onChange });

      state.setState('typed');

      expect(state.value()).toBe('typed');
      expect(onChange).toHaveBeenCalledWith('typed');
      dispose();
    });
  });

  it('can be cleared back to undefined', () => {
    createRoot((dispose) => {
      const state = createInputState({ defaultValue: 'hello' });

      state.setState(undefined);

      expect(state.value()).toBeUndefined();
      dispose();
    });
  });

  it('ignores writes while disabled', () => {
    createRoot((dispose) => {
      const onChange = vi.fn<(state?: string) => void>();
      const state = createInputState({
        defaultValue: 'hello',
        disabled: true,
        onChange,
      });

      state.setState('typed');

      expect(state.value()).toBe('hello');
      expect(state.disabled()).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
      dispose();
    });
  });

  it('reports not disabled by default', () => {
    createRoot((dispose) => {
      const state = createInputState({ defaultValue: '' });

      expect(state.disabled()).toBe(false);
      dispose();
    });
  });

  it('leaves a controlled value to the owner and only reports the change', () => {
    createRoot((dispose) => {
      const onChange = vi.fn<(state?: string) => void>();
      const state = createInputState({ value: 'fixed', onChange });

      state.setState('typed');

      // The prop never changed, so neither did the value.
      expect(state.value()).toBe('fixed');
      expect(onChange).toHaveBeenCalledWith('typed');
      dispose();
    });
  });

  it('tracks a controlled value as it changes', () => {
    createRoot((dispose) => {
      let current = 'first';
      const state = createInputState({
        get value() {
          return current;
        },
      });

      expect(state.value()).toBe('first');

      current = 'second';

      expect(state.value()).toBe('second');
      dispose();
    });
  });
});
