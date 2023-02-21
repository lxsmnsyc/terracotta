import {
  Accessor,
  createComponent,
  createContext,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import assert from '../../utils/assert';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createUnmountable } from '../../utils/Unmountable';

interface TransitionRootContext {
  show: boolean;
}

interface ChildTransitionContext {
  // set: Set<HTMLElement>;
  set: {
    add: (el: HTMLElement) => void;
    delete: (el: HTMLElement) => void;
  }
  done: Accessor<boolean>;
}

const TransitionRootContext = createContext<TransitionRootContext>();
const ChildTransitionContext = createContext<ChildTransitionContext>();

function useTransitionRootContext(componentName: string): TransitionRootContext {
  const context = useContext(TransitionRootContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Transition>`));
  return context;
}

function initChildContextValue(): ChildTransitionContext {
  // Set of currently transitioning TransitionChilds nested within a TransitionChild
  const transitionSet = new Set<HTMLElement>();
  const [done, setDone] = createSignal(true);

  const dirty = () => setDone(transitionSet.size === 0);

  return {
    // Reactive set
    set: {
      add(el) {
        transitionSet.add(el);
        dirty();
      },
      delete(el) {
        transitionSet.delete(el);
        dirty();
      },
    },
    done,
  };
}

function makeChildWithScope(
  ctx: ChildTransitionContext,
  child: () => JSX.Element,
): JSX.Element {
  return createComponent(ChildTransitionContext.Provider, {
    value: ctx,
    children: child,
  });
}

function useChildContext(): ChildTransitionContext {
  const context = useContext(ChildTransitionContext);

  if (context) {
    return context;
  } else {
    // return empty context value
    return {
      set: {
        add: () => {},
        delete: () => {},
      },
      done: () => true,
    }
  }
}

interface TransitionBaseChildProps {
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
}

function getClassList(classes?: string): string[] {
  return classes ? classes.split(' ') : [];
}

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
  HeadlessPropsWithRef<T, TransitionBaseChildProps>;

export function TransitionChild<T extends ValidConstructor = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TransitionChild');
  // Transitions pending on parent
  const pendingParent = useChildContext();
  // Transitions pending underneath element
  const pendingChilds = initChildContextValue();
  let isTransitioning = false;

  const [visible, setVisible] = createSignal(values.show);
  const [shouldHide, setShouldHide] = createSignal(false);
  const [ref, setRef] = createSignal<DynamicNode<T>>();

  function transition(element: HTMLElement, shouldEnter: boolean): void {
    if (shouldEnter) {
      if (isTransitioning) return;
      isTransitioning = true;
      const enter = getClassList(props.enter);
      const enterFrom = getClassList(props.enterFrom);
      const enterTo = getClassList(props.enterTo);
      const entered = getClassList(props.entered);

      const endTransition = (ev?: Event) => {
        // Prevent bubbling events from ending transition
        if (ev instanceof Event && ev.currentTarget !== ev.target) return;

        removeClassList(element, enter);
        removeClassList(element, enterTo);
        addClassList(element, entered);
        props.afterEnter?.();
        isTransitioning = false;

        pendingParent.set.delete(element);
        element.removeEventListener('transitionend', endTransition);
        element.removeEventListener('animationend', endTransition);
      };

      props.beforeEnter?.();
      addClassList(element, enter);
      addClassList(element, enterFrom);

      pendingParent.set.add(element);

      if (enterTo.length > 0) {
        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);

          element.addEventListener("transitionend", endTransition);
          element.addEventListener("animationend", endTransition);
        });
      } else {
        queueMicrotask(() => endTransition());
      }
    } else {
      const leave = getClassList(props.leave);
      const leaveFrom = getClassList(props.leaveFrom);
      const leaveTo = getClassList(props.leaveTo);
      const entered = getClassList(props.entered);
      props.beforeLeave?.();
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);

      const endTransition = (ev?: Event) => {
        // Prevent bubbling events from ending transition
        if (ev instanceof Event && ev.currentTarget !== ev.target) return;
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setShouldHide(true);

        pendingParent.set.delete(element);
        element.removeEventListener("transitionend", endTransition);
        element.removeEventListener("animationend", endTransition);
      };

      pendingParent.set.add(element);

      if (leaveTo.length > 0) {
        requestAnimationFrame(() => {
          removeClassList(element, leaveFrom);
          addClassList(element, leaveTo);
        });

        element.addEventListener("transitionend", endTransition);
        element.addEventListener("animationend", endTransition);
      } else {
        queueMicrotask(() => endTransition());
      }
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
    }
  });

  createEffect(() => {
    if (shouldHide() && pendingChilds.done()) {
      setShouldHide(false);

      const internalRef = ref();
      if (internalRef instanceof HTMLElement) {
        addClassList(internalRef, getClassList(props.enter));
      }

      setVisible(false);

      props.afterLeave?.();
    }
  });

  return makeChildWithScope(
    pendingChilds,
    () => createUnmountable(props, visible, () =>
      createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
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
          ]),
          {
            ref: createRef(props, e => {
              setRef(() => e);
            }),
          }
        ) as DynamicProps<T>
      )
    )
  );
}

export type TransitionProps<T extends ValidConstructor = 'div'> =
  TransitionRootContext & TransitionChildProps<T>;

export function Transition<T extends ValidConstructor = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  const [local, others] = splitProps(props, [
    'show',
  ]);
  return createComponent(TransitionRootContext.Provider, {
    value: local,
    get children() {
      return createComponent(TransitionChild, others);
    },
  });
}
