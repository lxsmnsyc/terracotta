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
  it('announces politely through the status role', () => {
    render(() => (
      <Toaster>
        <Toast>Copied to clipboard</Toast>
      </Toaster>
    ));
    const toast = screen.getByRole('status');

    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveTextContent('Copied to clipboard');
  });

  it('requires a surrounding Toaster', () => {
    expect(() => render(() => <Toast>Orphan</Toast>)).toThrow(MISSING_TOASTER);
  });
});
