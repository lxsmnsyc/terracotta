import type { JSX } from '@solidjs/web';
import { Splitter, SplitterPane, SplitterSeparator } from 'terracotta/splitter';

/**
 * The value is the primary pane's share of the splitter. The page sizes the
 * pane from it; the library only moves the value.
 */
export default function BasicSplitter(): JSX.Element {
  return (
    <div class="stack">
      <Splitter class="splitter" defaultValue={35} min={15} max={70}>
        {(state) => (
          <>
            <SplitterPane class="splitter-pane" style={{ 'flex-basis': `${state.value()}%` }}>
              <p id="splitter-contents" class="splitter-title">
                Contents
              </p>
              <p class="hint">Chapter 1, Chapter 2, Chapter 3</p>
            </SplitterPane>
            <SplitterSeparator class="splitter-separator" aria-labelledby="splitter-contents" />
            <div class="splitter-pane splitter-pane-rest">
              <p class="hint">Drag the bar, or focus it and use the arrow keys.</p>
            </div>
          </>
        )}
      </Splitter>
      <p class="hint">
        <kbd>Enter</kbd> collapses the contents to its smallest size, and restores it.
      </p>
    </div>
  );
}
