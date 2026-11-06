var rendering_default = {
  slug: "guides/rendering",
  title: "Rendering",
  description: "How Terracotta turns its parts into DOM: which element it renders, which props\nreach that element, how you get a handle on it, and what happens to hidden\ncontent.",
  headings: [
    {
      "id": "as-or-polymorphic-rendering",
      "text": "`as`, or polymorphic rendering",
      "level": 2
    },
    {
      "id": "prop-passthrough",
      "text": "Prop passthrough",
      "level": 2
    },
    {
      "id": "ref",
      "text": "`ref`",
      "level": 2
    },
    {
      "id": "unmount",
      "text": "`unmount`",
      "level": 2
    },
    {
      "id": "unmount-offscreen",
      "text": '`unmount="offscreen"`',
      "level": 3
    },
    {
      "id": "portals",
      "text": "Portals",
      "level": 2
    },
    {
      "id": "async-content",
      "text": "Async content",
      "level": 2
    }
  ],
  hero: void 0,
  blocks: [{
    type: "html",
    html: `<h2 id="as-or-polymorphic-rendering"><code>as</code>, or polymorphic rendering</h2>
<p>Every rendered component accepts <code>as</code>. It picks the element or component to
render, and takes either an intrinsic tag name (<code>'section'</code>, <code>'li'</code>, \u2026) or any
Solid component.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"#panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Toggle&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{MyCard}>\u2026&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>Each component page documents its own default. The types follow <code>as</code>: with
<code>as=&quot;a&quot;</code>, the component also accepts <code>&lt;a&gt;</code> props such as <code>href</code>.</p>
<p>Behaviour comes from the component, not the tag. A <code>Button</code> rendered <code>as=&quot;div&quot;</code>
still responds to <kbd>Enter</kbd> and <kbd>Space</kbd>, because Terracotta adds
the keyboard handling that a native <code>&lt;button&gt;</code> would have given you.</p>
<h2 id="prop-passthrough">Prop passthrough</h2>
<p>Props that a component does not use itself are forwarded to the rendered
element. That includes <code>class</code>, <code>classList</code>, <code>style</code>, <code>id</code> and DOM event
handlers. Terracotta strips its own props (<code>value</code>, <code>disabled</code>, <code>unmount</code>, \u2026)
first, so they never show up in the DOM as stray attributes.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ListboxOption</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{person} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"option"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> data-analytics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"picker"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {person.name}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ListboxOption</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The component consumes <code>value</code>. <code>class</code> and <code>data-analytics</code> land on the <code>&lt;li&gt;</code>.</p>
<h2 id="ref"><code>ref</code></h2>
<p>Components that need a DOM handle accept <code>ref</code>. Terracotta assigns it from an
effect instead of writing to it directly. A <code>ref</code> callback therefore runs in the
same reactive scope it would have if you had written the element yourself, so
<code>createEffect</code> works inside one.</p>
<p>Components that take no <code>ref</code> say so in their reference table.</p>
<h2 id="unmount"><code>unmount</code></h2>
<p>Components that hide content accept <code>unmount</code>:</p>
<table>
<thead>
<tr>
<th>Value</th>
<th>Behaviour</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>true</code> <em>(default)</em></td>
<td>Children are removed from the DOM while hidden, and rebuilt when shown.</td>
</tr>
<tr>
<td><code>false</code></td>
<td>Children are always rendered. Use this to hide with CSS, or to wrap the element in a <code>&lt;Transition&gt;</code> that needs it to survive a leave animation.</td>
</tr>
<tr>
<td><code>'offscreen'</code></td>
<td>Children are created once and reused, but still attached conditionally. Keeps expensive subtrees alive across toggles.</td>
</tr>
</tbody>
</table>
<p>The default is the safe one. Hidden content is really gone, so <kbd>Tab</kbd>
cannot reach it and screen readers cannot announce it. Use <code>false</code> only when
something else needs the element to stay alive, such as a transition or a
measurement, and hide it yourself.</p>
<p>Inside a <a href="/components/transition"><code>Transition</code></a>, <code>unmount={false}</code> is
handled for you: the transitioning element is marked <code>inert</code> once it starts
leaving and stays that way while hidden, so its content leaves the tab order and
the accessibility tree even though it is still in the DOM.</p>
<h3 id="unmount-offscreen"><code>unmount=&quot;offscreen&quot;</code></h3>
<p><code>'offscreen'</code> sits between the two. The children are built the first time the
component renders and are never torn down again; hiding only detaches them from
the document, and showing puts the very same nodes back.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverPanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"panel"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> unmount</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"offscreen"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ExpensiveChart</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">points</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The chart is constructed once. Reopening the popover reattaches the element that
was already there rather than mounting a second chart, so anything the component
holds in its own state, whether a computed layout, a loaded dataset or an
uncontrolled input's value, is still there. Being detached, the content is out of the
document while hidden, so <kbd>Tab</kbd> cannot reach it and screen readers
cannot announce it, exactly as with the default.</p>
<p>What does not stop is the work. A detached subtree is still mounted as far as
Solid is concerned: its effects keep running, its subscriptions stay subscribed,
and any interval or polling loop it started keeps firing while nothing is on
screen. <code>'offscreen'</code> is worth it for a subtree that is expensive to <em>build</em> and
cheap to keep; it is the wrong choice for one that is expensive to <em>run</em>. Prefer
the default there, or pause the work yourself while the component is closed.</p>
<p>Measurements are the other thing to watch. A detached element has no layout, so
<code>getBoundingClientRect()</code> reads zeroes and <code>offsetWidth</code> is <code>0</code> until it is
attached again. Measure after it becomes visible, not while it is hidden.</p>
<h2 id="portals">Portals</h2>
<p>Terracotta renders every part where you put it. It never moves a panel into a
portal for you. Wrap a panel in Solid's <code>&lt;Portal&gt;</code> when it needs to escape a
parent's <code>overflow</code>, <code>transform</code> or stacking context.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Portal } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Options&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Portal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverPanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"popover-panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>\u2026&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PopoverPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Portal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Popover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>A panel in a portal still belongs to the panel it was opened from. Terracotta
tracks nesting through the component tree, not the DOM. This applies to
<code>Dialog</code>, <code>AlertDialog</code>, <code>CommandBar</code>, <code>PopoverPanel</code>, <code>ContextMenuPanel</code>,
<code>ListboxOptions</code> and <code>ComboboxOptions</code>.</p>
<ul>
<li>Moving focus into a nested panel does not close the panel around it.</li>
<li>Moving focus from a nested panel to the page closes both.</li>
<li>A click in a nested panel is not a click outside a <code>ContextMenuPanel</code>.</li>
<li>An open modal does not make its nested panels inert.</li>
</ul>
<p>Positioning stays yours. A panel in a portal is no longer next to its button,
so <code>position: absolute</code> relative to the button stops working. Use
<code>position: fixed</code> with a positioning library such as <code>solid-floating-ui</code>. See
<a href="/components/popover#positioning">Popover positioning</a>.</p>
<p>To stack nested panels, render each one later in the DOM than its parent with
the same <code>z-index</code>, or give it a higher one.</p>
<h2 id="async-content">Async content</h2>
<p>Panels hold whatever you put in them, <code>Loading</code> included, and a boundary inside
a panel behaves the way it would anywhere else. What is worth knowing is how it
lines up with the two things a panel does when it opens: transition, and move
focus.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"panel-enter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"from"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"to"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> unmount</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> />}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Comments</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p><strong>Transitions do not wait for the resource.</strong> The transition drives the panel
element, and the boundary swaps its own contents underneath. The panel animates
in on schedule with the fallback inside it, and the content replaces the
fallback whenever it arrives, mid-animation or long after. Closing while the
resource is still pending is fine too: the leave transition runs, and the
pending boundary is removed along with the panel.</p>
<p>Put the boundary the other way round, with a <code>Loading</code> wrapping the
<code>Transition</code>, and the transitioning element is not in the document while
suspended, so nothing
animates until the boundary resolves. Solid holds back the effects created under
a suspended boundary, so the transition runs when the content lands rather than
being missed.</p>
<p><strong>Focus is taken once, when the panel opens.</strong> Dialog, AlertDialog, Popover,
ContextMenu and CommandBar look through the panel for something focusable as
they open. A panel showing a fallback usually has nothing to offer.</p>
<ul>
<li>Dialog, AlertDialog, CommandBar and ContextMenu then focus the panel itself.
Escape and Tab still work, but the content that arrives later does not get
focus.</li>
<li>Popover leaves focus where it was.</li>
</ul>
<p>No second look is taken. The
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">dialog pattern</a> expects
focus on an element inside the dialog, so this is worth designing around. An
async read defers even when its value has already settled, so a boundary always
shows its fallback for the render the panel looks at. Having the data ready in
advance does not help.</p>
<p>Two ways to keep focus where it belongs:</p>
<ul>
<li>
<p>Keep something focusable in the panel that is not behind the boundary, such as
a close button, which a dialog usually wants anyway. It is there
when the panel opens, takes focus, and keeps it while the content loads.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{close}>Close&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> />}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Details</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre></li>
<li>
<p>Or hoist the boundary above the component, so the panel is built only once
its content is ready and finds it on the first look.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fallback</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> />}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> isOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Details</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DialogPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The trade-off is that nothing of the dialog exists while loading, so the
fallback has to stand in for the whole thing rather than for its contents.</p>
</li>
</ul>
`
  }]
};

export { rendering_default as default };
//# sourceMappingURL=rendering-wrjXihqR.mjs.map
