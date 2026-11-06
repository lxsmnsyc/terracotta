import { B as Button } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, scope, ssr } from '@solidjs/web';
import { createSignal } from 'solid-js';
import '@solidjs/web/storage';
import '@solidjs/web/server-functions';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  "<!--/--><!--$-->",
  '<!--/--><p class="hint">Activated <!--$-->',
  "<!--/--> times.</p></div>"
];
function ButtonAsOtherElements() {
  const [activations, setActivations] = createSignal(0);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Button({
    class: "button",
    as: "a",
    href: "#anchor",
    children: "A link that behaves as a button"
  })), _v$3 = escape(Button({
    class: "button",
    as: "div",
    onClick: () => setActivations((n) => n + 1),
    children: "A div: try Enter and Space"
  })), _v$4 = scope(() => {
    return escape(activations());
  });
  return ssr(_tmpl$, _v$, _v$2, _v$3, _v$4);
}
var $$moduleUrl = "src/demos/button/as-other-elements.tsx";

export { $$moduleUrl, ButtonAsOtherElements as default };
//# sourceMappingURL=as-other-elements-Buor-k0K.mjs.map
