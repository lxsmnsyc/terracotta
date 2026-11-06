var e=`spinbutton/basic`,t=`Basic`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Spinbutton,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonDecrement,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonIncrement,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonInput,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonLabel,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/spinbutton'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { MinusIcon, PlusIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '../../lib/icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * Only the field takes focus. The buttons step the value without moving focus</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * out of the field, and the arrow keys do the same.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicSpinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonLabel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton-label"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Adults&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton-group"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonDecrement</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton-button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Fewer adults"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MinusIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonDecrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton-input"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"spinbutton-button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"More adults"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PlusIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"hint"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>↑&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> and &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>↓&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> step, &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Home&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> and &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>End&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> jump to the limits.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/spinbutton`,title:`Spinbutton`,description:`A number field that steps through a range, following the
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">ARIA spinbutton pattern</a>.
The field carries <code>role=&quot;spinbutton&quot;</code> and the value. It takes typing and the
arrow keys, and it is the only part that takes focus.`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`basic`,text:`Basic`,level:3},{id:`typing`,text:`Typing`,level:3},{id:`buttons`,text:`Buttons`,level:3},{id:`without-limits`,text:`Without limits`,level:3},{id:`formatting`,text:`Formatting`,level:3},{id:`controlled`,text:`Controlled`,level:3},{id:`in-a-form`,text:`In a form`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`reading-the-state-in-code`,text:`Reading the state in code`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`spinbutton`,text:"`<Spinbutton>`",level:3},{id:`spinbuttoninput`,text:"`<SpinbuttonInput>`",level:3},{id:`spinbuttonlabel`,text:"`<SpinbuttonLabel>`",level:3},{id:`spinbuttonincrement-spinbuttondecrement`,text:"`<SpinbuttonIncrement>` / `<SpinbuttonDecrement>`",level:3}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Spinbutton,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonDecrement,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonIncrement,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonInput,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonLabel,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SpinbuttonStateChild,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  useSpinbuttonState,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/spinbutton'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>             {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* owns the value, limits and step */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>     {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional; names the field */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonDecrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional; out of the tab sequence */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonInput</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>     {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="spinbutton", the only tab stop */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional; out of the tab sequence */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h2 id="examples">Examples</h2>
<h3 id="basic">Basic</h3>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="typing">Typing</h3>
<p>The field is a normal text field, so editing keys work as the browser provides
them.</p>
<ul>
<li>Text that is a value in range and on a step sets the value as it is typed.</li>
<li>Text on its way to a value, such as <code>1.</code> or <code>-</code>, waits.</li>
<li>Text that is not a number, or is out of range, sets <code>aria-invalid=&quot;true&quot;</code>.</li>
<li>On blur and <kbd>Enter</kbd>, the text becomes the value: snapped to the
step and kept in range. Text that is not a number is dropped, and the field
shows the last value again.</li>
</ul>
<h3 id="buttons">Buttons</h3>
<p><code>SpinbuttonIncrement</code> and <code>SpinbuttonDecrement</code> are optional. They are out of
the tab sequence, since the arrow keys do the same, and pressing one leaves
focus in the field. Each is disabled at its limit. Give each a name:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"More adults"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>+&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="without-limits">Without limits</h3>
<p>Leave out <code>min</code> or <code>max</code> for an open range. <code>aria-valuemin</code> and
<code>aria-valuemax</code> are only set for the limits that exist. Without a limit,
<kbd>Home</kbd> and <kbd>End</kbd> move the caret as usual.</p>
<h3 id="formatting">Formatting</h3>
<p><code>formatValue</code> sets the text shown in the field, and <code>parseValue</code> reads it
back. <code>getValueText</code> sets <code>aria-valuetext</code> when the number alone is not clear.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  formatValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} kg\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  parseValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> Number.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">parseFloat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(text)}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  getValueText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} kilograms\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Weight"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="controlled">Controlled</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">adults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setAdults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">adults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setAdults} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="in-a-form">In a form</h3>
<p>Pass <code>name</code> to <code>SpinbuttonInput</code>. The form receives the text in the field.</p>
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
<td><code>Spinbutton</code></td>
<td><code>tc-spinbutton</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>SpinbuttonLabel</code></td>
<td><code>tc-spinbutton-label</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>SpinbuttonInput</code></td>
<td><code>tc-spinbutton-input</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>SpinbuttonIncrement</code></td>
<td><code>tc-spinbutton-increment</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>SpinbuttonDecrement</code></td>
<td><code>tc-spinbutton-decrement</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>Spinbutton</code>, <code>SpinbuttonInput</code></td>
<td><code>tc-disabled</code></td>
<td>The spinbutton is disabled</td>
</tr>
<tr>
<td><code>SpinbuttonIncrement</code>, <code>SpinbuttonDecrement</code></td>
<td><code>tc-disabled</code></td>
<td>The button cannot step, at a limit or while disabled</td>
</tr>
</tbody>
</table>
<p>Style typed text that is not a value with <code>[aria-invalid=&quot;true&quot;]</code>.</p>
<h3 id="reading-the-state-in-code">Reading the state in code</h3>
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
<td><code>number</code></td>
<td>The current value.</td>
</tr>
<tr>
<td><code>min()</code> / <code>max()</code></td>
<td><code>number | undefined</code></td>
<td>The limits, if there are any.</td>
</tr>
<tr>
<td><code>step()</code></td>
<td><code>number</code></td>
<td>The step.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the spinbutton is disabled.</td>
</tr>
<tr>
<td><code>canIncrement()</code> / <code>canDecrement()</code></td>
<td><code>boolean</code></td>
<td>Whether the value can move up or down a step.</td>
</tr>
<tr>
<td><code>setValue(value)</code></td>
<td><code>(number) =&gt; void</code></td>
<td>Sets the value, snapped to the step and kept in range.</td>
</tr>
<tr>
<td><code>increment(steps?)</code> / <code>decrement(steps?)</code></td>
<td><code>(number?) =&gt; void</code></td>
<td>Moves by a number of steps, 1 by default.</td>
</tr>
</tbody>
</table>
<p>You can reach this state as the render-prop argument on <code>Spinbutton</code> and the
two buttons, through <code>&lt;SpinbuttonStateChild&gt;</code>, or with <code>useSpinbuttonState()</code>
inside any descendant component.</p>
<h2 id="keyboard">Keyboard</h2>
<p>Handled on the field:</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><kbd>↑</kbd> / <kbd>↓</kbd></td>
<td>Increases / decreases the value by one step</td>
</tr>
<tr>
<td><kbd>Page Up</kbd> / <kbd>Page Down</kbd></td>
<td>Changes the value by <code>largeStep</code> steps</td>
</tr>
<tr>
<td><kbd>Home</kbd> / <kbd>End</kbd></td>
<td>Sets the minimum / maximum, when there is one</td>
</tr>
<tr>
<td><kbd>Enter</kbd></td>
<td>Turns the typed text into the value. A form still submits.</td>
</tr>
<tr>
<td>Text editing keys</td>
<td>Edit the text, as the browser provides them</td>
</tr>
</tbody>
</table>
<h2 id="api">API</h2>
<h3 id="spinbutton"><code>&lt;Spinbutton&gt;</code></h3>
<p>Renders a <code>&lt;div&gt;</code> by default. Pass exactly one of <code>defaultValue</code> or <code>value</code>.</p>
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
<td><code>defaultValue</code></td>
<td><code>number</code></td>
<td>none</td>
<td>Initial value, uncontrolled.</td>
</tr>
<tr>
<td><code>value</code></td>
<td><code>number</code></td>
<td>none</td>
<td>Current value, controlled.</td>
</tr>
<tr>
<td><code>min</code></td>
<td><code>number</code></td>
<td>none</td>
<td>The lowest value.</td>
</tr>
<tr>
<td><code>max</code></td>
<td><code>number</code></td>
<td>none</td>
<td>The highest value.</td>
</tr>
<tr>
<td><code>step</code></td>
<td><code>number</code></td>
<td><code>1</code></td>
<td>The distance between allowed values, counted from <code>min</code> or 0.</td>
</tr>
<tr>
<td><code>largeStep</code></td>
<td><code>number</code></td>
<td><code>10</code></td>
<td>Steps moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks changes, and disables the field and buttons.</td>
</tr>
<tr>
<td><code>formatValue</code></td>
<td><code>(value: number) =&gt; string</code></td>
<td><code>String</code></td>
<td>The text shown in the field.</td>
</tr>
<tr>
<td><code>parseValue</code></td>
<td><code>(text: string) =&gt; number</code></td>
<td><code>Number</code></td>
<td>Reads typed text. Return <code>NaN</code> for text that is not a value.</td>
</tr>
<tr>
<td><code>getValueText</code></td>
<td><code>(value: number) =&gt; string</code></td>
<td>none</td>
<td>Text for <code>aria-valuetext</code>.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(value: number) =&gt; void</code></td>
<td>none</td>
<td>Called with the new value.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code> | <code>(state: SpinbuttonStateProperties) =&gt; JSX.Element</code></td>
<td>none</td>
<td>Contents, or a render prop.</td>
</tr>
<tr>
<td><em>…rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<h3 id="spinbuttoninput"><code>&lt;SpinbuttonInput&gt;</code></h3>
<p>Renders an <code>&lt;input&gt;</code> by default.</p>
<p>Rendered attributes: <code>role=&quot;spinbutton&quot;</code>, <code>type=&quot;text&quot;</code>,
<code>inputmode=&quot;decimal&quot;</code>, <code>autocomplete=&quot;off&quot;</code>, <code>aria-valuenow</code>, <code>aria-valuemin</code>
and <code>aria-valuemax</code> when there are limits, <code>aria-valuetext</code> when
<code>getValueText</code> is set, <code>aria-invalid</code> for typed text that is not a value,
<code>aria-labelledby</code> while a <code>SpinbuttonLabel</code> is mounted, <code>disabled</code> while
disabled, <code>tc-spinbutton-input</code>.</p>
<h3 id="spinbuttonlabel"><code>&lt;SpinbuttonLabel&gt;</code></h3>
<p>Renders a <code>&lt;label&gt;</code> by default, with <code>for</code> pointing at the field.</p>
<h3 id="spinbuttonincrement-spinbuttondecrement"><code>&lt;SpinbuttonIncrement&gt;</code> / <code>&lt;SpinbuttonDecrement&gt;</code></h3>
<p>Render a <code>&lt;button&gt;</code> by default, with <code>type=&quot;button&quot;</code>, <code>tabindex=&quot;-1&quot;</code>,
<code>aria-controls</code> pointing at the field, and <code>disabled</code> at the limit.</p>
<p>Every part takes <code>as</code>, <code>ref</code> and <code>children</code>, and forwards the rest of its
props.</p>
`}]};export{r as default};