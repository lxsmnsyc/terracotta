import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../src/components/switch';

function getSwitch(name = 'Aeroplane mode'): HTMLElement {
  return screen.getByRole('switch', { name });
}

describe('Switch accessibility', () => {
  it('uses the switch role with a string `aria-checked`', () => {
    render(() => <Switch defaultChecked={false}>Aeroplane mode</Switch>);

    expect(getSwitch()).toHaveAttribute('aria-checked', 'false');
    expect(getSwitch()).not.toHaveAttribute('aria-pressed');
  });

  it('flips `aria-checked` when clicked', () => {
    render(() => <Switch defaultChecked={false}>Aeroplane mode</Switch>);

    getSwitch().click();

    expect(getSwitch()).toHaveAttribute('aria-checked', 'true');
    expect(getSwitch()).toHaveAttribute('tc-checked');
  });

  it('starts on when `defaultChecked` is true', () => {
    render(() => <Switch defaultChecked={true}>Aeroplane mode</Switch>);

    expect(getSwitch()).toHaveAttribute('aria-checked', 'true');
  });

  it('can be named from another element', () => {
    render(() => (
      <>
        <span id="label">Wi-Fi</span>
        <Switch defaultChecked={false} aria-labelledby="label" />
      </>
    ));

    expect(getSwitch('Wi-Fi')).toBeInTheDocument();
  });

  it('does not change while disabled', () => {
    render(() => (
      <Switch defaultChecked={false} disabled={true}>
        Aeroplane mode
      </Switch>
    ));

    expect(getSwitch()).toHaveAttribute('aria-disabled', 'true');

    getSwitch().click();

    expect(getSwitch()).toHaveAttribute('aria-checked', 'false');
  });
});

describe('Switch in a form', () => {
  it('does not submit the form when flipped', () => {
    const onSubmit = vi.fn((event: SubmitEvent) => {
      event.preventDefault();
    });
    render(() => (
      <form onSubmit={onSubmit}>
        <Switch defaultChecked={false}>Aeroplane mode</Switch>
      </form>
    ));

    expect(getSwitch()).toHaveAttribute('type', 'button');

    getSwitch().click();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(getSwitch()).toHaveAttribute('aria-checked', 'true');
  });

  it('keeps a type that is passed in', () => {
    render(() => (
      <Switch defaultChecked={false} type="submit">
        Aeroplane mode
      </Switch>
    ));

    expect(getSwitch()).toHaveAttribute('type', 'submit');
  });
});

describe('Switch state', () => {
  it('reports the new value through `onChange`', () => {
    const onChange = vi.fn<(checked: boolean) => void>();
    render(() => (
      <Switch defaultChecked={false} onChange={onChange}>
        Aeroplane mode
      </Switch>
    ));

    getSwitch().click();

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('follows `checked` when controlled', async () => {
    const [checked, setChecked] = createSignal(false);
    render(() => (
      <Switch
        checked={checked()}
        onChange={(value: boolean) => {
          setChecked(value);
        }}
      >
        Aeroplane mode
      </Switch>
    ));

    getSwitch().click();
    await Promise.resolve();

    expect(checked()).toBe(true);
    expect(getSwitch()).toHaveAttribute('aria-checked', 'true');
  });

  it('only reports a change while controlled', () => {
    const onChange = vi.fn<(checked: boolean) => void>();
    render(() => (
      <Switch checked={false} onChange={onChange}>
        Aeroplane mode
      </Switch>
    ));

    getSwitch().click();

    expect(onChange).toHaveBeenCalledWith(true);
    expect(getSwitch()).toHaveAttribute('aria-checked', 'false');
  });

  it('passes its state to a render prop', () => {
    render(() => (
      <Switch defaultChecked={true}>
        {(state) => <span>{state.checked() ? 'On' : 'Off'}</span>}
      </Switch>
    ));

    expect(screen.getByRole('switch', { name: 'On' })).toBeInTheDocument();
  });
});
