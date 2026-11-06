var states_default = {
  slug: "states",
  title: "State primitives",
  description: "Every stateful Terracotta component is a thin shell around one of these reactive\nstores. The stores are exported, so you can read a component's state from\nanywhere in its subtree, or build your own component on the same behaviour.",
  headings: [
    {
      "id": "disclosure-state",
      "text": "Disclosure state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "toggle-state",
      "text": "Toggle state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "check-state",
      "text": "Check state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "input-state",
      "text": "Input state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "select-state",
      "text": "Select state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "select-option-state",
      "text": "Select option state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "autocomplete-state",
      "text": "Autocomplete state",
      "level": 2
    },
    {
      "id": "options",
      "text": "Options",
      "level": 3
    },
    {
      "id": "properties",
      "text": "Properties",
      "level": 3
    },
    {
      "id": "autocomplete-option-state",
      "text": "Autocomplete option state",
      "level": 2
    }
  ],
  hero: void 0,
  blocks: [{
    type: "html",
    html: `<p>Three things are exported per state:</p>
<ul>
<li><code>create\u2026State(options)</code> creates the store. Call it inside a component you own.</li>
<li><code>use\u2026State()</code> reads the nearest store from context. Throws if there is none.</li>
<li><code>\u2026StateChild</code> is a component whose <code>children</code> render prop receives the store.</li>
</ul>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { DisclosureStateChild, useDisclosureState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/states'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// Render prop, no extra component needed</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureStateChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'open'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'closed'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureStateChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// Or a hook, inside any descendant component</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> CloseButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> useDisclosureState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}>Close&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>A function passed to a <code>\u2026StateChild</code> counts as a render prop only if it declares
exactly one parameter. A zero-parameter function is rendered as-is.</p>
<hr>
<h2 id="disclosure-state">Disclosure state</h2>
<p>Open/closed state. Backs <code>Disclosure</code>, <code>Dialog</code>, <code>AlertDialog</code>, <code>Popover</code>,
<code>ContextMenu</code>, <code>CommandBar</code>, <code>Tooltip</code> and the popup half of <code>Listbox</code> and
<code>Combobox</code>.</p>
<p><code>createDisclosureState(options)</code> \xB7 <code>useDisclosureState()</code> \xB7 <code>&lt;DisclosureStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultOpen</code></td>
<td><code>boolean</code></td>
<td>none</td>
<td>Initial state, uncontrolled. Mutually exclusive with <code>isOpen</code>.</td>
</tr>
<tr>
<td><code>isOpen</code></td>
<td><code>boolean</code></td>
<td>none</td>
<td>Current state, controlled. Mutually exclusive with <code>defaultOpen</code>.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks every state change.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(state: boolean) =&gt; void</code></td>
<td>none</td>
<td>Called on every change with the new state.</td>
</tr>
<tr>
<td><code>onOpen</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called when the state becomes open. Runs before <code>onChange</code>.</td>
</tr>
<tr>
<td><code>onClose</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called when the state becomes closed. Runs after <code>onChange</code>.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>isOpen()</code></td>
<td><code>boolean</code></td>
<td>Whether the disclosure is open.</td>
</tr>
<tr>
<td><code>setState(value)</code></td>
<td><code>(boolean) =&gt; void</code></td>
<td>Sets the state. No-op while disabled.</td>
</tr>
<tr>
<td><code>open()</code></td>
<td><code>() =&gt; void</code></td>
<td>Opens. No-op while disabled.</td>
</tr>
<tr>
<td><code>close()</code></td>
<td><code>() =&gt; void</code></td>
<td>Closes. No-op while disabled.</td>
</tr>
<tr>
<td><code>toggle()</code></td>
<td><code>() =&gt; void</code></td>
<td>Flips the state. No-op while disabled.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the state is disabled.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="toggle-state">Toggle state</h2>
<p>Pressed/unpressed state for toggle buttons. Backs <code>Toggle</code>.</p>
<p><code>createToggleState(options)</code> \xB7 <code>useToggleState()</code> \xB7 <code>&lt;ToggleStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultPressed</code></td>
<td><code>boolean</code></td>
<td>none</td>
<td>Initial state, uncontrolled.</td>
</tr>
<tr>
<td><code>pressed</code></td>
<td><code>boolean</code></td>
<td>none</td>
<td>Current state, controlled.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks every state change.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(state: boolean) =&gt; void</code></td>
<td>none</td>
<td>Called with the new state.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pressed()</code></td>
<td><code>boolean</code></td>
<td>Whether the toggle is pressed.</td>
</tr>
<tr>
<td><code>setState(value)</code></td>
<td><code>(boolean) =&gt; void</code></td>
<td>Sets the state.</td>
</tr>
<tr>
<td><code>check()</code> / <code>uncheck()</code></td>
<td><code>() =&gt; void</code></td>
<td>Sets the state to <code>true</code> / <code>false</code>.</td>
</tr>
<tr>
<td><code>toggle()</code></td>
<td><code>() =&gt; void</code></td>
<td>Flips the state.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the state is disabled.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="check-state">Check state</h2>
<p>Tri-state checkbox value: <code>true</code>, <code>false</code>, or <code>undefined</code> for indeterminate.
Backs <code>Checkbox</code> and <code>Switch</code>. A <code>Switch</code> treats <code>undefined</code> as off.</p>
<p><code>createCheckState(options)</code> \xB7 <code>useCheckState()</code> \xB7 <code>&lt;CheckStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultChecked</code></td>
<td><code>boolean | undefined</code></td>
<td>none</td>
<td>Initial state, uncontrolled. <code>undefined</code> starts indeterminate.</td>
</tr>
<tr>
<td><code>checked</code></td>
<td><code>boolean | undefined</code></td>
<td>none</td>
<td>Current state, controlled.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks every state change.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(state?: boolean) =&gt; void</code></td>
<td>none</td>
<td>Called with the new state.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>checked()</code></td>
<td><code>boolean | undefined</code></td>
<td>Current value; <code>undefined</code> means indeterminate.</td>
</tr>
<tr>
<td><code>setState(value?)</code></td>
<td><code>(boolean | undefined) =&gt; void</code></td>
<td>Sets the state.</td>
</tr>
<tr>
<td><code>check()</code> / <code>uncheck()</code></td>
<td><code>() =&gt; void</code></td>
<td>Sets <code>true</code> / <code>false</code>.</td>
</tr>
<tr>
<td><code>reset()</code></td>
<td><code>() =&gt; void</code></td>
<td>Returns to indeterminate (<code>undefined</code>).</td>
</tr>
<tr>
<td><code>toggle()</code></td>
<td><code>() =&gt; void</code></td>
<td>Flips the state. From indeterminate this yields <code>true</code>.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the state is disabled.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="input-state">Input state</h2>
<p>A plain string value. Exported for building text-input components.</p>
<p><code>createInputState(options)</code> \xB7 <code>useInputState()</code> \xB7 <code>&lt;InputStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultValue</code></td>
<td><code>string | undefined</code></td>
<td>none</td>
<td>Initial value, uncontrolled.</td>
</tr>
<tr>
<td><code>value</code></td>
<td><code>string | undefined</code></td>
<td>none</td>
<td>Current value, controlled.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks writes.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(state?: string) =&gt; void</code></td>
<td>none</td>
<td>Called with the new value.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value()</code></td>
<td><code>string | undefined</code></td>
<td>Current value.</td>
</tr>
<tr>
<td><code>setState(value?)</code></td>
<td><code>(string | undefined) =&gt; void</code></td>
<td>Sets the value.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the state is disabled.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="select-state">Select state</h2>
<p>Selection over a set of values, in single or multiple mode. It also tracks the
<em>active</em> value, the one focus is on. Backs <code>Accordion</code>, <code>Select</code>, <code>Listbox</code>,
<code>RadioGroup</code> and <code>TabGroup</code>.</p>
<p><code>createSingleSelectState(options)</code> \xB7 <code>createMultipleSelectState(options)</code> \xB7
<code>useSelectState&lt;T&gt;()</code> \xB7 <code>&lt;SelectStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>multiple</code></td>
<td><code>false</code> / <code>true</code></td>
<td><code>false</code></td>
<td>Discriminates the two variants. <code>createMultipleSelectState</code> requires <code>multiple: true</code>.</td>
</tr>
<tr>
<td><code>defaultValue</code></td>
<td><code>T</code> (single) / <code>T[]</code> (multiple)</td>
<td>none</td>
<td>Initial selection, uncontrolled.</td>
</tr>
<tr>
<td><code>value</code></td>
<td><code>T</code> (single) / <code>T[]</code> (multiple)</td>
<td>none</td>
<td>Current selection, controlled.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(value?: T) =&gt; void</code> / <code>(value: T[]) =&gt; void</code></td>
<td>none</td>
<td>Called with the new selection.</td>
</tr>
<tr>
<td><code>toggleable</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>When <code>true</code>, selecting the already-selected value clears it (single) or removes it (multiple).</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks selection and focus changes.</td>
</tr>
<tr>
<td><code>by</code></td>
<td><code>(a: T, b: T) =&gt; boolean</code></td>
<td>reference equality</td>
<td>Compares values. The default treats <code>NaN</code> as equal to <code>NaN</code>; supply your own for value objects, e.g. <code>(a, b) =&gt; a.id === b.id</code>.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>isSelected(value)</code></td>
<td><code>(T) =&gt; boolean</code></td>
<td>Whether the value is selected.</td>
</tr>
<tr>
<td><code>select(value)</code></td>
<td><code>(T) =&gt; void</code></td>
<td>Selects the value, honouring <code>toggleable</code>.</td>
</tr>
<tr>
<td><code>hasSelected()</code></td>
<td><code>boolean</code></td>
<td>Whether anything is selected.</td>
</tr>
<tr>
<td><code>isActive(value)</code></td>
<td><code>(T) =&gt; boolean</code></td>
<td>Whether the value is the active one.</td>
</tr>
<tr>
<td><code>hasActive()</code></td>
<td><code>boolean</code></td>
<td>Whether any value is active.</td>
</tr>
<tr>
<td><code>focus(value)</code></td>
<td><code>(T) =&gt; void</code></td>
<td>Marks the value active.</td>
</tr>
<tr>
<td><code>blur()</code></td>
<td><code>() =&gt; void</code></td>
<td>Clears the active value.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the state is disabled.</td>
</tr>
</tbody>
</table>
<blockquote>
<p>In single mode, <code>isSelected</code> compares with the built-in equality instead of
<code>by</code>. <code>by</code> is applied by <code>select</code>, <code>isActive</code> and the multiple-mode lookups.
If that distinction matters to you, pass values you can compare by reference,
or use multiple mode.</p>
</blockquote>
<hr>
<h2 id="select-option-state">Select option state</h2>
<p>The per-option view of a select state. Created by <code>SelectOption</code>,
<code>ListboxOption</code>, <code>AccordionItem</code>, <code>Tab</code>, <code>TabPanel</code> and <code>RadioGroupOption</code>.</p>
<p><code>createSelectOptionState(options)</code> \xB7 <code>useSelectOptionState()</code> \xB7 <code>&lt;SelectOptionStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>T</code></td>
<td><em>required</em></td>
<td>The value this option represents.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Disables this option. The option is also disabled when the parent select state is.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>isSelected()</code></td>
<td><code>boolean</code></td>
<td>Whether this option is selected.</td>
</tr>
<tr>
<td><code>select()</code></td>
<td><code>() =&gt; void</code></td>
<td>Selects this option.</td>
</tr>
<tr>
<td><code>isActive()</code></td>
<td><code>boolean</code></td>
<td>Whether this option is active.</td>
</tr>
<tr>
<td><code>focus()</code> / <code>blur()</code></td>
<td><code>() =&gt; void</code></td>
<td>Marks this option active / clears it.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether this option is disabled.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="autocomplete-state">Autocomplete state</h2>
<p>A select state, plus a debounced text query and per-value matching. Backs
<code>Combobox</code> and <code>Command</code>.</p>
<p><code>createSingleAutocompleteState(options)</code> \xB7 <code>createMultipleAutocompleteState(options)</code> \xB7
<code>useAutocompleteState&lt;T&gt;()</code> \xB7 <code>&lt;AutocompleteStateChild&gt;</code></p>
<h3 id="options">Options</h3>
<p>Everything from <a href="#select-state">select state</a>, plus:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>matchBy</code></td>
<td><code>(value: T, query: string) =&gt; boolean</code></td>
<td><em>required</em></td>
<td>Decides whether a value matches the current query. Called for every option on every query change.</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<p>Everything from <a href="#select-state">select state</a>, plus:</p>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>query()</code></td>
<td><code>string</code></td>
<td>The current query. Starts as <code>''</code>.</td>
</tr>
<tr>
<td><code>setQuery(value)</code></td>
<td><code>(string) =&gt; void</code></td>
<td>Sets the query. Debounced by 250 ms before it becomes readable.</td>
</tr>
<tr>
<td><code>matches(value)</code></td>
<td><code>(T) =&gt; boolean</code></td>
<td>Runs <code>matchBy</code> against the current query.</td>
</tr>
<tr>
<td><code>hasQuery()</code></td>
<td><code>boolean</code></td>
<td>Whether the query is non-empty.</td>
</tr>
</tbody>
</table>
<blockquote>
<p><code>setQuery</code> is debounced, so <code>query()</code> lags typing by 250 ms. The debounce
keeps filtering off the keystroke path. It also means an assertion made
immediately after typing still sees the previous query.</p>
</blockquote>
<hr>
<h2 id="autocomplete-option-state">Autocomplete option state</h2>
<p>The per-option view of an autocomplete state. Created by <code>ComboboxOption</code> and
<code>CommandOption</code>.</p>
<p><code>createAutocompleteOptionState(options)</code> \xB7 <code>useAutocompleteOptionState()</code> \xB7
<code>&lt;AutocompleteOptionStateChild&gt;</code></p>
<p>Options are the same as <a href="#select-option-state">select option state</a>. Properties
are the same, plus:</p>
<table>
<thead>
<tr>
<th>Member</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>matches()</code></td>
<td><code>boolean</code></td>
<td>Whether this option matches the current query.</td>
</tr>
</tbody>
</table>
`
  }]
};

export { states_default as default };
//# sourceMappingURL=states-Cm56_EwQ.mjs.map
