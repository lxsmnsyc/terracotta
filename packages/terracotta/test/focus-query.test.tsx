import { render, screen } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { activeElement } from './aria';
import { Dialog, DialogPanel } from '../src/components/dialog';
import getFocusableElements from '../src/utils/focus-query';

/**
 * The query approximates what the browser lets the user tab to, so it is tested
 * in a real one. Under jsdom the platform side of it had to be stubbed, which
 * left the approximation asserting against itself.
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

  it('skips what CSS has hidden', () => {
    const root = build(`
      <button id="shown">shown</button>
      <button id="display-none" style="display: none">display</button>
      <button id="visibility-hidden" style="visibility: hidden">visibility</button>
      <div style="display: none"><button id="inside">inside a hidden parent</button></div>
    `);

    expect(ids(root)).toEqual(['shown']);
  });

  it('offers only elements the browser will actually focus', () => {
    // The point of the query is to predict the browser. Asking the browser
    // directly is the only assertion that checks the prediction rather than
    // the selector that makes it.
    const root = build(`
      <a id="link" href="#">link</a>
      <button id="button">button</button>
      <input id="input" />
      <select id="select"></select>
      <textarea id="textarea"></textarea>
      <div id="tabbable" tabindex="0"></div>
      <div id="editable" contenteditable="true"></div>
    `);

    for (const element of getFocusableElements(root)) {
      element.focus();
      expect(document.activeElement).toBe(element);
    }
  });

  it('leaves out elements the browser refuses to focus', () => {
    // `tabindex="-1"` is deliberately absent: it leaves an element out of the
    // tab order while `focus()` still works on it, so it is not something this
    // assertion can distinguish.
    const root = build(`
      <button id="disabled" disabled>disabled</button>
      <div inert><button id="inert-child">inert</button></div>
      <button id="css-hidden" style="display: none">hidden</button>
      <button id="invisible" style="visibility: hidden">invisible</button>
    `);

    expect(ids(root)).toEqual([]);
    for (const element of root.querySelectorAll<HTMLElement>('[id]')) {
      element.focus();
      expect(document.activeElement).not.toBe(element);
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
