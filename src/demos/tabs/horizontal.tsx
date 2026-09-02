import type { JSX } from '@solidjs/web';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta/tabs';

export default function HorizontalTabs(): JSX.Element {
  return (
    <div class="stack">
      <TabGroup<string> class="tabs" horizontal defaultValue="account">
        <TabList class="tablist">
          <Tab class="tab" value="account">
            Account
          </Tab>
          <Tab class="tab" value="billing">
            Billing
          </Tab>
          <Tab class="tab" value="team" disabled>
            Team
          </Tab>
        </TabList>

        <TabPanel class="tabpanel" value="account">
          Name, email address and password.
        </TabPanel>
        <TabPanel class="tabpanel" value="billing">
          Payment method and invoices.
        </TabPanel>
        <TabPanel class="tabpanel" value="team">
          Members, roles and invitations.
        </TabPanel>
      </TabGroup>
      <p class="hint">
        Automatic activation: the arrow keys move focus and change the panel together.
      </p>
    </div>
  );
}
