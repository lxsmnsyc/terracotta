import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { Command, CommandInput, CommandLabel, CommandOption, CommandOptions } from 'terracotta';

const ACTIONS = ['open file', 'close file', 'rename file', 'delete file'];

export default function CommandCase(): JSX.Element {
  const [selected, setSelected] = createSignal<string | undefined>();

  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <Command
        value={selected()}
        onChange={(value) => {
          setSelected(value);
        }}
        matchBy={(value: string, query) => value.toLowerCase().includes(query.toLowerCase())}
      >
        <CommandLabel>Command palette</CommandLabel>
        <CommandInput />
        <CommandOptions>
          {ACTIONS.map((action) => (
            <CommandOption value={action} disabled={action === 'delete file'}>
              {action}
            </CommandOption>
          ))}
        </CommandOptions>
      </Command>
      <div data-testid="selection">{selected() ?? 'none'}</div>
      <button type="button" data-testid="after">
        After
      </button>
    </div>
  );
}
