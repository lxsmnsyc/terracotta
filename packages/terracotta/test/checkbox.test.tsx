import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { describedBy, labelledBy, settle } from './aria';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from '../src/components/checkbox';

function renderCheckbox(
  props: { disabled?: boolean; checked?: boolean } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Checkbox defaultChecked={props.checked ?? false} disabled={props.disabled}>
      <CheckboxLabel>Notify me</CheckboxLabel>
      <CheckboxIndicator data-testid="indicator" />
      <CheckboxDescription>Send an email on every reply</CheckboxDescription>
    </Checkbox>
  ));
}

describe('Checkbox accessibility', () => {
  it('exposes the indicator with the `checkbox` role', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('names the indicator through `aria-labelledby`', () => {
    renderCheckbox();
    const indicator = screen.getByRole('checkbox');

    expect(labelledBy(indicator)).toHaveTextContent('Notify me');
  });

  it('describes the indicator through `aria-describedby`', () => {
    renderCheckbox();
    const indicator = screen.getByRole('checkbox');

    expect(describedBy(indicator)).toHaveTextContent('Send an email on every reply');
  });

  it('points the label `for` at the indicator', () => {
    renderCheckbox();
    const indicator = screen.getByRole('checkbox');
    const label = document.querySelector('label');

    expect(label).toHaveAttribute('for', indicator.id);
  });

  it('is focusable when enabled', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toHaveAttribute('tabindex', '0');
  });

  it('is removed from the tab order and marked disabled when disabled', () => {
    renderCheckbox({ disabled: true });
    const indicator = screen.getByRole('checkbox');

    expect(indicator).toHaveAttribute('tabindex', '-1');
    expect(indicator).toHaveAttribute('aria-disabled', 'true');
    expect(indicator).toHaveAttribute('tc-disabled');
  });

  it('announces the checked state through `aria-checked`', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');

    screen.getByRole('checkbox').click();

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('reports an indeterminate checkbox as mixed', () => {
    render(() => (
      <Checkbox defaultChecked={undefined}>
        <CheckboxLabel>Notify me</CheckboxLabel>
        <CheckboxIndicator />
      </Checkbox>
    ));

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('reflects the checked state on every part', () => {
    renderCheckbox({ checked: true });

    expect(screen.getByRole('checkbox')).toHaveAttribute('tc-checked');
    expect(document.querySelector('label')).toHaveAttribute('tc-checked');
  });

  it('toggles the checked state on click', () => {
    renderCheckbox();
    const indicator = screen.getByRole('checkbox');

    expect(indicator).not.toHaveAttribute('tc-checked');

    indicator.click();

    expect(indicator).toHaveAttribute('tc-checked');
  });

  it('does not toggle while disabled', () => {
    renderCheckbox({ disabled: true });
    const indicator = screen.getByRole('checkbox');

    indicator.click();
    expect(indicator).not.toHaveAttribute('tc-checked');
  });
});

describe('Checkbox IDREFs', () => {
  it('omits `aria-labelledby` and `aria-describedby` when the parts are not rendered', async () => {
    render(() => (
      <Checkbox defaultChecked={false}>
        <CheckboxIndicator aria-label="Notify me" />
      </Checkbox>
    ));
    await settle();
    const indicator = screen.getByRole('checkbox', { name: 'Notify me' });

    expect(indicator).not.toHaveAttribute('aria-labelledby');
    expect(indicator).not.toHaveAttribute('aria-describedby');
  });

  it('lets the consumer override `aria-labelledby` and `aria-describedby`', async () => {
    render(() => (
      <>
        <span id="own-label">Own label</span>
        <span id="own-description">Own description</span>
        <Checkbox defaultChecked={false}>
          <CheckboxLabel>Notify me</CheckboxLabel>
          <CheckboxIndicator aria-labelledby="own-label" aria-describedby="own-description" />
          <CheckboxDescription>Send an email on every reply</CheckboxDescription>
        </Checkbox>
      </>
    ));
    await settle();
    const indicator = screen.getByRole('checkbox');

    expect(labelledBy(indicator)).toHaveTextContent('Own label');
    expect(describedBy(indicator)).toHaveTextContent('Own description');
  });

  it('puts no ARIA state on the wrapper element', async () => {
    render(() => (
      <Checkbox defaultChecked={false} disabled data-testid="root">
        <CheckboxIndicator aria-label="Notify me" />
      </Checkbox>
    ));
    await settle();
    const root = screen.getByTestId('root');

    expect(root).not.toHaveAttribute('aria-disabled');
    expect(root).not.toHaveAttribute('disabled');
    expect(root).toHaveAttribute('tc-disabled');
  });
});
