var id = "spinbutton/basic";
var title = "Basic";
var code = `<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>\u2191&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> and &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>\u2193&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> step, &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Home&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> and &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>End&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> jump to the limits.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`;
var spinbutton_default = {
  slug: "components/spinbutton",
  title: "Spinbutton",
  description: 'A number field that steps through a range, following the\n<a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">ARIA spinbutton pattern</a>.\nThe field carries <code>role=&quot;spinbutton&quot;</code> and the value. It takes typing and the\narrow keys, and it is the only part that takes focus.',
  headings: [
    {
      "id": "anatomy",
      "text": "Anatomy",
      "level": 2
    },
    {
      "id": "examples",
      "text": "Examples",
      "level": 2
    },
    {
      "id": "basic",
      "text": "Basic",
      "level": 3
    },
    {
      "id": "typing",
      "text": "Typing",
      "level": 3
    },
    {
      "id": "buttons",
      "text": "Buttons",
      "level": 3
    },
    {
      "id": "without-limits",
      "text": "Without limits",
      "level": 3
    },
    {
      "id": "formatting",
      "text": "Formatting",
      "level": 3
    },
    {
      "id": "controlled",
      "text": "Controlled",
      "level": 3
    },
    {
      "id": "in-a-form",
      "text": "In a form",
      "level": 3
    },
    {
      "id": "state-attributes",
      "text": "State attributes",
      "level": 2
    },
    {
      "id": "reading-the-state-in-code",
      "text": "Reading the state in code",
      "level": 3
    },
    {
      "id": "keyboard",
      "text": "Keyboard",
      "level": 2
    },
    {
      "id": "api",
      "text": "API",
      "level": 2
    },
    {
      "id": "spinbutton",
      "text": "`<Spinbutton>`",
      "level": 3
    },
    {
      "id": "spinbuttoninput",
      "text": "`<SpinbuttonInput>`",
      "level": 3
    },
    {
      "id": "spinbuttonlabel",
      "text": "`<SpinbuttonLabel>`",
      "level": 3
    },
    {
      "id": "spinbuttonincrement-spinbuttondecrement",
      "text": "`<SpinbuttonIncrement>` / `<SpinbuttonDecrement>`",
      "level": 3
    }
  ],
  hero: {
    type: "demo",
    id,
    title,
    code,
    caption: ""
  },
  blocks: [
    {
      type: "html",
      html: `<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
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
`
    },
    {
      type: "demo",
      id,
      title,
      code,
      caption: ""
    },
    {
      type: "html",
      html: '<h3 id="typing">Typing</h3>\n<p>The field is a normal text field, so editing keys work as the browser provides\nthem.</p>\n<ul>\n<li>Text that is a value in range and on a step sets the value as it is typed.</li>\n<li>Text on its way to a value, such as <code>1.</code> or <code>-</code>, waits.</li>\n<li>Text that is not a number, or is out of range, sets <code>aria-invalid=&quot;true&quot;</code>.</li>\n<li>On blur and <kbd>Enter</kbd>, the text becomes the value: snapped to the\nstep and kept in range. Text that is not a number is dropped, and the field\nshows the last value again.</li>\n</ul>\n<h3 id="buttons">Buttons</h3>\n<p><code>SpinbuttonIncrement</code> and <code>SpinbuttonDecrement</code> are optional. They are out of\nthe tab sequence, since the arrow keys do the same, and pressing one leaves\nfocus in the field. Each is disabled at its limit. Give each a name:</p>\n<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"More adults"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>+&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonIncrement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="without-limits">Without limits</h3>\n<p>Leave out <code>min</code> or <code>max</code> for an open range. <code>aria-valuemin</code> and\n<code>aria-valuemax</code> are only set for the limits that exist. Without a limit,\n<kbd>Home</kbd> and <kbd>End</kbd> move the caret as usual.</p>\n<h3 id="formatting">Formatting</h3>\n<p><code>formatValue</code> sets the text shown in the field, and <code>parseValue</code> reads it\nback. <code>getValueText</code> sets <code>aria-valuetext</code> when the number alone is not clear.</p>\n<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  formatValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> `${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} kg`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  parseValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> Number.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">parseFloat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(text)}</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  getValueText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> `${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} kilograms`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">SpinbuttonInput</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Weight"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="controlled">Controlled</h3>\n<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">adults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setAdults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">adults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setAdults} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}>\u2026&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Spinbutton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="in-a-form">In a form</h3>\n<p>Pass <code>name</code> to <code>SpinbuttonInput</code>. The form receives the text in the field.</p>\n<h2 id="state-attributes">State attributes</h2>\n<table>\n<thead>\n<tr>\n<th>Element</th>\n<th>Attribute</th>\n<th>Present when</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>Spinbutton</code></td>\n<td><code>tc-spinbutton</code></td>\n<td>Always</td>\n</tr>\n<tr>\n<td><code>SpinbuttonLabel</code></td>\n<td><code>tc-spinbutton-label</code></td>\n<td>Always</td>\n</tr>\n<tr>\n<td><code>SpinbuttonInput</code></td>\n<td><code>tc-spinbutton-input</code></td>\n<td>Always</td>\n</tr>\n<tr>\n<td><code>SpinbuttonIncrement</code></td>\n<td><code>tc-spinbutton-increment</code></td>\n<td>Always</td>\n</tr>\n<tr>\n<td><code>SpinbuttonDecrement</code></td>\n<td><code>tc-spinbutton-decrement</code></td>\n<td>Always</td>\n</tr>\n<tr>\n<td><code>Spinbutton</code>, <code>SpinbuttonInput</code></td>\n<td><code>tc-disabled</code></td>\n<td>The spinbutton is disabled</td>\n</tr>\n<tr>\n<td><code>SpinbuttonIncrement</code>, <code>SpinbuttonDecrement</code></td>\n<td><code>tc-disabled</code></td>\n<td>The button cannot step, at a limit or while disabled</td>\n</tr>\n</tbody>\n</table>\n<p>Style typed text that is not a value with <code>[aria-invalid=&quot;true&quot;]</code>.</p>\n<h3 id="reading-the-state-in-code">Reading the state in code</h3>\n<table>\n<thead>\n<tr>\n<th>Member</th>\n<th>Type</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value()</code></td>\n<td><code>number</code></td>\n<td>The current value.</td>\n</tr>\n<tr>\n<td><code>min()</code> / <code>max()</code></td>\n<td><code>number | undefined</code></td>\n<td>The limits, if there are any.</td>\n</tr>\n<tr>\n<td><code>step()</code></td>\n<td><code>number</code></td>\n<td>The step.</td>\n</tr>\n<tr>\n<td><code>disabled()</code></td>\n<td><code>boolean</code></td>\n<td>Whether the spinbutton is disabled.</td>\n</tr>\n<tr>\n<td><code>canIncrement()</code> / <code>canDecrement()</code></td>\n<td><code>boolean</code></td>\n<td>Whether the value can move up or down a step.</td>\n</tr>\n<tr>\n<td><code>setValue(value)</code></td>\n<td><code>(number) =&gt; void</code></td>\n<td>Sets the value, snapped to the step and kept in range.</td>\n</tr>\n<tr>\n<td><code>increment(steps?)</code> / <code>decrement(steps?)</code></td>\n<td><code>(number?) =&gt; void</code></td>\n<td>Moves by a number of steps, 1 by default.</td>\n</tr>\n</tbody>\n</table>\n<p>You can reach this state as the render-prop argument on <code>Spinbutton</code> and the\ntwo buttons, through <code>&lt;SpinbuttonStateChild&gt;</code>, or with <code>useSpinbuttonState()</code>\ninside any descendant component.</p>\n<h2 id="keyboard">Keyboard</h2>\n<p>Handled on the field:</p>\n<table>\n<thead>\n<tr>\n<th>Key</th>\n<th>Action</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><kbd>\u2191</kbd> / <kbd>\u2193</kbd></td>\n<td>Increases / decreases the value by one step</td>\n</tr>\n<tr>\n<td><kbd>Page Up</kbd> / <kbd>Page Down</kbd></td>\n<td>Changes the value by <code>largeStep</code> steps</td>\n</tr>\n<tr>\n<td><kbd>Home</kbd> / <kbd>End</kbd></td>\n<td>Sets the minimum / maximum, when there is one</td>\n</tr>\n<tr>\n<td><kbd>Enter</kbd></td>\n<td>Turns the typed text into the value. A form still submits.</td>\n</tr>\n<tr>\n<td>Text editing keys</td>\n<td>Edit the text, as the browser provides them</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api">API</h2>\n<h3 id="spinbutton"><code>&lt;Spinbutton&gt;</code></h3>\n<p>Renders a <code>&lt;div&gt;</code> by default. Pass exactly one of <code>defaultValue</code> or <code>value</code>.</p>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>as</code></td>\n<td><code>ValidConstructor</code></td>\n<td><code>\'div\'</code></td>\n<td>Element or component to render as.</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>number</code></td>\n<td>none</td>\n<td>Initial value, uncontrolled.</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>number</code></td>\n<td>none</td>\n<td>Current value, controlled.</td>\n</tr>\n<tr>\n<td><code>min</code></td>\n<td><code>number</code></td>\n<td>none</td>\n<td>The lowest value.</td>\n</tr>\n<tr>\n<td><code>max</code></td>\n<td><code>number</code></td>\n<td>none</td>\n<td>The highest value.</td>\n</tr>\n<tr>\n<td><code>step</code></td>\n<td><code>number</code></td>\n<td><code>1</code></td>\n<td>The distance between allowed values, counted from <code>min</code> or 0.</td>\n</tr>\n<tr>\n<td><code>largeStep</code></td>\n<td><code>number</code></td>\n<td><code>10</code></td>\n<td>Steps moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>.</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td><code>false</code></td>\n<td>Blocks changes, and disables the field and buttons.</td>\n</tr>\n<tr>\n<td><code>formatValue</code></td>\n<td><code>(value: number) =&gt; string</code></td>\n<td><code>String</code></td>\n<td>The text shown in the field.</td>\n</tr>\n<tr>\n<td><code>parseValue</code></td>\n<td><code>(text: string) =&gt; number</code></td>\n<td><code>Number</code></td>\n<td>Reads typed text. Return <code>NaN</code> for text that is not a value.</td>\n</tr>\n<tr>\n<td><code>getValueText</code></td>\n<td><code>(value: number) =&gt; string</code></td>\n<td>none</td>\n<td>Text for <code>aria-valuetext</code>.</td>\n</tr>\n<tr>\n<td><code>onChange</code></td>\n<td><code>(value: number) =&gt; void</code></td>\n<td>none</td>\n<td>Called with the new value.</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code> | <code>(state: SpinbuttonStateProperties) =&gt; JSX.Element</code></td>\n<td>none</td>\n<td>Contents, or a render prop.</td>\n</tr>\n<tr>\n<td><em>\u2026rest</em></td>\n<td>props of <code>as</code></td>\n<td>none</td>\n<td>Forwarded to the rendered element.</td>\n</tr>\n</tbody>\n</table>\n<h3 id="spinbuttoninput"><code>&lt;SpinbuttonInput&gt;</code></h3>\n<p>Renders an <code>&lt;input&gt;</code> by default.</p>\n<p>Rendered attributes: <code>role=&quot;spinbutton&quot;</code>, <code>type=&quot;text&quot;</code>,\n<code>inputmode=&quot;decimal&quot;</code>, <code>autocomplete=&quot;off&quot;</code>, <code>aria-valuenow</code>, <code>aria-valuemin</code>\nand <code>aria-valuemax</code> when there are limits, <code>aria-valuetext</code> when\n<code>getValueText</code> is set, <code>aria-invalid</code> for typed text that is not a value,\n<code>aria-labelledby</code> while a <code>SpinbuttonLabel</code> is mounted, <code>disabled</code> while\ndisabled, <code>tc-spinbutton-input</code>.</p>\n<h3 id="spinbuttonlabel"><code>&lt;SpinbuttonLabel&gt;</code></h3>\n<p>Renders a <code>&lt;label&gt;</code> by default, with <code>for</code> pointing at the field.</p>\n<h3 id="spinbuttonincrement-spinbuttondecrement"><code>&lt;SpinbuttonIncrement&gt;</code> / <code>&lt;SpinbuttonDecrement&gt;</code></h3>\n<p>Render a <code>&lt;button&gt;</code> by default, with <code>type=&quot;button&quot;</code>, <code>tabindex=&quot;-1&quot;</code>,\n<code>aria-controls</code> pointing at the field, and <code>disabled</code> at the limit.</p>\n<p>Every part takes <code>as</code>, <code>ref</code> and <code>children</code>, and forwards the rest of its\nprops.</p>\n'
    }
  ]
};

export { spinbutton_default as default };
//# sourceMappingURL=spinbutton-1DY1zkat.mjs.map
