var styling_default = {
  slug: "guides/styling",
  title: "Styling",
  description: "Terracotta reports state through <code>tc-</code> attributes instead of class names. It\nnever touches your <code>class</code>. The attributes are the whole styling API: CSS\nattribute selectors are all you need, and your class names stay yours.",
  headings: [
    {
      "id": "state-attributes",
      "text": "State attributes",
      "level": 2
    },
    {
      "id": "styling-with-them",
      "text": "Styling with them",
      "level": 2
    },
    {
      "id": "reading-them-in-code",
      "text": "Reading them in code",
      "level": 2
    }
  ],
  hero: void 0,
  blocks: [{
    type: "html",
    html: `<h2 id="state-attributes">State attributes</h2>
<p>Every component stamps a marker attribute named after itself, such as
<code>tc-dialog</code>, <code>tc-accordion-button</code> or <code>tc-listbox-option</code>. On top of that, it
writes whichever of these apply:</p>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Values</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>tc-disabled</code></td>
<td><code>&quot;&quot;</code> when disabled, otherwise absent</td>
<td>Interaction is blocked. Focus navigation also uses it to skip the element.</td>
</tr>
<tr>
<td><code>tc-expanded</code></td>
<td><code>&quot;&quot;</code> when open</td>
<td>Disclosure-like state is open.</td>
</tr>
<tr>
<td><code>tc-checked</code></td>
<td><code>&quot;&quot;</code> when checked, <code>&quot;mixed&quot;</code> when indeterminate, absent when unchecked</td>
<td>Checkbox / radio state.</td>
</tr>
<tr>
<td><code>tc-selected</code></td>
<td><code>&quot;&quot;</code> when selected</td>
<td>Option, tab or accordion item is the selected value.</td>
</tr>
<tr>
<td><code>tc-active</code></td>
<td><code>&quot;&quot;</code> when active</td>
<td>Element currently holds focus within its group.</td>
</tr>
<tr>
<td><code>tc-pressed</code></td>
<td><code>&quot;&quot;</code> when pressed</td>
<td>Toggle button state.</td>
</tr>
<tr>
<td><code>tc-matches</code></td>
<td><code>&quot;&quot;</code> when the option matches the query</td>
<td>Combobox/Command filtering.</td>
</tr>
<tr>
<td><code>tc-has-selected</code></td>
<td><code>&quot;&quot;</code></td>
<td>A descendant is selected.</td>
</tr>
<tr>
<td><code>tc-has-active</code></td>
<td><code>&quot;&quot;</code></td>
<td>A descendant is active.</td>
</tr>
<tr>
<td><code>tc-has-query</code></td>
<td><code>&quot;&quot;</code></td>
<td>The autocomplete query is non-empty.</td>
</tr>
<tr>
<td><code>tc-owner</code></td>
<td>owner id</td>
<td>Ties a focusable descendant to the root that navigates it. Internal, but present in the DOM.</td>
</tr>
<tr>
<td><code>tc-transition</code></td>
<td><code>enter-from</code> | <code>enter-to</code> | <code>entered</code> | <code>leave-from</code> | <code>leave-to</code></td>
<td>Current phase of a <code>&lt;TransitionChild&gt;</code>.</td>
</tr>
</tbody>
</table>
<p>Boolean attributes hold an empty string when on, and are absent when off. That
is exactly what a bare attribute selector tests for:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">font-weight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">pointer-events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">none</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span></code></pre><p><code>tc-checked</code> is the only one with three states, so match on its value:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-checked</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]      { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* checked */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-checked</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"mixed"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* indeterminate */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">:not</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-checked</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">])   { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* unchecked */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span></code></pre><h2 id="styling-with-them">Styling with them</h2>
<p>Give the element a class as usual, then combine it with the state attribute.
The two never collide, because Terracotta only writes attributes:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ListboxOption</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{person} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"option"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {person.name}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ListboxOption</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0.75</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  cursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">pointer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* Keyboard or pointer is on this option */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-active</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">#eff6ff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* This option is the current value */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-weight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">#9ca3af</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  cursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">not-allowed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>The <code>tc-has-*</code> attributes sit on a container and describe its descendants. That
lets a parent react to its children in plain CSS:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* Dim the placeholder text on the button until something is chosen */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.listbox-button:not</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-has-selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">#9ca3af</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>The attributes live on real elements, so they work with ordinary selectors:
<code>:hover</code>, <code>:focus-visible</code>, sibling and descendant combinators, media queries.
Nothing extra is needed.</p>
<h2 id="reading-them-in-code">Reading them in code</h2>
<p>The state behind these attributes is also available to your markup, through a
render prop or a hook. You rarely need to read the DOM:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Hide'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Show'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>Each component page lists both: the attributes it writes, and the state object
they come from. See <a href="/guides/state">state</a> for how render props and hooks work.</p>
`
  }]
};

export { styling_default as default };
//# sourceMappingURL=styling-Dl0XDS0r.mjs.map
