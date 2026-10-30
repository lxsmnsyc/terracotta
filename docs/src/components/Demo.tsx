import { type JSX, isServer } from '@solidjs/web';
import { Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { usePreferredColorScheme } from '../lib/color-scheme';
import { Tab, TabGroup, TabList, TabPanel } from 'terracotta/tabs';
import { DEMO_CHANNEL, demoUrl, isDemoMessage } from '../lib/demo-bridge';
import { useTheme } from '../lib/theme';

export interface DemoProps {
  id: string;
  title: string;
  /** Shiki output for the demo's source, produced at build time. */
  code: string;
  caption: string;
}

const MIN_HEIGHT = 72;

export default function Demo(props: DemoProps): JSX.Element {
  const { theme } = useTheme();
  const scheme = usePreferredColorScheme();

  const [height, setHeight] = createSignal(MIN_HEIGHT);
  const [nonce, setNonce] = createSignal(0);
  let frame: HTMLIFrameElement | undefined;

  const src = (): string => `${demoUrl(props.id, theme(), scheme())}&r=${nonce()}`;

  function postAppearance(): void {
    frame?.contentWindow?.postMessage(
      { channel: DEMO_CHANNEL, kind: 'appearance', theme: theme(), scheme: scheme() },
      window.location.origin,
    );
  }

  // A reload would also pick the new appearance up from the query string, but
  // reloading throws away whatever the reader had opened, typed or focused.
  createEffect(
    () => [theme(), scheme()] as const,
    () => {
      postAppearance();
    },
  );

  if (!isServer) {
    const onMessage = (event: MessageEvent): void => {
      if (event.source !== frame?.contentWindow || event.origin !== window.location.origin) {
        return;
      }
      if (!isDemoMessage(event.data) || event.data.kind !== 'height') {
        return;
      }
      setHeight(Math.max(MIN_HEIGHT, Math.ceil(event.data.height)));
    };

    window.addEventListener('message', onMessage);
    onCleanup(() => {
      window.removeEventListener('message', onMessage);
    });
  }

  return (
    <figure class="demo">
      <TabGroup<string> class="demo-tabs" horizontal defaultValue="preview">
        <div class="demo-toolbar">
          <TabList class="demo-tablist">
            <Tab class="demo-tab" value="preview">
              Preview
            </Tab>
            <Tab class="demo-tab" value="code">
              Code
            </Tab>
          </TabList>

          <div class="demo-tools">
            <button
              type="button"
              class="demo-tool"
              onClick={() => {
                setNonce((value) => value + 1);
              }}
              title="Reset the demo to its initial state"
            >
              Reset
            </button>
            <a
              class="demo-tool"
              href={src()}
              target="_blank"
              rel="noreferrer"
              title="Open this demo in its own tab"
            >
              Open ↗
            </a>
          </div>
        </div>

        <TabPanel class="demo-panel" value="preview">
          <iframe
            ref={(element) => {
              frame = element;
            }}
            class="demo-frame"
            src={src()}
            title={`${props.title} demo`}
            loading="lazy"
            style={{ height: `${height()}px` }}
            onLoad={() => {
              postAppearance();
            }}
          />
        </TabPanel>

        <TabPanel class="demo-panel demo-panel-code" value="code">
          {/* Highlighted during the build; the browser never loads a highlighter. */}
          <div class="demo-code" innerHTML={props.code} />
        </TabPanel>
      </TabGroup>

      <Show when={props.caption}>
        <figcaption class="demo-caption" innerHTML={props.caption} />
      </Show>
    </figure>
  );
}
