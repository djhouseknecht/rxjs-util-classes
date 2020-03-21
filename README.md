[![Build Status](https://travis-ci.org/djhouseknecht/rxjs-util-classes.svg?branch=master)](https://travis-ci.org/djhouseknecht/rxjs-util-classes)  [![codecov](https://codecov.io/gh/djhouseknecht/rxjs-util-classes/branch/master/graph/badge.svg)](https://codecov.io/gh/djhouseknecht/rxjs-util-classes)  [![npm version](https://badge.fury.io/js/rxjs-util-classes.svg)](https://badge.fury.io/js/rxjs-util-classes)  [![dependabot-status](https://flat.badgen.net/dependabot/djhouseknecht/rxjs-util-classes/?icon=dependabot)][dependabot]  [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 

# RxJS-Util-Classes

Simple RxJS implementations for common classes used across many different types of projects. Implementations include: redux-like store (for dynamic state management), rxjs maps, rxjs lists (useful for caching), and rxjs event emitters.

#### Index

[ObservableMap]: Basic JavaScript [Map] wrapper to allow use of observables. 

## ObservableMap

This is a wrapper around the native JavaScript [Map] except it returns observables. There are three main map types: 

* `ObservableMap` - uses standard [Subject] for underlying implementation
* `ReplayMap` - uses standard [ReplaySubject] for underlying implementation
* `BehaviorMap` - uses standard [BehaviorSubject] for underlying implementation



> See [maps] recipes for commom use cases.

### TODO

Look into [typedoc]

Maybe add this to patch release on doc changes: https://github.com/semantic-release/semantic-release/issues/192#issuecomment-333328071

Everything is coming soon. 

[ObservableMap]: observablemap

[maps]: docs/recipes/maps.md

[dependabot]: https://dependabot.com
[typedoc]: https://typedoc.org/guides/options/#options
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[Subject]: https://rxjs-dev.firebaseapp.com/guide/subject
[ReplaySubject]: https://rxjs-dev.firebaseapp.com/guide/subject#replaysubject
[BehaviorSubject]: https://rxjs-dev.firebaseapp.com/guide/subject#behaviorsubject
