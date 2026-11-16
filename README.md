# eslint-config-strict-modern

An opinionated ESLint flat config for modern JavaScript, TypeScript, and
React. Strict on correctness, light on formatting, no legacy-compat rules.

## Why

Most shared configs fall into one of two traps:

- **Too permissive.** They enable a handful of `eslint:recommended` rules
  and stop there. You still ship `no-unused-vars` bugs.
- **Too opinionated.** They enforce 400 stylistic rules and every line of
  your code reads like a manifesto.

This config splits the difference: **strict on correctness, silent on
formatting**. Formatting is Prettier's job. Correctness is the linter's job.

## Install

```sh
npm install --save-dev eslint-config-strict-modern eslint
```

If you use TypeScript, also install:

```sh
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

If you use React, also install:

```sh
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks
```

Both overlays silently degrade to an empty array if their peer deps
aren't installed — the base config still works.

## Usage

### Base

```js
// eslint.config.js
import strictModern from 'eslint-config-strict-modern';

export default [...strictModern];
```

### With TypeScript

```js
import strictModern from 'eslint-config-strict-modern';
import strictTypeScript from 'eslint-config-strict-modern/typescript';

export default [...strictModern, ...strictTypeScript];
```

### With TypeScript + React

```js
import strictModern from 'eslint-config-strict-modern';
import strictTypeScript from 'eslint-config-strict-modern/typescript';
import strictReact from 'eslint-config-strict-modern/react';

export default [...strictModern, ...strictTypeScript, ...strictReact];
```

### With Next.js, Vite, or other framework configs

Add their configs *after* ours so theirs can override:

```js
import strictModern from 'eslint-config-strict-modern';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default [...strictModern, ...nextVitals];
```

## What it enforces

See [docs/rules.md](docs/rules.md) for the full list. Highlights:

- `no-undef`, `no-unused-vars`, `no-shadow`, `no-use-before-define`
- `no-eval`, `no-implied-eval`, `no-async-promise-executor`
- `require-await`, `prefer-promise-reject-errors`
- `prefer-const`, `prefer-template`, `prefer-spread`
- `no-var` — this is a modern-only config
- `@typescript-eslint/strict-boolean-expressions` (warn)
- `react-hooks/rules-of-hooks` and `exhaustive-deps`

## What it does *not* enforce

- Indentation, quotes, semicolons — use Prettier
- Import ordering — use a dedicated plugin if you want it
- Naming conventions — use a dedicated plugin if you want them

## Contributing

Issues and PRs welcome. Rules that fire on reasonable code are bugs.
File them with a reproduction.

## License

MIT
