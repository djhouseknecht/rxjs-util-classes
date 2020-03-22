[rxjs-util-classes](README.md) › [Globals](globals.md)

# rxjs-util-classes

[![Build Status](https://travis-ci.org/djhouseknecht/rxjs-util-classes.svg?branch=master)](https://travis-ci.org/djhouseknecht/rxjs-util-classes)  [![codecov](https://codecov.io/gh/djhouseknecht/rxjs-util-classes/branch/master/graph/badge.svg)](https://codecov.io/gh/djhouseknecht/rxjs-util-classes)  [![npm version](https://badge.fury.io/js/rxjs-util-classes.svg)](https://badge.fury.io/js/rxjs-util-classes)  [![dependabot-status](https://flat.badgen.net/dependabot/djhouseknecht/rxjs-util-classes/?icon=dependabot)][dependabot]  [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 

# RxJS-Util-Classes

Simple RxJS implementations for common classes used across many different types of projects. Implementations include: redux-like store (for dynamic state management), rxjs maps, rxjs lists (useful for caching), and rxjs event emitters.

#### Index

* [Observable Maps] - Basic JavaScript [Map] wrapper to allow use of observables. 
* [Future Features] - Features coming soon

-----------------

## Observable Maps

This is a wrapper around the native JavaScript [Map] except it returns observables. There are three main map types: 

* [ObservableMap] - uses RxJS [Subject]
* [BehaviorMap] - uses RxJS [BehaviorSubject]
* [ReplayMap] - uses RxJS [ReplaySubject]

> See the [Maps API](docs/api/modules/_index_.md) and [Important Notes about ObservableMaps] for additional information

### ObservableMap

Uses the standard RxJS Subject so subscribers will only receive values emitted _after_ they subscribe. ([Full API](docs/api/classes/_maps_observable_map_.observablemap.md))

``` ts
import { ObservableMap } from 'rxjs-util-classes';

const observableMap = new ObservableMap<string, string>();

observableMap.set('my-key', 'this value will not be received');

observableMap.get$('my-key').subscribe(
  value => console.log('Value: ' + value),
  error => console.log('Error: ' + error),
  () => console.log('complete')
);

// `.set()` will emit the value to all subscribers
observableMap.set('my-key', 'first-data');
observableMap.set('my-key', 'second-data');

// delete calls `.complete()` to clean up 
// the observable
observableMap.delete('my-key');

// OUTPUT:
// Value: first-data
// Value: second-data
// complete
```

### BehaviorMap

Uses the RxJS BehaviorSubject so subscribers will _always_ receive the last emitted value. This class _requires_ an initial value to construct all underlying BehaviorSubjects. ([Full API](docs/api/classes/_maps_behavior_map_.behaviormap.md))

``` ts
import { BehaviorMap } from 'rxjs-util-classes';

const behaviorMap = new BehaviorMap<string, string>('initial-data');

behaviorMap.get$('my-key').subscribe(
  value => console.log('Value: ' + value),
  error => console.log('Error: ' + error),
  () => console.log('complete')
);

behaviorMap.set('my-key', 'first-data');
behaviorMap.set('my-key', 'second-data');

// emitError calls `.error()` which ends the observable stream
//  it will also remove the mey-value from the map
behaviorMap.emitError('my-key', 'there was an error!');

// OUTPUT:
// Value: initial-data
// Value: first-data
// Value: second-data
// Error: there was an error!
```

### ReplayMap

Uses the RxJS ReplaySubject so subscribers will receive the last `nth` emitted values. This class _requires_ an initial replay number to construct all underlying ReplaySubject. ([Full API](docs/api/classes/_maps_replay_map_.replaymap.md))

``` ts
import { ReplayMap } from 'rxjs-util-classes';

const replayMap = new ReplayMap<string, string>(2);

replayMap.set('my-key', 'first-data');
replayMap.set('my-key', 'second-data');
replayMap.set('my-key', 'third-data');
replayMap.set('my-key', 'fourth-data');

replayMap.get$('my-key').subscribe(
  value => console.log('Value: ' + value),
  error => console.log('Error: ' + error),
  () => console.log('complete')
);

// delete calls `.complete()` to clean up 
// the observable
replayMap.delete('my-key');

// OUTPUT:
// Value: third-data
// Value: fourth-data
// complete
```

> See [map recipes] for commom use cases.

#### Important Notes about ObservableMaps
* `map.get$()` (or `map.get()` if using `BehaviorMap`)
  * This will _always_ return an Observable and _never_ return `undefined`. This is different than the standard JS Map class which 
    could return `undefined` if the value was not set. The reason for this because callers need something to subsribe to. 

## Future Features
* A redux-store implementation that is flexible and dynamic
* WildEmitter implementation
* List Map for caching and watching changes on a list

### TODO

Add more features 

[Observable Maps]: #observable-maps
[ObservableMap]: #observablemap
[BehaviorMap]: #behaviormap
[ReplayMap]: #replaymap
[Important Notes about ObservableMaps]: #important-notes-about-observablemaps

[Future Features]: #future-features

[map recipes]: docs/recipes/maps.md

[dependabot]: https://dependabot.com
[typedoc]: https://typedoc.org/guides/options/#options
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[Subject]: https://rxjs-dev.firebaseapp.com/guide/subject
[ReplaySubject]: https://rxjs-dev.firebaseapp.com/guide/subject#replaysubject
[BehaviorSubject]: https://rxjs-dev.firebaseapp.com/guide/subject#behaviorsubject
