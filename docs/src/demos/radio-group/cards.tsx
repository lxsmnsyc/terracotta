import type { JSX } from '@solidjs/web';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from 'terracotta/radio-group';

export default function RadioCards(): JSX.Element {
  return (
    <RadioGroup<string> class="radiogroup" defaultValue="standard">
      <RadioGroupLabel class="radiogroup-label">Delivery speed</RadioGroupLabel>

      <RadioGroupOption class="radio-card" value="standard">
        <RadioGroupLabel class="radio-card-title">Standard</RadioGroupLabel>
        <RadioGroupDescription class="radio-card-hint">
          3–5 working days, free
        </RadioGroupDescription>
      </RadioGroupOption>

      <RadioGroupOption class="radio-card" value="express">
        <RadioGroupLabel class="radio-card-title">Express</RadioGroupLabel>
        <RadioGroupDescription class="radio-card-hint">Next working day, £6</RadioGroupDescription>
      </RadioGroupOption>

      <RadioGroupOption class="radio-card" value="overnight" disabled>
        <RadioGroupLabel class="radio-card-title">Overnight</RadioGroupLabel>
        <RadioGroupDescription class="radio-card-hint">
          Not available to your address
        </RadioGroupDescription>
      </RadioGroupOption>
    </RadioGroup>
  );
}
