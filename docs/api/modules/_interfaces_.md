[rxjs-util-classes](../README.md) › [Globals](../globals.md) › ["interfaces"](_interfaces_.md)

# Module: "interfaces"

## Index

### Type aliases

* [OptionValue](_interfaces_.md#optionvalue)
* [SubjectType](_interfaces_.md#subjecttype)
* [SupportedKeyTypes](_interfaces_.md#supportedkeytypes)
* [SupportedSubjectTypes](_interfaces_.md#supportedsubjecttypes)

## Type aliases

###  OptionValue

Ƭ **OptionValue**: *S extends typeof BehaviorSubject ? V : S extends typeof ReplaySubject ? number : undefined*

*Defined in [interfaces.ts:25](https://github.com/djhouseknecht/rxjs-util-classes/blob/2877608/src/interfaces.ts#L25)*

Utility type to determine which option type to support based
 on [SupportedSubjectTypes](_interfaces_.md#supportedsubjecttypes)

___

###  SubjectType

Ƭ **SubjectType**: *S extends typeof BehaviorSubject ? BehaviorSubject<V> : S extends typeof ReplaySubject ? ReplaySubject<V> : Subject<V>*

*Defined in [interfaces.ts:17](https://github.com/djhouseknecht/rxjs-util-classes/blob/2877608/src/interfaces.ts#L17)*

Utility type to determine the correct subject type to return based
 on [SupportedSubjectTypes](_interfaces_.md#supportedsubjecttypes)

___

###  SupportedKeyTypes

Ƭ **SupportedKeyTypes**: *string | number | boolean*

*Defined in [interfaces.ts:6](https://github.com/djhouseknecht/rxjs-util-classes/blob/2877608/src/interfaces.ts#L6)*

Supported key types for maps

___

###  SupportedSubjectTypes

Ƭ **SupportedSubjectTypes**: *typeof BehaviorSubject | typeof ReplaySubject | typeof Subject*

*Defined in [interfaces.ts:11](https://github.com/djhouseknecht/rxjs-util-classes/blob/2877608/src/interfaces.ts#L11)*

Supported `Subject` types for maps
