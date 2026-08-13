import type { JSX } from 'solid-js';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta';

const TABS = ['alpha', 'beta', 'gamma'];

export default function TabsCase(): JSX.Element {
  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <TabGroup defaultValue="alpha" horizontal>
        <TabList>
          {TABS.map((tab) => (
            <Tab value={tab}>{tab} tab</Tab>
          ))}
        </TabList>
        {TABS.map((tab) => (
          <TabPanel value={tab}>{tab} panel</TabPanel>
        ))}
      </TabGroup>
      <button type="button" data-testid="after">
        After
      </button>
    </div>
  );
}
