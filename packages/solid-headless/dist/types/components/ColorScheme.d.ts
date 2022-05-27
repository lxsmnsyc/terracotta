import { JSX } from 'solid-js/jsx-runtime';
export declare type NativeColorScheme = 'light' | 'dark';
export declare type ColorScheme = NativeColorScheme | 'system';
export interface ColorSchemeProviderProps {
    initialValue?: ColorScheme;
    value?: ColorScheme;
    onChange?: (scheme: ColorScheme) => void;
    children?: JSX.Element;
}
export declare function ColorSchemeProvider(props: ColorSchemeProviderProps): JSX.Element;
export declare function useColorScheme(): [() => ColorScheme, (newScheme: ColorScheme) => void];
export declare function useNativeColorScheme(): () => NativeColorScheme;
export declare function usePreferredColorScheme(): () => NativeColorScheme;
