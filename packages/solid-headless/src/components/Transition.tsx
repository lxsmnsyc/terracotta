import {
  createContext,
  createEffect,
  createSignal,
  Show,
  useContext,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  excludeProps,
} from '../utils/exclude-props';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';

interface TransitionRootContext {
  show: boolean;
}

const TransitionRootContext = createContext<TransitionRootContext>();

function useTransitionRootContext(componentName: string): TransitionRootContext {
  const context = useContext(TransitionRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Transition>`);
}

export type TransitionBaseChildProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
};

function addClassList(ref: HTMLElement, classes: string[]) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref: HTMLElement, classes: string[]) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}

export type TransitionChildProps<T extends ValidConstructor = 'div'> =
  TransitionBaseChildProps<T>
    & WithRef<T>
    & Omit<DynamicProps<T>, keyof TransitionBaseChildProps<T>>;

export function TransitionChild<T extends ValidConstructor = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TransitionChild');

  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createSignal<DynamicNode<T>>();

  let initial = true;

  console.log('TransitionChild');

  function transition(element: HTMLElement, shouldEnter: boolean): void {
    if (shouldEnter) {
      if (initial) {
        const enter = props.enter?.split(' ') ?? [];
        const enterFrom = props.enterFrom?.split(' ') ?? [];
        const enterTo = props.enterTo?.split(' ') ?? [];
        const entered = props.entered?.split(' ') ?? [];

        const endTransition = () => {
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          props.afterEnter?.();
        };

        props.beforeEnter?.();
        addClassList(element, enter);
        addClassList(element, enterFrom);

        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);
          element.addEventListener('transitionend', endTransition, { once: true });
          element.addEventListener('animationend', endTransition, { once: true });
        });
      }
    } else {
      const leave = props.leave?.split(' ') ?? [];
      const leaveFrom = props.leaveFrom?.split(' ') ?? [];
      const leaveTo = props.leaveTo?.split(' ') ?? [];
      const entered = props.entered?.split(' ') ?? [];
      props.beforeLeave?.();
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        props.afterLeave?.();
      };
      element.addEventListener('transitionend', endTransition, { once: true });
      element.addEventListener('animationend', endTransition, { once: true });
    }
  }

  createEffect(() => {
    const shouldShow = values.show;

    if (shouldShow) {
      setVisible(true);
    }

    const internalRef = ref();
    if (internalRef instanceof HTMLElement) {
      transition(internalRef, shouldShow);
    } else {
      // Ref is missing, reset initial
      initial = true;
    }
  });

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'enter',
            'enterFrom',
            'enterTo',
            'leave',
            'leaveFrom',
            'leaveTo',
            'unmount',
            'afterEnter',
            'afterLeave',
            'appear',
            'beforeEnter',
            'beforeLeave',
            'entered',
            'ref',
          ])}
          ref={createRef(props, (e) => {
            setRef(() => e);
          })}
        >
          {props.children}
        </Dynamic>
      )}
    >
      <Show when={visible()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'enter',
            'enterFrom',
            'enterTo',
            'leave',
            'leaveFrom',
            'leaveTo',
            'unmount',
            'afterEnter',
            'afterLeave',
            'appear',
            'beforeEnter',
            'beforeLeave',
            'entered',
            'ref',
          ])}
          ref={createRef(props, (e) => {
            setRef(() => e);
          })}
        >
          {props.children}
        </Dynamic>
      </Show>
    </Show>
  );
}

export type TransitionProps<T extends ValidConstructor = 'div'> = {
  show: boolean;
  appear?: boolean;
} & TransitionChildProps<T>;

export function Transition<T extends ValidConstructor = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  const excludedProps = excludeProps(props, [
    'show',
  ]);
  return (
    <TransitionRootContext.Provider
      value={{
        get show() {
          return props.show;
        },
      }}
    >
      <TransitionChild
        {...excludedProps}
      />
    </TransitionRootContext.Provider>
  );
}
