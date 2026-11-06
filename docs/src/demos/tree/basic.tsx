import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemLabel,
  type TreeItemProperties,
} from 'terracotta/tree';

interface Node {
  name: string;
  children?: Node[];
}

const FILES: Node[] = [
  {
    name: 'Documents',
    children: [
      { name: 'CV.pdf' },
      { name: 'Letters', children: [{ name: 'Bank.txt' }, { name: 'Landlord.txt' }] },
    ],
  },
  { name: 'Music', children: [{ name: 'Album.flac' }] },
  { name: 'Notes.md' },
];

function caretOf(item: TreeItemProperties): string {
  if (!item.isParent()) {
    return '';
  }
  return item.isExpanded() ? '▾' : '▸';
}

function Item(props: { node: Node }): JSX.Element {
  return (
    <TreeItem class="tree-item" value={props.node.name}>
      {(item) => (
        <>
          <span class="tree-row" style={{ 'padding-inline-start': `${item.level() - 1}rem` }}>
            <span class="tree-caret" aria-hidden="true">
              {caretOf(item)}
            </span>
            <TreeItemLabel>{props.node.name}</TreeItemLabel>
          </span>
          {props.node.children && (
            <TreeGroup class="tree-group">
              {props.node.children.map((child) => (
                <Item node={child} />
              ))}
            </TreeGroup>
          )}
        </>
      )}
    </TreeItem>
  );
}

/**
 * The tree owns selection and expansion. The page draws the rows, the
 * indentation and the caret from each item's state.
 */
export default function BasicTree(): JSX.Element {
  const [selected, setSelected] = createSignal<string>();

  return (
    <div class="stack">
      <Tree
        class="tree"
        aria-label="Files"
        defaultValue={undefined as string | undefined}
        onChange={setSelected}
        defaultExpanded={['Documents']}
      >
        {FILES.map((node) => (
          <Item node={node} />
        ))}
      </Tree>
      <p class="hint">{selected() ? `Selected: ${selected()}` : 'Arrow keys move and open folders.'}</p>
    </div>
  );
}
