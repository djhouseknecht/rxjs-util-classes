import { Subject, Observable } from 'rxjs';
import { SupportedSubjectTypes, SubjectType, OptionValue, SupportedKeyTypes } from '../interfaces';

/**
 * BaseMap class used to provide shared functionality for implementing classes.
 */
export abstract class BaseMap<K extends SupportedKeyTypes, V extends any, S extends SupportedSubjectTypes = typeof Subject> {
  /* tslint:disable-next-line */
  private __subjectClass: S;

  /* tslint:disable-next-line */
  private __initialOption: V | number | undefined;

  /**
   * Native JavaScript map that holds the key-values
   */
  protected _map: Map<K, SubjectType<S, V>> = new Map();

  /**
   * Size of the map
   */
  public size: number = this._map.size;

  /**
   * Must be overridden. Takes a {@link SupportedSubjectTypes} and any initial option
   *  - {@link BehaviorMap} initial option is the starting value for the `BehaviorSubject`
   *  - {@link ReplayMap} replay amount for the `ReplaySubject`
   *  - {@link ObservableMap} ignores this value
   *
   * @param subjectClass subject type to use
   * @param initialOption intial option to pass the subject on construction
   * @returns this instance
   *
   */
  protected constructor (subjectClass: S, initialOption?: OptionValue<S, V>) {
    this.__subjectClass = subjectClass;
    this.__initialOption = initialOption;
  }

  /**
   * Check if a key exists on the map
   *
   * @param key to check for
   * @returns check if the key exists
   */
  public has (key: K): boolean {
    return this._map.has(key);
  }

  /**
   * Set a key-value pair. This will create a {@link SupportedSubjectTypes}
   *  (or reuse if key already existed) for the key specified.
   * It will call `.next(value)` on that subject.
   * @param key key to index value
   * @param value value to store
   */
  public set (key: K, value: V): this {
    this._getOrInit$(key).next(value);
    return this;
  }

  /**
   * Emit an error on the key's observable. This
   *  will call `.error(error)` which ends the observable
   *  stream.
   *
   * It then removes the key-value from the map since the
   *  observable has ended.
   *
   * @param key key to emit error on
   * @param error error to emit
   */
  public emitError (key: K, error: any): this {
    this._getOrInit$(key).error(error);
    this._map.delete(key);
    return this;
  }

  /**
   * Will call `.complete()` on all subjects and
   *  clear the map
   */
  public clear (): void {
    const iterator = this._map.values();
    for (const value of iterator) {
      value.complete();
    }
    this._map.clear();
  }

  /**
   * Will call `.complete()` on key's subject and
   *  remove the key from the map.
   *
   * @param key key to remove
   */
  public delete (key: K): boolean {
    if (!this._map.has(key)) {
      return false;
    }
    const value = this._getOrInit$(key);
    value.complete();
    return this._map.delete(key);
  }

  /**
   * Get the map's keys
   */
  public keys (): IterableIterator<K> {
    return this._map.keys();
  }

  /**
   * Will call the function for each observable-key value in the map.
   *
   * @param callbackfn function to execute on the maps key-value
   */
  public forEach$ (callbackfn: (value: Observable<V>, key: K) => void): void {
    this._map.forEach((_value, _key) => {
      callbackfn(_value.asObservable(), _key);
    });
  }

  /**
   * Get the observable for the specified key.
   *
   * @param key key to retrieve
   */
  public get$ (key: K): Observable<V> {
    return this._getOrInit$(key).asObservable();
  }

  /**
   * Get the map's entries as key-observable
   */
  public * entries$ (): IterableIterator<[K, Observable<V>]> {
    for (const [key, value] of this._map.entries()) {
      yield [key, value.asObservable()];
    }
  }

  /**
   * Get the map's ovservable values
   */
  public * values$ (): IterableIterator<Observable<V>> {
    for (const value of this._map.values()) {
      yield value.asObservable();
    }
  }

  /**
   * Get (or create) subject for a specified key
   *
   * @param key key's subject to return
   *
   */
  protected _getOrInit$ (key: K): SubjectType<S, V> {
    if (!this._map.has(key)) {
      this._map.set(key, this.__createSubject());
    }
    return this._map.get(key) as SubjectType<S, V>;
  }

  /**
   * Method to create a subject based on the instance's
   *  __subjectClass and __initialOption (passed in on construction)
   */
  private __createSubject (): SubjectType<S, V> {
    return new (this.__subjectClass as any)(this.__initialOption);
  }
}
