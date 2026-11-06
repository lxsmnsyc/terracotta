import { type JSX, isServer, useHead } from '@solidjs/web';
import { For, createEffect, createSignal, onCleanup } from 'solid-js';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';
import { Switch } from 'terracotta/switch';
import { Toggle } from 'terracotta/toggle';
import { Tree, TreeGroup, TreeItem, TreeItemLabel, type TreeItemProperties } from 'terracotta/tree';
import { sections } from 'virtual:content';
import { usePreferredColorScheme } from '../lib/color-scheme';
import { DEMO_CHANNEL, demoUrl, isDemoMessage } from '../lib/demo-bridge';
import { useTheme } from '../lib/theme';
import { THEMES } from '../themes';
import { ChevronDownIcon, ChevronRightIcon } from '../lib/icons';

const INSTALL = 'pnpm add terracotta@next';
const REPO = 'https://github.com/lxsmnsyc/terracotta';
const SPECIMEN = 'landing/specimen';

const NUMBER_WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
];
const THEME_COUNT = NUMBER_WORDS[THEMES.length] ?? String(THEMES.length);

const RIBBON = [
  'tc-expanded',
  'aria-controls',
  'tc-checked="mixed"',
  'role="listbox"',
  'tc-selected',
  'aria-activedescendant',
  'tc-active',
  'tc-pressed',
  'aria-orientation',
  'tc-disabled',
  'role="treegrid"',
  'aria-valuenow',
];

/* Reveal ------------------------------------------------------------ */

/**
 * Marks a section as in view once, so CSS can run its entrance. The page
 * renders fully visible without script, and `lp-armed` on the root is only
 * added in the browser, so a reader without JavaScript never sees an empty
 * section.
 */
function useReveal(): (element: HTMLElement) => void {
  const [targets, setTargets] = createSignal<HTMLElement[]>([]);

  createEffect(
    () => targets(),
    (elements) => {
      if (isServer || elements.length === 0) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-in', '');
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -12% 0px' },
      );
      for (const element of elements) {
        observer.observe(element);
      }
      onCleanup(() => {
        observer.disconnect();
      });
    },
  );

  return (element) => {
    setTargets((list) => [...list, element]);
  };
}

/* Install chip ------------------------------------------------------ */

function InstallChip(props: { large?: boolean }): JSX.Element {
  const [copied, setCopied] = createSignal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    clearTimeout(timer);
  });

  return (
    <div class={{ 'lp-install': true, 'lp-install-large': !!props.large }}>
      <span class="lp-install-prompt" aria-hidden="true">
        $
      </span>
      <code class="lp-install-command">{INSTALL}</code>
      <button
        type="button"
        class="lp-install-copy"
        data-copied={copied() ? '' : undefined}
        onClick={() => {
          navigator.clipboard.writeText(INSTALL).then(
            () => {
              setCopied(true);
              clearTimeout(timer);
              timer = setTimeout(() => {
                setCopied(false);
              }, 1600);
            },
            () => {
              // Clipboard access denied. The command is still on screen to select.
            },
          );
        }}
      >
        <span class="lp-install-copy-label">{copied() ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

/* Specimen ---------------------------------------------------------- */

/**
 * One live demo frame, cycled through every theme. The frame never reloads:
 * each step is a message across the demo bridge, and the frame wipes to the
 * new theme with a view transition. The timer is the active chip's CSS
 * animation, so pausing the animation pauses the cycle, and a reader who asked
 * for reduced motion gets no autoplay at all.
 */
function Specimen(): JSX.Element {
  const { setTheme } = useTheme();
  const scheme = usePreferredColorScheme();

  const [current, setCurrent] = createSignal(THEMES[0]!.id);
  const [height, setHeight] = createSignal(320);
  const [paused, setPaused] = createSignal(false);
  let frame: HTMLIFrameElement | undefined;

  const meta = (): (typeof THEMES)[number] =>
    THEMES.find((entry) => entry.id === current()) ?? THEMES[0]!;
  const src = (): string => demoUrl(SPECIMEN, THEMES[0]!.id, scheme());

  function post(animate: boolean): void {
    frame?.contentWindow?.postMessage(
      { channel: DEMO_CHANNEL, kind: 'appearance', theme: current(), scheme: scheme(), animate },
      window.location.origin,
    );
  }

  createEffect(
    () => current(),
    () => {
      if (!isServer) {
        post(true);
      }
    },
  );

  if (!isServer) {
    const onMessage = (event: MessageEvent): void => {
      if (event.source !== frame?.contentWindow || event.origin !== window.location.origin) {
        return;
      }
      if (isDemoMessage(event.data) && event.data.kind === 'height') {
        setHeight(Math.ceil(event.data.height));
      }
    };
    window.addEventListener('message', onMessage);
    onCleanup(() => {
      window.removeEventListener('message', onMessage);
    });
  }

  function advance(): void {
    const index = THEMES.findIndex((entry) => entry.id === current());
    setCurrent(THEMES[(index + 1) % THEMES.length]!.id);
  }

  return (
    <div
      class="lp-specimen"
      data-paused={paused() ? '' : undefined}
      onPointerEnter={() => {
        setPaused(true);
      }}
      onPointerLeave={() => {
        setPaused(false);
      }}
      onFocusIn={() => {
        setPaused(true);
      }}
      onFocusOut={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setPaused(false);
        }
      }}
    >
      <div class="lp-specimen-bar">
        <span class="lp-specimen-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span class="lp-specimen-path">specimen.tsx</span>
        <span class="lp-specimen-status">{paused() ? 'Paused' : 'Live'}</span>
      </div>

      <iframe
        ref={(element) => {
          frame = element;
        }}
        class="lp-specimen-frame"
        src={src()}
        title="Live specimen: a switch, a radio group, a slider and a checkbox"
        style={{ height: `${height()}px` }}
        onLoad={() => {
          post(false);
        }}
      />

      <div class="lp-specimen-foot">
        <p class="lp-specimen-caption" aria-live="polite">
          <span class="lp-specimen-caption-label">Same markup. Theme:</span>{' '}
          <For each={[meta()]}>
            {(entry) => <strong class="lp-specimen-name">{entry.name}</strong>}
          </For>
        </p>

        <RadioGroup<string>
          class="lp-chips"
          value={current()}
          onChange={(value) => {
            if (value) {
              setCurrent(value);
            }
          }}
        >
          <RadioGroupLabel class="visually-hidden">Specimen theme</RadioGroupLabel>
          <For each={THEMES}>
            {(entry) => (
              <RadioGroupOption
                class="lp-chip"
                value={entry.id}
                title={entry.name}
                onAnimationEnd={(event: AnimationEvent) => {
                  if (event.animationName === 'lp-chip-fill') {
                    advance();
                  }
                }}
              >
                <RadioGroupLabel class="visually-hidden">{entry.name}</RadioGroupLabel>
                <span class={`lp-chip-swatch theme-swatch-${entry.id}`} aria-hidden="true" />
              </RadioGroupOption>
            )}
          </For>
        </RadioGroup>

        <button
          type="button"
          class="lp-specimen-apply"
          onClick={() => {
            setTheme(current());
          }}
        >
          Wear it
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

/* Inspector --------------------------------------------------------- */

interface Attribute {
  name: string;
  value: string;
}

const SHOWN = /^(role|aria-|tc-)/;
// These hold generated ids, which change between renders and say nothing
// about state.
const REFERENCES = /^aria-(controls|labelledby|describedby|activedescendant)$/;

function readAttributes(element: Element): Attribute[] {
  const list: Attribute[] = [];
  for (const attribute of element.attributes) {
    if (SHOWN.test(attribute.name)) {
      list.push({
        name: attribute.name,
        value: REFERENCES.test(attribute.name) ? '…' : attribute.value,
      });
    }
  }
  return list;
}

/**
 * Prints an element's opening tag as the browser holds it right now, limited
 * to role, ARIA and `tc-` attributes. Attributes that just changed flash, so
 * the reader can see which ones a click wrote.
 */
function TagLine(props: { target: () => HTMLElement | undefined }): JSX.Element {
  const [attributes, setAttributes] = createSignal<Attribute[]>([]);
  const [tag, setTag] = createSignal('button');
  const [fresh, setFresh] = createSignal<ReadonlySet<string>>(new Set());

  createEffect(
    () => props.target(),
    (element) => {
      if (isServer || !element) {
        return;
      }
      setTag(element.tagName.toLowerCase());
      setAttributes(readAttributes(element));

      let timer: ReturnType<typeof setTimeout> | undefined;
      const observer = new MutationObserver((records) => {
        const changed = new Set<string>();
        for (const record of records) {
          if (record.attributeName && SHOWN.test(record.attributeName)) {
            changed.add(record.attributeName);
          }
        }
        setAttributes(readAttributes(element));
        if (changed.size > 0) {
          setFresh(changed);
          clearTimeout(timer);
          timer = setTimeout(() => {
            setFresh(new Set<string>());
          }, 1200);
        }
      });
      observer.observe(element, { attributes: true });
      onCleanup(() => {
        observer.disconnect();
        clearTimeout(timer);
      });
    },
  );

  return (
    <code class="lp-tag">
      <span class="lp-tok-punct">&lt;</span>
      <span class="lp-tok-tag">{tag()}</span>
      <For each={attributes()}>
        {(attribute) => (
          <span
            class="lp-tok-pair"
            data-tc={attribute.name.startsWith('tc-') ? '' : undefined}
            data-fresh={fresh().has(attribute.name) ? '' : undefined}
          >
            {' '}
            <span class="lp-tok-attr">{attribute.name}</span>
            <span class="lp-tok-punct">=</span>
            <span class="lp-tok-value">"{attribute.value}"</span>
          </span>
        )}
      </For>
      <span class="lp-tok-punct">&gt;</span>
    </code>
  );
}

function Inspector(): JSX.Element {
  const [switchElement, setSwitchElement] = createSignal<HTMLElement>();
  const [disclosureElement, setDisclosureElement] = createSignal<HTMLElement>();
  const [toggleElement, setToggleElement] = createSignal<HTMLElement>();

  return (
    <div class="lp-inspector">
      <div class="lp-inspector-head" aria-hidden="true">
        <span>Rendered</span>
        <span>Elements</span>
      </div>

      <div class="lp-inspector-row">
        <div class="lp-inspector-live">
          <Switch
            class="switch"
            defaultChecked={false}
            ref={(element: HTMLElement) => {
              setSwitchElement(element);
            }}
          >
            <span class="switch-track" aria-hidden="true">
              <span class="switch-knob" />
            </span>
            <span>Dark launch</span>
          </Switch>
        </div>
        <TagLine target={switchElement} />
      </div>

      <div class="lp-inspector-row">
        <div class="lp-inspector-live">
          <Disclosure class="disclosure lp-inspector-disclosure" defaultOpen={false}>
            <DisclosureButton
              class="disclosure-button"
              ref={(element: HTMLElement) => {
                setDisclosureElement(element);
              }}
            >
              Release notes
              <span class="disclosure-chevron" aria-hidden="true">
                <ChevronRightIcon />
              </span>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              The panel leaves the DOM when closed.
            </DisclosurePanel>
          </Disclosure>
        </div>
        <TagLine target={disclosureElement} />
      </div>

      <div class="lp-inspector-row">
        <div class="lp-inspector-live">
          <Toggle
            class="toggle"
            defaultPressed={false}
            ref={(element: HTMLElement) => {
              setToggleElement(element);
            }}
          >
            Pin
          </Toggle>
        </div>
        <TagLine target={toggleElement} />
      </div>
    </div>
  );
}

/* Keyboard ---------------------------------------------------------- */

interface FileNode {
  name: string;
  children?: FileNode[];
}

const FILES: FileNode[] = [
  {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [{ name: 'dialog.tsx' }, { name: 'listbox.tsx' }, { name: 'tree.tsx' }],
      },
      { name: 'states', children: [{ name: 'disclosure.ts' }, { name: 'select.ts' }] },
      { name: 'index.ts' },
    ],
  },
  { name: 'theme.css' },
  { name: 'package.json' },
];

function caretFor(item: TreeItemProperties): JSX.Element {
  if (!item.isParent()) {
    return null;
  }
  return item.isExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />;
}

function FileItem(props: { node: FileNode }): JSX.Element {
  return (
    <TreeItem class="tree-item" value={props.node.name}>
      {(item) => (
        <>
          <span class="tree-row" style={{ 'padding-inline-start': `${item.level() - 1}rem` }}>
            <span class="tree-caret" aria-hidden="true">
              {caretFor(item)}
            </span>
            <TreeItemLabel>{props.node.name}</TreeItemLabel>
          </span>
          {props.node.children && (
            <TreeGroup class="tree-group">
              {props.node.children.map((child) => (
                <FileItem node={child} />
              ))}
            </TreeGroup>
          )}
        </>
      )}
    </TreeItem>
  );
}

const KEYS: { key: string; label: string; wide?: boolean }[] = [
  { key: 'ArrowUp', label: '↑' },
  { key: 'ArrowDown', label: '↓' },
  { key: 'ArrowLeft', label: '←' },
  { key: 'ArrowRight', label: '→' },
  { key: 'Home', label: 'Home', wide: true },
  { key: 'End', label: 'End', wide: true },
  { key: 'Enter', label: 'Enter', wide: true },
  { key: '*', label: '*' },
  { key: 'type', label: 'a–z', wide: true },
];

function Keyboard(): JSX.Element {
  const [lit, setLit] = createSignal<string>();
  const [focused, setFocused] = createSignal('Tab into the tree');
  let timer: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    clearTimeout(timer);
  });

  return (
    <div
      class="lp-keys"
      onKeyDown={(event) => {
        const key = /^[a-z]$/i.test(event.key) ? 'type' : event.key;
        setLit(key);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setLit(undefined);
        }, 260);
        // Read the result after the tree has handled the key.
        queueMicrotask(() => {
          const active = document.activeElement;
          const label = active?.querySelector('[id]')?.textContent ?? active?.textContent;
          if (active && event.currentTarget.contains(active) && label) {
            setFocused(label.trim());
          }
        });
      }}
      onFocusIn={(event) => {
        const target = event.target;
        const label = target instanceof Element ? target.querySelector('[id]')?.textContent : null;
        if (label) {
          setFocused(label.trim());
        }
      }}
    >
      <div class="lp-keys-tree">
        <Tree
          class="tree"
          aria-label="Project files"
          defaultValue={undefined as string | undefined}
          defaultExpanded={['src']}
        >
          {FILES.map((node) => (
            <FileItem node={node} />
          ))}
        </Tree>
      </div>

      <div class="lp-keys-board">
        <div class="lp-keycaps" aria-hidden="true">
          <For each={KEYS}>
            {(entry) => (
              <kbd
                class={{ 'lp-keycap': true, 'lp-keycap-wide': !!entry.wide }}
                data-lit={lit() === entry.key ? '' : undefined}
              >
                {entry.label}
              </kbd>
            )}
          </For>
        </div>
        <p class="lp-keys-readout">
          <span class="lp-keys-readout-label">Focus</span>
          <span class="lp-keys-readout-value">{focused()}</span>
        </p>
      </div>
    </div>
  );
}

/* Page -------------------------------------------------------------- */

export default function Home(): JSX.Element {
  useHead(() => [
    { tag: 'title' as const, props: { children: 'Terracotta · Headless UI for SolidJS' } },
    {
      tag: 'meta' as const,
      props: {
        name: 'description',
        content:
          'Terracotta is a headless UI library for SolidJS: behaviour, keyboard handling and ARIA wiring, with no styles of its own.',
      },
    },
  ]);

  const { setTheme, theme } = useTheme();
  const reveal = useReveal();
  const [armed, setArmed] = createSignal(false);
  createEffect(
    () => true,
    () => {
      if (!isServer) {
        setArmed(true);
      }
    },
  );

  const components = sections.find((section) => section.title === 'Components')?.entries ?? [];

  return (
    <div class="lp" data-armed={armed() ? '' : undefined}>
      {/* Hero */}
      <section class="lp-hero">
        <div class="lp-hero-glow" aria-hidden="true" />
        <div class="lp-hero-copy">
          <p class="lp-eyebrow">
            <span class="lp-eyebrow-dot" aria-hidden="true" />
            Terracotta 2 for Solid 2 · release candidate
          </p>
          <h1 class="lp-title">
            <span class="lp-title-line">
              <span>Behaviour,</span>
            </span>
            <span class="lp-title-line">
              <span>
                not <em class="lp-title-em">decoration.</em>
              </span>
            </span>
          </h1>
          <p class="lp-lede">
            Accessible components for SolidJS that ship state, keyboard handling and ARIA wiring,
            and not a single pixel of style. What they are doing lands on the DOM as{' '}
            <code>tc-</code> attributes. What they look like is up to you.
          </p>
          <div class="lp-actions">
            <a class="lp-button lp-button-primary" href="/guides/getting-started">
              Get started
              <span class="lp-button-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a class="lp-button" href="#components">
              {components.length} components
            </a>
          </div>
          <InstallChip />
        </div>

        <div class="lp-hero-stage">
          <Specimen />
        </div>
      </section>

      {/* Ribbon */}
      <div class="lp-ribbon" aria-hidden="true">
        <div class="lp-ribbon-track">
          <For each={[0, 1]}>
            {() => (
              <span class="lp-ribbon-run">
                <For each={RIBBON}>{(token) => <span class="lp-ribbon-token">{token}</span>}</For>
              </span>
            )}
          </For>
        </div>
      </div>

      {/* State */}
      <section class="lp-section" ref={reveal}>
        <header class="lp-section-head">
          <p class="lp-kicker">01 · State</p>
          <h2 class="lp-heading">State lands in the DOM, where CSS can read it.</h2>
          <p class="lp-body">
            Terracotta never adds a class. It writes ARIA for assistive technology and a{' '}
            <code>tc-</code> attribute for your stylesheet, then gets out of the way. Use the
            controls on the left and watch the elements panel.
          </p>
        </header>
        <Inspector />
        <pre class="lp-css" aria-label="The CSS that styles the switch">
          <code>
            <span class="lp-tok-sel">.switch</span>
            <span class="lp-tok-attrsel">[tc-checked]</span>{' '}
            <span class="lp-tok-sel">.switch-knob</span> {'{'}
            {'\n  '}
            <span class="lp-tok-prop">translate</span>: 0.95rem 0;
            {'\n}'}
          </code>
        </pre>
      </section>

      {/* Keyboard */}
      <section class="lp-section lp-section-split" ref={reveal}>
        <header class="lp-section-head">
          <p class="lp-kicker">02 · Keyboard</p>
          <h2 class="lp-heading">Every key the pattern calls for, already wired.</h2>
          <p class="lp-body">
            Each component follows its{' '}
            <a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA Authoring Practices</a>{' '}
            pattern: roving focus, type-ahead, Home and End, focus traps and focus return. Tab into
            the tree and drive it without a mouse.
          </p>
        </header>
        <Keyboard />
      </section>

      {/* Themes */}
      <section class="lp-section" ref={reveal}>
        <header class="lp-section-head">
          <p class="lp-kicker">03 · Style</p>
          <h2 class="lp-heading">{THEME_COUNT} design systems. Not one line of markup changed.</h2>
          <p class="lp-body">
            This site is built from Terracotta, and every theme below is only a stylesheet. Pick one
            and the whole page, the demos included, changes with it.
          </p>
        </header>
        <RadioGroup<string>
          class="lp-themes"
          value={theme()}
          onChange={(value) => {
            if (value) {
              setTheme(value);
            }
          }}
        >
          <RadioGroupLabel class="visually-hidden">Site theme</RadioGroupLabel>
          <For each={THEMES}>
            {(entry, index) => (
              <RadioGroupOption class="lp-theme" value={entry.id}>
                <span class={`lp-theme-swatch theme-swatch-${entry.id}`} aria-hidden="true" />
                <span class="lp-theme-index" aria-hidden="true">
                  {String(index() + 1).padStart(2, '0')}
                </span>
                <RadioGroupLabel class="lp-theme-name">{entry.name}</RadioGroupLabel>
                <span class="lp-theme-blurb">{entry.blurb}</span>
              </RadioGroupOption>
            )}
          </For>
        </RadioGroup>
      </section>

      {/* Catalogue */}
      <section class="lp-section" id="components" ref={reveal}>
        <header class="lp-section-head">
          <p class="lp-kicker">04 · Catalogue</p>
          <h2 class="lp-heading">{components.length} components, from a button to a tree grid.</h2>
        </header>
        <ul class="lp-catalogue">
          <For each={components}>
            {(entry, index) => (
              <li class="lp-catalogue-item" style={{ '--i': index() }}>
                <a class="lp-catalogue-link" href={`/${entry.slug}`}>
                  <span class="lp-catalogue-index" aria-hidden="true">
                    {String(index() + 1).padStart(2, '0')}
                  </span>
                  <span class="lp-catalogue-name">{entry.title}</span>
                  <span class="lp-catalogue-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            )}
          </For>
        </ul>
      </section>

      {/* Close */}
      <section class="lp-close" ref={reveal}>
        <h2 class="lp-close-title">Bring your own pixels.</h2>
        <InstallChip large />
        <div class="lp-close-links">
          <a href="/guides/getting-started">Read the guides</a>
          <a href={REPO} rel="noreferrer">
            GitHub
          </a>
          <a href="/guides/getting-started#the-claude-code-plugin">Claude Code plugin</a>
          <a href={`${REPO}/tree/1.x`} rel="noreferrer">
            Terracotta 1.x for Solid 1
          </a>
        </div>
        <p class="lp-close-note">MIT licensed. Built with Terracotta, styled by you.</p>
      </section>
    </div>
  );
}
