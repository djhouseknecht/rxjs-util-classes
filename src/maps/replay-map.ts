import { BaseMap } from './base-map';
import { ReplaySubject } from 'rxjs';
import { SupportedKeyTypes } from '../interfaces';

/**
 * Implementation of {@link BaseMap} that uses the `ReplaySubject` based `Observables`
 */
export class ReplayMap<K extends SupportedKeyTypes, V extends any> extends BaseMap<K, V, typeof ReplaySubject> {

  /**
   * Construct a new instance and determine the number of
   *  replays to share with subscribers.
   *
   * @param replayCount number of values to replay
   */
  constructor (replayCount: number) {
    super(ReplaySubject, replayCount);
  }
}
