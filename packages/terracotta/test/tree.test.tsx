import { fireEvent, render, screen } from '@solidjs/testing-library';
import type { JSX } from '@solidjs/web';
import { describe, expect, it, vi } from 'vitest';
import { Tree, TreeGroup, TreeItem, TreeItemLabel } from '../src/components/tree';
import { pressKeyOnFocused, settle } from './aria';

function Items(): JSX.Element {
  return (
    <>
      <TreeItem value="docs">
        <TreeItemLabel>Documents</TreeItemLabel>
        <TreeGroup>
          <TreeItem value="cv">
            <TreeItemLabel>CV.pdf</TreeItemLabel>
          </TreeItem>
          <TreeItem value="letters">
            <TreeItemLabel>Letters</TreeItemLabel>
            <TreeGroup>
              <TreeItem value="bank">
                <TreeItemLabel>Bank.txt</TreeItemLabel>
              </TreeItem>
            </TreeGroup>
          </TreeItem>
        </TreeGroup>
      </TreeItem>
      <TreeItem value="music">
        <TreeItemLabel>Music</TreeItemLabel>
      </TreeItem>
      <TreeItem value="photos" disabled>
        <TreeItemLabel>Photos</TreeItemLabel>
      </TreeItem>
    </>
  );
}

function renderTree(
  props: {
    multiple?: boolean;
    value?: string;
    expanded?: string[];
    onChange?: (value?: string) => void;
    onExpandedChange?: (value: string[]) => void;
  } = {},
): void {
  if (props.multiple) {
    render(() => (
      <Tree aria-label="Files" multiple defaultValue={[]} defaultExpanded={props.expanded}>
        <Items />
      </Tree>
    ));
  } else {
    render(() => (
      <Tree
        aria-label="Files"
        defaultValue={props.value}
        onChange={props.onChange}
        defaultExpanded={props.expanded}
        onExpandedChange={props.onExpandedChange}
      >
        <Items />
      </Tree>
    ));
  }
}

function getItem(name: string): HTMLElement {
  return screen.getByRole('treeitem', { name });
}

describe('Tree accessibility', () => {
  it('uses the tree, treeitem and group roles', async () => {
    renderTree({ expanded: ['docs'] });
    await settle();

    expect(screen.getByRole('tree', { name: 'Files' })).toBeInTheDocument();
    expect(screen.getByRole('group')).toContainElement(getItem('CV.pdf'));
  });

  it('marks parent nodes with aria-expanded, and leaves it off end nodes', async () => {
    renderTree();
    await settle();

    expect(getItem('Documents')).toHaveAttribute('aria-expanded', 'false');
    expect(getItem('Music')).not.toHaveAttribute('aria-expanded');
  });

  it('names each item from its label only', async () => {
    renderTree({ expanded: ['docs'] });
    await settle();

    expect(getItem('Documents')).toHaveAccessibleName('Documents');
  });

  it('marks selection with aria-selected', async () => {
    renderTree({ value: 'music' });
    await settle();

    expect(getItem('Music')).toHaveAttribute('aria-selected', 'true');
    expect(getItem('Documents')).toHaveAttribute('aria-selected', 'false');
  });

  it('sets aria-multiselectable for a multi-select tree', () => {
    renderTree({ multiple: true });

    expect(screen.getByRole('tree')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('is one tab stop, on the first node', async () => {
    renderTree();
    await settle();

    expect(getItem('Documents')).toHaveAttribute('tabindex', '0');
    expect(getItem('Music')).toHaveAttribute('tabindex', '-1');
  });

  it('puts the tab stop on the selected node', async () => {
    renderTree({ value: 'music' });
    await settle();

    expect(getItem('Music')).toHaveAttribute('tabindex', '0');
    expect(getItem('Documents')).toHaveAttribute('tabindex', '-1');
  });
});

describe('Tree keyboard', () => {
  it('opens a closed node with Right, then moves to its first child', async () => {
    renderTree();
    await settle();
    getItem('Documents').focus();

    pressKeyOnFocused('ArrowRight');
    await settle();
    expect(getItem('Documents')).toHaveAttribute('aria-expanded', 'true');
    expect(document.activeElement).toBe(getItem('Documents'));

    pressKeyOnFocused('ArrowRight');
    expect(document.activeElement).toBe(getItem('CV.pdf'));
  });

  it('closes an open node with Left, and moves from a child to its parent', async () => {
    renderTree({ expanded: ['docs'] });
    await settle();
    getItem('CV.pdf').focus();

    pressKeyOnFocused('ArrowLeft');
    expect(document.activeElement).toBe(getItem('Documents'));

    pressKeyOnFocused('ArrowLeft');
    await settle();
    expect(getItem('Documents')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('treeitem', { name: 'CV.pdf' })).not.toBeInTheDocument();
  });

  it('moves through the visible nodes with Up, Down, Home and End', async () => {
    renderTree({ expanded: ['docs'] });
    await settle();
    getItem('Documents').focus();

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(getItem('CV.pdf'));

    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(getItem('Letters'));

    // Bank.txt is inside the closed Letters node, so it is skipped.
    pressKeyOnFocused('ArrowDown');
    expect(document.activeElement).toBe(getItem('Music'));

    pressKeyOnFocused('End');
    expect(document.activeElement).toBe(getItem('Photos'));

    pressKeyOnFocused('Home');
    expect(document.activeElement).toBe(getItem('Documents'));

    pressKeyOnFocused('ArrowUp');
    expect(document.activeElement).toBe(getItem('Documents'));
  });

  it('selects with Enter and Space', async () => {
    const onChange = vi.fn<(value?: string) => void>();
    renderTree({ onChange });
    await settle();
    getItem('Music').focus();

    pressKeyOnFocused('Enter');

    expect(onChange).toHaveBeenCalledWith('music');
    expect(getItem('Music')).toHaveAttribute('aria-selected', 'true');
  });

  it('toggles several nodes in a multi-select tree', async () => {
    renderTree({ multiple: true });
    await settle();
    getItem('Documents').focus();

    pressKeyOnFocused(' ');
    getItem('Music').focus();
    pressKeyOnFocused(' ');

    expect(getItem('Documents')).toHaveAttribute('aria-selected', 'true');
    expect(getItem('Music')).toHaveAttribute('aria-selected', 'true');

    pressKeyOnFocused(' ');
    expect(getItem('Music')).toHaveAttribute('aria-selected', 'false');
  });

  it('does not select a disabled node', async () => {
    renderTree();
    await settle();
    getItem('Photos').focus();

    pressKeyOnFocused('Enter');

    expect(getItem('Photos')).toHaveAttribute('aria-selected', 'false');
    expect(getItem('Photos')).toHaveAttribute('aria-disabled', 'true');
  });

  it('moves to a node by typing its name', () => {
    vi.useFakeTimers();
    renderTree();
    getItem('Documents').focus();

    pressKeyOnFocused('m');
    vi.advanceTimersByTime(300);

    expect(document.activeElement).toBe(getItem('Music'));
    vi.useRealTimers();
  });

  it('reports expansion through onExpandedChange', async () => {
    const onExpandedChange = vi.fn<(value: string[]) => void>();
    renderTree({ onExpandedChange });
    await settle();
    getItem('Documents').focus();

    pressKeyOnFocused('ArrowRight');

    expect(onExpandedChange).toHaveBeenCalledWith(['docs']);
  });
});

describe('Tree pointer', () => {
  it('selects and focuses a node when clicked', async () => {
    renderTree({ expanded: ['docs'] });
    await settle();

    fireEvent.click(screen.getByText('CV.pdf'));

    expect(getItem('CV.pdf')).toHaveAttribute('aria-selected', 'true');
    expect(getItem('Documents')).toHaveAttribute('aria-selected', 'false');
    expect(document.activeElement).toBe(getItem('CV.pdf'));
  });

  it('moves the tab stop to the focused node', async () => {
    renderTree();
    await settle();
    getItem('Music').focus();
    await settle();

    expect(getItem('Music')).toHaveAttribute('tabindex', '0');
    expect(getItem('Documents')).toHaveAttribute('tabindex', '-1');
  });
});
