import type { JSX } from '@solidjs/web';
import { Meter, MeterLabel } from 'terracotta/meter';

/**
 * A meter shows a measurement. The fill is drawn from `percent()`, and
 * `aria-valuetext` says what the number means.
 */
export default function BasicMeter(): JSX.Element {
  return (
    <div class="stack">
      <Meter class="meter" value={62} getValueText={(value) => `${value}%, about 5 hours left`}>
        {(state) => (
          <>
            <div class="meter-header">
              <MeterLabel class="meter-label">Battery</MeterLabel>
              <span class="hint">{state.value()}%</span>
            </div>
            <span class="meter-track">
              <span class="meter-fill" style={{ 'inline-size': `${state.percent()}%` }} />
            </span>
          </>
        )}
      </Meter>
      <Meter class="meter" value={18} max={64} getValueText={(value) => `${value} of 64 GB used`}>
        {(state) => (
          <>
            <div class="meter-header">
              <MeterLabel class="meter-label">Storage</MeterLabel>
              <span class="hint">{state.value()} of 64 GB</span>
            </div>
            <span class="meter-track">
              <span class="meter-fill" style={{ 'inline-size': `${state.percent()}%` }} />
            </span>
          </>
        )}
      </Meter>
    </div>
  );
}
