import type { JSX } from '@solidjs/web';
import { Tooltip, TooltipPanel, TooltipTrigger } from 'terracotta/tooltip';

export default function TooltipCase(): JSX.Element {
  return (
    <div style={{ padding: '4rem' }}>
      <button type="button">Before</button>
      <Tooltip defaultOpen={false} openDelay={100}>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipPanel style={{ position: 'absolute', 'margin-top': '0.25rem' }}>
          Saves the file
        </TooltipPanel>
      </Tooltip>
    </div>
  );
}
