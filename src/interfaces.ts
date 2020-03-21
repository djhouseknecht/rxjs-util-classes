import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

/**
 * Supported key types for maps
 */
export type SupportedKeyTypes = string | number | boolean;

/**
 * Supported `Subject` types for maps
 */
export type SupportedSubjectTypes = typeof BehaviorSubject | typeof ReplaySubject | typeof Subject;

/**
 * Utility type to determine the correct subject type to return based
 *  on {@link SupportedSubjectTypes}
 */
export type SubjectType<S extends SupportedSubjectTypes, V> = S extends typeof BehaviorSubject
  ? BehaviorSubject<V>
  : S extends typeof ReplaySubject ? ReplaySubject<V> : Subject<V>;

/**
 * Utility type to determine which option type to support based
 *  on {@link SupportedSubjectTypes}
 */
export type OptionValue<S extends SupportedSubjectTypes, V> = S extends typeof BehaviorSubject
  ? V
  : S extends typeof ReplaySubject ? number : undefined;
