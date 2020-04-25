import { BaseMap } from './base-map';
import { BehaviorSubject } from 'rxjs';
import { SupportedKeyTypes } from '../interfaces';

/**
 * Implementation of {@link BaseMap} that uses the `BehaviorSubject` based `Observables`
 */
export class BehaviorMap<K extends SupportedKeyTypes, V extends any> extends BaseMap<K, V, typeof BehaviorSubject> {

  /**
   * Construct a new instance and determin the initial value to
   *  emit on the observables.
   *
   * @param initialValue value to emit first on the observables
   */
  constructor (initialValue: V) {
    super(BehaviorSubject, initialValue);
  }

  /**
   * Get a key's value synchronously
   * @param key key of value to get
   */
  public get (key: K): V {
    return this._getOrInit$(key).getValue();
  }

  /**
   * Will call the function for each synchronous value-key value in the map.
   *
   * @param callbackfn function to execute on the maps key-value
   */
  public forEach (callbackfn: (value: V, key: K) => void): void {
    this._map.forEach((_value, _key) => {
      callbackfn(_value.getValue(), _key);
    });
  }

  /**
   * Get the map's ovservable values synchronously
   */
  public * values (): IterableIterator<V> {
    for (const value of this._map.values()) {
      yield value.getValue();
    }
  }

  /**
   * Get the map's entries as key-value synchronously
   */
  public * entries (): IterableIterator<[K, V]> {
    for (const [key, value] of this._map.entries()) {
      yield [key, value.getValue()];
    }
  }
}
