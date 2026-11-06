var e={slug:`guides/ssr`,title:`Server-side rendering`,description:`Rendering is SSR-safe. The DOM work happens in effects, and effects do not run
on the server.`,headings:[{id:`colorschemeprovider`,text:"`ColorSchemeProvider`",level:2}],hero:void 0,blocks:[{type:`html`,html:`<p>That means a component renders its markup and ARIA attributes on the server,
then wires up event listeners, focus handling and measurements once it hydrates
in the browser.</p>
<h2 id="colorschemeprovider"><code>ColorSchemeProvider</code></h2>
<p><code>ColorSchemeProvider</code> is the one to keep in mind. It reads <code>localStorage</code> and
mutates <code>document.documentElement</code>, both from effects. It renders on the server
without error, but takes effect only in the browser.</p>
<p>The consequence is a flash. The server cannot know the visitor's saved scheme,
so the first paint uses whatever your CSS defaults to, and the provider corrects
it after hydration. The fix is a small inline script in your document head that
reads the same <code>theme-preference</code> key and sets the class before the first paint.
See
<a href="/components/color-scheme#avoiding-the-first-paint-flash">avoiding the first-paint flash</a>.</p>
`}]};export{e as default};