import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from 'terracotta/checkbox';
import { Toggle } from 'terracotta/toggle';

export default function CheckboxCase(): JSX.Element {
  const [checked, setChecked] = createSignal(false);

  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <Checkbox
        checked={checked()}
        onChange={(value) => {
          setChecked(!!value);
        }}
      >
        <CheckboxLabel>Notify me</CheckboxLabel>
        <CheckboxIndicator />
        <CheckboxDescription>Send an email on every reply</CheckboxDescription>
      </Checkbox>
      <Toggle defaultPressed={false}>Bold</Toggle>
      <div data-testid="state">{checked() ? 'checked' : 'unchecked'}</div>
    </div>
  );
}
