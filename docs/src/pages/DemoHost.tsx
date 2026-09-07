import { useParams } from '@solidjs/router';
import { Dynamic, type JSX, Loading, isServer } from '@solidjs/web';
import {
  type Component,
  Show,
  createEffect,
  createMemo,
  createSignal,
  lazy,
  onCleanup,
} from 'solid-js';
import { demos } from 'virtual:demo-registry';
import { DEMO_CHANNEL, isDemoMessage } from '../lib/demo-bridge';

import '../styles/reset.css';
import '../themes/_contract.css';
import '../styles/demos.css';
import { isTheme } from '../themes';

/**
 * Components cannot cross the hydration boundary as data, so the demo is
 * resolved with `lazy` rather than a router `query`: the loader stays a
 * code-split import and only its rendered output is serialised.
 */
const resolved = new Map<string, Component>();

function componentFor(id: string): Component | undefined {
  const cached = resolved.get(id);
  if (cached) {
    return cached;
  }

  const loader = demos[id];
  if (!loader) {
    return undefined;
  }

  const component = lazy(loader);
  resolved.set(id, component);
  return component;
}

/**
 * The document a demo iframe renders. It has no site chrome on purpose: the
 * frame is sized to its content, and anything visible inside it belongs to the
 * demo or to the active theme.
 */
export default function DemoHost(): JSX.Element {
  const params = useParams<{ id: string }>();
  const demo = createMemo(() => componentFor(params.id));

  const [stage, setStage] = createSignal<HTMLElement>();

  if (!isServer) {
    // Live appearance changes arrive from the parent. Reloading would pick them
    // up from the query string too, but at the cost of the reader's state.
    const onMessage = (event: MessageEvent): void => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (!isDemoMessage(event.data) || event.data.kind !== 'appearance') {
        return;
      }

      if (isTheme(event.data.theme)) {
        document.documentElement.dataset.theme = event.data.theme;
      }
      document.documentElement.classList.toggle('dark', event.data.scheme === 'dark');
    };

    window.addEventListener('message', onMessage);
    onCleanup(() => {
      window.removeEventListener('message', onMessage);
    });
  }

  // The parent cannot measure across the frame boundary, so the frame reports
  // its own height whenever the demo changes size: a dialog opening, a listbox
  // expanding, a toast arriving.
  //
  // The effect is created on both sides even though its body only ever runs in
  // the browser: a reactive owner created on one side only shifts every
  // hydration id after it, and the tree stops matching.
  createEffect(
    () => stage(),
    (element) => {
      if (isServer || !element || window.parent === window) {
        return;
      }

      const report = (): void => {
        window.parent.postMessage(
          {
            channel: DEMO_CHANNEL,
            kind: 'height',
            height: Math.max(element.scrollHeight, document.body.scrollHeight),
          },
          window.location.origin,
        );
      };

      const observer = new ResizeObserver(report);
      observer.observe(element);
      observer.observe(document.documentElement);
      report();

      onCleanup(() => {
        observer.disconnect();
      });
    },
  );

  return (
    <div
      class="demo-stage"
      ref={(element) => {
        setStage(element);
      }}
    >
      <Loading fallback={<div class="demo-stage-loading">Loading demo…</div>}>
        <Show
          when={demo()}
          fallback={<p class="demo-stage-missing">No demo registered as “{params.id}”.</p>}
        >
          {(component) => <Dynamic component={component()} />}
        </Show>
      </Loading>
    </div>
  );
}
