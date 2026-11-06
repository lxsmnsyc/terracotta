import type { JSX } from '@solidjs/web';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';

const OPTIONS = ['Small', 'Medium', 'Large'];

export default function RadioGroupCase(): JSX.Element {
  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <RadioGroup defaultValue={undefined}>
        <RadioGroupLabel>Size</RadioGroupLabel>
        {OPTIONS.map((option) => (
          <RadioGroupOption value={option}>
            <RadioGroupLabel>{option}</RadioGroupLabel>
          </RadioGroupOption>
        ))}
      </RadioGroup>
    </div>
  );
}
