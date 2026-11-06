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
  '<!--/--><p class="hint">Saved <!--$-->',
  "<!--/--> times.</p></div>"
];
function BasicButton() {
  const [saves, setSaves] = createSignal(0);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Button({
    class: "button",
    onClick: () => setSaves((value) => value + 1),
    children: "Save"
  })), _v$3 = scope(() => {
    return escape(saves());
  });
  return ssr(_tmpl$, _v$, _v$2, _v$3);
}
var $$moduleUrl = "src/demos/button/basic.tsx";

export { $$moduleUrl, BasicButton as default };
//# sourceMappingURL=basic-e5RYYEud.mjs.map
