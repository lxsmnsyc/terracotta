export default function queryNodes<T extends Element>(
  el: T,
  tag: string,
  ownerID: string,
): NodeListOf<Element> {
  return el.querySelectorAll(`[data-sh-${tag}="${ownerID}"]`);
}

const ACCORDION_BUTTON = 'accordion-button';

export function queryAccordionButtons<E extends Element>(
  el: E,
  ownerID: string,
): NodeListOf<Element> {
  return queryNodes(el, ACCORDION_BUTTON, ownerID);
}

const LISTBOX_OPTION = 'listbox-option';

export function queryListboxOptions<E extends Element>(
  el: E,
  ownerID: string,
): NodeListOf<Element> {
  return queryNodes(el, LISTBOX_OPTION, ownerID);
}

const MENU_ITEM = 'menu-item';

export function queryMenuItems<E extends Element>(
  el: E,
  ownerID: string,
): NodeListOf<Element> {
  return queryNodes(el, MENU_ITEM, ownerID);
}
