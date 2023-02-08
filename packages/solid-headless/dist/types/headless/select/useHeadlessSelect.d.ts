import { HeadlessSelectProperties } from './useHeadlessSelectProperties';
import { HeadlessSelectMultipleOptions } from './useHeadlessSelectMultiple';
import { HeadlessSelectSingleOptions } from './useHeadlessSelectSingle';
export type HeadlessSelectOptions<T> = HeadlessSelectSingleOptions<T> | HeadlessSelectMultipleOptions<T>;
export declare function useHeadlessSelect<T>(options: HeadlessSelectOptions<T>): HeadlessSelectProperties<T>;
