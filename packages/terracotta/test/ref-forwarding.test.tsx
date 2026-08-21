import { render } from '@solidjs/testing-library';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { JSX } from 'solid-js';
import { describe, expect, it } from 'vitest';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../src/components/accordion';
import { Alert } from '../src/components/alert';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPanel,
  AlertDialogTitle,
} from '../src/components/alert-dialog';
import { Button } from '../src/components/button';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from '../src/components/checkbox';
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '../src/components/combobox';
import {
  Command,
  CommandInput,
  CommandLabel,
  CommandOption,
  CommandOptions,
} from '../src/components/command';
import {
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from '../src/components/command-bar';
import {
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuOverlay,
  ContextMenuPanel,
} from '../src/components/context-menu';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from '../src/components/dialog';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../src/components/disclosure';
import {
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
} from '../src/components/feed';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '../src/components/listbox';
import { Menu, MenuItem } from '../src/components/menu';
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from '../src/components/popover';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '../src/components/radio-group';
import { Select, SelectOption } from '../src/components/select';
import { Tab, TabGroup, TabList, TabPanel } from '../src/components/tabs';
import { Toast, Toaster } from '../src/components/toast';
import { Toggle } from '../src/components/toggle';
import { Toolbar } from '../src/components/toolbar';
import { Transition, TransitionChild } from '../src/components/transition';

/** Receives the element the component rendered, whatever `as` it was given. */
type Ref = (element: HTMLElement) => void;

interface Case {
  /** The component under test. */
  name: string;
  /** Passed as `as`, and expected back as the ref target's tag name. */
  as: string;
  render: (ref: Ref) => JSX.Element;
}

/**
 * Every polymorphic component declares `<T extends ValidConstructor>`, which is
 * what gives it the `as` prop.
 */
function polymorphicComponents(): Set<string> {
  // vitest runs with the package directory as its root.
  const root = join(process.cwd(), 'src', 'components');
  const names = new Set<string>();

  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const child = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(child);
      } else if (entry.name.endsWith('.ts')) {
        const source = readFileSync(child, 'utf8');
        for (const match of source.matchAll(
          /^export function ([A-Za-z0-9_]+)<(?:V, )?T extends ValidConstructor/gm,
        )) {
          names.add(match[1]);
        }
      }
    }
  };

  walk(root);
  return names;
}

const MATCH_BY = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query.toLowerCase());

const CASES: Case[] = [
  { name: 'Button', as: 'a', render: (ref) => <Button as="a" ref={ref} /> },
  { name: 'Toggle', as: 'a', render: (ref) => <Toggle as="a" defaultPressed={false} ref={ref} /> },
  { name: 'Toolbar', as: 'section', render: (ref) => <Toolbar as="section" ref={ref} /> },
  {
    name: 'Transition',
    as: 'section',
    render: (ref) => <Transition as="section" show ref={ref} />,
  },
  {
    name: 'TransitionChild',
    as: 'article',
    render: (ref) => (
      // 2.x only shows a child of an already-open transition when `appear`
      // is set; without it `visible` starts false and nothing mounts.
      <Transition show>
        <TransitionChild appear as="article" ref={ref} />
      </Transition>
    ),
  },

  {
    name: 'Accordion',
    as: 'section',
    render: (ref) => <Accordion as="section" defaultValue="a" ref={ref} />,
  },
  {
    name: 'AccordionButton',
    as: 'a',
    render: (ref) => (
      <Accordion defaultValue="a">
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionButton as="a" ref={ref} />
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    ),
  },

  {
    name: 'DisclosureButton',
    as: 'a',
    render: (ref) => (
      <Disclosure defaultOpen={false}>
        <DisclosureButton as="a" ref={ref} />
      </Disclosure>
    ),
  },

  {
    name: 'CheckboxIndicator',
    as: 'a',
    render: (ref) => (
      <Checkbox defaultChecked={false}>
        <CheckboxIndicator as="a" ref={ref} />
      </Checkbox>
    ),
  },

  {
    name: 'DialogPanel',
    as: 'section',
    render: (ref) => (
      <Dialog defaultOpen>
        <DialogPanel as="section" ref={ref} />
      </Dialog>
    ),
  },
  {
    name: 'DialogOverlay',
    as: 'aside',
    render: (ref) => (
      <Dialog defaultOpen>
        <DialogOverlay as="aside" ref={ref} />
      </Dialog>
    ),
  },
  {
    name: 'DialogTitle',
    as: 'h1',
    render: (ref) => (
      <Dialog defaultOpen>
        <DialogTitle as="h1" ref={ref} />
      </Dialog>
    ),
  },

  {
    name: 'AlertDialogPanel',
    as: 'section',
    render: (ref) => (
      <AlertDialog defaultOpen>
        <AlertDialogPanel as="section" ref={ref} />
      </AlertDialog>
    ),
  },
  {
    name: 'AlertDialogOverlay',
    as: 'aside',
    render: (ref) => (
      <AlertDialog defaultOpen>
        <AlertDialogOverlay as="aside" ref={ref} />
      </AlertDialog>
    ),
  },
  {
    name: 'AlertDialogTitle',
    as: 'h1',
    render: (ref) => (
      <AlertDialog defaultOpen>
        <AlertDialogTitle as="h1" ref={ref} />
      </AlertDialog>
    ),
  },

  {
    name: 'CommandBarPanel',
    as: 'section',
    render: (ref) => (
      <CommandBar defaultOpen>
        <CommandBarPanel as="section" ref={ref} />
      </CommandBar>
    ),
  },
  {
    name: 'CommandBarOverlay',
    as: 'aside',
    render: (ref) => (
      <CommandBar defaultOpen>
        <CommandBarOverlay as="aside" ref={ref} />
      </CommandBar>
    ),
  },

  {
    name: 'PopoverButton',
    as: 'a',
    render: (ref) => (
      <Popover defaultOpen={false}>
        <PopoverButton as="a" ref={ref} />
      </Popover>
    ),
  },
  {
    name: 'PopoverPanel',
    as: 'section',
    render: (ref) => (
      <Popover defaultOpen>
        <PopoverPanel as="section" ref={ref} />
      </Popover>
    ),
  },
  {
    name: 'PopoverOverlay',
    as: 'aside',
    render: (ref) => (
      <Popover defaultOpen>
        <PopoverOverlay as="aside" ref={ref} />
      </Popover>
    ),
  },

  {
    name: 'ContextMenuBoundary',
    as: 'section',
    render: (ref) => (
      <ContextMenu defaultOpen={false}>
        <ContextMenuBoundary as="section" ref={ref} />
      </ContextMenu>
    ),
  },
  {
    name: 'ContextMenuPanel',
    as: 'section',
    render: (ref) => (
      <ContextMenu defaultOpen>
        <ContextMenuPanel as="section" ref={ref} />
      </ContextMenu>
    ),
  },
  {
    name: 'ContextMenuOverlay',
    as: 'aside',
    render: (ref) => (
      <ContextMenu defaultOpen>
        <ContextMenuOverlay as="aside" ref={ref} />
      </ContextMenu>
    ),
  },

  { name: 'Menu', as: 'ul', render: (ref) => <Menu as="ul" ref={ref} /> },
  {
    name: 'MenuItem',
    as: 'a',
    render: (ref) => (
      <Menu>
        <MenuItem as="a" ref={ref} />
      </Menu>
    ),
  },

  {
    name: 'Feed',
    as: 'section',
    render: (ref) => <Feed as="section" size={1} ref={ref} />,
  },
  {
    name: 'FeedContent',
    as: 'section',
    render: (ref) => (
      <Feed size={1}>
        <FeedContent as="section" ref={ref} />
      </Feed>
    ),
  },
  {
    name: 'FeedArticle',
    as: 'section',
    render: (ref) => (
      <Feed size={1}>
        <FeedContent>
          <FeedArticle as="section" index={0} ref={ref} />
        </FeedContent>
      </Feed>
    ),
  },

  {
    name: 'Select',
    as: 'ol',
    render: (ref) => <Select as="ol" defaultValue="a" ref={ref} />,
  },
  {
    name: 'SelectOption',
    as: 'a',
    render: (ref) => (
      <Select defaultValue="a">
        <SelectOption as="a" value="a" ref={ref} />
      </Select>
    ),
  },

  {
    name: 'RadioGroup',
    as: 'section',
    render: (ref) => <RadioGroup as="section" defaultValue="a" ref={ref} />,
  },
  {
    name: 'RadioGroupOption',
    as: 'section',
    render: (ref) => (
      <RadioGroup defaultValue="a">
        <RadioGroupOption as="section" value="a" ref={ref} />
      </RadioGroup>
    ),
  },

  {
    name: 'TabGroup',
    as: 'section',
    render: (ref) => <TabGroup as="section" horizontal defaultValue="a" ref={ref} />,
  },
  {
    name: 'TabList',
    as: 'section',
    render: (ref) => (
      <TabGroup horizontal defaultValue="a">
        <TabList as="section" ref={ref} />
      </TabGroup>
    ),
  },
  {
    name: 'Tab',
    as: 'a',
    render: (ref) => (
      <TabGroup horizontal defaultValue="a">
        <TabList>
          <Tab as="a" value="a" ref={ref} />
        </TabList>
      </TabGroup>
    ),
  },

  {
    name: 'ListboxButton',
    as: 'a',
    render: (ref) => (
      <Listbox defaultOpen={false} defaultValue="a">
        <ListboxButton as="a" ref={ref} />
      </Listbox>
    ),
  },
  {
    name: 'ListboxOptions',
    as: 'ol',
    render: (ref) => (
      <Listbox defaultOpen defaultValue="a">
        <ListboxOptions as="ol" ref={ref} />
      </Listbox>
    ),
  },
  {
    name: 'ListboxOption',
    as: 'a',
    render: (ref) => (
      <Listbox defaultOpen defaultValue="a">
        <ListboxOptions>
          <ListboxOption as="a" value="a" ref={ref} />
        </ListboxOptions>
      </Listbox>
    ),
  },

  {
    name: 'ComboboxInput',
    as: 'textarea',
    render: (ref) => (
      <Combobox defaultOpen={false} defaultValue="a" matchBy={MATCH_BY}>
        <ComboboxInput as="textarea" ref={ref} />
      </Combobox>
    ),
  },
  {
    name: 'ComboboxOptions',
    as: 'ol',
    render: (ref) => (
      <Combobox defaultOpen defaultValue="a" matchBy={MATCH_BY}>
        <ComboboxOptions as="ol" ref={ref} />
      </Combobox>
    ),
  },
  {
    name: 'ComboboxOption',
    as: 'a',
    render: (ref) => (
      <Combobox defaultOpen defaultValue="a" matchBy={MATCH_BY}>
        <ComboboxOptions>
          <ComboboxOption as="a" value="a" ref={ref} />
        </ComboboxOptions>
      </Combobox>
    ),
  },

  {
    name: 'CommandInput',
    as: 'textarea',
    render: (ref) => (
      <Command defaultValue="a" matchBy={MATCH_BY}>
        <CommandInput as="textarea" ref={ref} />
      </Command>
    ),
  },
  {
    name: 'CommandOptions',
    as: 'ol',
    render: (ref) => (
      <Command defaultValue="a" matchBy={MATCH_BY}>
        <CommandOptions as="ol" ref={ref} />
      </Command>
    ),
  },
  {
    name: 'CommandOption',
    as: 'a',
    render: (ref) => (
      <Command defaultValue="a" matchBy={MATCH_BY}>
        <CommandOptions>
          <CommandOption as="a" value="a" ref={ref} />
        </CommandOptions>
      </Command>
    ),
  },
];

/**
 * These components accept `as` but do not declare `ref` in their props, even
 * though the prop reaches the element at runtime. The cast is what the type
 * gap costs a caller who wants a handle on the rendered node.
 */
function untyped(component: unknown): (props: Record<string, unknown>) => JSX.Element {
  // The narrowing is the point of the test: it stands in for the cast a caller
  // needs today to put a `ref` on one of these components.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return component as (props: Record<string, unknown>) => JSX.Element;
}

const UAlert = untyped(Alert);
const UToaster = untyped(Toaster);
const UToast = untyped(Toast);
const UDisclosure = untyped(Disclosure);
const UDisclosurePanel = untyped(DisclosurePanel);
const UAccordionItem = untyped(AccordionItem);
const UAccordionHeader = untyped(AccordionHeader);
const UAccordionPanel = untyped(AccordionPanel);
const UCheckbox = untyped(Checkbox);
const UCheckboxLabel = untyped(CheckboxLabel);
const UCheckboxDescription = untyped(CheckboxDescription);
const UDialog = untyped(Dialog);
const UDialogDescription = untyped(DialogDescription);
const UAlertDialog = untyped(AlertDialog);
const UAlertDialogDescription = untyped(AlertDialogDescription);
const UCommandBar = untyped(CommandBar);
const UCommandBarTitle = untyped(CommandBarTitle);
const UCommandBarDescription = untyped(CommandBarDescription);
const UPopover = untyped(Popover);
const UContextMenu = untyped(ContextMenu);
const UListbox = untyped(Listbox);
const UListboxLabel = untyped(ListboxLabel);
const UCombobox = untyped(Combobox);
const UComboboxLabel = untyped(ComboboxLabel);
const UCommand = untyped(Command);
const UCommandLabel = untyped(CommandLabel);
const URadioGroupLabel = untyped(RadioGroupLabel);
const URadioGroupDescription = untyped(RadioGroupDescription);
const UTabPanel = untyped(TabPanel);
const UFeedLabel = untyped(FeedLabel);
const UFeedArticleLabel = untyped(FeedArticleLabel);
const UFeedArticleDescription = untyped(FeedArticleDescription);

const UNTYPED_CASES: Case[] = [
  { name: 'Alert', as: 'section', render: (ref) => <UAlert as="section" ref={ref} /> },
  {
    name: 'Toaster',
    as: 'section',
    render: (ref) => <UToaster as="section" ref={ref} />,
  },
  {
    name: 'Toast',
    as: 'section',
    render: (ref) => (
      <Toaster>
        <UToast as="section" ref={ref} />
      </Toaster>
    ),
  },
  {
    name: 'Disclosure',
    as: 'section',
    render: (ref) => <UDisclosure as="section" defaultOpen={false} ref={ref} />,
  },
  {
    name: 'DisclosurePanel',
    as: 'section',
    render: (ref) => (
      <Disclosure defaultOpen>
        <UDisclosurePanel as="section" ref={ref} />
      </Disclosure>
    ),
  },
  {
    name: 'AccordionItem',
    as: 'section',
    render: (ref) => (
      <Accordion defaultValue="a">
        <UAccordionItem as="section" value="a" ref={ref} />
      </Accordion>
    ),
  },
  {
    name: 'AccordionHeader',
    as: 'h1',
    render: (ref) => (
      <Accordion defaultValue="a">
        <AccordionItem value="a">
          <UAccordionHeader as="h1" ref={ref} />
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: 'AccordionPanel',
    as: 'section',
    render: (ref) => (
      <Accordion defaultValue="a">
        <AccordionItem value="a">
          <UAccordionPanel as="section" ref={ref} />
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: 'Checkbox',
    as: 'section',
    render: (ref) => <UCheckbox as="section" defaultChecked={false} ref={ref} />,
  },
  {
    name: 'CheckboxLabel',
    as: 'span',
    render: (ref) => (
      <Checkbox defaultChecked={false}>
        <UCheckboxLabel as="span" ref={ref} />
      </Checkbox>
    ),
  },
  {
    name: 'CheckboxDescription',
    as: 'span',
    render: (ref) => (
      <Checkbox defaultChecked={false}>
        <UCheckboxDescription as="span" ref={ref} />
      </Checkbox>
    ),
  },
  {
    name: 'Dialog',
    as: 'section',
    render: (ref) => <UDialog as="section" defaultOpen ref={ref} />,
  },
  {
    name: 'DialogDescription',
    as: 'span',
    render: (ref) => (
      <Dialog defaultOpen>
        <UDialogDescription as="span" ref={ref} />
      </Dialog>
    ),
  },
  {
    name: 'AlertDialog',
    as: 'section',
    render: (ref) => <UAlertDialog as="section" defaultOpen ref={ref} />,
  },
  {
    name: 'AlertDialogDescription',
    as: 'span',
    render: (ref) => (
      <AlertDialog defaultOpen>
        <UAlertDialogDescription as="span" ref={ref} />
      </AlertDialog>
    ),
  },
  {
    name: 'CommandBar',
    as: 'section',
    render: (ref) => <UCommandBar as="section" defaultOpen ref={ref} />,
  },
  {
    name: 'CommandBarTitle',
    as: 'h1',
    render: (ref) => (
      <CommandBar defaultOpen>
        <UCommandBarTitle as="h1" ref={ref} />
      </CommandBar>
    ),
  },
  {
    name: 'CommandBarDescription',
    as: 'span',
    render: (ref) => (
      <CommandBar defaultOpen>
        <UCommandBarDescription as="span" ref={ref} />
      </CommandBar>
    ),
  },
  {
    name: 'Popover',
    as: 'section',
    render: (ref) => <UPopover as="section" defaultOpen={false} ref={ref} />,
  },
  {
    name: 'ContextMenu',
    as: 'section',
    render: (ref) => <UContextMenu as="section" defaultOpen={false} ref={ref} />,
  },
  {
    name: 'Listbox',
    as: 'section',
    render: (ref) => <UListbox as="section" defaultOpen={false} defaultValue="a" ref={ref} />,
  },
  {
    name: 'ListboxLabel',
    as: 'span',
    render: (ref) => (
      <Listbox defaultOpen={false} defaultValue="a">
        <UListboxLabel as="span" ref={ref} />
      </Listbox>
    ),
  },
  {
    name: 'Combobox',
    as: 'section',
    render: (ref) => (
      <UCombobox as="section" defaultOpen={false} defaultValue="a" matchBy={MATCH_BY} ref={ref} />
    ),
  },
  {
    name: 'ComboboxLabel',
    as: 'span',
    render: (ref) => (
      <Combobox defaultOpen={false} defaultValue="a" matchBy={MATCH_BY}>
        <UComboboxLabel as="span" ref={ref} />
      </Combobox>
    ),
  },
  {
    name: 'Command',
    as: 'section',
    render: (ref) => <UCommand as="section" defaultValue="a" matchBy={MATCH_BY} ref={ref} />,
  },
  {
    name: 'CommandLabel',
    as: 'span',
    render: (ref) => (
      <Command defaultValue="a" matchBy={MATCH_BY}>
        <UCommandLabel as="span" ref={ref} />
      </Command>
    ),
  },
  {
    name: 'RadioGroupLabel',
    as: 'span',
    render: (ref) => (
      <RadioGroup defaultValue="a">
        <URadioGroupLabel as="span" ref={ref} />
      </RadioGroup>
    ),
  },
  {
    name: 'RadioGroupDescription',
    as: 'span',
    render: (ref) => (
      <RadioGroup defaultValue="a">
        <URadioGroupDescription as="span" ref={ref} />
      </RadioGroup>
    ),
  },
  {
    name: 'TabPanel',
    as: 'section',
    render: (ref) => (
      <TabGroup horizontal defaultValue="a">
        <UTabPanel as="section" value="a" ref={ref} />
      </TabGroup>
    ),
  },
  {
    name: 'FeedLabel',
    as: 'h1',
    render: (ref) => (
      <Feed size={1}>
        <UFeedLabel as="h1" ref={ref} />
      </Feed>
    ),
  },
  {
    name: 'FeedArticleLabel',
    as: 'h2',
    render: (ref) => (
      <Feed size={1}>
        <FeedContent>
          <FeedArticle index={0}>
            <UFeedArticleLabel as="h2" ref={ref} />
          </FeedArticle>
        </FeedContent>
      </Feed>
    ),
  },
  {
    name: 'FeedArticleDescription',
    as: 'span',
    render: (ref) => (
      <Feed size={1}>
        <FeedContent>
          <FeedArticle index={0}>
            <UFeedArticleDescription as="span" ref={ref} />
          </FeedArticle>
        </FeedContent>
      </Feed>
    ),
  },
];

describe('ref forwarding', () => {
  it.each(CASES.map((entry) => [entry.name, entry] as const))(
    '%s hands its rendered element to `ref`',
    (_name, entry) => {
      let received: HTMLElement | undefined;

      const { container } = render(() =>
        entry.render((element) => {
          received = element;
        }),
      );

      expect(received).toBeInstanceOf(HTMLElement);
      // Not just any element: the one this component actually rendered, and the
      // one `as` asked for.
      expect(received?.tagName.toLowerCase()).toBe(entry.as);
      expect(container.contains(received ?? null)).toBe(true);
    },
  );

  it.each(UNTYPED_CASES.map((entry) => [entry.name, entry] as const))(
    '%s hands its rendered element to `ref`, though it does not declare the prop',
    (_name, entry) => {
      let received: HTMLElement | undefined;

      const { container } = render(() =>
        entry.render((element) => {
          received = element;
        }),
      );

      expect(received).toBeInstanceOf(HTMLElement);
      expect(received?.tagName.toLowerCase()).toBe(entry.as);
      expect(container.contains(received ?? null)).toBe(true);
    },
  );

  it('covers every component that takes an `as` prop', () => {
    // Derived from the source rather than pinned to a count, so a new
    // polymorphic component fails here until it gets a case instead of being
    // silently untested.
    const covered = new Set([...CASES, ...UNTYPED_CASES].map((entry) => entry.name));
    const missing = [...polymorphicComponents()].filter((name) => !covered.has(name));

    expect(missing).toEqual([]);
  });
});
