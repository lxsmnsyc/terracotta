var e={slug:`guides/keyboard-and-focus`,title:`Keyboard and focus`,description:`Terracotta ships the keyboard behaviour each WAI-ARIA pattern calls for. Every
component page lists its own key bindings. This page covers the parts that work
the same way across the library.`,headings:[{id:`focus-navigation-in-composite-widgets`,text:`Focus navigation in composite widgets`,level:2},{id:`roving-tabindex`,text:`Roving tabindex`,level:2},{id:`virtual-focus`,text:`Virtual focus`,level:2},{id:`focus-restoration`,text:`Focus restoration`,level:2}],hero:void 0,blocks:[{type:`html`,html:`<h2 id="focus-navigation-in-composite-widgets">Focus navigation in composite widgets</h2>
<p>Accordion, Menu, Listbox, Select, RadioGroup, Tabs, Feed, Combobox and Command
each own a focus navigator. To find its items, a navigator queries for
descendants that carry its <code>tc-owner</code> attribute and are not <code>tc-disabled</code>.</p>
<p>Two things follow from that:</p>
<ul>
<li>Disabled items are skipped automatically, so arrow keys step over them.</li>
<li>Nesting one widget inside another confuses neither, because each only matches
the descendants it owns.</li>
</ul>
<h2 id="roving-tabindex">Roving tabindex</h2>
<p>Composite widgets take a single <kbd>Tab</kbd> stop. Only the selected item has
<code>tabindex=&quot;0&quot;</code>; the rest have <code>tabindex=&quot;-1&quot;</code>. <kbd>Tab</kbd> moves into the
widget and then out of it, and arrow keys move within it.</p>
<h2 id="virtual-focus">Virtual focus</h2>
<p>Combobox and Command navigate virtually. DOM focus stays on the input, and the
active option is published through <code>aria-activedescendant</code>. This keeps typing
working while the highlight moves through the list.</p>
<p>Style the highlight from <code>tc-active</code>, not from <code>:focus</code>. The option never holds
DOM focus.</p>
<h2 id="focus-restoration">Focus restoration</h2>
<p>Dialog, AlertDialog, Popover, ContextMenu and CommandBar remember which element
was focused before they opened, and return focus to it when they close.</p>
<p>All five also trap <kbd>Tab</kbd> inside their panel while open, so focus wraps
within the panel instead of escaping to the page behind it.</p>
<p>The search for something to focus happens once, as the panel opens. A panel
whose content arrives later, from a <code>Loading</code> boundary inside it or any other
async source, has nothing to offer at that moment, and is not asked again. See
<a href="/guides/rendering#async-content">async content</a> for what to do about it.</p>
`}]};export{e as default};