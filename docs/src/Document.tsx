import { HydrationScript, type JSX, getRequestEvent, isServer } from '@solidjs/web';
import { THEME_BOOT_SCRIPT } from './lib/theme';
import { DEFAULT_THEME, isTheme } from './themes';

/**
 * A framed demo carries its appearance in the query string, so the server can
 * render the frame's document already wearing the right theme. Without this the
 * frame paints the default theme for one frame on every load.
 */
function appearanceFromRequest(): { theme: string; dark: boolean } {
  if (!isServer) {
    return { theme: DEFAULT_THEME, dark: false };
  }

  const event = getRequestEvent();
  if (!event) {
    return { theme: DEFAULT_THEME, dark: false };
  }

  const search = new URL(event.request.url).searchParams;
  const theme = search.get('theme');

  return {
    theme: isTheme(theme) ? theme : DEFAULT_THEME,
    dark: search.get('scheme') === 'dark',
  };
}

export default function Document(props: { children: JSX.Element }): JSX.Element {
  const appearance = appearanceFromRequest();

  return (
    <html lang="en" data-theme={appearance.theme} class={appearance.dark ? 'dark' : undefined}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Blocking on purpose: it has to win the race against the first paint. */}
        <script>{THEME_BOOT_SCRIPT}</script>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
