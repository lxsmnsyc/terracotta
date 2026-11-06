import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, describedBy, labelledBy, pressKeyOnFocused, settle } from './aria';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '../src/components/radio-group';

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

  it('moves the checked option with the arrow keys', async () => {
    renderRadioGroup({ value: 'small' });
    getOption('small').focus();

    pressKeyOnFocused('ArrowDown');
    expect(await activeElement()).toBe(getOption('medium'));
    expect(getOption('medium')).toHaveAttribute('aria-checked', 'true');

    pressKeyOnFocused('ArrowUp');
    expect(await activeElement()).toBe(getOption('small'));
    expect(getOption('small')).toHaveAttribute('aria-checked', 'true');
  });

  it('marks disabled options and skips them while navigating', async () => {
    renderRadioGroup({ value: 'small', disabled: ['medium'] });
    const disabled = getOption('medium');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).toHaveAttribute('tabindex', '-1');

    getOption('small').focus();
    pressKeyOnFocused('ArrowRight');

    expect(await activeElement()).toBe(getOption('large'));
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

describe('RadioGroup tab stop', () => {
  it('puts the first option in the tab order when nothing is checked', async () => {
    renderRadioGroup();
    await settle();

    expect(getOption('small')).toHaveAttribute('tabindex', '0');
    expect(getOption('medium')).toHaveAttribute('tabindex', '-1');
    expect(getOption('large')).toHaveAttribute('tabindex', '-1');
  });

  it('skips a disabled first option', async () => {
    renderRadioGroup({ disabled: ['small'] });
    await settle();

    expect(getOption('small')).toHaveAttribute('tabindex', '-1');
    expect(getOption('medium')).toHaveAttribute('tabindex', '0');
  });

  it('falls back to the first enabled option when the checked one is disabled', async () => {
    renderRadioGroup({ value: 'large', disabled: ['large'] });
    await settle();

    expect(getOption('small')).toHaveAttribute('tabindex', '0');
    expect(getOption('large')).toHaveAttribute('tabindex', '-1');
  });

  it('moves the tab stop to the option that gets checked', async () => {
    renderRadioGroup();
    await settle();

    getOption('large').click();
    await settle();

    expect(getOption('large')).toHaveAttribute('tabindex', '0');
    expect(getOption('small')).toHaveAttribute('tabindex', '-1');
  });

  it('does not check an option just because it receives focus', async () => {
    renderRadioGroup();
    await settle();

    fireEvent.focus(getOption('small'));
    getOption('small').focus();
    await settle();

    expect(getOption('small')).toHaveAttribute('aria-checked', 'false');
  });

  it('has no tab stop while the whole group is disabled', async () => {
    render(() => (
      <RadioGroup defaultValue={undefined} disabled>
        {OPTIONS.map((option) => (
          <RadioGroupOption value={option}>
            <RadioGroupLabel>{option}</RadioGroupLabel>
          </RadioGroupOption>
        ))}
      </RadioGroup>
    ));
    await settle();

    for (const option of OPTIONS) {
      expect(getOption(option)).toHaveAttribute('tabindex', '-1');
    }
  });
});

describe('RadioGroup IDREFs', () => {
  it('omits `aria-labelledby` and `aria-describedby` when the parts are not rendered', async () => {
    render(() => (
      <RadioGroup defaultValue={undefined} aria-label="Size">
        <RadioGroupOption value="small" aria-label="Small" />
      </RadioGroup>
    ));
    await settle();
    const group = screen.getByRole('radiogroup', { name: 'Size' });
    const option = screen.getByRole('radio', { name: 'Small' });

    expect(group).not.toHaveAttribute('aria-labelledby');
    expect(group).not.toHaveAttribute('aria-describedby');
    expect(option).not.toHaveAttribute('aria-labelledby');
    expect(option).not.toHaveAttribute('aria-describedby');
  });

  it('describes an option from its own description', async () => {
    render(() => (
      <RadioGroup defaultValue={undefined}>
        <RadioGroupLabel>Size</RadioGroupLabel>
        <RadioGroupOption value="small">
          <RadioGroupLabel>Small</RadioGroupLabel>
          <RadioGroupDescription>Fits most children</RadioGroupDescription>
        </RadioGroupOption>
      </RadioGroup>
    ));
    await settle();
    const option = screen.getByRole('radio', { name: 'Small' });

    expect(describedBy(option)).toHaveTextContent('Fits most children');
    expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-describedby');
  });

  it('lets the consumer override `aria-labelledby` and `aria-describedby`', async () => {
    render(() => (
      <>
        <span id="own-label">Own label</span>
        <span id="own-description">Own description</span>
        <RadioGroup defaultValue={undefined}>
          <RadioGroupOption
            value="small"
            aria-labelledby="own-label"
            aria-describedby="own-description"
          >
            <RadioGroupLabel>Small</RadioGroupLabel>
            <RadioGroupDescription>Fits most children</RadioGroupDescription>
          </RadioGroupOption>
        </RadioGroup>
      </>
    ));
    await settle();
    const option = screen.getByRole('radio');

    expect(labelledBy(option)).toHaveTextContent('Own label');
    expect(describedBy(option)).toHaveTextContent('Own description');
  });
});
