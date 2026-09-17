// A close approximation of the elements the browser lets the user tab to.
// It cannot be exact — focusability also depends on layout and on the
// browser's own idea of what is interactive — but the cases below are the ones
// that come up in practice.
const QUERY = [
  'a[href]',
  'area[href]',
  // A hidden input is never focusable, no matter what else it carries.
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  // The first `summary` of a `details` is focusable. Finding out which one that
  // is costs more than it saves, so every `summary` is offered.
  'summary',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
  // `[contenteditable]` on its own would also match `contenteditable="false"`,
  // which is explicitly not editable and not focusable.
  '[contenteditable=""]',
  '[contenteditable="true"]',
].join(', ');

/**
 * `hidden` removes an element from the layout and `inert` takes it out of the
 * tab order and the accessibility tree, and both apply to the whole subtree
 * underneath. Reading the attributes rather than the properties sees them
 * whichever way they were set, since both are reflected.
 */
function blocksFocus(node: Element): boolean {
  return node.hasAttribute('inert') || node.hasAttribute('hidden');
}

/**
 * Whether anything between the node and the document root takes it out of the
 * tab order. The walk has to run past the element the query started from: a
 * panel is often the child of the thing that hides it, such as a `Transition`
 * that marks itself `inert` while it leaves.
 *
 * Results are cached per call, so a subtree of many elements pays for each of
 * its shared ancestors once.
 */
function isBlocked(node: Element, cache: Map<Element, boolean>): boolean {
  const chain: Element[] = [];
  let current: Element | null = node;
  let blocked = false;

  while (current) {
    const cached = cache.get(current);
    if (cached !== undefined) {
      blocked = cached;
      break;
    }
    chain.push(current);
    if (blocksFocus(current)) {
      blocked = true;
      break;
    }
    current = current.parentElement;
  }

  for (let i = 0, len = chain.length; i < len; i += 1) {
    cache.set(chain[i], blocked);
  }

  return blocked;
}

/**
 * Whether the element is hidden by CSS — `display: none` anywhere above it,
 * `visibility: hidden`, or a collapsed `content-visibility`.
 *
 * `checkVisibility` answers all of that in one call the browser can serve from
 * whatever it already knows. Reading computed styles instead would mean a
 * lookup for the element and every one of its ancestors, on a path that runs
 * on each arrow key. Where the method is missing the check is skipped rather
 * than emulated: what it would catch is content the author hid themselves, and
 * anything Terracotta hides carries `inert` or `hidden` regardless.
 */
function isVisible(node: Element): boolean {
  // `visibilityProperty` has to be asked for: a bare `checkVisibility()` only
  // rules out what is not rendered at all, and `visibility: hidden` leaves the
  // element in the layout. It is still unfocusable, so the query has to skip
  // it too.
  return typeof node.checkVisibility === 'function'
    ? node.checkVisibility({ visibilityProperty: true })
    : true;
}

export default function getFocusableElements(
  node: HTMLElement,
  filter?: HTMLElement,
): HTMLElement[] {
  const nodes = node.querySelectorAll(QUERY);
  const replicated: Element[] = [];
  const cache = new Map<Element, boolean>();

  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const current = nodes[i];
    if (!filter?.contains(current) && isVisible(current) && !isBlocked(current, cache)) {
      replicated.push(current);
    }
  }

  return replicated as HTMLElement[];
}
