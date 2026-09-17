import type { JSX } from '@solidjs/web';
import { Toolbar } from 'terracotta/toolbar';

export default function BasicToolbar(): JSX.Element {
  return (
    <div class="stack">
      <Toolbar class="toolbar" aria-label="Text formatting">
        <button type="button" class="toolbar-button">
          Bold
        </button>
        <button type="button" class="toolbar-button">
          Italic
        </button>
        <button type="button" class="toolbar-button" disabled>
          Underline
        </button>
        <span class="toolbar-separator" role="separator" aria-orientation="vertical" />
        <button type="button" class="toolbar-button">
          Link
        </button>
      </Toolbar>
      <p class="hint">
        Tab reaches the toolbar once; the arrow keys move within it, skipping the disabled control.
      </p>
    </div>
  );
}
