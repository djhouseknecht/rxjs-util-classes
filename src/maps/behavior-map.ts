import { BaseMap } from "./base-map";
import { BehaviorSubject } from "rxjs";

export class BehaviorMap<K, V> extends BaseMap<K, V, typeof BehaviorSubject> {
  constructor (initialValue: V) {
    super(BehaviorSubject, initialValue);
  }

  public get (key: K): V {
    return this._getOrInit$(key).getValue();
  }

  public forEach (callbackfn: (value: V, key: K) => void): void {
    this._map.forEach((_value, _key) => {
      callbackfn(_value.getValue(), _key);
    });
  }

  public *values (): IterableIterator<V> {
    for (const value of this._map.values()) {
      yield value.getValue();
    }
  }

  public *entries (): IterableIterator<[K, V]> {
    for (const [key, value] of this._map.entries()) {
      yield [key, value.getValue()];
    }
  }
}
