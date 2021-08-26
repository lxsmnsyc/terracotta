import { JSX } from 'solid-js/jsx-runtime';
import { Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  HeadlessTransitionChildProps,
  HeadlessTransitionRoot,
  TransitionStates,
  useHeadlessTransitionChild,
} from '../headless/Transition';
import { excludeProps, pickProps } from '../utils/exclude-props';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';

interface Styles {
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
  const className = style.className ?? '';
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
} & Omit<DynamicProps<T>, 'children'> & HeadlessTransitionChildProps & Styles;

export function TailwindTransitionChild<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionChildProps<T>,
): JSX.Element {
  const data = useHeadlessTransitionChild(props);

  return (
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
                    'duration',
                  ])}
                  class={applyStyle(data(), props)}
                >
                  {props.children(data)}
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
                'duration',
              ])}
              class={applyStyle(data(), props)}
            >
              {props.children(data)}
            </Dynamic>
          );
        })()
      }
    </>
  );
}

export type TailwindTransitionProps<T extends ValidConstructor = 'div'> =
  TailwindTransitionChildProps<T>;

export function TailwindTransition<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionProps<T>,
): JSX.Element {
  return (
    <HeadlessTransitionRoot
      {...pickProps(props, [
        'appear',
        'show',
        'duration',
      ])}
    >
      <TailwindTransitionChild {...props} />
    </HeadlessTransitionRoot>
  );
}
