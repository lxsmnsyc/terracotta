import { aC as Toggle } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, ssrStyleProperty } from '@solidjs/web';
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
  '<!--/--><p class="hint" style="',
  '">The sample text follows the button&#8217;s pressed state.</p></div>'
];
function BasicToggle() {
  const [bold, setBold] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Toggle({
    class: "toggle",
    defaultPressed: false,
    onChange: setBold,
    children: "Bold"
  })), _v$3 = () => {
    return ssrStyleProperty("font-weight:", bold() ? "700" : "400");
  };
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/toggle/basic.tsx";

export { $$moduleUrl, BasicToggle as default };
//# sourceMappingURL=basic-Dp92K9_I.mjs.map
