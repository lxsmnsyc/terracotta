import type { JSX } from '@solidjs/web';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridColumnHeader,
  TreeGridHeaderRow,
  TreeGridRow,
  type TreeGridRowProperties,
} from 'terracotta/treegrid';

interface Thread {
  id: string;
  subject: string;
  from: string;
  replies?: Thread[];
}

const THREADS: Thread[] = [
  {
    id: 'trip',
    subject: 'Trip in June',
    from: 'Grace',
    replies: [
      { id: 'trip-1', subject: 'Re: Trip in June', from: 'Ada' },
      { id: 'trip-2', subject: 'Re: Trip in June', from: 'Katherine' },
    ],
  },
  { id: 'lunch', subject: 'Lunch on Friday?', from: 'Ada' },
];

function caretOf(row: TreeGridRowProperties): string {
  if (!row.isExpandable()) {
    return '';
  }
  return row.isExpanded() ? '▾' : '▸';
}

/**
 * The rows are flat in the markup, so each row gets its `level`. The page
 * renders a thread's replies while the thread is expanded.
 */
export default function BasicTreeGrid(): JSX.Element {
  return (
    <TreeGrid class="grid" aria-label="Inbox" defaultExpanded={['trip']}>
      {(state) => (
        <>
          <thead>
            <TreeGridHeaderRow>
              <TreeGridColumnHeader class="grid-header">Subject</TreeGridColumnHeader>
              <TreeGridColumnHeader class="grid-header">From</TreeGridColumnHeader>
            </TreeGridHeaderRow>
          </thead>
          <tbody>
            {THREADS.map((thread) => (
              <>
                <TreeGridRow
                  class="treegrid-row"
                  value={thread.id}
                  expandable={!!thread.replies}
                  aria-label={thread.subject}
                >
                  {(row) => (
                    <>
                      <TreeGridCell class="grid-cell">
                        <span class="tree-caret" aria-hidden="true">
                          {caretOf(row)}
                        </span>
                        {thread.subject}
                      </TreeGridCell>
                      <TreeGridCell class="grid-cell">{thread.from}</TreeGridCell>
                    </>
                  )}
                </TreeGridRow>
                {state.isExpanded(thread.id) &&
                  thread.replies?.map((reply) => (
                    <TreeGridRow
                      class="treegrid-row"
                      value={reply.id}
                      level={2}
                      aria-label={`${reply.subject}, from ${reply.from}`}
                    >
                      <TreeGridCell class="grid-cell treegrid-indent">{reply.subject}</TreeGridCell>
                      <TreeGridCell class="grid-cell">{reply.from}</TreeGridCell>
                    </TreeGridRow>
                  ))}
              </>
            ))}
          </tbody>
        </>
      )}
    </TreeGrid>
  );
}
