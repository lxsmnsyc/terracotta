var e=`transition/fade`,t=`Fade`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { createSignal } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'solid-js'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Transition } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/transition'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> FadeTransition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setShow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setShow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value)}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Hide'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Show'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-enter"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-leave"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"transition-box"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          The element stays mounted until the leave transition has finished.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/transition`,title:`Transition`,description:`Class-driven enter and leave transitions. <code>Transition</code> adds and removes CSS
classes around a visibility change, waiting for the element's own animations to
finish between steps, and keeps it mounted until the leave transition is over.
An element can therefore animate out instead of vanishing.`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`how-the-classes-are-applied`,text:`How the classes are applied`,level:2},{id:`interrupting`,text:`Interrupting`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`fade`,text:`Fade`,level:3},{id:`slide-and-fade`,text:`Slide and fade`,level:3},{id:`keyframe-animations`,text:`Keyframe animations`,level:3},{id:`a-resting-state-with-entered`,text:"A resting state with `entered`",level:3},{id:`around-a-disclosure-panel`,text:`Around a disclosure panel`,level:3},{id:`coordinating-several-elements`,text:`Coordinating several elements`,level:3},{id:`running-work-around-a-transition`,text:`Running work around a transition`,level:3},{id:`respecting-reduced-motion`,text:`Respecting reduced motion`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`styling`,text:`Styling`,level:3},{id:`reading-the-state-in-code`,text:`Reading the state in code`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`transition`,text:"`<Transition>`",level:3},{id:`transitionchild`,text:"`<TransitionChild>`",level:3},{id:`notes`,text:`Notes`,level:2}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<p>It pairs well with every disclosure-based component. Give the panel
<code>unmount={false}</code> and let the transition own the mounting.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Transition, TransitionChild } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/transition'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>  {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* provides \`show\` and transitions itself */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TransitionChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional: extra elements sharing the same show flag */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p><code>Transition</code> <em>is</em> a <code>TransitionChild</code> with a <code>show</code> prop. The simple case needs
only one component.</p>
<h2 id="how-the-classes-are-applied">How the classes are applied</h2>
<p>On <strong>enter</strong>:</p>
<ol>
<li><code>beforeEnter()</code> runs, then the <code>enter</code> and <code>enterFrom</code> classes are added.</li>
<li>Once the element has nothing left animating, <code>enterFrom</code> is removed and
<code>enterTo</code> added.</li>
<li>Once that animation finishes, <code>enter</code> and <code>enterTo</code> are removed, <code>entered</code> is
added, and <code>afterEnter()</code> runs.</li>
</ol>
<p>On <strong>leave</strong>:</p>
<ol>
<li><code>beforeLeave()</code> runs and every nested <code>TransitionChild</code> leaves first.</li>
<li><code>entered</code> is removed, and <code>leave</code> and <code>leaveFrom</code> are added.</li>
<li>Once the element has nothing left animating, <code>leaveFrom</code> is removed and
<code>leaveTo</code> added.</li>
<li>Once that animation finishes, <code>leave</code> and <code>leaveTo</code> are removed, the element
is hidden (or unmounted), and <code>afterLeave()</code> runs.</li>
</ol>
<p>Every wait goes through <code>Element.getAnimations()</code> rather than a <code>transitionend</code>
listener, so an element with nothing to animate advances on the next microtask
instead of waiting for an event that would never arrive.</p>
<p>Each prop takes a space-separated class string, so one phase can carry several
class names.</p>
<h2 id="interrupting">Interrupting</h2>
<p>A <code>show</code> change part-way through a transition takes effect immediately. The
running transition stops at its next step, its <code>afterEnter</code> or <code>afterLeave</code>
never fires, and the opposite one starts, clearing the classes the interrupted
one left behind. So a panel shown again while it is fading out enters from
<code>enterFrom</code> rather than easing back from wherever the fade had got to: the phase
lives entirely in the classes, and there is no partial value to resume from.</p>
<h2 id="examples">Examples</h2>
<h3 id="fade">Fade</h3>
<p>Reusing <code>fade-to</code> as <code>leaveFrom</code> and <code>fade-from</code> as <code>leaveTo</code> makes the leave a
mirror of the enter. That is usually what you want.</p>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="slide-and-fade">Slide and fade</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"drawer"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-enter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-from"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-leave"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-to"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.slide-enter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: opacity </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">220</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, translate </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">220</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.slide-leave</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: opacity </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">160</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, translate </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">160</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.slide-from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.slide-to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">none</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span></code></pre><h3 id="keyframe-animations">Keyframe animations</h3>
<p>Keyframe animations are waited on exactly like transitions, so they work
without changes:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">visible</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"pop-in"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"pop-out"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Saved</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.pop-in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">animation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: pop-in </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">180</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.pop-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">animation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: pop-out </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">140</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">@keyframes</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70"> pop-in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">scale</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">   { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">scale</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">@keyframes</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70"> pop-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">scale</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">   { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">scale</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><h3 id="a-resting-state-with-entered">A resting state with <code>entered</code></h3>
<p><code>entered</code> is applied once the enter transition finishes, and removed when
leaving starts. Use it for a state that should not be part of the animation:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"panel"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-enter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  entered</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"panel-open"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-leave"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.panel-open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">box-shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 8</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 24</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rgb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> / </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">); }</span></span></code></pre><h3 id="around-a-disclosure-panel">Around a disclosure panel</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"disclosure"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"disclosure-button"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Toggle&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosureButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-enter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-leave"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"disclosure-panel"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> unmount</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">DisclosurePanel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Disclosure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p><code>unmount={false}</code> on the panel is the important part. Without it, the panel
removes itself the moment the disclosure closes, and the leave transition has
nothing to animate.</p>
<h3 id="coordinating-several-elements">Coordinating several elements</h3>
<p><code>TransitionChild</code> reads <code>show</code> from the nearest <code>Transition</code>. A group of
elements can therefore animate on different timings while still leaving
together, because the parent waits for its children's leave transitions before
finishing its own.</p>
`},{type:`demo`,id:`transition/coordinated`,title:`Coordinated`,code:`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { createSignal } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'solid-js'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Transition, TransitionChild } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/transition'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * One \`show\` flag, several elements, different timings. \`TransitionChild\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * shares the parent's state instead of tracking its own.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> CoordinatedTransition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setShow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setShow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value)}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Close'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Open'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"transition-stage"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TransitionChild</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-enter"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-leave"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"transition-backdrop"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TransitionChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TransitionChild</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-enter"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-from"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-leave"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"slide-from"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"transition-card"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>The card arrives after the backdrop.&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TransitionChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,caption:``},{type:`html`,html:`<h3 id="running-work-around-a-transition">Running work around a transition</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-enter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  leave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-leave"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-to"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> leaveTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fade-from"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  beforeEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> preloadImages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  afterEnter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> inputRef?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  afterLeave</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> resetForm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p><code>afterLeave</code> is the right place to discard state. It runs once the element is
gone.</p>
<h3 id="respecting-reduced-motion">Respecting reduced motion</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (prefers-reduced-motion: reduce) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  .fade-enter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.fade-leave</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.pop-enter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.pop-leave</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    transition-duration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>Shortening the duration is enough, and dropping the transition altogether is
safe too: Terracotta waits on the element's running animations, so an element
with nothing to animate simply moves straight to the next step.</p>
<h2 id="state-attributes">State attributes</h2>
<table>
<thead>
<tr>
<th>Element</th>
<th>Attribute</th>
<th>Present when</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Transition</code> / <code>TransitionChild</code></td>
<td><code>tc-transition</code></td>
<td>Always, carrying the current phase</td>
</tr>
<tr>
<td><code>Transition</code> / <code>TransitionChild</code></td>
<td><code>inert</code></td>
<td>While leaving, and for as long as the element stays mounted afterwards</td>
</tr>
</tbody>
</table>
<p>The phase values, in order:</p>
<table>
<thead>
<tr>
<th>Value</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>enter-from</code></td>
<td>The enter transition has just started; the element is at its starting state.</td>
</tr>
<tr>
<td><code>enter-to</code></td>
<td>The enter transition is running towards its end state.</td>
</tr>
<tr>
<td><code>entered</code></td>
<td>The enter transition has finished; the element is at rest and visible.</td>
</tr>
<tr>
<td><code>leave-from</code></td>
<td>The leave transition has just started.</td>
</tr>
<tr>
<td><code>leave-to</code></td>
<td>The leave transition is running towards its end state.</td>
</tr>
</tbody>
</table>
<p>The attribute is absent until the first transition runs.</p>
<h3 id="styling">Styling</h3>
<p>You can drive the whole transition from the attribute and skip the class props
entirely:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"sheet"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: opacity </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, translate </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enter-from"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"leave-to"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enter-to"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"entered"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.sheet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"leave-from"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">none</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><p>This works because the attribute changes at exactly the points the classes do.</p>
<p>The attribute is also handy for debugging and for assertions:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* Temporarily surface the phase while developing */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">::after</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">attr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">tc-transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">absolute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.625</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">#dc2626</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><h3 id="reading-the-state-in-code">Reading the state in code</h3>
<p><code>Transition</code> exposes no state object and no render prop. <code>show</code> is a prop you
already own. To react in JavaScript, use the lifecycle callbacks: <code>beforeEnter</code>,
<code>afterEnter</code>, <code>beforeLeave</code> and <code>afterLeave</code>.</p>
<h2 id="keyboard">Keyboard</h2>
<p>Neither component handles keys. Whatever it wraps keeps its own keyboard
behaviour.</p>
<h2 id="api">API</h2>
<h3 id="transition"><code>&lt;Transition&gt;</code></h3>
<p>The root. It provides <code>show</code> to its descendants and renders a <code>TransitionChild</code>
with the rest of its props, so it takes every <code>TransitionChild</code> prop too.</p>
<p>Renders a <code>&lt;div&gt;</code> by default.</p>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>show</code></td>
<td><code>boolean</code></td>
<td><em>required</em></td>
<td>Whether the content should be visible. Drives every <code>TransitionChild</code> beneath it.</td>
</tr>
<tr>
<td>…plus all <a href="#transitionchild"><code>TransitionChild</code></a> props</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="transitionchild"><code>&lt;TransitionChild&gt;</code></h3>
<p>One transitioning element. Renders a <code>&lt;div&gt;</code> by default.</p>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>as</code></td>
<td><code>ValidConstructor</code></td>
<td><code>'div'</code></td>
<td>Element or component to render as.</td>
</tr>
<tr>
<td><code>enter</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Classes applied for the whole enter transition. Put the <code>transition</code> or <code>animation</code> declaration here.</td>
</tr>
<tr>
<td><code>enterFrom</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Starting state of the enter transition.</td>
</tr>
<tr>
<td><code>enterTo</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Ending state of the enter transition.</td>
</tr>
<tr>
<td><code>entered</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Classes applied once entering has finished, and removed when leaving starts.</td>
</tr>
<tr>
<td><code>leave</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Classes applied for the whole leave transition.</td>
</tr>
<tr>
<td><code>leaveFrom</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Starting state of the leave transition.</td>
</tr>
<tr>
<td><code>leaveTo</code></td>
<td><code>string</code></td>
<td>none</td>
<td>Ending state of the leave transition.</td>
</tr>
<tr>
<td><code>beforeEnter</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called just before entering starts.</td>
</tr>
<tr>
<td><code>afterEnter</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called once entering has finished.</td>
</tr>
<tr>
<td><code>beforeLeave</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called just before leaving starts.</td>
</tr>
<tr>
<td><code>afterLeave</code></td>
<td><code>() =&gt; void</code></td>
<td>none</td>
<td>Called once leaving has finished and the element is hidden.</td>
</tr>
<tr>
<td><code>unmount</code></td>
<td><code>boolean | 'offscreen'</code></td>
<td><code>true</code></td>
<td>How the element behaves while hidden. See <a href="/guides/rendering#unmount"><code>unmount</code></a>.</td>
</tr>
<tr>
<td><code>appear</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Mount and start entering on the very first render. It matters for a nested <code>TransitionChild</code>, which otherwise waits for its parent to finish entering before it mounts and runs its own enter.</td>
</tr>
<tr>
<td><code>ref</code></td>
<td><code>DynamicNode&lt;T&gt;</code> | <code>(el) =&gt; void</code></td>
<td>none</td>
<td>Handle to the rendered element.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code></td>
<td>none</td>
<td>The content. Not a render prop.</td>
</tr>
<tr>
<td><em>…rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<p><code>TransitionChild</code> throws if rendered outside a <code>&lt;Transition&gt;</code>.</p>
<h2 id="notes">Notes</h2>
<ul>
<li>Each step ends when the element has no animation left running, read through
<code>Element.getAnimations()</code>. An element hidden with no transition or animation at
all advances immediately rather than stalling, so a missing duration no longer
leaves it stranded on screen.</li>
<li>Nested <code>TransitionChild</code>s hold their parent back in both directions. A child
enters only once its parent has entered, and a parent starts its own leave
transition only once every child beneath it has finished leaving.</li>
<li>The element is marked <code>inert</code> the moment a leave starts, and stays inert for
as long as <code>unmount={false}</code> keeps it around afterwards. A panel that is fading
out is therefore unclickable and out of the tab order rather than lingering as
a focus trap behind its own animation. The enter phases stay interactive, so a
panel nested inside can still take focus while it animates in.</li>
<li><code>unmount={true}</code> and <code>unmount=&quot;offscreen&quot;</code> need no such treatment: both take
the element out of the document once the leave transition has finished, so the
content is already unreachable. The difference between them is only what
happens to the subtree behind the scenes. See
<a href="/guides/rendering#unmount"><code>unmount</code></a>.</li>
<li>Panels that move focus into themselves, namely <code>DialogPanel</code>, <code>PopoverPanel</code>,
<code>ContextMenuPanel</code>, <code>CommandBarPanel</code>, <code>ListboxOptions</code> and <code>ComboboxOptions</code>,
wait for the same animations to finish before focusing, so focus lands once the
panel has settled rather than while it is still animating in.</li>
</ul>
`}]};export{r as default};