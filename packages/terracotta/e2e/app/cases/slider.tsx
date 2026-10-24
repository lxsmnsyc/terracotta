import type { JSX } from '@solidjs/web';
import { Slider, SliderLabel, SliderThumb, SliderTrack } from 'terracotta/slider';

export default function SliderCase(): JSX.Element {
  return (
    <div style={{ padding: '2rem' }}>
      <Slider defaultValue={50}>
        {(state) => (
          <>
            <SliderLabel>Volume</SliderLabel>
            <SliderTrack
              data-testid="track"
              style={{ position: 'relative', width: '200px', height: '10px', background: '#ddd' }}
            >
              <SliderThumb
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: `calc(${state.percent()}% - 10px)`,
                  width: '20px',
                  height: '20px',
                  background: '#333',
                }}
              />
            </SliderTrack>
          </>
        )}
      </Slider>
    </div>
  );
}
