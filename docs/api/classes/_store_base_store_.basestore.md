[rxjs-util-classes](../README.md) › [Globals](../globals.md) › ["store/base-store"](../modules/_store_base_store_.md) › [BaseStore](_store_base_store_.basestore.md)

# Class: BaseStore <**T**>

BaseStore class to manage state in a unified location

## Type parameters

▪ **T**

## Hierarchy

* **BaseStore**

## Index

### Constructors

* [constructor](_store_base_store_.basestore.md#protected-constructor)

### Methods

* [_dispatch](_store_base_store_.basestore.md#protected-_dispatch)
* [destroy](_store_base_store_.basestore.md#destroy)
* [getState](_store_base_store_.basestore.md#getstate)
* [getState$](_store_base_store_.basestore.md#getstate)
* [hasDestroyed](_store_base_store_.basestore.md#hasdestroyed)

## Constructors

### `Protected` constructor

\+ **new BaseStore**(`initialState`: T): *[BaseStore](_store_base_store_.basestore.md)*

*Defined in [store/base-store.ts:11](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L11)*

Must be overridden. Takes in an initial state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`initialState` | T | state to start store with  |

**Returns:** *[BaseStore](_store_base_store_.basestore.md)*

## Methods

### `Protected` _dispatch

▸ **_dispatch**(`state`: Partial‹T›): *void*

*Defined in [store/base-store.ts:68](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L68)*

Change part of the state to the passed in value.

This will create a shallow copy of the current state
 and set all properties of the new passed in state
 using the spread operator.

Throws an error if called when the store has already
 been destroyed (using `.destroy()`).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`state` | Partial‹T› | partial state to change  |

**Returns:** *void*

___

###  destroy

▸ **destroy**(): *void*

*Defined in [store/base-store.ts:43](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L43)*

Destory the state and call `.complete()` on
 the state's underlying observable

_NOTE: once this is called, the store cannot_
 _be reused_

**Returns:** *void*

___

###  getState

▸ **getState**(): *T*

*Defined in [store/base-store.ts:32](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L32)*

Get the state synchonously

**Returns:** *T*

___

###  getState$

▸ **getState$**(): *Observable‹T›*

*Defined in [store/base-store.ts:25](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L25)*

Get the state as an observable

**Returns:** *Observable‹T›*

___

###  hasDestroyed

▸ **hasDestroyed**(): *boolean*

*Defined in [store/base-store.ts:52](https://github.com/djhouseknecht/rxjs-util-classes/blob/3c2051f/src/store/base-store.ts#L52)*

Check to see if the store has been destroyed.
 If it has been, it can no longer be used.

**Returns:** *boolean*
