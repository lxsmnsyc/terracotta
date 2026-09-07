import type { JSX } from '@solidjs/web';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta/tabs';

export default function VerticalTabs(): JSX.Element {
  return (
    <TabGroup<string> class="tabs tabs-vertical" horizontal={false} defaultValue="general">
      <TabList class="tablist tablist-vertical">
        <Tab class="tab" value="general">
          General
        </Tab>
        <Tab class="tab" value="appearance">
          Appearance
        </Tab>
        <Tab class="tab" value="advanced">
          Advanced
        </Tab>
      </TabList>

      <TabPanel class="tabpanel" value="general">
        Language, timezone and start page.
      </TabPanel>
      <TabPanel class="tabpanel" value="appearance">
        Theme, density and font size.
      </TabPanel>
      <TabPanel class="tabpanel" value="advanced">
        Experiments and developer options.
      </TabPanel>
    </TabGroup>
  );
}
