var e=`tree/basic`,t=`Basic`,n=`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { createSignal } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'solid-js'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Tree, TreeGroup, TreeItem, TreeItemLabel, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> TreeItemProperties } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/tree'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ChevronDownIcon, ChevronRightIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '../../lib/icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  children</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> FILES</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Documents'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    children: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'CV.pdf'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Letters'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, children: [{ name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Bank.txt'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }, { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Landlord.txt'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Music'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, children: [{ name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Album.flac'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }] },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Notes.md'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> caretOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">item</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> TreeItemProperties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isParent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpanded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ChevronDownIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /> </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">ChevronRightIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> />;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">props</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> })</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree-item"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{props.node.name}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      {(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree-row"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'padding-inline-start'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">level</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}rem\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree-caret"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"true"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">caretOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(item)}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItemLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{props.node.name}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItemLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          {props.node.children </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree-group"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              {props.node.children.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">child</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Item</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{child} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              ))}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * The tree owns selection and expansion. The page draws the rows, the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * indentation and the caret from each item's state.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicTree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setSelected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tree"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Files"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> as</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setSelected}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        defaultExpanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Documents'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">FILES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Item</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{node} /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        ))}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"hint"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">selected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`Selected: \${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">selected</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'Arrow keys move and open folders.'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,r={slug:`components/tree`,title:`Tree`,description:`A hierarchical list, such as a file browser, following the
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/">ARIA tree view pattern</a>.
It is one stop in the tab sequence. The arrow keys move through the nodes on
screen, and open and close them.`,headings:[{id:`anatomy`,text:`Anatomy`,level:2},{id:`examples`,text:`Examples`,level:2},{id:`basic`,text:`Basic`,level:3},{id:`parents-and-end-nodes`,text:`Parents and end nodes`,level:3},{id:`labels`,text:`Labels`,level:3},{id:`selection`,text:`Selection`,level:3},{id:`expansion`,text:`Expansion`,level:3},{id:`drawing-the-rows`,text:`Drawing the rows`,level:3},{id:`naming-the-tree`,text:`Naming the tree`,level:3},{id:`state-attributes`,text:`State attributes`,level:2},{id:`reading-the-item-state`,text:`Reading the item state`,level:3},{id:`keyboard`,text:`Keyboard`,level:2},{id:`api`,text:`API`,level:2},{id:`tree`,text:"`<Tree>`",level:3},{id:`treeitem`,text:"`<TreeItem>`",level:3},{id:`treeitemlabel`,text:"`<TreeItemLabel>`",level:3},{id:`treegroup`,text:"`<TreeGroup>`",level:3}],hero:{type:`demo`,id:e,title:t,code:n,caption:``},blocks:[{type:`html`,html:`<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Tree, TreeGroup, TreeItem, TreeItemLabel } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/tree'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>              {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="tree", owns selection and expansion */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>        {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="treeitem" */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItemLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>{</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* names the item */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>     {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* role="group"; makes the item a parent */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h2 id="examples">Examples</h2>
<h3 id="basic">Basic</h3>
`},{type:`demo`,id:e,title:t,code:n,caption:``},{type:`html`,html:`<h3 id="parents-and-end-nodes">Parents and end nodes</h3>
<p>An item with a <code>TreeGroup</code> is a parent node. It gets <code>aria-expanded</code>, and its
group is shown while it is expanded. An item without one is an end node, with
no <code>aria-expanded</code>, so it is not announced as a parent.</p>
<p><code>TreeGroup</code> takes <code>unmount</code>, as <a href="/components/transition"><code>Transition</code></a> does. By
default a closed group is removed.</p>
<h3 id="labels">Labels</h3>
<p>Put the item's name in a <code>TreeItemLabel</code>. The item points <code>aria-labelledby</code> at
it, so the names of its children are not read as part of its own name.
Type-ahead matches this text.</p>
<h3 id="selection">Selection</h3>
<p><code>value</code> and <code>defaultValue</code> work as on <a href="/components/listbox"><code>Listbox</code></a>. Every item
needs a <code>value</code>.</p>
<ul>
<li>A single-select tree holds one value. Clicking a node, or pressing
<kbd>Enter</kbd> or <kbd>Space</kbd> on it, selects it.</li>
<li><code>multiple</code> makes the tree hold an array, and sets
<code>aria-multiselectable=&quot;true&quot;</code>. <kbd>Enter</kbd> and <kbd>Space</kbd> toggle
the focused node.</li>
<li>Selection does not follow focus. The arrow keys only move focus.</li>
<li>A <code>disabled</code> item stays focusable but cannot be selected.</li>
</ul>
<p>Pass <code>by</code> when the values are objects.</p>
<h3 id="expansion">Expansion</h3>
<p><code>defaultExpanded</code> lists the values of the items that start open. Pass
<code>expanded</code> and <code>onExpandedChange</code> to control it.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">setOpen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'docs'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Files"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">expanded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">onExpandedChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{setOpen}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Tree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h3 id="drawing-the-rows">Drawing the rows</h3>
<p><code>TreeItem</code> takes a render prop with the item's state. Use it for the
indentation and an open or closed marker:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{node.id}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">item</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'padding-inline-start'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">level</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}rem\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isParent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">isExpanded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '▾'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '▸'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ''</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItemLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{node.name}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItemLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      {node.children </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>…&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  )}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">TreeItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>Style the row inside the item, not the item itself. The item contains its
group, so a background on the item would cover its children too.</p>
<h3 id="naming-the-tree">Naming the tree</h3>
<p>Give the tree an <code>aria-label</code>, or point <code>aria-labelledby</code> at a visible heading.</p>
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
<td><code>Tree</code></td>
<td><code>tc-tree</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>TreeItem</code></td>
<td><code>tc-tree-item</code>, <code>tc-owner</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>TreeItem</code></td>
<td><code>tc-level</code></td>
<td>Always, set to the item's depth from 1</td>
</tr>
<tr>
<td><code>TreeItem</code></td>
<td><code>tc-selected</code></td>
<td>The item is selected</td>
</tr>
<tr>
<td><code>TreeItem</code>, <code>TreeGroup</code></td>
<td><code>tc-expanded</code></td>
<td>The item is expanded</td>
</tr>
<tr>
<td><code>TreeItem</code></td>
<td><code>tc-disabled</code></td>
<td>The item is disabled</td>
</tr>
<tr>
<td><code>TreeItemLabel</code></td>
<td><code>tc-tree-item-label</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>TreeGroup</code></td>
<td><code>tc-tree-group</code></td>
<td>Always</td>
</tr>
</tbody>
</table>
<h3 id="reading-the-item-state">Reading the item state</h3>
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
<td><code>level()</code></td>
<td><code>number</code></td>
<td>The depth of the item, from 1 for a root node.</td>
</tr>
<tr>
<td><code>isSelected()</code></td>
<td><code>boolean</code></td>
<td>Whether the item is selected.</td>
</tr>
<tr>
<td><code>isExpanded()</code></td>
<td><code>boolean</code></td>
<td>Whether the item is open.</td>
</tr>
<tr>
<td><code>isParent()</code></td>
<td><code>boolean</code></td>
<td>Whether the item has a <code>TreeGroup</code>.</td>
</tr>
<tr>
<td><code>disabled()</code></td>
<td><code>boolean</code></td>
<td>Whether the item is disabled.</td>
</tr>
<tr>
<td><code>toggle()</code></td>
<td><code>() =&gt; void</code></td>
<td>Opens or closes the item.</td>
</tr>
<tr>
<td><code>select()</code></td>
<td><code>() =&gt; void</code></td>
<td>Selects the item, or toggles it in a multi-select tree.</td>
</tr>
</tbody>
</table>
<h2 id="keyboard">Keyboard</h2>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><kbd>↓</kbd> / <kbd>↑</kbd></td>
<td>Next / previous node on screen</td>
</tr>
<tr>
<td><kbd>→</kbd></td>
<td>Opens a closed node. On an open node, moves to its first child.</td>
</tr>
<tr>
<td><kbd>←</kbd></td>
<td>Closes an open node. Otherwise, moves to its parent.</td>
</tr>
<tr>
<td><kbd>Home</kbd> / <kbd>End</kbd></td>
<td>First / last node on screen</td>
</tr>
<tr>
<td><kbd>Enter</kbd> / <kbd>Space</kbd></td>
<td>Selects the node, or toggles it in a multi-select tree</td>
</tr>
<tr>
<td>Printable characters</td>
<td>Type-ahead: moves to the next node whose label starts with what you typed</td>
</tr>
<tr>
<td><kbd>Tab</kbd></td>
<td>Moves into the tree, on the last focused node, else the first selected node, else the first node</td>
</tr>
</tbody>
</table>
<p>The pattern's optional keys are not included: <kbd>*</kbd> to open every
sibling, and <kbd>Shift</kbd> and <kbd>Ctrl</kbd> combinations for selecting
ranges.</p>
<h2 id="api">API</h2>
<h3 id="tree"><code>&lt;Tree&gt;</code></h3>
<p>Renders a <code>&lt;ul&gt;</code> by default. Pass exactly one of <code>defaultValue</code> or <code>value</code>.</p>
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
<td><code>'ul'</code></td>
<td>Element or component to render as.</td>
</tr>
<tr>
<td><code>multiple</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Holds an array of selected values.</td>
</tr>
<tr>
<td><code>defaultValue</code></td>
<td><code>V | V[] | undefined</code></td>
<td>none</td>
<td>Initial selection, uncontrolled.</td>
</tr>
<tr>
<td><code>value</code></td>
<td><code>V | V[] | undefined</code></td>
<td>none</td>
<td>Current selection, controlled.</td>
</tr>
<tr>
<td><code>onChange</code></td>
<td><code>(value) =&gt; void</code></td>
<td>none</td>
<td>Called with the new selection.</td>
</tr>
<tr>
<td><code>toggleable</code></td>
<td><code>boolean</code></td>
<td><code>false</code>, <code>true</code> with <code>multiple</code></td>
<td>Whether selecting a selected node deselects it.</td>
</tr>
<tr>
<td><code>by</code></td>
<td><code>(a: V, b: V) =&gt; boolean</code></td>
<td>reference equality</td>
<td>Compares values.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Blocks selection.</td>
</tr>
<tr>
<td><code>defaultExpanded</code></td>
<td><code>V[]</code></td>
<td><code>[]</code></td>
<td>Values of the items that start open.</td>
</tr>
<tr>
<td><code>expanded</code></td>
<td><code>V[]</code></td>
<td>none</td>
<td>Values of the open items, controlled.</td>
</tr>
<tr>
<td><code>onExpandedChange</code></td>
<td><code>(expanded: V[]) =&gt; void</code></td>
<td>none</td>
<td>Called with the new open items.</td>
</tr>
<tr>
<td><code>ref</code></td>
<td><code>DynamicNode&lt;T&gt;</code> | <code>(el) =&gt; void</code></td>
<td>none</td>
<td>Handle to the rendered element.</td>
</tr>
<tr>
<td><em>…rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<h3 id="treeitem"><code>&lt;TreeItem&gt;</code></h3>
<p>Renders an <code>&lt;li&gt;</code> by default.</p>
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
<td>Identifies the item. Required.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Keeps the item from being selected.</td>
</tr>
<tr>
<td><code>children</code></td>
<td><code>JSX.Element</code> | <code>(item: TreeItemProperties) =&gt; JSX.Element</code></td>
<td>none</td>
<td>Contents, or a render prop.</td>
</tr>
</tbody>
</table>
<p>Rendered attributes: <code>role=&quot;treeitem&quot;</code>, <code>tabindex</code> (<code>0</code> on one item, <code>-1</code> on
the rest), <code>aria-level</code>, <code>aria-selected</code>, <code>aria-expanded</code> on parent nodes,
<code>aria-labelledby</code> while a <code>TreeItemLabel</code> is mounted, <code>aria-disabled</code>.</p>
<h3 id="treeitemlabel"><code>&lt;TreeItemLabel&gt;</code></h3>
<p>Renders a <code>&lt;span&gt;</code> by default.</p>
<h3 id="treegroup"><code>&lt;TreeGroup&gt;</code></h3>
<p>Renders a <code>&lt;ul&gt;</code> by default, with <code>role=&quot;group&quot;</code>. It takes <code>unmount</code>.</p>
<p>Every part takes <code>as</code> and forwards the rest of its props.</p>
`}]};export{r as default};