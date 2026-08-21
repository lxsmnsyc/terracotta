import type { JSX } from 'solid-js';
import {
  createComponent,
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  untrack,
  useContext,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { TransitionHooks, TransitionStates } from '../../states/create-transition-state';
import { TransitionState } from '../../states/create-transition-state';
import assert from '../../utils/assert';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';

export interface TransitionRootBaseProps {
  show: boolean;
}

const TransitionRootContext = createContext<TransitionRootBaseProps>();
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

export type TransitionChildProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<
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
export function TransitionChild<T extends ValidConstructor = 'div'>(
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
    onTransition(value) {
      props.onTransition?.(value);
      setCurrent(value);
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

  createEffect(() => {
    state.setClasses({
      enter: getClassList(props.enter),
      enterFrom: getClassList(props.enterFrom),
      enterTo: getClassList(props.enterTo),
      entered: getClassList(props.entered),
      leave: getClassList(props.leave),
      leaveFrom: getClassList(props.leaveFrom),
      leaveTo: getClassList(props.leaveTo),
    });
  });

  if (parent) {
    parent.register(state);

    onCleanup(() => {
      parent.unregister(state);
    });

    createEffect(
      on(
        () => root.show && parent.visible(),
        (flag) => {
          if (flag) {
            setVisible(true);
          }
        },
      ),
    );
    createEffect(
      on(internalRef, (element) => {
        if (element instanceof HTMLElement) {
          state.setElement(element);
        }
      }),
    );
  } else {
    createEffect(
      on(
        () => root.show,
        (flag) => {
          if (flag) {
            setVisible(true);
          }
        },
      ),
    );
  }

  createEffect(
    on([internalRef, () => root.show], ([element, flag]) => {
      if (element instanceof HTMLElement) {
        state.setElement(element);

        if (flag) {
          state.show().catch(ignoreTransitionError);
        } else {
          state.hide().catch(ignoreTransitionError);
        }
      }
    }),
  );

  return createComponent(TransitionStateContext.Provider, {
    value: { value: state },
    get children() {
      return createUnmountable(props, visible, () =>
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
              'onTransition',
              'ref',
            ]),
            {
              ref: setInternalRef,
              get 'tc-transition'() {
                return current();
              },
              get inert() {
                return isInert();
              },
            },
          ) as DynamicProps<T>,
        ),
      );
    },
  });
}

export type TransitionProps<T extends ValidConstructor = 'div'> = Prettify<
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
export function Transition<T extends ValidConstructor = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  return createComponent(TransitionRootContext.Provider, {
    value: props,
    get children() {
      return createComponent(TransitionStateContext.Provider, {
        value: { value: undefined },
        get children() {
          return createComponent(
            TransitionChild,
            omitProps(props, ['show']) as TransitionChildProps<T>,
          );
        },
      });
    },
  });
}
