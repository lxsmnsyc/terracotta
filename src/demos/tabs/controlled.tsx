import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta/tabs';

const NEXT: Record<string, string> = { one: 'two', two: 'three', three: 'one' };

export default function ControlledTabs(): JSX.Element {
  const [tab, setTab] = createSignal('one');

  return (
    <div class="stack">
      <TabGroup<string>
        class="tabs"
        horizontal
        value={tab()}
        onChange={(value) => value && setTab(value)}
      >
        <TabList class="tablist">
          <Tab class="tab" value="one">
            Step 1
          </Tab>
          <Tab class="tab" value="two">
            Step 2
          </Tab>
          <Tab class="tab" value="three">
            Step 3
          </Tab>
        </TabList>

        <TabPanel class="tabpanel" value="one">
          Choose a plan.
        </TabPanel>
        <TabPanel class="tabpanel" value="two">
          Enter your details.
        </TabPanel>
        <TabPanel class="tabpanel" value="three">
          Confirm and pay.
        </TabPanel>
      </TabGroup>

      <button
        type="button"
        class="button"
        onClick={() => setTab((current) => NEXT[current] ?? 'one')}
      >
        Next step
      </button>
    </div>
  );
}
