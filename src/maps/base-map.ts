import { Subject, Observable } from 'rxjs';
import { SupportedSubjectTypes, SubjectType, OptionValue } from 'src/interfaces';

export abstract class BaseMap<K, V, S extends SupportedSubjectTypes = typeof Subject> {
  private __subjectClass: S;
  private __initialOption: V | number | undefined;

  protected _map: Map<K, SubjectType<S, V>> = new Map();

  public size = this._map.size;

  protected constructor (subjectClass: S, initialOption?: OptionValue<S, V>) {
    this.__subjectClass = subjectClass;
    this.__initialOption = initialOption;
  }

  public has (key: K): boolean {
    return this._map.has(key);
  }

  public set (key: K, value: V): this {
    this._getOrInit$(key).next(value);
    return this;
  }

  public clear (): void {
    const iterator = this._map.values();
    for (const value of iterator) {
      value.complete();
    }
    this._map.clear();
  }

  public delete (key: K): boolean {
    if (!this._map.has(key)) {
      return false;
    }
    const value = this._getOrInit$(key);
    value.complete();
    return this._map.delete(key);
  }

  public keys (): IterableIterator<K> {
    return this._map.keys();
  }

  public forEach$ (callbackfn: (value: Observable<V>, key: K) => void): void {
    this._map.forEach((_value, _key) => {
      callbackfn(_value.asObservable(), _key);
    });
  }

  public get$ (key: K): Observable<V> {
    return this._getOrInit$(key).asObservable();
  }

  public * entries$ (): IterableIterator<[K, Observable<V>]> {
    for (const [key, value] of this._map.entries()) {
      yield [key, value.asObservable()];
    }
  }

  public * values$ (): IterableIterator<Observable<V>> {
    for (const value of this._map.values()) {
      yield value.asObservable();
    }
  }

  protected _getOrInit$ (key: K): SubjectType<S, V> {
    if (!this._map.has(key)) {
      this._map.set(key, this.__createSubject());
    }
    return this._map.get(key) as SubjectType<S, V>;
  }

  private __createSubject (): SubjectType<S, V> {
    return new (this.__subjectClass as any)(this.__initialOption);
  }
}
