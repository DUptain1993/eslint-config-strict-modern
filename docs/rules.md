# Rules

Strict-modern splits its rules into three groups: correctness (error),
convention (warn), and stylistic (delegated to Prettier).

## Correctness — error

| Rule | Why |
|---|---|
| `no-undef` | catches typos in identifiers that `typeof` checks miss |
| `no-unused-vars` | dead code removal, with `_`-prefixed escape hatch |
| `no-use-before-define` | avoids TDZ surprises |
| `no-shadow` | prevents inner scopes from accidentally capturing outer names |
| `no-implicit-globals` | ESM forbids them |
| `no-async-promise-executor` | the executor is not async-aware; usually a bug |
| `require-await` | async function with no `await` is a bug or a leftover |
| `no-throw-literal` | `throw "error"` loses stack traces |
| `no-promise-executor-return` | returned value is silently discarded |
| `no-unreachable-loop` | loop bodies that can't complete are usually wrong |
| `no-eval` | no legitimate modern use case |
| `no-debugger` | obviously |
| `valid-typeof` | `typeof x === "stringg"` is always false |
| `use-isnan` | `x === NaN` is always false |

## Convention — warn

| Rule | Default |
|---|---|
| `no-console` | warn on `console.log`, allow `console.warn` / `console.error` |
| `no-await-in-loop` | warn |
| `complexity` | warn at 20 |
| `max-depth` | warn at 5 |
| `max-nested-callbacks` | warn at 4 |
| `max-params` | warn at 6 |

## Modern-only — error

| Rule | Effect |
|---|---|
| `no-var` | error |
| `no-restricted-syntax: require` | error on static `require()` calls |
| `prefer-const` | error on `let` bindings never reassigned |
| `prefer-template` | error on string concat with variables |
| `prefer-spread` | error on `.apply()` |
| `prefer-object-spread` | error on `Object.assign({}, ...)` |

If you need to support legacy CJS, override these in your project config.

## TypeScript overlay

| Rule | Level |
|---|---|
| `no-unsafe-argument` | error |
| `no-unsafe-assignment` | error |
| `no-unsafe-call` | error |
| `no-unsafe-member-access` | error |
| `no-unsafe-return` | error |
| `strict-boolean-expressions` | warn |
| `switch-exhaustiveness-check` | error |
| `consistent-type-imports` | error |

`react/prop-types` is **off** — this config assumes TypeScript or
explicit runtime validation.

## Overriding

All rules are overridable in your own flat config. Anything you add
*after* strict-modern wins.

```js
import strictModern from 'eslint-config-strict-modern';

export default [
  ...strictModern,
  {
    rules: {
      'no-console': 'off',
      'max-params': ['warn', 3],
    },
  },
];
```
