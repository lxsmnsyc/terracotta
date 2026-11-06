var state_default = {
  slug: "guides/state",
  title: "State",
  description: "Who owns a component's state, and how you read it back out.",
  headings: [
    {
      "id": "controlled-and-uncontrolled",
      "text": "Controlled and uncontrolled",
      "level": 2
    },
    {
      "id": "render-props",
      "text": "Render props",
      "level": 2
    },
    {
      "id": "reaching-the-state-from-further-away",
      "text": "Reaching the state from further away",
      "level": 2
    }
  ],
  hero: void 0,
  blocks: [{
    type: "html",
    html: `<h2 id="controlled-and-uncontrolled">Controlled and uncontrolled</h2>
<p>Stateful components come in two shapes. Terracotta picks between them by looking
at which prop you passed:</p>
<table>
<thead>
<tr>
<th>Uncontrolled prop</th>
<th>Controlled prop</th>
<th>Used by</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultOpen</code></td>
<td><code>isOpen</code></td>
<td>Disclosure, Dialog, AlertDialog, Popover, ContextMenu, CommandBar, Listbox, Combobox</td>
</tr>
<tr>
<td><code>defaultValue</code></td>
<td><code>value</code></td>
<td>Accordion, Select, Listbox, Combobox, Command, RadioGroup, TabGroup</td>
</tr>
<tr>
<td><code>defaultChecked</code></td>
<td><code>checked</code></td>
<td>Checkbox</td>
</tr>
<tr>
<td><code>defaultPressed</code></td>
<td><code>pressed</code></td>
<td>Toggle</td>
</tr>
</tbody>
</table>
<p><strong>Uncontrolled</strong>: the component owns a signal and updates itself. <code>onChange</code>
only tells you what happened.</p>
<p><strong>Controlled</strong>: the component never writes state. It calls <code>onChange</code>, and
nothing moves on screen until you update the value you passed in.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// Uncontrolled: works on its own</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}>\u2026&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// Controlled: you own the signal</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> isOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setOpen}>\u2026&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The choice is made once, when the component is created. Do not switch a
component from <code>defaultOpen</code> to <code>isOpen</code> at runtime.</p>
<p>A controlled component whose value never changes will not move. If a click seems
to do nothing, check that <code>onChange</code> writes back to the signal you pass in.</p>
<h2 id="render-props">Render props</h2>
<p><code>children</code> can be a function. It receives the component's state, so you can read
that state without reaching for context:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Hide'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Show'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Content&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>Two details are worth knowing:</p>
<ul>
<li>On <strong>root</strong> components, the ones that create the state, any function child is
called with the state.</li>
<li>On <strong>descendant</strong> components, a function counts as a render prop only if it
declares exactly one parameter. <code>() =&gt; &lt;span /&gt;</code> renders as-is.
<code>state =&gt; &lt;span /&gt;</code> is called with the state.</li>
</ul>
<h2 id="reaching-the-state-from-further-away">Reaching the state from further away</h2>
<p>The same states are available through the <code>\u2026StateChild</code> components and
<code>use\u2026State()</code> hooks in <a href="/states">states.md</a>. Use those when the markup that
needs the state sits several components below the root, where threading a render
prop down would only add noise.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> CloseButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> useDisclosureState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}>Close&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>Every component page names the state it owns, so you know which hook applies.</p>
`
  }]
};

export { state_default as default };
//# sourceMappingURL=state-BfSr76r4.mjs.map
