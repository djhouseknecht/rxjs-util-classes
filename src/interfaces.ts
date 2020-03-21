import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export type SupportedSubjectTypes = typeof BehaviorSubject | typeof ReplaySubject | typeof Subject;

export type SubjectType<S, V> = S extends typeof BehaviorSubject
  ? BehaviorSubject<V>
  : S extends typeof ReplaySubject ? ReplaySubject<V> : Subject<V>;

export type OptionValue<S extends SupportedSubjectTypes, V> = S extends typeof BehaviorSubject
  ? V
  : S extends typeof ReplaySubject ? number : undefined;
