import { BaseStore } from '../../src/store/base-store';

interface ITestStore {
  user: string;
  isLoading: boolean;
}

class TestableBaseStore extends BaseStore<ITestStore> {
  constructor (initialState: ITestStore) { super(initialState); }
}

let store: TestableBaseStore;
const USER: string = 'john-doe';
const initialState: ITestStore = {
  user: USER,
  isLoading: false
};

describe('BaseStore', () => {
  beforeEach(() => {
    store = new TestableBaseStore(initialState);
  });

  describe('constructor()', () => {
    test('should initialize state', () => {
      expect(store['__state'].getValue()).toEqual(initialState);
    });
  });

  describe('getState$()', () => {
    test('should subscribe to the state', (done) => {
      store.getState$().subscribe(state => {
        expect(state).toEqual(initialState);
        done();
      });
    });
  });

  describe('getState()', () => {
    test('should retrieve the most recent stat', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe('_dispatch()', () => {
    test('should throw an error if store has already been destroyed', () => {
      store['__hasDestroyed'] = true;
      expect(() => store['_dispatch']({})).toThrow(/Cannot dispatch/);
    });

    test('should change to the new state', () => {
      const newUser = 'jim-bobby';

      store['_dispatch']({ isLoading: true });
      expect(store.getState()).toEqual({ user: USER, isLoading: true });

      store['_dispatch']({ user: newUser });
      expect(store.getState()).toEqual({ user: newUser, isLoading: true });
    });
  });

  describe('destroy()', () => {
    test('should complete the state observable and set __hasDestroyed', () => {
      const completeSpy = jest.spyOn(store['__state'], 'complete');

      expect(store['__hasDestroyed']).toBe(false);

      store.destroy();

      expect(completeSpy).toHaveBeenCalled();
      expect(store['__hasDestroyed']).toBe(true);
    });
  });

  describe('hasDestroyed()', () => {
    test('should return if the store has been destroyed', () => {
      expect(store.hasDestroyed()).toBe(false);
      store['__hasDestroyed'] = true;
      expect(store.hasDestroyed()).toBe(true);
    });
  });
});