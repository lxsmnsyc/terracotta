var e=`toast/basic`,t=`Basic`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { For } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'solid-js'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Toast, Toaster, ToasterStore, useToaster } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/toast'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { CloseIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '../../lib/icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Notice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  title</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  tone</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'info'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'success'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'error'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// Created once, outside any component: the queue outlives every render.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> notices</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ToasterStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Notice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> queue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> useToaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(notices);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"row"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({ title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Project saved'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, tone: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'success'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> })}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          Success</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({ title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Could not reach the server'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, tone: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'error'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> })}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          Error</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">clear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          Clear</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toaster"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">For</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> each</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">queue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toast</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> data-tone</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{item.data.tone}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast-title"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{item.data.title}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast-dismiss"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Dismiss"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(item.id)}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">CloseIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">For</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/toast`,title:`Toast`,description:`Toast notifications are short, non-blocking messages. They appear in a corner of
the screen and go away again. Terracotta splits this into three pieces:`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`the-store-and-the-region`,text:`The store and the region`,level:3},{id:`auto-dismiss`,text:`Auto-dismiss`,level:3},{id:`animating-entry-and-exit`,text:`Animating entry and exit`,level:3},{id:`clearing-the-queue`,text:`Clearing the queue`,level:3},{id:`several-independent-regions`,text:`Several independent regions`,level:3},{id:`reading-the-queue-outside-a-component`,text:`Reading the queue outside a component`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`styling`,text:`Styling`,level:3},{id:`reading-the-state-in-code`,text:`Reading the state in code`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`toasterstore-t`,text:"`ToasterStore<T>`",level:3},{id:`usetoaster-store`,text:"`useToaster(store)`",level:3},{id:`toaster`,text:"`<Toaster>`",level:3},{id:`toast`,text:"`<Toast>`",level:3}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<ul>
<li><code>ToasterStore</code> is a framework-agnostic queue. Create it outside your components
and push messages into it from anywhere.</li>
<li><code>useToaster(store)</code> subscribes to a store and returns a Solid accessor.</li>
<li><code>&lt;Toaster&gt;</code> and <code>&lt;Toast&gt;</code> are the markup. The <code>Toaster</code> is the live region.</li>
</ul>
<p>The queue lives outside the component tree, so any code can raise a toast
without prop drilling: a fetch handler, a router guard, a worker callback.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Toast, Toaster, ToasterStore, useToaster } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/toast'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>  {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="status" aria-live="polite"; holds the queue */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* one message; no live role of its own */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>Keep the <code>Toaster</code> mounted, even while the queue is empty. Screen readers only
announce changes inside a live region that already exists. A toast added to it
is then announced.</p>
<h2 id="examples">Examples</h2>
<h3 id="the-store-and-the-region">The store and the region</h3>
<p>Anywhere else in the app:</p>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="auto-dismiss">Auto-dismiss</h3>
<p>The store has no timing policy. Add one where you create the toast:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> notify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Notice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">ms</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 4000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(data);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(id), ms);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> id;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre><h3 id="animating-entry-and-exit">Animating entry and exit</h3>
<p>The queue removes an item immediately. To animate a toast out, wrap it in a
<a href="/components/transition"><code>Transition</code></a>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">For</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> each</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">queue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">item</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast-enter"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      enterFrom</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast-enter-from"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      enterTo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast-enter-to"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toast</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toast"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{item.data.title}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">For</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.toast-enter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: opacity </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">150</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, translate </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">150</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">ms</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> ease-out</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.toast-enter-from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.toast-enter-to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">   { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">opacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">none</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span></code></pre><p>For a leave animation, keep the item in the queue until the transition finishes.
Flip a local signal, then call <code>notices.remove(item.id)</code> from <code>afterLeave</code>.</p>
<h3 id="clearing-the-queue">Clearing the queue</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">clear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Dismiss all</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="several-independent-regions">Several independent regions</h3>
<p>Each store is its own queue, so one page can have several:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> systemNotices</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ToasterStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Notice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> uploadNotices</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ToasterStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">UploadProgress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>();</span></span></code></pre><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toaster toaster-top"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* systemNotices */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"toaster toaster-bottom"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* uploadNotices */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="reading-the-queue-outside-a-component">Reading the queue outside a component</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getQueue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// non-reactive snapshot</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unsubscribe</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> notices.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">queue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">queue</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} notice(s) pending\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre><p><code>useToaster</code> is the reactive equivalent. It unsubscribes with the component.</p>
<h2 id="state-attributes">State attributes</h2>
<p>Neither component carries dynamic state. A toast is either in the queue or it is
not, so only the markers are written.</p>
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
<td><code>Toaster</code></td>
<td><code>tc-toaster</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>Toast</code></td>
<td><code>tc-toast</code></td>
<td>Always</td>
</tr>
</tbody>
</table>
<p>Anything that varies per toast is your own data: severity, position, whether it
has an action. Pass a <code>data-*</code> attribute and select on it, as in the example
above.</p>
<h3 id="styling">Styling</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">fixed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  inset-block-end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  inset-inline-end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-toast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">#ffffff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.75</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  box-shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 4</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rgb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> / </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* Stack newest on top without touching the markup */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">tc-toaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column-reverse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; }</span></span></code></pre><h3 id="reading-the-state-in-code">Reading the state in code</h3>
<p>There is no component state. The queue is the state, and you read it with
<code>useToaster(store)</code>:</p>
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
<td><code>useToaster(store)</code></td>
<td><code>() =&gt; ToastData&lt;T&gt;[]</code></td>
<td>Reactive accessor for the queue.</td>
</tr>
<tr>
<td><code>store.getQueue()</code></td>
<td><code>() =&gt; ToastData&lt;T&gt;[]</code></td>
<td>Non-reactive snapshot.</td>
</tr>
<tr>
<td><code>store.subscribe(cb)</code></td>
<td><code>(cb) =&gt; () =&gt; void</code></td>
<td>Manual subscription. Returns an unsubscribe function.</td>
</tr>
</tbody>
</table>
<h2 id="keyboard">Keyboard</h2>
<p>Neither component handles keys. A toast is not a focus stop, and that is the
point: it must not interrupt what the user is typing. For a dismiss or undo
action, put a real <code>&lt;button&gt;</code> inside the toast. <kbd>Tab</kbd> reaches it the
normal way.</p>
<p>If the message must be acted on, it is not a toast. Use
<a href="/components/alert-dialog"><code>AlertDialog</code></a>.</p>
<h2 id="api">API</h2>
<h3 id="toasterstore-t"><code>ToasterStore&lt;T&gt;</code></h3>
<p>A subscribable queue of <code>{ id, data }</code> entries. <code>T</code> is whatever shape you want a
toast to carry.</p>
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
<td><code>create(data)</code></td>
<td><code>(data: T) =&gt; string</code></td>
<td>Appends a toast and returns its generated id.</td>
</tr>
<tr>
<td><code>remove(id)</code></td>
<td><code>(id: string) =&gt; void</code></td>
<td>Removes the toast with that id.</td>
</tr>
<tr>
<td><code>clear()</code></td>
<td><code>() =&gt; void</code></td>
<td>Empties the queue.</td>
</tr>
<tr>
<td><code>getQueue()</code></td>
<td><code>() =&gt; ToastData&lt;T&gt;[]</code></td>
<td>The current queue. Not reactive.</td>
</tr>
<tr>
<td><code>subscribe(callback)</code></td>
<td><code>(cb: (queue: ToastData&lt;T&gt;[]) =&gt; void) =&gt; () =&gt; void</code></td>
<td>Subscribes to changes and returns an unsubscribe function. Each notification receives a fresh array.</td>
</tr>
</tbody>
</table>
<p><code>ToastData&lt;T&gt;</code> is <code>{ id: string; data: T }</code>.</p>
<h3 id="usetoaster-store"><code>useToaster(store)</code></h3>
<table>
<thead>
<tr>
<th>Signature</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>useToaster&lt;T&gt;(toaster: ToasterStore&lt;T&gt;): () =&gt; ToastData&lt;T&gt;[]</code></td>
<td>Subscribes for the lifetime of the calling component and returns an accessor for the queue.</td>
</tr>
</tbody>
</table>
<h3 id="toaster"><code>&lt;Toaster&gt;</code></h3>
<p>The container that owns the toast context. <code>&lt;Toast&gt;</code> must be rendered inside
one, and throws otherwise. Renders a <code>&lt;div&gt;</code> by default. Does not take a <code>ref</code>.</p>
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
<td><code>children</code></td>
<td><code>JSX.Element</code></td>
<td>none</td>
<td>The toasts. Not a render prop.</td>
</tr>
<tr>
<td><em>…rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<h4>Rendered attributes</h4>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>role</code></td>
<td><code>&quot;status&quot;</code></td>
</tr>
<tr>
<td><code>aria-live</code></td>
<td><code>&quot;polite&quot;</code></td>
</tr>
<tr>
<td><code>aria-atomic</code></td>
<td><code>&quot;false&quot;</code></td>
</tr>
<tr>
<td><code>aria-relevant</code></td>
<td><code>&quot;additions text&quot;</code></td>
</tr>
<tr>
<td><code>tc-toaster</code></td>
<td><code>&quot;&quot;</code></td>
</tr>
</tbody>
</table>
<p>The region is polite, so a toast is announced without interrupting the user.
<code>aria-atomic=&quot;false&quot;</code> reads each new toast on its own, not the whole queue
again. Your own props are applied last, so you can change any of these. For
example, pass <code>aria-live=&quot;assertive&quot;</code> for a region of urgent messages.</p>
<h3 id="toast"><code>&lt;Toast&gt;</code></h3>
<p>A single notification. Renders a <code>&lt;div&gt;</code> by default. Does not take a <code>ref</code>.</p>
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
<td><code>children</code></td>
<td><code>JSX.Element</code></td>
<td>none</td>
<td>The message. Not a render prop.</td>
</tr>
<tr>
<td><em>…rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<h4>Rendered attributes</h4>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>tc-toast</code></td>
<td><code>&quot;&quot;</code></td>
</tr>
</tbody>
</table>
<p>A toast has no live role. The <code>Toaster</code> around it announces it. For a message
that must interrupt, use <a href="/components/alert"><code>Alert</code></a> instead.</p>
`}]};export{r as default};