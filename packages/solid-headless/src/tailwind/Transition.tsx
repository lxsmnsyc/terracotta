import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createSignal,
  Show,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  HeadlessTransitionChild,
  HeadlessTransitionChildProps,
  HeadlessTransitionConsumer,
  HeadlessTransitionRoot,
  TransitionStates,
} from '../headless/Transition';
import { excludeProps } from '../utils/exclude-props';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';

interface TailwindTransitionContext {
  baseEnter: number;
  register: (duration: number) => void;
}

const TailwindTransitionContext = createContext<TailwindTransitionContext>();

interface Styles {
  class?: string;
  className?: string;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

function applyStyle(state: TransitionStates, style: Styles): string {
  const enter = style.enter ?? '';
  const leave = style.leave ?? '';
  const className = style.className ?? style.class ?? '';
  switch (state) {
    case 'before-enter':
      return `${className} ${enter} ${style.enterFrom ?? ''}`;
    case 'during-enter':
    case 'after-enter':
      return `${className} ${enter} ${style.enterTo ?? ''}`;
    case 'before-leave':
      return `${className} ${leave} ${style.leaveFrom ?? ''}`;
    case 'during-leave':
    case 'after-leave':
      return `${className} ${leave} ${style.leaveTo ?? ''}`;
    default:
      return className;
  }
}

export type TailwindTransitionChildProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  enterDuration?: number;
  leaveDuration?: number;
} & Omit<DynamicProps<T>, keyof HeadlessTransitionChildProps | keyof Styles>
  & Omit<HeadlessTransitionChildProps, 'duration'>
  & Styles;

export function TailwindTransitionChild<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionChildProps<T>,
): JSX.Element {
  const context = useContext(TailwindTransitionContext);

  const [baseLeave, setBaseLeave] = createSignal(0);

  function register(duration: number) {
    if (baseLeave() < duration) {
      setBaseLeave(duration);
    }
  }

  return (
    <TailwindTransitionContext.Provider
      value={{
        baseEnter: props.enterDuration ?? 0,
        register,
      }}
    >
      <HeadlessTransitionChild
        appear={props.appear}
        show={props.show}
        duration={{
          enter: {
            before: props.unmount ? 0 : context?.baseEnter,
            during: props.enterDuration,
          },
          leave: {
            before: baseLeave(),
            after: props.leaveDuration,
          },
        }}
      >
        {(data) => (
          <>
            {
              (() => {
                const constructor = (props.as ?? 'div') as T;
                const unmount = props.unmount ?? true;
                if (unmount) {
                  return (
                    <Show when={data() !== 'after-leave'}>
                      <Dynamic
                        component={constructor}
                        {...excludeProps(props, [
                          'as',
                          'enter',
                          'enterFrom',
                          'enterTo',
                          'leave',
                          'leaveFrom',
                          'leaveTo',
                          'unmount',
                          'show',
                        ])}
                        class={applyStyle(data(), props)}
                      >
                        <HeadlessTransitionConsumer>
                          {props.children}
                        </HeadlessTransitionConsumer>
                      </Dynamic>
                    </Show>
                  );
                }
                return (
                  <Dynamic
                    component={constructor}
                    {...excludeProps(props, [
                      'as',
                      'enter',
                      'enterFrom',
                      'enterTo',
                      'leave',
                      'leaveFrom',
                      'leaveTo',
                      'unmount',
                    ])}
                    class={applyStyle(data(), props)}
                    style={{
                      visibility: data() === 'after-leave' ? 'hidden' : 'visible',
                    }}
                  >
                    <HeadlessTransitionConsumer>
                      {props.children}
                    </HeadlessTransitionConsumer>
                  </Dynamic>
                );
              })()
            }
          </>
        )}
      </HeadlessTransitionChild>
    </TailwindTransitionContext.Provider>
  );
}

export type TailwindTransitionProps<T extends ValidConstructor = 'div'> = {
  enterDuration?: number;
  leaveDuration?: number;
} & Omit<TailwindTransitionChildProps<T>, 'duration'>;

export function TailwindTransition<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionProps<T>,
): JSX.Element {
  return (
    <HeadlessTransitionRoot
      appear={props.appear}
      show={props.show}
      duration={{
        enter: {
          during: props.enterDuration,
        },
        leave: {
          after: props.leaveDuration,
        },
      }}
    >
      <TailwindTransitionChild {...props} />
    </HeadlessTransitionRoot>
  );
}
