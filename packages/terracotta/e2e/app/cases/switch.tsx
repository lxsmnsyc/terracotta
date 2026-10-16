import type { JSX } from '@solidjs/web';
import { Switch } from 'terracotta/switch';

export default function SwitchCase(): JSX.Element {
  return (
    <div>
      <Switch defaultChecked={false}>Aeroplane mode</Switch>
    </div>
  );
}
