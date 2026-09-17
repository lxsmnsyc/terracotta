import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from 'terracotta/command-bar';
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
}

const ACTIONS: Action[] = [
  { id: 'new', label: 'New document' },
  { id: 'open', label: 'Open recent…' },
  { id: 'share', label: 'Share with team' },
  { id: 'settings', label: 'Open settings' },
];

export default function BasicCommandBar(): JSX.Element {
  const [open, setOpen] = createSignal(false);
  const [ran, setRan] = createSignal<string>();

  return (
    <div class="stack stage-tall">
      <p class="hint">
        Click inside this frame first, then press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>. The
        shortcut is registered by the component; nothing here listens for it.
      </p>
      <button type="button" class="button" onClick={() => setOpen(true)}>
        …or open it with a button
      </button>
      <p class="hint">{ran() ? `Ran: ${ran()}` : 'Nothing run yet.'}</p>

      <CommandBar class="commandbar" isOpen={open()} onChange={setOpen}>
        <CommandBarOverlay class="commandbar-overlay" />
        <CommandBarPanel class="commandbar-panel">
          <CommandBarTitle class="visually-hidden">Command palette</CommandBarTitle>
          <CommandBarDescription class="visually-hidden">
            Search for an action and press Enter to run it.
          </CommandBarDescription>

          <Command<Action>
            class="command"
            defaultValue={undefined}
            by={(a, b) => a.id === b.id}
            matchBy={(action, query) => action.label.toLowerCase().includes(query.toLowerCase())}
            onChange={(action) => {
              if (action) {
                setRan(action.label);
                setOpen(false);
              }
            }}
          >
            <CommandLabel class="visually-hidden">Commands</CommandLabel>
            <CommandInput class="command-input" placeholder="Type a command…" />
            <CommandOptions class="command-options">
              <For each={ACTIONS}>
                {(action) => (
                  <CommandOption class="command-option" value={action}>
                    {action.label}
                  </CommandOption>
                )}
              </For>
            </CommandOptions>
          </Command>
        </CommandBarPanel>
      </CommandBar>
    </div>
  );
}
