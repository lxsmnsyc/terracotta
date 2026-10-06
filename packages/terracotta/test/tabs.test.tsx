import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, pressKeyOnFocused, settle } from './aria';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
} from '../src';

const TABS = ['alpha', 'beta', 'gamma'];

function renderTabs(
  props: { value?: string; horizontal?: boolean; disabled?: string[] } = {},
): ReturnType<typeof render> {
  return render(() => (
    <TabGroup defaultValue={props.value ?? 'alpha'} horizontal={props.horizontal ?? true}>
      <TabList>
        {TABS.map((tab) => (
          <Tab value={tab} disabled={props.disabled?.includes(tab)}>
            {tab} tab
          </Tab>
        ))}
      </TabList>
      {TABS.map((tab) => (
        <TabPanel value={tab}>{tab} panel</TabPanel>
      ))}
    </TabGroup>
  ));
}

function getTab(name: string): HTMLElement {
  return screen.getByRole('tab', { name: `${name} tab` });
}

describe('Tabs accessibility', () => {
  it('uses the tablist / tab / tabpanel role trio', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(TABS.length);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('alpha panel');
  });

  it('reports the list orientation', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');

    screen.getByRole('tablist').remove();
    renderTabs({ horizontal: false });
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('marks only the active tab as selected', () => {
    renderTabs({ value: 'beta' });

    expect(getTab('beta')).toHaveAttribute('aria-selected', 'true');
    expect(getTab('alpha')).toHaveAttribute('aria-selected', 'false');
  });

  it('keeps a single tab stop in the tab list', () => {
    renderTabs({ value: 'beta' });

    expect(getTab('beta')).toHaveAttribute('tabindex', '0');
    expect(getTab('alpha')).toHaveAttribute('tabindex', '-1');
    expect(getTab('gamma')).toHaveAttribute('tabindex', '-1');
  });

  it('links each tab to its panel in both directions', () => {
    renderTabs({ value: 'alpha' });
    const tab = getTab('alpha');
    const panel = screen.getByRole('tabpanel');

    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('renders only the selected panel', () => {
    renderTabs({ value: 'alpha' });

    expect(screen.getByText('alpha panel')).toBeInTheDocument();
    expect(screen.queryByText('beta panel')).not.toBeInTheDocument();
  });

  it('selects a tab on click and swaps the visible panel', () => {
    renderTabs();

    getTab('gamma').click();

    expect(getTab('gamma')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('gamma panel');
  });

  it('moves selection with ArrowRight and ArrowLeft when horizontal', () => {
    renderTabs();
    getTab('alpha').focus();

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(getTab('beta'));
    expect(getTab('beta')).toHaveAttribute('aria-selected', 'true');

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(getTab('alpha'));
  });

  it('ignores the cross-axis arrows when horizontal', () => {
    renderTabs();
    getTab('alpha').focus();

    pressKeyOnFocused('ArrowDown');

    expect(document.activeElement).toBe(getTab('alpha'));
  });

  it('jumps to the first and last tab with Home and End', () => {
    renderTabs();
    getTab('beta').focus();

    pressKeyOnFocused('End');
    expect(document.activeElement).toBe(getTab('gamma'));

    pressKeyOnFocused('Home');
    expect(document.activeElement).toBe(getTab('alpha'));
  });

  it('marks disabled tabs and skips them while navigating', () => {
    renderTabs({ disabled: ['beta'] });
    const disabled = getTab('beta');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).toHaveAttribute('tabindex', '-1');

    getTab('alpha').focus();
    pressKeyOnFocused('ArrowRight');

    expect(document.activeElement).toBe(getTab('gamma'));
  });
});

describe('Tab selection', () => {
  it('does not select a tab when it loses focus', () => {
    render(() => (
      <TabGroup defaultValue="beta" toggleable horizontal>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
      </TabGroup>
    ));
    getTab('alpha').focus();

    // With `toggleable`, selecting the selected tab again would deselect it.
    getTab('alpha').blur();

    expect(getTab('alpha')).toHaveAttribute('aria-selected', 'true');
  });

  it('does not deselect a toggleable tab that a press just selected', () => {
    render(() => (
      <TabGroup defaultValue={undefined as string | undefined} toggleable horizontal>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
      </TabGroup>
    ));
    const tab = getTab('beta');

    // A press goes pointerdown, focus, click.
    fireEvent.pointerDown(tab);
    tab.focus();
    fireEvent.click(tab);

    expect(tab).toHaveAttribute('aria-selected', 'true');
  });

  // https://github.com/lxsmnsyc/terracotta/issues/47
  it('keeps the new tab selected when the closing panel holds a Listbox', async () => {
    render(() => (
      <TabGroup defaultValue="beta" horizontal>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
        <TabPanel value="alpha">
          <Listbox defaultOpen={false} defaultValue="one">
            <ListboxButton>Pick</ListboxButton>
            <ListboxOptions>
              <ListboxOption value="one">one</ListboxOption>
            </ListboxOptions>
          </Listbox>
        </TabPanel>
        <TabPanel value="beta">beta panel</TabPanel>
      </TabGroup>
    ));

    // Alpha's panel, and its Listbox, are built while tab alpha has focus.
    getTab('alpha').focus();
    await settle();
    expect(screen.getByRole('button', { name: 'Pick' })).toBeInTheDocument();

    getTab('beta').focus();
    await settle();

    expect(getTab('beta')).toHaveAttribute('aria-selected', 'true');
    expect(await activeElement()).toBe(getTab('beta'));
  });
});
