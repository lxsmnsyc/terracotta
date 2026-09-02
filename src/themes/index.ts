import './blueprint.css';
import './brutalist.css';
import './glass.css';
import './terminal.css';
import './terracotta.css';

export interface ThemeMeta {
  id: string;
  name: string;
  /** Shown in the theme picker, one line. */
  blurb: string;
}

/**
 * Every theme is a stylesheet scoped to `html[data-theme="<id>"]` that
 * implements the contract in `_contract.css`. Adding one means adding a file
 * and an entry here — no component in the site or in any demo changes, which
 * is the point the whole site is making.
 */
export const THEMES: readonly ThemeMeta[] = [
  {
    id: 'terracotta',
    name: 'Terracotta',
    blurb: 'The house style. Warm neutrals, generous spacing.',
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    blurb: 'Hard borders, square corners, offset shadows, caps.',
  },
  {
    id: 'glass',
    name: 'Glass',
    blurb: 'Frosted, translucent panels floating over a coloured wash.',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    blurb: 'Monospace phosphor, scanlines, and a blinking cursor.',
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    blurb: 'Grid paper, hairlines, stencil labels, numbered sheets.',
  },
];

export const DEFAULT_THEME = 'terracotta';

export function isTheme(value: string | null | undefined): value is string {
  return !!value && THEMES.some((theme) => theme.id === value);
}
