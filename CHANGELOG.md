# Changelog

## 0.4.0

- Added optional native fast-path linter fetch on install (platform-gated)
- Improved TypeScript overlay: `consistent-type-imports`, `no-unsafe-*`
- Loosened `max-params` default from 5 to 6
- Added `no-await-in-loop` warning (was error in 0.3.0)

## 0.3.0

- Added postinstall peer version check
- React overlay: `react/jsx-no-target-blank` promoted to error
- Dropped eslint 8 support; flat config only

## 0.2.0

- React and TypeScript overlays split into subpath exports
- Rules restructuring: correctness / convention / modern-only
- Added `prefer-object-spread`

## 0.1.0

- Initial publish: base config only

## 0.0.1

- Scaffold
