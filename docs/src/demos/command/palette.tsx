import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  Command,
  CommandInput,
  CommandLabel,
  CommandOption,
  CommandOptions,
} from 'terracotta/command';

interface Action {
  id: string;
  label: string;
  hint: string;
}

const ACTIONS: Action[] = [
  { id: 'new', label: 'New document', hint: '⌘N' },
  { id: 'open', label: 'Open recent…', hint: '⌘O' },
  { id: 'share', label: 'Share with team', hint: '⌘⇧S' },
  { id: 'export', label: 'Export as PDF', hint: '' },
  { id: 'settings', label: 'Open settings', hint: '⌘,' },
];

export default function CommandPalette(): JSX.Element {
  const [ran, setRan] = createSignal<string>();

  return (
    <div class="stack">
      <Command<Action>
        class="command"
        defaultValue={undefined}
        by={(a, b) => a.id === b.id}
        matchBy={(action, query) => action.label.toLowerCase().includes(query.toLowerCase())}
        onChange={(action) => action && setRan(action.label)}
      >
        <CommandLabel class="visually-hidden">Commands</CommandLabel>
        <CommandInput class="command-input" placeholder="Type a command…" />
        <CommandOptions class="command-options">
          <For each={ACTIONS}>
            {(action) => (
              <CommandOption class="command-option" value={action}>
                <span>{action.label}</span>
                <span class="command-hint">{action.hint}</span>
              </CommandOption>
            )}
          </For>
        </CommandOptions>
      </Command>
      <p class="hint">{ran() ? `Ran: ${ran()}` : 'Type to filter, then press Enter.'}</p>
    </div>
  );
}
