import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Alert } from '../src/components/alert';
import { Toast, Toaster } from '../src/components/toast';

const MISSING_TOASTER = /must be used inside a <Toaster>/;

describe('Alert accessibility', () => {
  it('exposes the alert role so the message is announced', () => {
    render(() => <Alert>Could not save</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Could not save');
  });

  it('always carries an id so it can be referenced', () => {
    render(() => <Alert>Could not save</Alert>);

    expect(screen.getByRole('alert').id).toBeTruthy();
  });

  it('keeps the alert role when rendered as another element', () => {
    render(() => <Alert as="p">Could not save</Alert>);
    const alert = screen.getByRole('alert');

    expect(alert.tagName).toBe('P');
  });
});

describe('Toast accessibility', () => {
  it('makes the Toaster the polite live region', () => {
    render(() => <Toaster data-testid="toaster" />);
    const region = screen.getByTestId('toaster');

    // The region exists while empty, so the first toast added is announced.
    expect(region).toHaveAttribute('role', 'status');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toHaveAttribute('aria-atomic', 'false');
    expect(region).toHaveAttribute('aria-relevant', 'additions text');
  });

  it('gives the toast no live role of its own', () => {
    render(() => (
      <Toaster>
        <Toast data-testid="toast">Copied to clipboard</Toast>
      </Toaster>
    ));
    const toast = screen.getByTestId('toast');

    expect(toast).not.toHaveAttribute('role');
    expect(toast).not.toHaveAttribute('aria-live');
    expect(screen.getByRole('status')).toContainElement(toast);
  });

  it('lets the consumer change the live region', () => {
    render(() => (
      <Toaster role="log" aria-live="assertive">
        <Toast role="alert">Upload failed</Toast>
      </Toaster>
    ));

    expect(screen.getByRole('log')).toHaveAttribute('aria-live', 'assertive');
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed');
  });

  it('requires a surrounding Toaster', () => {
    expect(() => render(() => <Toast>Orphan</Toast>)).toThrow(MISSING_TOASTER);
  });
});
