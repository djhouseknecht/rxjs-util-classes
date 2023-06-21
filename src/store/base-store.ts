import { BehaviorSubject, Observable } from 'rxjs';

export type WithPreviousState<T extends { [key: string]: any }> = T & { __previousState: T };

/**
 * BaseStore class to manage state in a unified location
 */
export abstract class BaseStore<T extends { [key: string]: any }> {
  /* tslint:disable-next-line */
  private __state: BehaviorSubject<WithPreviousState<T>>;

  /* tslint:disable-next-line */
  private __hasDestroyed: boolean = false;

  /**
   * Must be overridden. Takes in an initial state.
   *
   * @param initialState state to start store with
   */
  protected constructor (initialState: T) {
    this.__state = new BehaviorSubject({ ...initialState, __previousState: initialState });
  }

  /**
   * Get the state as an observable
   */
  public getState$ (): Observable<WithPreviousState<T>> {
    return this.__state.asObservable();
  }

  /**
   * Get the state synchonously
   */
  public getState (): WithPreviousState<T> {
    return this.__state.getValue();
  }

  /**
   * Destory the state and call `.complete()` on
   *  the state's underlying observable
   *
   * _NOTE: once this is called, the store cannot_
   *  _be reused_
   */
  public destroy (): void {
    this.__state.complete();
    this.__hasDestroyed = true;
  }

  /**
   * Check to see if the store has been destroyed.
   *  If it has been, it can no longer be used.
   */
  public hasDestroyed (): boolean {
    return this.__hasDestroyed;
  }

  /**
   * Change part of the state to the passed in value.
   *
   * This will create a shallow copy of the current state
   *  and set all properties of the new passed in state
   *  using the spread operator.
   *
   * Throws an error if called when the store has already
   *  been destroyed (using `.destroy()`).
   *
   * @param state partial state to change
   */
  protected dispatch (state: Partial<T>): void {
    if (this.__hasDestroyed) {
      throw new Error('Cannot dispatch for BaseState objects that have already destroyed');
    }
    const currentState = this.__state.getValue();
    delete (currentState as any).__previousState;
    this.__state.next({ ...currentState, ...state, __previousState: currentState });
  }

  /**
   * @deprecated use `dispatch` instead
   */
  protected _dispatch (state: Partial<T>): void {
    this.dispatch(state);
  }

}
