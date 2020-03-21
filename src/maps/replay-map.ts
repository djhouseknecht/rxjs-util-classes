import { BaseMap } from "./base-map";
import { ReplaySubject } from "rxjs";

export class ReplayMap<K, V> extends BaseMap<K, V, typeof ReplaySubject> {
  constructor (replayCount: number) {
    super(ReplaySubject, replayCount);
  }
}
