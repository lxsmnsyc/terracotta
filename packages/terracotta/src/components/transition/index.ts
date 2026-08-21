import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { untrack } from '@solidjs/web';
import {
  createComponent,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  merge,
  omit,
  onCleanup,
  useContext,
} from 'solid-js';
import {
  type TransitionHooks,
  TransitionState,
  type TransitionStates,
} from '../../states/create-transition-state';
import assert from '../../utils/assert';
import { createDependencyList } from '../../utils/create-dependency-list';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import { createForwardRef, type HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';
export interface TransitionRootBaseProps {
  show: boolean;
}

const TransitionRootContext = createContext<TransitionRootBaseProps | null>(null);
const TransitionStateContext = createContext<{ value?: TransitionState }>({});

function useTransitionRootContext(componentName: string): TransitionRootBaseProps {
  const context = useContext(TransitionRootContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Transition>`));
  return context;
}

export interface TransitionBaseChildProps extends UnmountableProps, TransitionHooks {
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export type TransitionChildProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  TransitionBaseChildProps
>;

function getClassList(classes?: string): string[] {
  return classes ? classes.split(' ') : [];
}

/**
 * A transition runs detached from the effect that started it, so a hook that
 * throws mid-transition must not take the effect down with it.
 */
function ignoreTransitionError(): void {
  // do nothing
}

/**
 * A {@link Transition} that follows its parent transition instead of its own
 * `show` prop, so several elements can animate together on different timings.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/transition.md}
 */
export function TransitionChild<T extends ValidComponent = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const root = useTransitionRootContext('TransitionChild');
  const parent = useContext(TransitionStateContext).value;

  const [current, setCurrent] = createSignal<TransitionStates>();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [visible, setVisible] = createSignal<boolean>(
    untrack(() => {
      if (props.appear) {
        return root.show;
      }
      return false;
    }),
  );

  // Nested transitions only start once this one has finished entering, and have
  // to be done before this one starts leaving.
  const [ready, setReady] = createSignal(false);

  const state = new TransitionState(ready, {
    onTransition(state) {
      props.onTransition?.(state);
      setCurrent(state);
    },
    beforeEnter() {
      props.beforeEnter?.();
      setReady(false);
    },
    beforeLeave() {
      props.beforeLeave?.();
    },
    afterEnter() {
      props.afterEnter?.();
      setReady(true);
    },
    afterLeave() {
      props.afterLeave?.();
      setVisible(false);
    },
  });

  /**
   * An element on its way out, or one kept mounted by `unmount={false}`, is
   * still in the DOM: without `inert` its content stays clickable and reachable
   * by Tab while it fades away. The enter phases stay interactive so that a
   * panel nested inside can take focus as it opens.
   */
  function isInert(): true | undefined {
    const value = current();
    if (value === undefined) {
      // Nothing has transitioned yet, so the only element on screen is one that
      // `unmount={false}` mounted while hidden.
      return root.show ? undefined : true;
    }
    return value === 'leave-from' || value === 'leave-to' ? true : undefined;
  }

  createEffect(
    createDependencyList(() => [
      props.enter,
      props.enterFrom,
      props.enterTo,
      props.entered,
      props.leave,
      props.leaveFrom,
      props.leaveTo,
    ]),
    ([enter, enterFrom, enterTo, entered, leave, leaveFrom, leaveTo]) => {
      state.setClasses({
        enter: getClassList(enter),
        enterFrom: getClassList(enterFrom),
        enterTo: getClassList(enterTo),
        entered: getClassList(entered),
        leave: getClassList(leave),
        leaveFrom: getClassList(leaveFrom),
        leaveTo: getClassList(leaveTo),
      });
    },
  );

  if (parent) {
    parent.register(state);

    onCleanup(() => {
      parent.unregister(state);
    });
    createEffect(
      () => root.show && parent.visible(),
      (flag) => {
        if (flag) {
          setVisible(true);
        }
      },
    );
    createEffect(internalRef, (element) => {
      if (element instanceof HTMLElement && element.isConnected) {
        state.setElement(element);
      }
    });
  } else {
    createEffect(
      () => root.show,
      (flag) => {
        if (flag) {
          setVisible(true);
        }
      },
    );
  }

  createEffect(
    createDependencyList(() => [internalRef(), root.show]),
    ([element, flag]) => {
      // `unmount` throws the element away and builds a new one, and the ref
      // still holds the old one when `show` flips back to true. Transitioning
      // that detached element would put the classes somewhere invisible and
      // leave the element that actually mounts unanimated, so wait for the ref
      // to catch up.
      if (element instanceof HTMLElement && element.isConnected) {
        state.setElement(element);

        if (flag) {
          state.show().catch(ignoreTransitionError);
        } else {
          state.hide().catch(ignoreTransitionError);
        }
      }
    },
  );

  const id = createUniqueId();

  return createComponent(TransitionStateContext, {
    value: { value: state },
    get children() {
      return createUnmountable(props, visible, () =>
        createDynamic(
          () => props.as || ('div' as T),
          merge(
            {
              id,
            },
            omit(
              props,
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
              'onTransition',
              'ref',
            ),
            {
              ref: setInternalRef,
              get 'tc-transition'() {
                return current();
              },
              get inert() {
                return isInert();
              },
            },
          ) as ComponentProps<T>,
        ),
      );
    },
  });
}

export type TransitionProps<T extends ValidComponent = 'div'> = Prettify<
  TransitionRootBaseProps & TransitionChildProps<T>
>;

/**
 * Applies enter and leave classes around a `show` prop, and keeps its children
 * mounted until the leave transition finishes. It only adds and removes
 * classes; the animation itself is yours to write.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/transition.md}
 */
export function Transition<T extends ValidComponent = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  return createComponent(TransitionRootContext, {
    value: props,
    get children() {
      return createComponent(TransitionStateContext, {
        value: { value: undefined },
        get children() {
          return createComponent(
            TransitionChild,
            omit(props, 'show') as unknown as TransitionChildProps<T>,
          );
        },
      });
    },
  });
}
