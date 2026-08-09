import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../src';

function renderDisclosure(
  props: { open?: boolean; disabled?: boolean } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Disclosure defaultOpen={props.open ?? false} disabled={props.disabled}>
      <DisclosureButton>Details</DisclosureButton>
      <DisclosurePanel>Panel body</DisclosurePanel>
    </Disclosure>
  ));
}

describe('Disclosure accessibility', () => {
  it('marks the trigger as collapsed while closed', () => {
    renderDisclosure();

    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('keeps the panel out of the accessibility tree while closed', () => {
    renderDisclosure();

    expect(screen.queryByText('Panel body')).not.toBeInTheDocument();
  });

  it('omits `aria-controls` while closed instead of pointing at a missing id', () => {
    renderDisclosure();

    expect(screen.getByRole('button', { name: 'Details' })).not.toHaveAttribute('aria-controls');
  });

  it('marks the trigger as expanded and links it to the panel once open', () => {
    renderDisclosure({ open: true });
    const button = screen.getByRole('button', { name: 'Details' });
    const panel = screen.getByText('Panel body');

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', panel.id);
  });

  it('toggles the expanded state on click', () => {
    renderDisclosure();
    const button = screen.getByRole('button', { name: 'Details' });

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Panel body')).toBeInTheDocument();

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Panel body')).not.toBeInTheDocument();
  });

  it('does not toggle while disabled', () => {
    renderDisclosure({ disabled: true });
    const button = screen.getByRole('button', { name: 'Details' });

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the panel mounted but collapsed when `unmount` is false', () => {
    render(() => (
      <Disclosure defaultOpen={false}>
        <DisclosureButton>Details</DisclosureButton>
        <DisclosurePanel unmount={false}>Panel body</DisclosurePanel>
      </Disclosure>
    ));

    expect(screen.getByText('Panel body')).toBeInTheDocument();
  });
});
