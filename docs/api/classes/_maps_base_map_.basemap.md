[rxjs-util-classes](../README.md) › [Globals](../globals.md) › ["maps/base-map"](../modules/_maps_base_map_.md) › [BaseMap](_maps_base_map_.basemap.md)

# Class: BaseMap <**K, V, S**>

BaseMap class used to provide shared functionality for implementing classes.

## Type parameters

▪ **K**: *[SupportedKeyTypes](../modules/_interfaces_.md#supportedkeytypes)*

▪ **V**: *any*

▪ **S**: *[SupportedSubjectTypes](../modules/_interfaces_.md#supportedsubjecttypes)*

## Hierarchy

* **BaseMap**

  ↳ [ObservableMap](_maps_observable_map_.observablemap.md)

  ↳ [BehaviorMap](_maps_behavior_map_.behaviormap.md)

  ↳ [ReplayMap](_maps_replay_map_.replaymap.md)

## Index

### Constructors

* [constructor](_maps_base_map_.basemap.md#protected-constructor)

### Properties

* [_map](_maps_base_map_.basemap.md#protected-_map)
* [size](_maps_base_map_.basemap.md#size)

### Methods

* [_getOrInit$](_maps_base_map_.basemap.md#protected-_getorinit)
* [clear](_maps_base_map_.basemap.md#clear)
* [delete](_maps_base_map_.basemap.md#delete)
* [emitError](_maps_base_map_.basemap.md#emiterror)
* [entries$](_maps_base_map_.basemap.md#entries)
* [forEach$](_maps_base_map_.basemap.md#foreach)
* [get$](_maps_base_map_.basemap.md#get)
* [has](_maps_base_map_.basemap.md#has)
* [keys](_maps_base_map_.basemap.md#keys)
* [set](_maps_base_map_.basemap.md#set)
* [values$](_maps_base_map_.basemap.md#values)

## Constructors

### `Protected` constructor

\+ **new BaseMap**(`subjectClass`: S, `initialOption?`: [OptionValue](../modules/_interfaces_.md#optionvalue)‹S, V›): *[BaseMap](_maps_base_map_.basemap.md)*

*Defined in [maps/base-map.ts:22](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L22)*

Must be overridden. Takes a [SupportedSubjectTypes](../modules/_interfaces_.md#supportedsubjecttypes) and any initial option
 - [BehaviorMap](_maps_behavior_map_.behaviormap.md) initial option is the starting value for the `BehaviorSubject`
 - [ReplayMap](_maps_replay_map_.replaymap.md) replay amount for the `ReplaySubject`
 - [ObservableMap](_maps_observable_map_.observablemap.md) ignores this value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subjectClass` | S | subject type to use |
`initialOption?` | [OptionValue](../modules/_interfaces_.md#optionvalue)‹S, V› | intial option to pass the subject on construction |

**Returns:** *[BaseMap](_maps_base_map_.basemap.md)*

this instance

## Properties

### `Protected` _map

• **_map**: *Map‹K, [SubjectType](../modules/_interfaces_.md#subjecttype)‹S, V››* = new Map()

*Defined in [maps/base-map.ts:17](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L17)*

Native JavaScript map that holds the key-values

___

###  size

• **size**: *number* = this._map.size

*Defined in [maps/base-map.ts:22](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L22)*

Size of the map

## Methods

### `Protected` _getOrInit$

▸ **_getOrInit$**(`key`: K): *[SubjectType](../modules/_interfaces_.md#subjecttype)‹S, V›*

*Defined in [maps/base-map.ts:157](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L157)*

Get (or create) subject for a specified key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key's subject to return   |

**Returns:** *[SubjectType](../modules/_interfaces_.md#subjecttype)‹S, V›*

___

###  clear

▸ **clear**(): *void*

*Defined in [maps/base-map.ts:83](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L83)*

Will call `.complete()` on all subjects and
 clear the map

**Returns:** *void*

___

###  delete

▸ **delete**(`key`: K): *boolean*

*Defined in [maps/base-map.ts:97](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L97)*

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

*Defined in [maps/base-map.ts:73](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L73)*

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

*Defined in [maps/base-map.ts:136](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L136)*

Get the map's entries as key-observable

**Returns:** *IterableIterator‹[K, Observable‹V›]›*

___

###  forEach$

▸ **forEach$**(`callbackfn`: function): *void*

*Defined in [maps/base-map.ts:118](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L118)*

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

*Defined in [maps/base-map.ts:129](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L129)*

Get the observable for the specified key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | key to retrieve  |

**Returns:** *Observable‹V›*

___

###  has

▸ **has**(`key`: K): *boolean*

*Defined in [maps/base-map.ts:46](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L46)*

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

*Defined in [maps/base-map.ts:109](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L109)*

Get the map's keys

**Returns:** *IterableIterator‹K›*

___

###  set

▸ **set**(`key`: K, `value`: V): *this*

*Defined in [maps/base-map.ts:57](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L57)*

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

*Defined in [maps/base-map.ts:145](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/maps/base-map.ts#L145)*

Get the map's ovservable values

**Returns:** *IterableIterator‹Observable‹V››*
