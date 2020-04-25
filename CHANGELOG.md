# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


# [Unreleased]

# [v2.0.1] - 2020-04-25
### Deprecated
* Use `dispatch(state)` instead of `_dispatch(state)`

### Changed
* Update README doc with all API methods for maps and store

# [v2.0.0]

### BREAKING CHANGE
* **rxjs dependency:** moved rxjs to `peerDependencies` and will support `rxjs@^6.0.0`

### Changed
* **README:** updated install instructions

### Added 
* **BaseStore/recipe:** added a dynamic base-store example

# [v1.2.0]

### Added 
* **BaseStore** utility class which is a loose implementation of redux's state management
* Documentation for BaseStore

# [v1.1.3]

### Fixed
* Interface import in `ObservableMap` and `ReplayMap` that was throwing an 
  error when being used by 3rd party applications

# [v1.1.2]

### Changed
* Documentation: added install instructions
* Dev-Deps

### Security
* Bump `codecov`

# [v1.1.1]

### Added 
* CHANGELOG

### Changed
* Documentation
* Patch release on doc change ([from this comment](https://github.com/semantic-release/semantic-release/issues/192#issuecomment-333328071))

# [v1.1.0]

### Added
* Observable, Behavior, and Subject maps
* Documentation

# [v1.0.0]

### Added
* Initial release 
* README

[Unreleased]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v2.0.1...HEAD
[v2.0.1]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.2.0...v2.0.0
[v1.2.0]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.1.3...v1.2.0
[v1.1.3]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/djhouseknecht/rxjs-util-classes/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/djhouseknecht/rxjs-util-classes/releases/tag/v1.0.0
