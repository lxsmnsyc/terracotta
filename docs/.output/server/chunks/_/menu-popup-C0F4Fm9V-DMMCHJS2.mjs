import { $ as DISABLED_NODE } from '../routes/_..._.mjs';

var MENU_ITEM = [
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio"
].map((role) => `[role="${role}"]:not(${DISABLED_NODE}):not([aria-disabled="true"])`).join(", ");
function hasMenu(panel) {
  return panel.querySelector('[role="menu"]') != null;
}
function focusMenuItem(panel, last = false) {
  const items = Array.from(panel.querySelectorAll(MENU_ITEM));
  const item = last ? items.at(-1) : items.at(0);
  if (item) {
    item.focus();
    return true;
  }
  return false;
}
function isMenuItemActivation(panel, target) {
  if (target instanceof Element) {
    const item = target.closest('[role="menuitem"]');
    return item != null && panel.contains(item) && !item.matches(DISABLED_NODE) && !item.hasAttribute("aria-haspopup");
  }
  return false;
}

export { focusMenuItem as f, hasMenu as h, isMenuItemActivation as i };
//# sourceMappingURL=menu-popup-C0F4Fm9V-DMMCHJS2.mjs.map
