var keyboard_and_focus_default = {
  slug: "guides/keyboard-and-focus",
  title: "Keyboard and focus",
  description: "Terracotta ships the keyboard behaviour each WAI-ARIA pattern calls for. Every\ncomponent page lists its own key bindings. This page covers the parts that work\nthe same way across the library.",
  headings: [
    {
      "id": "focus-navigation-in-composite-widgets",
      "text": "Focus navigation in composite widgets",
      "level": 2
    },
    {
      "id": "roving-tabindex",
      "text": "Roving tabindex",
      "level": 2
    },
    {
      "id": "virtual-focus",
      "text": "Virtual focus",
      "level": 2
    },
    {
      "id": "focus-restoration",
      "text": "Focus restoration",
      "level": 2
    }
  ],
  hero: void 0,
  blocks: [{
    type: "html",
    html: '<h2 id="focus-navigation-in-composite-widgets">Focus navigation in composite widgets</h2>\n<p>Accordion, Menu, Listbox, Select, RadioGroup, Tabs, Feed, Combobox and Command\neach own a focus navigator. To find its items, a navigator queries for\ndescendants that carry its <code>tc-owner</code> attribute and are not <code>tc-disabled</code>.</p>\n<p>Two things follow from that:</p>\n<ul>\n<li>Disabled items are skipped automatically, so arrow keys step over them.</li>\n<li>Nesting one widget inside another confuses neither, because each only matches\nthe descendants it owns.</li>\n</ul>\n<h2 id="roving-tabindex">Roving tabindex</h2>\n<p>Composite widgets take a single <kbd>Tab</kbd> stop. Only the selected item has\n<code>tabindex=&quot;0&quot;</code>; the rest have <code>tabindex=&quot;-1&quot;</code>. <kbd>Tab</kbd> moves into the\nwidget and then out of it, and arrow keys move within it.</p>\n<h2 id="virtual-focus">Virtual focus</h2>\n<p>Combobox and Command navigate virtually. DOM focus stays on the input, and the\nactive option is published through <code>aria-activedescendant</code>. This keeps typing\nworking while the highlight moves through the list.</p>\n<p>Style the highlight from <code>tc-active</code>, not from <code>:focus</code>. The option never holds\nDOM focus.</p>\n<h2 id="focus-restoration">Focus restoration</h2>\n<p>Dialog, AlertDialog, Popover, ContextMenu and CommandBar remember which element\nwas focused before they opened, and return focus to it when they close.</p>\n<p>All five also trap <kbd>Tab</kbd> inside their panel while open, so focus wraps\nwithin the panel instead of escaping to the page behind it.</p>\n<p>The search for something to focus happens once, as the panel opens. A panel\nwhose content arrives later, from a <code>Loading</code> boundary inside it or any other\nasync source, has nothing to offer at that moment, and is not asked again. See\n<a href="/guides/rendering#async-content">async content</a> for what to do about it.</p>\n'
  }]
};

export { keyboard_and_focus_default as default };
//# sourceMappingURL=keyboard-and-focus-CU3WWZB5.mjs.map
