[rxjs-util-classes](../README.md) › [Globals](../globals.md) › ["maps/replay-map"](../modules/_maps_replay_map_.md) › [ReplayMap](_maps_replay_map_.replaymap.md)

# Class: ReplayMap <**K, V**>

Implementation of [BaseMap](_maps_base_map_.basemap.md) that uses the `ReplaySubject` based `Observables`

## Type parameters

▪ **K**: *[SupportedKeyTypes](../modules/_interfaces_.md#supportedkeytypes)*

▪ **V**: *any*

## Hierarchy

* [BaseMap](_maps_base_map_.basemap.md)‹K, V, typeof ReplaySubject›

  ↳ **ReplayMap**

## Index

### Constructors

* [constructor](_maps_replay_map_.replaymap.md#constructor)

### Properties

* [_map](_maps_replay_map_.replaymap.md#protected-_map)
* [size](_maps_replay_map_.replaymap.md#size)

### Methods

* [_getOrInit$](_maps_replay_map_.replaymap.md#protected-_getorinit)
* [clear](_maps_replay_map_.replaymap.md#clear)
* [delete](_maps_replay_map_.replaymap.md#delete)
* [emitError](_maps_replay_map_.replaymap.md#emiterror)
* [entries$](_maps_replay_map_.replaymap.md#entries)
* [forEach$](_maps_replay_map_.replaymap.md#foreach)
* [get$](_maps_replay_map_.replaymap.md#get)
* [has](_maps_replay_map_.replaymap.md#has)
* [keys](_maps_replay_map_.replaymap.md#keys)
* [set](_maps_replay_map_.replaymap.md#set)
* [values$](_maps_replay_map_.replaymap.md#values)

## Constructors

###  constructor

\+ **new ReplayMap**(`replayCount`: number): *[ReplayMap](_maps_replay_map_.replaymap.md)*

*Overrides [BaseMap](_maps_base_map_.basemap.md).[constructor](_maps_base_map_.basemap.md#protected-constructor)*

*Defined in [maps/replay-map.ts:8](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/replay-map.ts#L8)*

Construct a new instance and determine the number of
 replays to share with subscribers.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`replayCount` | number | number of values to replay  |

**Returns:** *[ReplayMap](_maps_replay_map_.replaymap.md)*

## Properties

### `Protected` _map

• **_map**: *Map‹K, [SubjectType](../modules/_interfaces_.md#subjecttype)‹typeof ReplaySubject, V››* = new Map()

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[_map](_maps_base_map_.basemap.md#protected-_map)*

*Defined in [maps/base-map.ts:17](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L17)*

Native JavaScript map that holds the key-values

___

###  size

• **size**: *number* = this._map.size

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[size](_maps_base_map_.basemap.md#size)*

*Defined in [maps/base-map.ts:22](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L22)*

Size of the map

## Methods

### `Protected` _getOrInit$

▸ **_getOrInit$**(`key`: K): *[SubjectType](../modules/_interfaces_.md#subjecttype)‹typeof ReplaySubject, V›*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[_getOrInit$](_maps_base_map_.basemap.md#protected-_getorinit)*

*Defined in [maps/base-map.ts:157](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L157)*

Get (or create) subject for a specified key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key's subject to return   |

**Returns:** *[SubjectType](../modules/_interfaces_.md#subjecttype)‹typeof ReplaySubject, V›*

___

###  clear

▸ **clear**(): *void*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[clear](_maps_base_map_.basemap.md#clear)*

*Defined in [maps/base-map.ts:83](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L83)*

Will call `.complete()` on all subjects and
 clear the map

**Returns:** *void*

___

###  delete

▸ **delete**(`key`: K): *boolean*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[delete](_maps_base_map_.basemap.md#delete)*

*Defined in [maps/base-map.ts:97](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L97)*

Will call `.complete()` on key's subject and
 remove the key from the map.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key to remove  |

**Returns:** *boolean*

___

###  emitError

▸ **emitError**(`key`: K, `error`: any): *this*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[emitError](_maps_base_map_.basemap.md#emiterror)*

*Defined in [maps/base-map.ts:73](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L73)*

Emit an error on the key's observable. This
 will call `.error(error)` which ends the observable
 stream.

It then removes the key-value from the map since the
 observable has ended.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key to emit error on |
`error` | any | error to emit  |

**Returns:** *this*

___

###  entries$

▸ **entries$**(): *IterableIterator‹[K, Observable‹V›]›*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[entries$](_maps_base_map_.basemap.md#entries)*

*Defined in [maps/base-map.ts:136](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L136)*

Get the map's entries as key-observable

**Returns:** *IterableIterator‹[K, Observable‹V›]›*

___

###  forEach$

▸ **forEach$**(`callbackfn`: function): *void*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[forEach$](_maps_base_map_.basemap.md#foreach)*

*Defined in [maps/base-map.ts:118](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L118)*

Will call the function for each observable-key value in the map.

**Parameters:**

▪ **callbackfn**: *function*

function to execute on the maps key-value

▸ (`value`: Observable‹V›, `key`: K): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | Observable‹V› |
`key` | K |

**Returns:** *void*

___

###  get$

▸ **get$**(`key`: K): *Observable‹V›*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[get$](_maps_base_map_.basemap.md#get)*

*Defined in [maps/base-map.ts:129](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L129)*

Get the observable for the specified key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key to retrieve  |

**Returns:** *Observable‹V›*

___

###  has

▸ **has**(`key`: K): *boolean*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[has](_maps_base_map_.basemap.md#has)*

*Defined in [maps/base-map.ts:46](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L46)*

Check if a key exists on the map

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | to check for |

**Returns:** *boolean*

check if the key exists

___

###  keys

▸ **keys**(): *IterableIterator‹K›*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[keys](_maps_base_map_.basemap.md#keys)*

*Defined in [maps/base-map.ts:109](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L109)*

Get the map's keys

**Returns:** *IterableIterator‹K›*

___

###  set

▸ **set**(`key`: K, `value`: V): *this*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[set](_maps_base_map_.basemap.md#set)*

*Defined in [maps/base-map.ts:57](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L57)*

Set a key-value pair. This will create a [SupportedSubjectTypes](../modules/_interfaces_.md#supportedsubjecttypes)
 (or reuse if key already existed) for the key specified.
It will call `.next(value)` on that subject.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key to index value |
`value` | V | value to store  |

**Returns:** *this*

___

###  values$

▸ **values$**(): *IterableIterator‹Observable‹V››*

*Inherited from [BaseMap](_maps_base_map_.basemap.md).[values$](_maps_base_map_.basemap.md#values)*

*Defined in [maps/base-map.ts:145](https://github.com/djhouseknecht/rxjs-util-classes/blob/f7a4fd7/src/maps/base-map.ts#L145)*

Get the map's ovservable values

**Returns:** *IterableIterator‹Observable‹V››*
