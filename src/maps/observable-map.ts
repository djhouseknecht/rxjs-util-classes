import { BaseMap } from './base-map';
import { Subject } from 'rxjs';
import { SupportedKeyTypes } from 'src/interfaces';

/**
 * Implementation of {@link BaseMap} that uses standard `Subject` based `Observables`
 */
export class ObservableMap<K extends SupportedKeyTypes, V extends any> extends BaseMap<K, V> {

  /**
   * Construct a new instance
   */
  constructor () {
    super(Subject);
  }
}
