import type { JSX } from '@solidjs/web';
import { Toggle } from 'terracotta/toggle';
import { Toolbar } from 'terracotta/toolbar';

/**
 * Roving focus works on any focusable child, Terracotta's own components
 * included: the toolbar owns navigation, each control owns its state.
 */
export default function ToolbarWithControls(): JSX.Element {
  return (
    <Toolbar class="toolbar" aria-label="Formatting">
      <Toggle class="toolbar-toggle" defaultPressed>
        B
      </Toggle>
      <Toggle class="toolbar-toggle" defaultPressed={false}>
        I
      </Toggle>
      <Toggle class="toolbar-toggle" defaultPressed={false}>
        U
      </Toggle>
    </Toolbar>
  );
}
