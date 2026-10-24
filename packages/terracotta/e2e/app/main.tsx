import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import ButtonCase from './cases/button';
import CheckboxCase from './cases/checkbox';
import ComboboxCase from './cases/combobox';
import CommandCase from './cases/command';
import ContextMenuCase from './cases/context-menu';
import DialogCase from './cases/dialog';
import ListboxCase from './cases/listbox';
import MenuCase from './cases/menu';
import MenuButtonCase from './cases/menu-button';
import MenubarCase from './cases/menubar';
import ModalCase from './cases/modal';
import NestingCase from './cases/nesting';
import PopoverCase from './cases/popover';
import PopoverTransitionCase from './cases/popover-transition';
import RadioGroupCase from './cases/radio-group';
import TabsCase from './cases/tabs';
import TransitionCase from './cases/transition';
import TransitionGroupCase from './cases/transition-group';
import ToolbarCase from './cases/toolbar';

// Each spec navigates to `/?case=<name>`; keeping one bundle avoids a router
// dependency and keeps the harness startup cheap.
const CASES: Record<string, () => JSX.Element> = {
  button: ButtonCase,
  checkbox: CheckboxCase,
  combobox: ComboboxCase,
  command: CommandCase,
  'context-menu': ContextMenuCase,
  dialog: DialogCase,
  listbox: ListboxCase,
  menu: MenuCase,
  'menu-button': MenuButtonCase,
  menubar: MenubarCase,
  modal: ModalCase,
  nesting: NestingCase,
  popover: PopoverCase,
  'popover-transition': PopoverTransitionCase,
  'radio-group': RadioGroupCase,
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
