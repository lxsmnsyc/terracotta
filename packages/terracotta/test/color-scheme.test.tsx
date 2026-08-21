import { render, screen } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { flush } from 'solid-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ColorScheme } from '../src/components/color-scheme';
import {
  ColorSchemeProvider,
  useColorScheme,
  useNativeColorScheme,
  usePreferredColorScheme,
} from '../src/components/color-scheme';

const STORAGE_KEY = 'theme-preference';

let listeners: (() => void)[] = [];
let systemPrefersDark = false;

/**
 * This jsdom build ships neither `localStorage` nor `matchMedia`, and the
 * provider needs both: one to persist the choice, one to read the system
 * preference. The media stub also lets a test flip the preference at runtime.
 */
function stubStorage(): void {
  const entries = new Map<string, string>();

  vi.stubGlobal('localStorage', {
    get length() {
      return entries.size;
    },
    key: (index: number) => [...entries.keys()][index] ?? null,
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, value);
    },
    removeItem: (key: string) => {
      entries.delete(key);
    },
    clear: () => {
      entries.clear();
    },
  });
}

function stubMatchMedia(): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    media: query,
    get matches() {
      return systemPrefersDark;
    },
    onchange: null,
    addEventListener: (_: string, listener: () => void) => {
      listeners.push(listener);
    },
    removeEventListener: (_: string, listener: () => void) => {
      listeners = listeners.filter((item) => item !== listener);
    },
    addListener: (listener: () => void) => {
      listeners.push(listener);
    },
    removeListener: (listener: () => void) => {
      listeners = listeners.filter((item) => item !== listener);
    },
    dispatchEvent: () => true,
  }));
}

function setSystemPrefersDark(value: boolean): void {
  systemPrefersDark = value;
  for (const listener of listeners.slice()) {
    listener();
  }
  // The listener writes to a signal, and Solid 2 defers the render that follows.
  flush();
}

function Readout(): JSX.Element {
  const [scheme, setScheme] = useColorScheme();
  const native = useNativeColorScheme();
  const preferred = usePreferredColorScheme();

  return (
    <>
      <p data-testid="scheme">{scheme()}</p>
      <p data-testid="native">{native()}</p>
      <p data-testid="preferred">{preferred()}</p>
      <button
        type="button"
        onClick={() => {
          setScheme('dark');
        }}
      >
        Go dark
      </button>
      <button
        type="button"
        onClick={() => {
          setScheme('light');
        }}
      >
        Go light
      </button>
      <button
        type="button"
        onClick={() => {
          setScheme('system');
        }}
      >
        Follow system
      </button>
    </>
  );
}

function press(name: string): void {
  screen.getByRole('button', { name }).click();
}

beforeEach(() => {
  listeners = [];
  systemPrefersDark = false;
  stubMatchMedia();
  stubStorage();
  document.documentElement.classList.remove('dark');
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.classList.remove('dark');
});

describe('ColorSchemeProvider', () => {
  it('falls back to `system` when nothing is stored', () => {
    render(() => (
      <ColorSchemeProvider initialValue="light">
        <Readout />
      </ColorSchemeProvider>
    ));

    // The stored preference wins over `initialValue`, and with an empty store
    // that means `system`.
    expect(screen.getByTestId('scheme')).toHaveTextContent('system');
  });

  it('adopts the scheme already in storage', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');

    render(() => (
      <ColorSchemeProvider initialValue="light">
        <Readout />
      </ColorSchemeProvider>
    ));

    expect(screen.getByTestId('scheme')).toHaveTextContent('dark');
  });

  it('writes the scheme back to storage', () => {
    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go dark');

    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('adds the dark class to the document element for an explicit dark choice', () => {
    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go dark');

    expect(document.documentElement).toHaveClass('dark');
  });

  it('removes the dark class again for an explicit light choice', () => {
    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go dark');
    press('Go light');

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('follows the system preference while the choice is `system`', () => {
    systemPrefersDark = true;

    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    expect(screen.getByTestId('preferred')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('ignores the system preference once the choice is explicit', () => {
    systemPrefersDark = true;

    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go light');

    expect(screen.getByTestId('preferred')).toHaveTextContent('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('reports the system preference separately from the choice', () => {
    systemPrefersDark = true;

    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go light');

    // The choice is light, but the machine still says dark.
    expect(screen.getByTestId('scheme')).toHaveTextContent('light');
    expect(screen.getByTestId('native')).toHaveTextContent('dark');
  });

  it('reacts to the system preference changing under `system`', () => {
    render(() => (
      <ColorSchemeProvider initialValue="system">
        <Readout />
      </ColorSchemeProvider>
    ));

    expect(screen.getByTestId('preferred')).toHaveTextContent('light');

    setSystemPrefersDark(true);

    expect(screen.getByTestId('preferred')).toHaveTextContent('dark');
  });

  it('reports a controlled scheme and leaves the writing to the owner', () => {
    const onChange = vi.fn<(value: ColorScheme) => void>();

    render(() => (
      <ColorSchemeProvider value="dark" onChange={onChange}>
        <Readout />
      </ColorSchemeProvider>
    ));

    press('Go light');

    // The prop never changed, so neither did the scheme.
    expect(screen.getByTestId('scheme')).toHaveTextContent('dark');
    expect(onChange).toHaveBeenCalledWith('light');
  });

  it('requires a surrounding provider', () => {
    expect(() => render(() => <Readout />)).toThrow(/Missing <ColorSchemeProvider>/);
  });
});
