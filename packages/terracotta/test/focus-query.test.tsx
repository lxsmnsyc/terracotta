import { render, screen } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { activeElement } from './aria';
import { Dialog, DialogPanel } from '../src';
import getFocusableElements from '../src/utils/focus-query';

/**
 * The query approximates what the browser lets the user tab to. jsdom has no
 * opinion of its own about focusability, so these assert the approximation
 * itself rather than the browser behaviour behind it.
 */
function build(markup: string): HTMLElement {
  const root = document.createElement('div');
  root.innerHTML = markup;
  document.body.append(root);
  return root;
}

function ids(root: HTMLElement, filter?: HTMLElement): string[] {
  return getFocusableElements(root, filter).map((element) => element.id);
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('getFocusableElements', () => {
  it('collects the usual interactive elements', () => {
    const root = build(`
      <a id="link" href="#">link</a>
      <button id="button">button</button>
      <input id="input" />
      <select id="select"></select>
      <textarea id="textarea"></textarea>
      <summary id="summary">summary</summary>
      <audio id="audio" controls></audio>
      <video id="video" controls></video>
      <div id="tabbable" tabindex="0"></div>
      <div id="editable" contenteditable="true"></div>
    `);

    expect(ids(root)).toEqual([
      'link',
      'button',
      'input',
      'select',
      'textarea',
      'summary',
      'audio',
      'video',
      'tabbable',
      'editable',
    ]);
  });

  it('skips elements that cannot be tabbed to', () => {
    const root = build(`
      <a id="anchor">no href</a>
      <button id="disabled" disabled>disabled</button>
      <input id="hidden-input" type="hidden" />
      <input id="disabled-input" disabled />
      <div id="untabbable" tabindex="-1"></div>
      <div id="not-editable" contenteditable="false"></div>
      <audio id="audio"></audio>
    `);

    expect(ids(root)).toEqual([]);
  });

  it('skips anything the `inert` attribute covers', () => {
    const root = build(`
      <button id="before">before</button>
      <div inert>
        <button id="inside">inside</button>
        <button id="sibling">sibling</button>
      </div>
      <button id="after">after</button>
    `);

    expect(ids(root)).toEqual(['before', 'after']);
  });

  it('skips anything the `hidden` attribute covers', () => {
    const root = build(`
      <button id="visible">visible</button>
      <button id="attribute" hidden>hidden attribute</button>
      <div hidden><button id="inside">inside a hidden parent</button></div>
    `);

    expect(ids(root)).toEqual(['visible']);
  });

  it('skips what `checkVisibility` rejects where the browser provides it', () => {
    // jsdom has no `checkVisibility`, so CSS-hidden elements cannot be set up
    // and asked about directly. Standing one in tests the part that is ours:
    // that the query defers to the platform for anything hidden by CSS.
    const root = build(`
      <button id="shown">shown</button>
      <button id="css-hidden">hidden by CSS</button>
    `);
    function stub(this: Element): boolean {
      return this.id !== 'css-hidden';
    }
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    (Element.prototype as { checkVisibility?: () => boolean }).checkVisibility = stub;

    try {
      expect(ids(root)).toEqual(['shown']);
    } finally {
      delete (Element.prototype as { checkVisibility?: () => boolean }).checkVisibility;
    }
  });

  it('looks past the element it was given for something that blocks focus', () => {
    const root = build(
      '<div inert><div id="panel"><button id="inside">inside</button></div></div>',
    );
    const panel = root.querySelector<HTMLElement>('#panel')!;

    expect(ids(panel)).toEqual([]);
  });

  it('excludes the subtree it is asked to filter out', () => {
    const root = build(`
      <button id="kept">kept</button>
      <div id="excluded"><button id="dropped">dropped</button></div>
    `);
    const excluded = root.querySelector<HTMLElement>('#excluded')!;

    expect(ids(root, excluded)).toEqual(['kept']);
  });
});

describe('panel focus', () => {
  it('does not hand initial focus to an inert part of the panel', async () => {
    render(() => (
      <Dialog isOpen>
        <DialogPanel>
          <div inert>
            <button type="button">inert</button>
          </div>
          <button type="button" data-testid="reachable">
            reachable
          </button>
        </DialogPanel>
      </Dialog>
    ));

    expect(await activeElement()).toBe(screen.getByTestId('reachable'));
  });
});
