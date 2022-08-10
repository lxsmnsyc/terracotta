import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessAutocompleteOptionContext,
  HeadlessAutocompleteOptionProperties,
  useHeadlessAutocompleteOption,
  useHeadlessAutocompleteOptionProperties,
} from './useHeadlessAutocompleteOption';

export type HeadlessAutocompleteOptionRenderProp = (
  (properties: HeadlessAutocompleteOptionProperties) => JSX.Element
);

function isHeadlessAutocompleteOptionRenderProp(
  children: JSX.Element | HeadlessAutocompleteOptionRenderProp,
): children is HeadlessAutocompleteOptionRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessAutocompleteOptionProps {
  value: string;
  disabled?: boolean,
  children?: JSX.Element | HeadlessAutocompleteOptionRenderProp;
}

export function HeadlessAutocompleteOption(
  props: HeadlessAutocompleteOptionProps,
): JSX.Element {
  const properties = useHeadlessAutocompleteOption(
    () => props.value,
    () => !!props.disabled,
  );
  return (
    createComponent(HeadlessAutocompleteOptionContext.Provider, {
      value: properties,
      get children() {
        return createMemo(() => {
          const body = props.children;
          if (isHeadlessAutocompleteOptionRenderProp(body)) {
            return body(properties);
          }
          return body;
        });
      },
    })
  );
}

export function createHeadlessAutocompleteOptionProps(
  props: HeadlessAutocompleteOptionProps,
): { children?: JSX.Element | HeadlessAutocompleteOptionRenderProp } {
  return {
    get children() {
      return createComponent(HeadlessAutocompleteOption, {
        get value() {
          return props.value;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        },
      });
    },
  };
}

export interface HeadlessAutocompleteOptionChildProps {
  children?: JSX.Element | HeadlessAutocompleteOptionRenderProp;
}

export function HeadlessAutocompleteOptionChild(
  props: HeadlessAutocompleteOptionChildProps,
): JSX.Element {
  const properties = useHeadlessAutocompleteOptionProperties();
  return createMemo(() => {
    const body = props.children;
    if (isHeadlessAutocompleteOptionRenderProp(body)) {
      return body(properties);
    }
    return body;
  });
}

export function createHeadlessAutocompleteOptionChildProps(
  props: HeadlessAutocompleteOptionChildProps,
): HeadlessAutocompleteOptionChildProps {
  return {
    get children() {
      return createComponent(HeadlessAutocompleteOptionChild, {
        get children() {
          return props.children;
        },
      });
    },
  };
}
