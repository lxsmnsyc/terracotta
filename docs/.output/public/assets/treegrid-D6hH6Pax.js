var e=`treegrid/basic`,t=`Basic`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGrid,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridBody,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridCell,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridColumnHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridHead,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridHeaderRow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridRow,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> TreeGridRowProperties,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/treegrid'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ChevronDownIcon, ChevronRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '../../lib/icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  subject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  from</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  replies</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> THREADS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Trip in June'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    from: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Grace'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    replies: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip-1'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Re: Trip in June'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, from: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Ada'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip-2'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Re: Trip in June'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, from: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Katherine'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'lunch'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Lunch on Friday?'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, from: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Ada'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> caretOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> TreeGridRowProperties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">row.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpandable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpanded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ChevronDownIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /> </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ChevronRightIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> />;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * The rows are flat in the markup, so each row gets its \`level\`. The page</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * renders a thread's replies while the thread is expanded.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicTreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Inbox"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultExpanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHeaderRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridColumnHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Subject&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridColumnHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>From&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHeaderRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">THREADS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">thread</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                  class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"treegrid-row"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                  value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{thread.id}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                  expandable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">thread.replies}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                  aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{thread.subject}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                  {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree-caret"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"true"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                          {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">caretOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(row)}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                        {thread.subject}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{thread.from}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                {state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpanded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(thread.id) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                  thread.replies?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">reply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                      class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"treegrid-row"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                      value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{reply.id}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                      level</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">                      aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">reply</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}, from \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">reply</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                    ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell treegrid-indent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{reply.subject}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{reply.from}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                  ))}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            ))}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/treegrid`,title:`TreeGrid`,description:`A grid whose rows open and close like a tree, such as an inbox with threaded
replies, following the
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/">ARIA treegrid pattern</a>.
It is one stop in the tab sequence. Both rows and cells take focus.`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`basic`,text:`Basic`,level:3},{id:`declaring-the-hierarchy`,text:`Declaring the hierarchy`,level:3},{id:`naming-rows`,text:`Naming rows`,level:3},{id:`widgets-in-rows`,text:`Widgets in rows`,level:3},{id:`controlled-expansion`,text:`Controlled expansion`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`reading-the-state-in-code`,text:`Reading the state in code`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`treegrid`,text:"`<TreeGrid>`",level:3},{id:`treegridrow`,text:"`<TreeGridRow>`",level:3},{id:`row-groups-header-rows-and-cells`,text:`Row groups, header rows and cells`,level:3}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<p>Use a <a href="/components/tree"><code>Tree</code></a> when each node is a single item, and a
<a href="/components/grid"><code>Grid</code></a> when the rows do not nest.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGrid,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridBody,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridCell,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridColumnHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridFoot,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridHead,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridHeaderRow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridRow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridRowHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  TreeGridStateChild,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  useTreeGridState,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/treegrid'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>                  {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;table role="treegrid">, owns expansion */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>            {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;thead role="rowgroup"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHeaderRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>     {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* a header row; does not take focus */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHeaderRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>            {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;tbody role="rowgroup"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> level</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> expandable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="row", takes focus */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>       {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="gridcell" */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The row group, header row and cell parts are the same components as the
<a href="/components/grid"><code>Grid</code></a> parts, under treegrid names. <code>TreeGridFoot</code> is there too,
for footer rows.</p>
<h2 id="examples">Examples</h2>
<h3 id="basic">Basic</h3>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="declaring-the-hierarchy">Declaring the hierarchy</h3>
<p>The rows of a table are flat, so the treegrid cannot see which row is inside
which. Declare it on each row:</p>
<ul>
<li><code>level</code> is the depth, from 1. It sets <code>aria-level</code>.</li>
<li><code>expandable</code> marks a parent row. It gets <code>aria-expanded</code>. Rows without it
never get <code>aria-expanded</code>, so they are not announced as parents.</li>
<li>Render a parent's child rows right after it, while it is expanded. Read
that from the treegrid's render prop, <code>&lt;TreeGridStateChild&gt;</code> or
<code>useTreeGridState()</code>:</li>
</ul>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Inbox"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultExpanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">state</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"trip"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> expandable</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Trip in June"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      {state.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpanded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'trip'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"trip-1"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> level</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Re: Trip in June"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="naming-rows">Naming rows</h3>
<p>A focused row is read by its name. Give each <code>TreeGridRow</code> an <code>aria-label</code>
that sums it up, as the demo does. Otherwise a screen reader reads every cell.</p>
<h3 id="widgets-in-rows">Widgets in rows</h3>
<p>The widgets of the row that has focus stay in the tab sequence. From a row,
<kbd>Tab</kbd> moves through its buttons and links, then out of the treegrid,
as the pattern describes. Widgets in other rows are reached with the arrow
keys.</p>
<h3 id="controlled-expansion">Controlled expansion</h3>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>([]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Inbox"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> expanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">onExpandedChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setOpen}>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h2 id="state-attributes">State attributes</h2>
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
<td><code>TreeGrid</code></td>
<td><code>tc-treegrid</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>TreeGridRow</code></td>
<td><code>tc-treegrid-row</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>TreeGridRow</code></td>
<td><code>tc-level</code></td>
<td>Always, set to the row's depth</td>
</tr>
<tr>
<td><code>TreeGridRow</code></td>
<td><code>tc-expanded</code></td>
<td>The row is expanded</td>
</tr>
</tbody>
</table>
<h3 id="reading-the-state-in-code">Reading the state in code</h3>
<p>On the treegrid, through its render prop, <code>&lt;TreeGridStateChild&gt;</code> or
<code>useTreeGridState()</code>:</p>
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
<td><code>isExpanded(value)</code></td>
<td><code>(V) =&gt; boolean</code></td>
<td>Whether a row is open.</td>
</tr>
<tr>
<td><code>setExpanded(value, open)</code></td>
<td><code>(V, boolean) =&gt; void</code></td>
<td>Opens or closes a row.</td>
</tr>
<tr>
<td><code>toggle(value)</code></td>
<td><code>(V) =&gt; void</code></td>
<td>Flips a row.</td>
</tr>
</tbody>
</table>
<p>On a row, through its render prop: <code>level()</code>, <code>isExpandable()</code>,
<code>isExpanded()</code> and <code>toggle()</code>.</p>
<h2 id="keyboard">Keyboard</h2>
<p>On a focused row:</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><kbd>→</kbd></td>
<td>Opens a closed parent row. Otherwise, moves to the first cell.</td>
</tr>
<tr>
<td><kbd>←</kbd></td>
<td>Closes an open row. Otherwise, focus stays.</td>
</tr>
<tr>
<td><kbd>↓</kbd> / <kbd>↑</kbd></td>
<td>Next / previous row</td>
</tr>
<tr>
<td><kbd>Page Down</kbd> / <kbd>Page Up</kbd></td>
<td>Moves <code>pageSize</code> rows</td>
</tr>
<tr>
<td><kbd>Home</kbd> / <kbd>End</kbd></td>
<td>First / last row</td>
</tr>
<tr>
<td><kbd>Enter</kbd></td>
<td>Opens or closes a parent row</td>
</tr>
<tr>
<td><kbd>Tab</kbd></td>
<td>Moves through the widgets in the row, then out</td>
</tr>
</tbody>
</table>
<p>On a focused cell:</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><kbd>→</kbd> / <kbd>←</kbd></td>
<td>Next / previous cell. <kbd>←</kbd> on the first cell moves to the row.</td>
</tr>
<tr>
<td><kbd>↓</kbd> / <kbd>↑</kbd></td>
<td>Cell below / above, header row included</td>
</tr>
<tr>
<td><kbd>Page Down</kbd> / <kbd>Page Up</kbd></td>
<td>Moves <code>pageSize</code> rows in the column</td>
</tr>
<tr>
<td><kbd>Home</kbd> / <kbd>End</kbd></td>
<td>First / last cell in the row</td>
</tr>
<tr>
<td><kbd>Ctrl</kbd>+<kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>End</kbd></td>
<td>Cell in the first / last row of the column</td>
</tr>
</tbody>
</table>
<p>As in <a href="/components/grid"><code>Grid</code></a>, focus lands on a cell, or on the one widget inside
it, and a text field in a cell keeps its own arrow keys. The pattern's
optional selection keys are not included.</p>
<h2 id="api">API</h2>
<h3 id="treegrid"><code>&lt;TreeGrid&gt;</code></h3>
<p>Renders a <code>&lt;table&gt;</code> by default, with <code>role=&quot;treegrid&quot;</code>.</p>
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
<td><code>'table'</code></td>
<td>Element or component to render as.</td>
</tr>
<tr>
<td><code>defaultExpanded</code></td>
<td><code>V[]</code></td>
<td><code>[]</code></td>
<td>Values of the rows that start open.</td>
</tr>
<tr>
<td><code>expanded</code></td>
<td><code>V[]</code></td>
<td>none</td>
<td>Values of the open rows, controlled.</td>
</tr>
<tr>
<td><code>onExpandedChange</code></td>
<td><code>(expanded: V[]) =&gt; void</code></td>
<td>none</td>
<td>Called with the new open rows.</td>
</tr>
<tr>
<td><code>by</code></td>
<td><code>(a: V, b: V) =&gt; boolean</code></td>
<td>reference equality</td>
<td>Compares row values.</td>
</tr>
<tr>
<td><code>pageSize</code></td>
<td><code>number</code></td>
<td><code>5</code></td>
<td>Rows moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code> | <code>(state: TreeGridStateProperties&lt;V&gt;) =&gt; JSX.Element</code></td>
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
<h3 id="treegridrow"><code>&lt;TreeGridRow&gt;</code></h3>
<p>Renders a <code>&lt;tr&gt;</code> by default.</p>
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
<td><code>value</code></td>
<td><code>V</code></td>
<td>none</td>
<td>Identifies the row. Required.</td>
</tr>
<tr>
<td><code>level</code></td>
<td><code>number</code></td>
<td><code>1</code></td>
<td>The depth of the row.</td>
</tr>
<tr>
<td><code>expandable</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Marks a parent row.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code> | <code>(row: TreeGridRowProperties) =&gt; JSX.Element</code></td>
<td>none</td>
<td>Cells, or a render prop.</td>
</tr>
</tbody>
</table>
<p>Rendered attributes: <code>role=&quot;row&quot;</code>, <code>aria-level</code>, <code>aria-expanded</code> on parent
rows, <code>tabindex</code>.</p>
<h3 id="row-groups-header-rows-and-cells">Row groups, header rows and cells</h3>
<p>These are the <a href="/components/grid"><code>Grid</code></a> parts under treegrid names:</p>
<table>
<thead>
<tr>
<th>Component</th>
<th>Renders</th>
<th>Role</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;TreeGridHead&gt;</code></td>
<td><code>&lt;thead&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;TreeGridBody&gt;</code></td>
<td><code>&lt;tbody&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;TreeGridFoot&gt;</code></td>
<td><code>&lt;tfoot&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;TreeGridHeaderRow&gt;</code></td>
<td><code>&lt;tr&gt;</code></td>
<td><code>row</code>, which does not take focus</td>
</tr>
<tr>
<td><code>&lt;TreeGridCell&gt;</code></td>
<td><code>&lt;td&gt;</code></td>
<td><code>gridcell</code></td>
</tr>
<tr>
<td><code>&lt;TreeGridColumnHeader&gt;</code></td>
<td><code>&lt;th&gt;</code></td>
<td><code>columnheader</code></td>
</tr>
<tr>
<td><code>&lt;TreeGridRowHeader&gt;</code></td>
<td><code>&lt;th&gt;</code></td>
<td><code>rowheader</code></td>
</tr>
</tbody>
</table>
`}]};export{r as default};