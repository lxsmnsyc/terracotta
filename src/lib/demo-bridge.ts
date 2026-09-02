/**
 * Demos run in an iframe so each one gets a real document, with its own
 * stacking context, its own `<body>` and its own focus scope. That is the only way a modal
 * dialog or a focus trap can be shown honestly inside a docs page. The cost is
 * that theme changes and height have to cross the frame boundary, which is
 * what this protocol is for.
 */
export const DEMO_CHANNEL = 'terracotta-docs';

export type ColorSchemeName = 'light' | 'dark';

export interface DemoAppearanceMessage {
  channel: typeof DEMO_CHANNEL;
  kind: 'appearance';
  theme: string;
  scheme: ColorSchemeName;
}

export interface DemoHeightMessage {
  channel: typeof DEMO_CHANNEL;
  kind: 'height';
  height: number;
}

export type DemoMessage = DemoAppearanceMessage | DemoHeightMessage;

export function isDemoMessage(data: unknown): data is DemoMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as { channel?: unknown }).channel === DEMO_CHANNEL
  );
}

/**
 * The appearance also rides along in the URL. `postMessage` cannot land before
 * the frame's first paint, so the query string is what stops a demo from
 * flashing the default theme every time it loads.
 */
export function demoUrl(id: string, theme: string, scheme: ColorSchemeName): string {
  return `/demo/${id}?theme=${encodeURIComponent(theme)}&scheme=${scheme}`;
}
