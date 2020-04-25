[![Build Status](https://travis-ci.org/djhouseknecht/rxjs-util-classes.svg?branch=master)](https://travis-ci.org/djhouseknecht/rxjs-util-classes)  [![codecov](https://codecov.io/gh/djhouseknecht/rxjs-util-classes/branch/master/graph/badge.svg)](https://codecov.io/gh/djhouseknecht/rxjs-util-classes)  [![npm version](https://badge.fury.io/js/rxjs-util-classes.svg)](https://badge.fury.io/js/rxjs-util-classes)  [![dependabot-status](https://flat.badgen.net/dependabot/djhouseknecht/rxjs-util-classes/?icon=dependabot)][dependabot]  [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 

# RxJS-Util-Classes

Simple RxJS implementations for common classes used across many different types of projects. Implementations include: redux-like store (for dynamic state management), rxjs maps, rxjs lists (useful for caching), and rxjs event emitters.

#### Index

* [Installation] - Install the package and basic imports
* Available Features
  * [Observable Maps] - Basic JavaScript [Map] wrapper to allow use of observables. 
  * [Base Store] - Simple [Redux] implementation built on RxJS that is flexible and dynamic
* [Future Features] - Features coming soon
* [Contributing] 

-----------------

## Installation

Install rxjs and rxjs-util-classes _(rxjs v6.x is required)_:

``` sh
npm install --save rxjs rxjs-util-classes

# or via yarn

yarn add rxjs rxjs-util-classes
```

Importing:

``` js
import { ObservableMap } from 'rxjs-util-classes';

// or 

const { ObservableMap } = require('rxjs-util-classes');
```

-----------------

# Observable Maps

This is a wrapper around the native JavaScript [Map] except it returns observables. There are three main map types: 

* [ObservableMap] - uses RxJS [Subject]
* [BehaviorMap] - uses RxJS [BehaviorSubject]
* [ReplayMap] - uses RxJS [ReplaySubject]
  * [Available Map API methods] - API methods for each map class

> See the [Maps API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_maps_base_map_.basemap.html) and [Important Notes about ObservableMaps] for additional information

> See [map recipes] for commom use cases.

### ObservableMap

Uses the standard RxJS Subject so subscribers will only receive values emitted _after_ they subscribe. ([Full API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_maps_observable_map_.observablemap.html))

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

Uses the RxJS BehaviorSubject so subscribers will _always_ receive the last emitted value. This class _requires_ an initial value to construct all underlying BehaviorSubjects. ([Full API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_maps_behavior_map_.behaviormap.html))

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

Uses the RxJS ReplaySubject so subscribers will receive the last `nth` emitted values. This class _requires_ an initial replay number to construct all underlying ReplaySubject. ([Full API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_maps_replay_map_.replaymap.html))


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

#### Important Notes about ObservableMaps
* `map.get$()` (or `map.get()` if using `BehaviorMap`)
  * This will _always_ return an Observable and _never_ return `undefined`. This is different than the standard JS Map class which 
    could return `undefined` if the value was not set. The reason for this because callers need something to subsribe to. 



### Available Map API methods

The [ObservableMap], [BehaviorMap], & [ReplayMap] all share the same methods. The only exception is the `constructors` _and_ `BehaviorMap` has some additional synchornous methods. Any method that returns an observable will following the standard practice of ending with a `$`. All methods listed are `public`

> See the [Maps API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_maps_base_map_.basemap.html) for more details

`**K**` = generic type defined as map keys (`string | number | boolean`)

`**V**` = generic type defined as map value (`any`)

##### Differences in Constructors

* `new ObservableMap<K, V>()` - blank constructor. All underlying observables will be constructed with the standard [Subject].
* `new ReplayMap<K, V>(relayCount: number)` - number of replays to share. Number passed in will be passed to all underlying [ReplaySubject]s
* `new BehaviorMap<K, V>(initialValue: V)` - initial value to start each observable with. Value will be passed into each underlying [BehaviorSubject] 

##### Methods available to all Maps

* `size` - value of the current size of the underlying `Map`
* `has(key: K): boolean` - returns if a given key exists
* `set(key: K, value: V): this` - emits a value on the given key's observable. It will create an observable for the key if there is not already one.
* **`get$ (key: K): Observable<V>`** - returns the observable for a given key. It will create an observable for the key if there is not already one _(meaning this will never return `falsy`).
* `emitError(key: K, error: any): this` - calls `error()` on the given key's underlying subject. Emiting an error on an observable will terminate that observable. It will create an observable for the key if there is not already one. It will then call `delete(key)` to remove the key/value from the underlying `Map`.
* `clear(): void` - will clear out the underlying `Map` of all key/value pairs. It will call `complete()` on all observables
* `delete(key: K): boolean` - returns `false` if the key did not exist. Returns `true` is the key did exists. It then calls `complete()` on the observable and removes that key/value pair from the underlying `Map`
* `keys(): IterableIterator<K>` - returns an iterable iterator for the underlying `Map`'s keys
* `forEach$(callbackfn: (value: Observable<V>, key: K) => void): void` - takes a callback function that will be applied to all the underlying `Map`'s _observables_
* `entries$ (): IterableIterator<[K, Observable<V>]>` - returns an iterable iterator over key/value pairs of the underlying `Map` where the value is the key's _observable_
* `values$ (): IterableIterator<Observable<V>>` - returns an iterable iterator over the underlying `Map`'s values as _observables_

##### Methods only available on `BehaviorMap`

Because Behavior Subjects keep their last value, we can interact with that value synchronously. 

* `get(key: K): V` - returns the current value of a given key. It will create an observable for the key if there is not already one which will return the `initialValue` passed into the constructor.
* `forEach (callbackfn: (value: V, key: K) => void): void` - takes a callback function that will be applied to all the underlying `Map`'s _observables values_
* `values (): IterableIterator<V>` - returns an iterable iterator over the underlying `Map`'s current _observable values_ 
* `entries (): IterableIterator<[K, V]>` - returns an iterable iterator over key/value pairs of the underlying `Map` where the value is the key's _current observable value_

# Base Store

This is a simple RxJS implementation of [Redux] and state management. 

* [BaseStore] - uses RxJS [BehaviorSubject] to distribute and manage application state
  * [Available BaseStore API methods]


> * See the [Base Store API](https://djhouseknecht.github.io/rxjs-util-classes/classes/_store_base_store_.basestore.html) for the full API
> * See [store recipes] for commom use cases.

[Redux] is a very popular state management solution. The main concepts of redux-like state is that:

* State in a central location (in the "store")
* State can only be modified by "dispatching" events to the "store" that are allowed/configured

This makes keeping track of state uniformed because the state is always in one location, and can 
only be changed in ways the store allows. 

> One huge advantage of this implementation is its ability to have a **dyanmic store**. See the [Dynamic Store](https://github.com/djhouseknecht/rxjs-util-classes/tree/master/recipes/store.md#dynamic-store) recipe for further details and implementation. 

### BaseStore

**src/app-store.ts** _(pseudo file to show store implementation)_
``` ts
import { BaseStore } from 'rxjs-util-classes';

export interface IUser {
  username: string;
  authToken: string;
}

export interface IAppState {
  isLoading: boolean;
  authenticatedUser?: IUser;
  // any other state your app needs
}

const initialState: IAppState = {
  isLoading: false,
  authenticatedUser: undefined
};

/**
 * Extend the BaseStore and expose methods for components/services 
 *  to call to update the state
 */
class AppStore extends BaseStore<IAppState> {
  constructor () {
    super(initialState); // set the store's initial state
  }

  public setIsLoading (isLoading: boolean): void {
    this._dispatch({ isLoading });
  }

  public setAuthenticatedUser (authenticatedUser?: IUser): void {
    this._dispatch({ authenticatedUser });
  }

  // these methods are inherited from BaseStore
  // getState(): IAppState
  // getState$(): Observable<IAppState>
}

/* export a singleton instance of the store */
export const store = new AppStore();
```

**src/example-component.ts** _(pseudo component that will authenticate the user and interact with the app's state)_

``` ts
import { store, IUser, IAppState } from './app-store';

/**
 * Function to mock an authentication task
 */
function authenticate () {
  return new Promise(res => {
    setTimeout(() => {
      res({ username: 'bob-samuel', authToken: 'qwerty-123' });
    }, 1000);
  });
}

store.getState$().subscribe((appState: IAppState) => {
  /* do something with the state as it changes; 
    maybe show a spinner or the authenticatedUser's username */
});

/* authenticate to get the user */
store.setIsLoading(true);
authenticate()
  .then((user: IUser) => {
    /* here we set the store's state via the methods the 
      store exposed */
    store.setAuthenticatedUser(user);
    store.setIsLoading(false);
  })
  .catch(err => store.setIsLoading(false));
```

### Available BaseStore API methods

`BaseStore` is an abstract class and must be extended. 

`**T**` = generic type defined as the state type (`any`)

* `protected constructor (initialState: T)` - construct with the intial state of the store. Must be called from an extending class
* `public getState$ (): Observable<T>` - returns an observable of the store's state. Underlying implementation uses a BehaviorSubject so this call will always receive the current state
* `public getState (): T` - returns the current state synchronously
* `public destroy (): void` - calls `complete()` on the underlying BehaviorSubject. **Once a store has destroyed, it can no longer be used**
* `protected dispatch (state: Partial<T>): void` - updates the state with the passed in state then calls `next()` on the underlying BehaviorSubject. _This will do a shallow copy of the state using the spread operator (`...`). This is to keep state immutable._

# Future Features
* WildEmitter implementation
* List Map for caching and watching changes on a list

------------

# Contributing

### Install

``` sh
# clone repo
git clone https://github.com/djhouseknecht/rxjs-util-classes.git

# move into directory
cd ./rxjs-util-classes

# install
npm install
```

### Commits

All commits must be compliant to [commitizen](https://github.com/commitizen/cz-cli)'s standard. Useful commit message
tips can be found on angular.js' [DEVELOPER.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). 

``` sh
# utility to format commit messages
npm run commit
```

**If you are releasing a new version, make sure to update the [CHANGELOG.md](CHANGELOG.md)** 
The changelog adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). 

> Know what messages will trigger a release. Check [semantic-release defaults](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js) and any added to `./package.json#release`


### Versioning & Deploying 

Deploying is managed by [semantic-release](https://github.com/semantic-release/semantic-release). Messages
must comply with [commitizen](https://github.com/commitizen/cz-cli) [see above](#commits). 


### Testing & Linting
Testing coverage must remain at 100% and all code must pass the linter. 

``` sh
# lint
npm run lint 
# npm run lint:fix # will fix some issues

npm run test
```

### Building 

``` sh
npm run build
```

## TODO

* Add more features 

[Installation]: #installation
[Observable Maps]: #observable-maps
[Base Store]: #base-store
[Future Features]: #future-features
[Contributing]: #contributing

[ObservableMap]: #observablemap
[BehaviorMap]: #behaviormap
[ReplayMap]: #replaymap
  [Available Map API methods]: #available-map-api-methods
  [Important Notes about ObservableMaps]: #important-notes-about-observablemaps

[BaseStore]: #basestore
  [Available BaseStore API methods]: #available-basestore-api-methods

[map recipes]: https://github.com/djhouseknecht/rxjs-util-classes/tree/master/recipes/maps.md
[store recipes]: https://github.com/djhouseknecht/rxjs-util-classes/tree/master/recipes/store.md

[dependabot]: https://dependabot.com
[typedoc]: https://typedoc.org/guides/options/#options
[Redux]: https://redux.js.org/

[Map]: https://developer.mozilla.org/en-US/https://djhouseknecht.github.io/rxjs-util-classes/docs/Web/JavaScript/Reference/Global_Objects/Map
[Subject]: https://rxjs-dev.firebaseapp.com/guide/subject
[ReplaySubject]: https://rxjs-dev.firebaseapp.com/guide/subject#replaysubject
[BehaviorSubject]: https://rxjs-dev.firebaseapp.com/guide/subject#behaviorsubject
