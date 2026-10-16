import type { JSX } from '@solidjs/web';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridColumnHeader,
  TreeGridHeaderRow,
  TreeGridRow,
} from 'terracotta/treegrid';

export default function TreeGridCase(): JSX.Element {
  return (
    <div>
      <button type="button">Before</button>
      <TreeGrid aria-label="Mail" defaultExpanded={[] as string[]}>
        {(state) => (
          <>
            <thead>
              <TreeGridHeaderRow>
                <TreeGridColumnHeader>Folder</TreeGridColumnHeader>
                <TreeGridColumnHeader>Actions</TreeGridColumnHeader>
              </TreeGridHeaderRow>
            </thead>
            <tbody>
              <TreeGridRow value="inbox" expandable aria-label="Inbox">
                <TreeGridCell>Inbox</TreeGridCell>
                <TreeGridCell>
                  <button type="button">Mark read</button>
                  <button type="button">Archive</button>
                </TreeGridCell>
              </TreeGridRow>
              {state.isExpanded('inbox') && (
                <TreeGridRow value="lunch" level={2} aria-label="Lunch">
                  <TreeGridCell>Lunch</TreeGridCell>
                  <TreeGridCell>
                    <button type="button">Reply</button>
                  </TreeGridCell>
                </TreeGridRow>
              )}
            </tbody>
          </>
        )}
      </TreeGrid>
      <button type="button">After</button>
    </div>
  );
}
