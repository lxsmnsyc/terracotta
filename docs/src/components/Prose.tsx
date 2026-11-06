import type { JSX } from '@solidjs/web';
import { For, Show } from 'solid-js';
import type { DocBlock } from '../lib/content-types';
import Demo from './Demo';

/**
 * A page arrives as alternating prose and demos rather than one HTML string,
 * so every demo is a real component with real state instead of a placeholder
 * to be found and upgraded after the fact.
 */
export default function Prose(props: { blocks: DocBlock[] }): JSX.Element {
  return (
    <div class="prose">
      <For each={props.blocks}>
        {(block) => (
          <Show
            when={block.type === 'demo' ? block : undefined}
            fallback={<div innerHTML={block.type === 'html' ? block.html : ''} />}
          >
            {(demo) => (
              <Demo
                id={demo().id}
                title={demo().title}
                code={demo().code}
                caption={demo().caption}
              />
            )}
          </Show>
        )}
      </For>
    </div>
  );
}
