import type { JSX } from '@solidjs/web';
import { Tooltip, TooltipPanel, TooltipTrigger } from 'terracotta/tooltip';

/**
 * Hover or focus a button to see its tooltip. The button's name stays short,
 * and the tooltip becomes its description.
 */
export default function BasicTooltip(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <div class="row">
        <Tooltip class="tooltip" defaultOpen={false}>
          <TooltipTrigger class="button">Save</TooltipTrigger>
          <TooltipPanel class="tooltip-panel">Saves the file to your drive</TooltipPanel>
        </Tooltip>
        <Tooltip class="tooltip" defaultOpen={false}>
          <TooltipTrigger class="button">Share</TooltipTrigger>
          <TooltipPanel class="tooltip-panel">Copies a link anyone can open</TooltipPanel>
        </Tooltip>
      </div>
      <p class="hint">
        <kbd>Escape</kbd> hides the tooltip and leaves focus where it is.
      </p>
    </div>
  );
}
