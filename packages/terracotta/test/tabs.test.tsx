import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { activeElement, pressKeyOnFocused, referencedBy } from './aria';
import { Tab, TabGroup, TabList, TabPanel } from '../src/components/tabs';

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

  it('moves selection with ArrowRight and ArrowLeft when horizontal', async () => {
    renderTabs();
    getTab('alpha').focus();

    pressKeyOnFocused('ArrowRight');
    expect(await activeElement()).toBe(getTab('beta'));
    expect(getTab('beta')).toHaveAttribute('aria-selected', 'true');

    pressKeyOnFocused('ArrowLeft');
    expect(await activeElement()).toBe(getTab('alpha'));
  });

  it('ignores the cross-axis arrows when horizontal', async () => {
    renderTabs();
    getTab('alpha').focus();

    pressKeyOnFocused('ArrowDown');

    expect(await activeElement()).toBe(getTab('alpha'));
  });

  it('jumps to the first and last tab with Home and End', async () => {
    renderTabs();
    getTab('beta').focus();

    pressKeyOnFocused('End');
    expect(await activeElement()).toBe(getTab('gamma'));

    pressKeyOnFocused('Home');
    expect(await activeElement()).toBe(getTab('alpha'));
  });

  it('marks disabled tabs and skips them while navigating', async () => {
    renderTabs({ disabled: ['beta'] });
    const disabled = getTab('beta');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).toHaveAttribute('tabindex', '-1');

    getTab('alpha').focus();
    pressKeyOnFocused('ArrowRight');

    expect(await activeElement()).toBe(getTab('gamma'));
  });

  it('gives the tab stop to the first enabled tab when nothing is selected', () => {
    render(() => (
      <TabGroup defaultValue={undefined} horizontal={true}>
        <TabList>
          <Tab value="alpha" disabled={true}>
            alpha tab
          </Tab>
          <Tab value="beta">beta tab</Tab>
          <Tab value="gamma">gamma tab</Tab>
        </TabList>
      </TabGroup>
    ));

    expect(getTab('alpha')).toHaveAttribute('tabindex', '-1');
    expect(getTab('beta')).toHaveAttribute('tabindex', '0');
    expect(getTab('gamma')).toHaveAttribute('tabindex', '-1');
  });

  it('gives the tab stop to the first enabled tab when the selected tab is disabled', () => {
    renderTabs({ value: 'gamma', disabled: ['gamma'] });

    expect(getTab('alpha')).toHaveAttribute('tabindex', '0');
    expect(getTab('beta')).toHaveAttribute('tabindex', '-1');
    expect(getTab('gamma')).toHaveAttribute('tabindex', '-1');
  });

  it('keeps a toggleable tab selected when pressing it focuses it', () => {
    render(() => (
      <TabGroup defaultValue={undefined} toggleable={true} horizontal={true}>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
      </TabGroup>
    ));
    const tab = getTab('beta');

    // A mouse press focuses the tab before it clicks it.
    fireEvent.pointerDown(tab);
    tab.focus();
    tab.click();

    expect(tab).toHaveAttribute('aria-selected', 'true');

    tab.blur();

    expect(tab).toHaveAttribute('aria-selected', 'true');

    // A second press on the selected tab still toggles it off.
    fireEvent.pointerDown(tab);
    tab.focus();
    tab.click();

    expect(tab).toHaveAttribute('aria-selected', 'false');
  });

  it('omits `aria-controls` while the panel is not in the DOM', () => {
    renderTabs({ value: 'alpha' });

    expect(getTab('beta')).not.toHaveAttribute('aria-controls');
    expect(getTab('gamma')).not.toHaveAttribute('aria-controls');

    getTab('beta').click();

    expect(getTab('alpha')).not.toHaveAttribute('aria-controls');
    expect(referencedBy(getTab('beta'), 'aria-controls')).toHaveTextContent('beta panel');
  });

  it('keeps `aria-controls` on every tab when the panels stay mounted', () => {
    render(() => (
      <TabGroup defaultValue="alpha" horizontal={true}>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
        {TABS.map((tab) => (
          <TabPanel value={tab} unmount={false}>
            {tab} panel
          </TabPanel>
        ))}
      </TabGroup>
    ));

    for (const tab of TABS) {
      expect(referencedBy(getTab(tab), 'aria-controls')).toHaveTextContent(`${tab} panel`);
    }
  });

  it('marks a disabled group with the data attribute only', () => {
    const result = render(() => (
      <TabGroup defaultValue="alpha" horizontal={true} disabled={true}>
        <TabList>
          <Tab value="alpha">alpha tab</Tab>
        </TabList>
      </TabGroup>
    ));
    const root = result.container.querySelector('[tc-tab-group]');

    expect(root).toHaveAttribute('tc-disabled');
    expect(root).not.toHaveAttribute('aria-disabled');
    expect(root).not.toHaveAttribute('disabled');
  });
});
