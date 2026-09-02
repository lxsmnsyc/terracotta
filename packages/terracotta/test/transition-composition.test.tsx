import { render, screen } from '@solidjs/testing-library';
import type { JSX } from '@solidjs/web';
import { createComponent } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { settle } from './aria';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../src/components/accordion';
import { AlertDialog, AlertDialogOverlay, AlertDialogPanel } from '../src/components/alert-dialog';
import { Combobox, ComboboxOptions } from '../src/components/combobox';
import { CommandBar, CommandBarPanel } from '../src/components/command-bar';
import { ContextMenu, ContextMenuPanel } from '../src/components/context-menu';
import { Dialog, DialogOverlay, DialogPanel } from '../src/components/dialog';
import { Disclosure, DisclosurePanel } from '../src/components/disclosure';
import { Listbox, ListboxOptions } from '../src/components/listbox';
import { Popover, PopoverOverlay, PopoverPanel } from '../src/components/popover';
import { Tab, TabGroup, TabList, TabPanel } from '../src/components/tabs';
import { Transition, TransitionChild } from '../src/components/transition';

const CLASSES = {
  enter: 'enter',
  enterFrom: 'enter-from',
  enterTo: 'enter-to',
  entered: 'entered',
  leave: 'leave',
  leaveFrom: 'leave-from',
  leaveTo: 'leave-to',
};

/**
 * Every one of these is an unmountable: it decides whether to render through
 * `createUnmountable`, exactly as a transition does. Pairing two of them in the
 * same position — either through `as`, or by making one the sole child of the
 * other — used to leave the transition re-creating itself forever, because the
 * mount condition was read by the computation that had just built it.
 *
 * Each case puts the pair in that position deliberately: the transitioning
 * element is the *only* child of its disclosure, which is the arrangement that
 * collapses the two into one computation.
 */
type Wrap = (child: () => JSX.Element) => JSX.Element;

/**
 * The matrix renders each component through another one's `as`, in pairs the
 * prop types do not model — `DialogPanel` does not accept a `show`, and
 * `Transition` does not accept a `value`. Going through a loose component type
 * keeps that deliberate mismatch in one place instead of casting at every call.
 */
type LooseProps = Record<string, unknown>;
type LooseComponent = (props: LooseProps) => JSX.Element;

function loose(component: unknown): LooseComponent {
  // The pairing is deliberate: these components are rendered through each
  // other's `as`, which their prop types rightly reject.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return component as LooseComponent;
}

function renderAs(component: unknown, props: LooseProps): JSX.Element {
  return createComponent(loose(component), props);
}

const VARIANTS: { name: string; panel: unknown; wrap: Wrap }[] = [
  {
    name: 'DialogPanel',
    panel: DialogPanel,
    wrap: (child) => (
      <Dialog isOpen unmount={false}>
        {child()}
      </Dialog>
    ),
  },
  {
    name: 'DialogOverlay',
    panel: DialogOverlay,
    wrap: (child) => (
      <Dialog isOpen unmount={false}>
        {child()}
      </Dialog>
    ),
  },
  {
    name: 'AlertDialogPanel',
    panel: AlertDialogPanel,
    wrap: (child) => (
      <AlertDialog isOpen unmount={false}>
        {child()}
      </AlertDialog>
    ),
  },
  {
    name: 'AlertDialogOverlay',
    panel: AlertDialogOverlay,
    wrap: (child) => (
      <AlertDialog isOpen unmount={false}>
        {child()}
      </AlertDialog>
    ),
  },
  {
    name: 'PopoverPanel',
    panel: PopoverPanel,
    wrap: (child) => <Popover defaultOpen>{child()}</Popover>,
  },
  {
    name: 'PopoverOverlay',
    panel: PopoverOverlay,
    wrap: (child) => <Popover defaultOpen>{child()}</Popover>,
  },
  {
    name: 'DisclosurePanel',
    panel: DisclosurePanel,
    wrap: (child) => <Disclosure defaultOpen>{child()}</Disclosure>,
  },
  {
    name: 'ListboxOptions',
    panel: ListboxOptions,
    wrap: (child) => (
      <Listbox defaultOpen defaultValue="a">
        {child()}
      </Listbox>
    ),
  },
  {
    name: 'ComboboxOptions',
    panel: ComboboxOptions,
    wrap: (child) => (
      <Combobox
        defaultOpen
        defaultValue="a"
        matchBy={(value: string, query) => value.includes(query)}
      >
        {child()}
      </Combobox>
    ),
  },
  {
    name: 'ContextMenuPanel',
    panel: ContextMenuPanel,
    wrap: (child) => <ContextMenu defaultOpen>{child()}</ContextMenu>,
  },
  {
    name: 'CommandBarPanel',
    panel: CommandBarPanel,
    wrap: (child) => (
      <CommandBar isOpen unmount={false}>
        {child()}
      </CommandBar>
    ),
  },
  {
    name: 'AccordionPanel',
    panel: AccordionPanel,
    wrap: (child) => (
      <Accordion defaultValue="a" toggleable={true}>
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionButton>Header</AccordionButton>
          </AccordionHeader>
          {child()}
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: 'TabPanel',
    panel: TabPanel,
    wrap: (child) => (
      <TabGroup defaultValue="a" horizontal={true}>
        <TabList>
          <Tab value="a">Tab</Tab>
        </TabList>
        {child()}
      </TabGroup>
    ),
  },
];

/** `AccordionPanel` and `TabPanel` need to know which item they belong to. */
const EXTRA: Record<string, Record<string, unknown>> = {
  AccordionPanel: {},
  TabPanel: { value: 'a' },
};

function targetProps(name: string): Record<string, unknown> {
  return {
    'data-testid': 'target',
    ...CLASSES,
    ...EXTRA[name],
    children: 'Body',
  };
}

function getTarget(): HTMLElement {
  return screen.getByTestId('target');
}

describe.each(VARIANTS)('$name with a transition', ({ name, panel, wrap }) => {
  it(`renders a Transition rendered as ${name}`, async () => {
    render(() => wrap(() => renderAs(Transition, { show: true, as: panel, ...targetProps(name) })));
    await settle();

    expect(getTarget()).toHaveClass('entered');
  });

  it(`renders a TransitionChild rendered as ${name}`, async () => {
    render(() =>
      renderAs(Transition, {
        show: true,
        get children() {
          return wrap(() => renderAs(TransitionChild, { as: panel, ...targetProps(name) }));
        },
      }),
    );
    await settle();

    expect(getTarget()).toHaveClass('entered');
  });

  it(`renders ${name} rendered as a Transition`, async () => {
    render(() => wrap(() => renderAs(panel, { as: Transition, show: true, ...targetProps(name) })));
    await settle();

    expect(getTarget()).toHaveClass('entered');
  });

  it(`renders ${name} rendered as a TransitionChild`, async () => {
    render(() =>
      renderAs(Transition, {
        show: true,
        get children() {
          return wrap(() => renderAs(panel, { as: TransitionChild, ...targetProps(name) }));
        },
      }),
    );
    await settle();

    expect(getTarget()).toHaveClass('entered');
  });

  it(`renders a TransitionChild as the only child of a ${name} owner`, async () => {
    render(() =>
      renderAs(Transition, {
        show: true,
        get children() {
          return wrap(() => renderAs(TransitionChild, targetProps(name)));
        },
      }),
    );
    await settle();

    expect(getTarget()).toHaveClass('entered');
  });
});
