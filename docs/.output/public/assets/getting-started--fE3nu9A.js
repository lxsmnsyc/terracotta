var e={slug:`guides/getting-started`,title:`Getting started`,description:`Terracotta is a headless UI library for SolidJS. Each component gives you
behaviour, keyboard handling and ARIA wiring. None of them give you styles. You
choose what the markup renders as, and what it looks like.`,headings:[{id:`install`,text:`Install`,level:2},{id:`imports`,text:`Imports`,level:2},{id:`your-first-component`,text:`Your first component`,level:2},{id:`the-mental-model`,text:`The mental model`,level:2},{id:`the-claude-code-plugin`,text:`The Claude Code plugin`,level:2},{id:`where-to-go-next`,text:`Where to go next`,level:2}],hero:void 0,blocks:[{type:`html`,html:`<h2 id="install">Install</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> terracotta@next</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> terracotta@next</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"># or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> terracotta@next</span></span></code></pre><p>Terracotta 2 is published under the <code>next</code> tag while it is a release candidate.
The <code>latest</code> tag still points at the 1.x line, which targets Solid 1 and is
imported from the package root rather than one entry per component.</p>
<p><code>solid-js</code> and <code>@solidjs/web</code> are peer dependencies. Terracotta 2 targets
Solid 2 (<code>^2.0.0-rc.13</code>).</p>
<p>The published code needs Node 20 or later, and uses syntax up to ES2022, such as
class static blocks. A toolchain that cannot parse that has to transpile the
package itself.</p>
<h2 id="imports">Imports</h2>
<p>Terracotta has no barrel entry point. Every component is its own entry, named
after itself, and the state primitives share one:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Disclosure } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/disclosure'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Listbox } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/listbox'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { useDisclosureState } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/states'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><p>Each page in this documentation opens with the exact import line for what it
covers. Importing a component pulls in that component and nothing else, so a
page that uses one widget never pays for the other twenty-two.</p>
<h2 id="your-first-component">Your first component</h2>
<p>Every widget is a set of parts that you compose. Terracotta renders nothing
beyond the elements you write, and adds no class names to them.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Disclosure,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  DisclosureButton,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  DisclosurePanel,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/disclosure'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Details</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"trigger"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Details&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Everything worth knowing.&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>Those few lines already cover what an accessible disclosure needs. The button
carries <code>aria-expanded</code>. While the panel is open, the button points at it with
<code>aria-controls</code>. While it is closed, the panel is not in the DOM at all.</p>
<h2 id="the-mental-model">The mental model</h2>
<p>Four ideas apply to every component in the library:</p>
<ul>
<li><strong>You own the markup.</strong> Each part renders a default element. Use <code>as</code> to swap
it for another element or your own component. See <a href="/guides/rendering">rendering</a>.</li>
<li><strong>You own the state, or the component does.</strong> Pass <code>defaultOpen</code> and the
component manages itself. Pass <code>isOpen</code> and you drive it. See
<a href="/guides/state">state</a>.</li>
<li><strong>You own the styling.</strong> State reaches CSS through <code>tc-</code> attributes, never
through class names. See <a href="/guides/styling">styling</a>.</li>
<li><strong>The library owns the accessibility.</strong> Roles, ARIA relationships, focus
management and keyboard handling come with the component. See
<a href="/guides/keyboard-and-focus">keyboard and focus</a>.</li>
</ul>
<h2 id="the-claude-code-plugin">The Claude Code plugin</h2>
<p>Terracotta ships a plugin for <a href="https://www.claude.com/product/claude-code">Claude Code</a>.
It carries a skill that describes the component catalogue and every part name,
the subpath imports, controlled versus uncontrolled state, render props, <code>as</code>
and prop passthrough, the <code>tc-</code> attributes, <code>unmount</code>, transitions, and the
keyboard and focus behaviour, with a copy of this reference material alongside
it, so the detail is available without a fetch.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span>/plugin marketplace add lxsmnsyc/terracotta</span></span>
<span class="line"><span>/plugin install terracotta@terracotta</span></span></code></pre><p>Nothing else needs configuring. The skill declares the situations it applies to,
so it loads on its own once you are working in SolidJS code that imports from
<code>terracotta</code>, and stays out of the way otherwise. Check that it registered with:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span>/plugin</span></span></code></pre><p>It documents Terracotta 2 and marks where 1.x differs, chiefly that 1.x has a
package root entry, so <code>import { Dialog } from 'terracotta'</code> is right there and
resolves to nothing here.</p>
<h2 id="where-to-go-next">Where to go next</h2>
<ul>
<li><a href="/#components">Component reference</a>: every component, part by part</li>
<li><a href="/states">State primitives</a>: the reactive stores underneath, which you
can also use on their own</li>
</ul>
`}]};export{e as default};