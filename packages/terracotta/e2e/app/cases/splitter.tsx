import type { JSX } from '@solidjs/web';
import { Splitter, SplitterPane, SplitterSeparator } from 'terracotta/splitter';

export default function SplitterCase(): JSX.Element {
  return (
    <Splitter
      defaultValue={30}
      data-testid="splitter"
      style={{ display: 'flex', width: '400px', height: '200px' }}
    >
      {(state) => (
        <>
          <SplitterPane style={{ 'flex-basis': `${state.value()}%`, overflow: 'hidden' }}>
            Contents
          </SplitterPane>
          <SplitterSeparator
            aria-label="Contents"
            style={{ width: '8px', background: '#999', cursor: 'col-resize' }}
          />
          <div style={{ flex: '1' }}>Chapter</div>
        </>
      )}
    </Splitter>
  );
}
