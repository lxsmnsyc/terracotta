import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import ButtonCase from './cases/button';
import CarouselCase from './cases/carousel';
import CheckboxCase from './cases/checkbox';
import ComboboxCase from './cases/combobox';
import CommandCase from './cases/command';
import ContextMenuCase from './cases/context-menu';
import DialogCase from './cases/dialog';
import GridCase from './cases/grid';
import ListboxCase from './cases/listbox';
import MenuCase from './cases/menu';
import MenuButtonCase from './cases/menu-button';
import MenubarCase from './cases/menubar';
import ModalCase from './cases/modal';
import NestingCase from './cases/nesting';
import PopoverCase from './cases/popover';
import PopoverTransitionCase from './cases/popover-transition';
import RadioGroupCase from './cases/radio-group';
import SliderCase from './cases/slider';
import SpinbuttonCase from './cases/spinbutton';
import SplitterCase from './cases/splitter';
import SwitchCase from './cases/switch';
import TabsCase from './cases/tabs';
import TransitionCase from './cases/transition';
import TransitionGroupCase from './cases/transition-group';
import TreeCase from './cases/tree';
import TreeGridCase from './cases/treegrid';
import ToolbarCase from './cases/toolbar';
import TooltipCase from './cases/tooltip';

// Each spec navigates to `/?case=<name>`; keeping one bundle avoids a router
// dependency and keeps the harness startup cheap.
const CASES: Record<string, () => JSX.Element> = {
  button: ButtonCase,
  carousel: CarouselCase,
  checkbox: CheckboxCase,
  combobox: ComboboxCase,
  command: CommandCase,
  'context-menu': ContextMenuCase,
  dialog: DialogCase,
  grid: GridCase,
  listbox: ListboxCase,
  menu: MenuCase,
  'menu-button': MenuButtonCase,
  menubar: MenubarCase,
  modal: ModalCase,
  nesting: NestingCase,
  popover: PopoverCase,
  'popover-transition': PopoverTransitionCase,
  'radio-group': RadioGroupCase,
  slider: SliderCase,
  spinbutton: SpinbuttonCase,
  splitter: SplitterCase,
  switch: SwitchCase,
  tabs: TabsCase,
  transition: TransitionCase,
  'transition-group': TransitionGroupCase,
  tree: TreeCase,
  treegrid: TreeGridCase,
  toolbar: ToolbarCase,
  tooltip: TooltipCase,
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
