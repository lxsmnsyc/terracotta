import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '../src/components/breadcrumb';

function renderTrail(label?: string): void {
  render(() => (
    <Breadcrumb aria-label={label}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/tree" current>
            Tree
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ));
}

describe('Breadcrumb accessibility', () => {
  it('is a navigation landmark named Breadcrumb', () => {
    renderTrail();

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('takes another name', () => {
    renderTrail('You are here');

    expect(screen.getByRole('navigation', { name: 'You are here' })).toBeInTheDocument();
  });

  it('lists the trail in order', () => {
    renderTrail();

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['Home', 'Docs', 'Tree']);
  });

  it('marks only the current page with aria-current', () => {
    renderTrail();

    expect(screen.getByRole('link', { name: 'Tree' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });
});
