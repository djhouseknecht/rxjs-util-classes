import { BaseMap } from '../../src/maps/base-map';
import { SupportedSubjectTypes, SupportedKeyTypes } from '../../src/interfaces';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

class TestableBaseMap<K extends SupportedKeyTypes, V extends any> extends BaseMap<K, V, any> {
  constructor (subject: SupportedSubjectTypes, other?: any) { super(subject, other); }
}

let baseMap: TestableBaseMap<any, any>;

describe('BaseMap', () => {
  beforeEach(() => {
    baseMap = new TestableBaseMap(BehaviorSubject);
  });

  describe('constructor()', () => {
    test('should set class subject and properties', () => {
      const initialDate = { data: 'starting data' };
      const baseMap = new TestableBaseMap(Subject, initialDate);
      expect(baseMap['__subjectClass']).toEqual(Subject);
      expect(baseMap['__initialOption']).toEqual(initialDate);
    });
  });

  describe('has()', () => {
    test('should call return if the value is present on the map', () => {
      const key = 'key';
      baseMap.set(key, 'value');
      expect(baseMap.has(key)).toBe(true);
      expect(baseMap.has('non-key')).toBe(false);
    });
  });

  describe('set()', () => {
    test('should set the value on the map', (done) => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);
      expect(baseMap['_map'].get(obj.key) instanceof BehaviorSubject).toBeTruthy();
      baseMap.get$(obj.key).subscribe(value => {
        expect(value).toBe(obj.value);
        done();
      });
    });
  });

  describe('emitError()', () => {
    test('should emit an error and delete the key', (done) => {
      const obj = { key: 'key', value: 'map-value', error: 'some error' };
      const deleteSpy = jest.spyOn(baseMap['_map'], 'delete');

      baseMap.set(obj.key, obj.value);

      baseMap.get$(obj.key).subscribe(value => {
        expect(value).toBe(obj.value);
      }, async err => {
        expect(err).toEqual(obj.error);
        await new Promise(res => setTimeout(res, 1));
        expect(deleteSpy).toHaveBeenCalled();
        done();
      });

      baseMap.emitError(obj.key, obj.error);
    });
  });

  describe('clear()', () => {
    test('should call complete on all observables and clear the map', () => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      const subject = baseMap['_getOrInit$'](obj.key);
      const completeSpy = jest.spyOn(subject, 'complete');

      baseMap.clear();

      expect(completeSpy).toHaveBeenCalled();
      expect(baseMap['_map'].size).toBe(0);
    });
  });

  describe('delete()', () => {
    test('should return false if the value did not exist', () => {
      expect(baseMap.delete('key')).toBe(false);
    });

    test('should return true if the value was deleted', () => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      const subject = baseMap['_getOrInit$'](obj.key);
      const completeSpy = jest.spyOn(subject, 'complete');

      expect(baseMap.delete(obj.key)).toBe(true);
      expect(completeSpy).toHaveBeenCalled();
      expect(baseMap['_map'].size).toBe(0);
    });
  });

  describe('keys()', () => {
    test('should return the maps keys', () => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);
      expect(baseMap.keys()).toEqual(baseMap['_map'].keys());
    });
  });

  describe('forEach$()', () => {
    test('should use the call back on maps keys', (done) => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      baseMap.forEach$((value, key) => {
        expect(value instanceof Observable).toBeTruthy();
        expect(key).toBe(obj.key);
        value.subscribe(v => {
          expect(v).toBe(obj.value);
          done();
        });
      });
    });
  });

  describe('get$()', () => {
    test('should return the value as an observable', (done) => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      baseMap.get$(obj.key).subscribe(v => {
        expect(v).toBe(obj.value);
        done();
      });
    });
  });

  describe('entries$()', () => {
    test('should return the maps key/values as observables', (done) => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      Array.from(baseMap.entries$()).forEach((entry) => {
        expect(entry[0]).toBe(obj.key);
        expect(entry[1] instanceof Observable).toBeTruthy();
        entry[1].subscribe(v => {
          expect(v).toBe(obj.value);
          done();
        });
      });
    });
  });

  describe('values$()', () => {
    test('should return the maps values as observables', (done) => {
      const obj = { key: 'key', value: 'map-value' };
      baseMap.set(obj.key, obj.value);

      Array.from(baseMap.values$()).forEach((value) => {
        expect(value instanceof Observable).toBeTruthy();
        value.subscribe(v => {
          expect(v).toBe(obj.value);
          done();
        });
      });
    });
  });

  describe('_getOrInit$()', () => {
    test('should create a new observable if the key does not exist', () => {
      const key = 'key';
      const mapSetSpy = jest.spyOn(baseMap['_map'], 'set');
      const createSubjectSpy = jest.spyOn(baseMap, '__createSubject' as any);

      const observable = baseMap['_getOrInit$'](key);

      expect(observable instanceof Subject).toBeTruthy();
      expect(mapSetSpy).toHaveBeenCalledWith(key, expect.any(Object));
      expect(createSubjectSpy).toHaveBeenCalled();
    });

    test('should return the observable if the key already exists', () => {
      const key = 'key';
      baseMap['_map'].set(key, new Subject());

      const mapSetSpy = jest.spyOn(baseMap['_map'], 'set');
      const createSubjectSpy = jest.spyOn(baseMap, '__createSubject' as any);

      const observable = baseMap['_getOrInit$'](key);

      expect(observable instanceof Subject).toBeTruthy();
      expect(mapSetSpy).not.toHaveBeenCalled();
      expect(createSubjectSpy).not.toHaveBeenCalled();
    });
  });

  describe('__createSubject()', () => {
    test('should create a new subjectClass', () => {
      const subjectSpy = baseMap['__subjectClass'] = jest.fn();
      baseMap['__createSubject']();
      expect(subjectSpy).toHaveBeenCalled();
    });
  });
});
