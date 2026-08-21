import type { JSX } from 'solid-js';
import { render } from '@solidjs/web';
import CheckboxCase from './cases/checkbox';
import ComboboxCase from './cases/combobox';
import CommandCase from './cases/command';
import DialogCase from './cases/dialog';
import ListboxCase from './cases/listbox';
import MenuCase from './cases/menu';
import PopoverCase from './cases/popover';
import TabsCase from './cases/tabs';
import TransitionCase from './cases/transition';
import TransitionGroupCase from './cases/transition-group';
import ToolbarCase from './cases/toolbar';

// Each spec navigates to `/?case=<name>`; keeping one bundle avoids a router
// dependency and keeps the harness startup cheap.
const CASES: Record<string, () => JSX.Element> = {
  checkbox: CheckboxCase,
  combobox: ComboboxCase,
  command: CommandCase,
  dialog: DialogCase,
  listbox: ListboxCase,
  menu: MenuCase,
  popover: PopoverCase,
  tabs: TabsCase,
  transition: TransitionCase,
  'transition-group': TransitionGroupCase,
  toolbar: ToolbarCase,
};

function App(): JSX.Element {
  const name = new URLSearchParams(window.location.search).get('case');
  const Case = name === null ? undefined : CASES[name];

  if (Case === undefined) {
    return (
      <ul>
        {Object.keys(CASES).map((key) => (
          <li>
            <a href={`/?case=${key}`}>{key}</a>
          </li>
        ))}
      </ul>
    );
  }

  return <Case />;
}

const root = document.getElementById('root');

if (root === null) {
  throw new Error('Missing #root');
}

render(() => <App />, root);
