import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { describedBy, labelledBy, pressKeyOnFocused } from './aria';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '../src';

const OPTIONS = ['small', 'medium', 'large'];

function renderRadioGroup(
  props: { value?: string; disabled?: string[] } = {},
): ReturnType<typeof render> {
  return render(() => (
    <RadioGroup defaultValue={props.value}>
      <RadioGroupLabel>Size</RadioGroupLabel>
      <RadioGroupDescription>Pick a shirt size</RadioGroupDescription>
      {OPTIONS.map((option) => (
        <RadioGroupOption value={option} disabled={props.disabled?.includes(option)}>
          <RadioGroupLabel>{option}</RadioGroupLabel>
        </RadioGroupOption>
      ))}
    </RadioGroup>
  ));
}

function getOption(name: string): HTMLElement {
  return screen.getByRole('radio', { name });
}

describe('RadioGroup accessibility', () => {
  it('uses the radiogroup / radio role pair', () => {
    renderRadioGroup();

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(OPTIONS.length);
  });

  it('names and describes the group', () => {
    renderRadioGroup();
    const group = screen.getByRole('radiogroup');

    expect(labelledBy(group)).toHaveTextContent('Size');
    expect(describedBy(group)).toHaveTextContent('Pick a shirt size');
  });

  it('names every option from its own label', () => {
    renderRadioGroup();

    for (const option of OPTIONS) {
      expect(getOption(option)).toBeInTheDocument();
    }
  });

  it('reports an unselected group as fully unchecked', () => {
    renderRadioGroup();

    for (const option of OPTIONS) {
      expect(getOption(option)).toHaveAttribute('aria-checked', 'false');
    }
  });

  it('checks only the option matching `defaultValue`', () => {
    renderRadioGroup({ value: 'medium' });

    expect(getOption('medium')).toHaveAttribute('aria-checked', 'true');
    expect(getOption('small')).toHaveAttribute('aria-checked', 'false');
  });

  it('keeps a single tab stop across the group', () => {
    renderRadioGroup({ value: 'medium' });

    expect(getOption('medium')).toHaveAttribute('tabindex', '0');
    expect(getOption('small')).toHaveAttribute('tabindex', '-1');
    expect(getOption('large')).toHaveAttribute('tabindex', '-1');
  });

  it('checks an option on click', () => {
    renderRadioGroup();

    getOption('large').click();

    expect(getOption('large')).toHaveAttribute('aria-checked', 'true');
    expect(getOption('small')).toHaveAttribute('aria-checked', 'false');
  });

  it('moves the checked option with the arrow keys', () => {
    renderRadioGroup({ value: 'small' });
    getOption('small').focus();

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(getOption('medium'));
    expect(getOption('medium')).toHaveAttribute('aria-checked', 'true');

    pressKeyOnFocused('ArrowUp');
    expect(document.activeElement).toBe(getOption('small'));
    expect(getOption('small')).toHaveAttribute('aria-checked', 'true');
  });

  it('marks disabled options and skips them while navigating', () => {
    renderRadioGroup({ value: 'small', disabled: ['medium'] });
    const disabled = getOption('medium');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).toHaveAttribute('tabindex', '-1');

    getOption('small').focus();
    pressKeyOnFocused('ArrowRight');

    expect(document.activeElement).toBe(getOption('large'));
  });

  it('marks the whole group as disabled', () => {
    render(() => (
      <RadioGroup defaultValue="small" disabled={true}>
        <RadioGroupLabel>Size</RadioGroupLabel>
        {OPTIONS.map((option) => (
          <RadioGroupOption value={option}>
            <RadioGroupLabel>{option}</RadioGroupLabel>
          </RadioGroupOption>
        ))}
      </RadioGroup>
    ));

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true');
    expect(getOption('large')).toHaveAttribute('aria-disabled', 'true');

    getOption('large').click();

    expect(getOption('large')).toHaveAttribute('aria-checked', 'false');
  });
});
