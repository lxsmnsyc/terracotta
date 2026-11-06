var id = "grid/basic";
var title = "Basic";
var code = `<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { JSX } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@solidjs/web'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Grid,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridBody,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridCell,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridColumnHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridHead,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridRow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridRowHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/grid'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> PEOPLE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Ada Lovelace'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, role: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Engineer'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, email: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'ada@example.com'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Grace Hopper'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, role: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Admiral'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, email: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'grace@example.com'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Katherine Johnson'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, role: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'Mathematician'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, email: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'katherine@example.com'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * One tab stop for the whole table. The arrow keys move between cells, and a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> * cell with a link puts focus on the link.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> BasicGrid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> JSX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"People"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-header"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-sort</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ascending"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              Name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Role&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Email&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">PEOPLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRowHeader</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell grid-row-header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{person.name}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRowHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{person.role}&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-cell"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"grid-link"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`mailto:\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">person</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">email</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                  {person.email}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          ))}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"hint"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        Tab in once, then use the arrow keys, &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Home&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>, &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>End&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">> and &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Ctrl&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Home&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">kbd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`;
var grid_default = {
  slug: "components/grid",
  title: "Grid",
  description: 'A two-dimensional set of cells, such as a data table the user moves through\ncell by cell, following the\n<a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">ARIA grid pattern</a>. It is one\nstop in the tab sequence, and the arrow keys move between cells.',
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
      "id": "what-a-cell-should-hold",
      "text": "What a cell should hold",
      "level": 3
    },
    {
      "id": "naming-and-sorting",
      "text": "Naming and sorting",
      "level": 3
    },
    {
      "id": "layout-grids",
      "text": "Layout grids",
      "level": 3
    },
    {
      "id": "other-elements",
      "text": "Other elements",
      "level": 3
    },
    {
      "id": "state-attributes",
      "text": "State attributes",
      "level": 2
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
      "id": "grid",
      "text": "`<Grid>`",
      "level": 3
    },
    {
      "id": "row-groups-rows-and-cells",
      "text": "Row groups, rows and cells",
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
      html: `<p>A plain <code>&lt;table&gt;</code> is easier to use when the user only reads it. Reach for a
grid when the cells are interactive, or when the table is large enough that
moving cell by cell helps.</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  Grid,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridBody,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridCell,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridColumnHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridFoot,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridHead,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridRow,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  GridRowHeader,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'terracotta/grid'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre><h2 id="anatomy">Anatomy</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>                    {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;table role="grid">, the tab stop */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>              {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;thead role="rowgroup"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>             {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;tr role="row"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridColumnHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;th role="columnheader"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridHead</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>              {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;tbody role="rowgroup"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRowHeader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>    {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;th role="rowheader"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>         {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* &#x3C;td role="gridcell"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridFoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">/>             {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D">/* optional; &#x3C;tfoot role="rowgroup"> */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><p>The parts render table elements by default, so the grid lays out its rows and
columns with no CSS. Rows can also sit directly in the <code>Grid</code>, without a group.</p>
<h2 id="examples">Examples</h2>
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
      html: `<h3 id="what-a-cell-should-hold">What a cell should hold</h3>
<p>The pattern names two cell designs that work best, and the grid supports both:</p>
<ul>
<li>A cell with text, or a single image. Focus lands on the cell.</li>
<li>A cell with one widget that does not need the arrow keys, such as a link, a
button, a checkbox or a switch. Focus lands on the widget, so screen readers
announce it as a widget.</li>
</ul>
<p>A cell with several widgets, or with a text field, takes focus itself.
<kbd>Tab</kbd> then moves to the widgets inside it, and on out of the grid. The
arrow keys are left to a text field, select or editable content inside a
cell, so its caret still moves. Entering and leaving a cell with
<kbd>Enter</kbd> and <kbd>F2</kbd> is not included.</p>
<h3 id="naming-and-sorting">Naming and sorting</h3>
<p>Name the grid with <code>aria-label</code> or <code>aria-labelledby</code>. Pass <code>aria-sort</code> on the
header of a sorted column, as the demo does.</p>
<h3 id="layout-grids">Layout grids</h3>
<p><code>wrap</code> lets the arrow keys wrap from the end of a row to the next row, and
from the bottom of a column to the next column. Use it for a layout grid, such
as a list of recipients that wraps across lines. Do not use it for data, where
wrapping is disorienting.</p>
<h3 id="other-elements">Other elements</h3>
<p>Every part takes <code>as</code>, so a grid can be built from <code>div</code>s. The roles are set
on every part, so this works the same, though the layout is then yours to
write:</p>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"div"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Recipients"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"div"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"div"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"/ada"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>Ada&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridCell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">GridRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">Grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre><h2 id="state-attributes">State attributes</h2>
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
<td><code>Grid</code></td>
<td><code>tc-grid</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>GridHead</code>, <code>GridBody</code>, <code>GridFoot</code></td>
<td><code>tc-grid-head</code>, <code>tc-grid-body</code>, <code>tc-grid-foot</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>GridRow</code></td>
<td><code>tc-grid-row</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>GridCell</code></td>
<td><code>tc-grid-cell</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>GridColumnHeader</code></td>
<td><code>tc-grid-column-header</code></td>
<td>Always</td>
</tr>
<tr>
<td><code>GridRowHeader</code></td>
<td><code>tc-grid-row-header</code></td>
<td>Always</td>
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
<td><kbd>\u2192</kbd> / <kbd>\u2190</kbd></td>
<td>Next / previous cell in the row. Stops at the edge, or wraps with <code>wrap</code>.</td>
</tr>
<tr>
<td><kbd>\u2193</kbd> / <kbd>\u2191</kbd></td>
<td>Cell below / above. Stops at the edge, or wraps with <code>wrap</code>.</td>
</tr>
<tr>
<td><kbd>Page Down</kbd> / <kbd>Page Up</kbd></td>
<td>Moves <code>pageSize</code> rows down / up</td>
</tr>
<tr>
<td><kbd>Home</kbd> / <kbd>End</kbd></td>
<td>First / last cell in the row</td>
</tr>
<tr>
<td><kbd>Ctrl</kbd>+<kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>End</kbd></td>
<td>First cell of the grid / last cell of the grid</td>
</tr>
<tr>
<td><kbd>Tab</kbd></td>
<td>Moves into the grid, on the cell that last had focus, else the first cell</td>
</tr>
</tbody>
</table>
<p>The pattern's optional selection keys are not included. Set <code>aria-selected</code> on
cells or rows yourself if the grid selects.</p>
<h2 id="api">API</h2>
<h3 id="grid"><code>&lt;Grid&gt;</code></h3>
<p>Renders a <code>&lt;table&gt;</code> by default, with <code>role=&quot;grid&quot;</code>.</p>
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
<td><code>wrap</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Lets the arrow keys wrap, for a layout grid.</td>
</tr>
<tr>
<td><code>pageSize</code></td>
<td><code>number</code></td>
<td><code>5</code></td>
<td>Rows moved by <kbd>Page Up</kbd> and <kbd>Page Down</kbd>.</td>
</tr>
<tr>
<td><code>ref</code></td>
<td><code>DynamicNode&lt;T&gt;</code> | <code>(el) =&gt; void</code></td>
<td>none</td>
<td>Handle to the rendered element.</td>
</tr>
<tr>
<td><em>\u2026rest</em></td>
<td>props of <code>as</code></td>
<td>none</td>
<td>Forwarded to the rendered element.</td>
</tr>
</tbody>
</table>
<p>The grid sets <code>tabindex</code> on the cells, and on the widgets inside them, to keep
one tab stop. A widget's own <code>tabindex</code> is put back when it leaves the grid.</p>
<h3 id="row-groups-rows-and-cells">Row groups, rows and cells</h3>
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
<td><code>&lt;GridHead&gt;</code></td>
<td><code>&lt;thead&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;GridBody&gt;</code></td>
<td><code>&lt;tbody&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;GridFoot&gt;</code></td>
<td><code>&lt;tfoot&gt;</code></td>
<td><code>rowgroup</code></td>
</tr>
<tr>
<td><code>&lt;GridRow&gt;</code></td>
<td><code>&lt;tr&gt;</code></td>
<td><code>row</code></td>
</tr>
<tr>
<td><code>&lt;GridCell&gt;</code></td>
<td><code>&lt;td&gt;</code></td>
<td><code>gridcell</code></td>
</tr>
<tr>
<td><code>&lt;GridColumnHeader&gt;</code></td>
<td><code>&lt;th&gt;</code></td>
<td><code>columnheader</code></td>
</tr>
<tr>
<td><code>&lt;GridRowHeader&gt;</code></td>
<td><code>&lt;th&gt;</code></td>
<td><code>rowheader</code></td>
</tr>
</tbody>
</table>
<p>Each takes <code>as</code> and forwards the rest of its props.</p>
`
    }
  ]
};

export { grid_default as default };
//# sourceMappingURL=grid-DOTylY_e.mjs.map
