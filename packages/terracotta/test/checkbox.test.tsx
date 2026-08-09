import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from '../src';

function renderCheckbox(props: { disabled?: boolean; checked?: boolean } = {}) {
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
    const labelID = indicator.getAttribute('aria-labelledby');

    expect(labelID).toBeTruthy();
    expect(document.getElementById(labelID as string)).toHaveTextContent(
      'Notify me',
    );
  });

  it('describes the indicator through `aria-describedby`', () => {
    renderCheckbox();
    const indicator = screen.getByRole('checkbox');
    const descriptionID = indicator.getAttribute('aria-describedby');

    expect(descriptionID).toBeTruthy();
    expect(document.getElementById(descriptionID as string)).toHaveTextContent(
      'Send an email on every reply',
    );
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
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'false',
    );

    screen.getByRole('checkbox').click();

    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('reports an indeterminate checkbox as mixed', () => {
    render(() => (
      <Checkbox defaultChecked={undefined}>
        <CheckboxLabel>Notify me</CheckboxLabel>
        <CheckboxIndicator />
      </Checkbox>
    ));

    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
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
