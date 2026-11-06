import type { JSX } from '@solidjs/web';
import { Tree, TreeGroup, TreeItem, TreeItemLabel } from 'terracotta/tree';

export default function TreeCase(): JSX.Element {
  return (
    <div>
      <button type="button">Before</button>
      <Tree aria-label="Files" defaultValue={undefined as string | undefined}>
        <TreeItem value="docs">
          <TreeItemLabel>Documents</TreeItemLabel>
          <TreeGroup>
            <TreeItem value="cv">
              <TreeItemLabel>CV.pdf</TreeItemLabel>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
        <TreeItem value="music">
          <TreeItemLabel>Music</TreeItemLabel>
        </TreeItem>
      </Tree>
      <button type="button">After</button>
    </div>
  );
}
