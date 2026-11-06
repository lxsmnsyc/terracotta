var e=`meter/basic`,t=`Basic`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Meter, MeterLabel } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/meter'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * A meter shows a measurement. The fill is drawn from \`percent()\`, and</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * \`aria-valuetext\` says what the number means.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicMeter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">62</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getValueText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%, about 5 hours left\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MeterLabel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-label"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Battery&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MeterLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"hint"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}%&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-track"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-fill"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'inline-size'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">state</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">percent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getValueText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} of 64 GB used\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MeterLabel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-label"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Storage&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MeterLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"hint"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} of 64 GB&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-track"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-fill"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'inline-size'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">state</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">percent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/meter`,title:`Meter`,description:`Shows a value within a known range, such as a battery level or the storage in
use, following the
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">ARIA meter pattern</a>.`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`basic`,text:`Basic`,level:3},{id:`value-text`,text:`Value text`,level:3},{id:`naming`,text:`Naming`,level:3},{id:`drawing-the-fill`,text:`Drawing the fill`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`reading-the-state-in-code`,text:`Reading the state in code`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`meter`,text:"`<Meter>`",level:3},{id:`meterlabel`,text:"`<MeterLabel>`",level:3}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<p>Use a meter for a measurement. For progress through a task, such as a file
upload, use a progress bar instead. A meter also needs a meaningful maximum,
so it does not suit a value like a count of visitors.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Meter, MeterLabel } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/meter'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>        {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="meter", the value and range */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">MeterLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional; names the meter */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h2 id="examples">Examples</h2>
<h3 id="basic">Basic</h3>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="value-text">Value text</h3>
<p>Screen readers often read the value as a percentage. When that is not clear,
<code>getValueText</code> sets <code>aria-valuetext</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getValueText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} of 64 GB used\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} /></span></span></code></pre><h3 id="naming">Naming</h3>
<p>Put a <code>MeterLabel</code> inside the meter, and the meter points <code>aria-labelledby</code> at
it. Otherwise, give the meter an <code>aria-label</code>.</p>
<h3 id="drawing-the-fill">Drawing the fill</h3>
<p>The meter takes a render prop with its state. Draw the fill from <code>percent()</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">62</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-track"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meter-fill"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'inline-size'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">state</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">percent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Meter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The children of an element with <code>role=&quot;meter&quot;</code> are not read out on their own,
so keep anything the user needs to hear in the label and the value text.</p>
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
<td><code>Meter</code></td>
<td><code>tc-meter</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>MeterLabel</code></td>
<td><code>tc-meter-label</code></td>
<td>Always</td>
</tr>
</tbody>
</table>
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
<td>The value, kept between <code>min</code> and <code>max</code>.</td>
</tr>
<tr>
<td><code>min()</code> / <code>max()</code></td>
<td><code>number</code></td>
<td>The range.</td>
</tr>
<tr>
<td><code>percent()</code></td>
<td><code>number</code></td>
<td>Where the value sits in the range, from 0 to 100.</td>
</tr>
</tbody>
</table>
<h2 id="keyboard">Keyboard</h2>
<p>None. A meter does not take focus.</p>
<h2 id="api">API</h2>
<h3 id="meter"><code>&lt;Meter&gt;</code></h3>
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
<td><code>as</code></td>
<td><code>ValidConstructor</code></td>
<td><code>'div'</code></td>
<td>Element or component to render as.</td>
</tr>
<tr>
<td><code>value</code></td>
<td><code>number</code></td>
<td>none</td>
<td>The value. Required.</td>
</tr>
<tr>
<td><code>min</code></td>
<td><code>number</code></td>
<td><code>0</code></td>
<td>The lowest value.</td>
</tr>
<tr>
<td><code>max</code></td>
<td><code>number</code></td>
<td><code>100</code></td>
<td>The highest value. It is kept above <code>min</code>.</td>
</tr>
<tr>
<td><code>getValueText</code></td>
<td><code>(value: number) =&gt; string</code></td>
<td>none</td>
<td>Text for <code>aria-valuetext</code>.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code> | <code>(state: MeterStateProperties) =&gt; JSX.Element</code></td>
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
<p>Rendered attributes: <code>role=&quot;meter&quot;</code>, <code>aria-valuenow</code>, <code>aria-valuemin</code>,
<code>aria-valuemax</code>, <code>aria-valuetext</code> when <code>getValueText</code> is set,
<code>aria-labelledby</code> while a <code>MeterLabel</code> is mounted, <code>tc-meter</code>.</p>
<h3 id="meterlabel"><code>&lt;MeterLabel&gt;</code></h3>
<p>Renders a <code>&lt;span&gt;</code> by default. Put it inside the <code>Meter</code>.</p>
`}]};export{r as default};