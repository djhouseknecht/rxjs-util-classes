import { BaseMap } from './base-map';
import { Subject } from 'rxjs';

export class ObservableMap<K, V> extends BaseMap<K, V> {
  constructor () {
    super(Subject);
  }
}
