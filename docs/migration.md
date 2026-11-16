# Migrating from `eslint:recommended`

1. Install:

   ```sh
   npm install --save-dev eslint-config-strict-modern eslint
   ```

2. Replace your `eslint.config.js`:

   ```diff
   - import js from '@eslint/js';
   - export default [js.configs.recommended];
   + import strictModern from 'eslint-config-strict-modern';
   + export default [...strictModern];
   ```

3. Run `npx eslint .` and see what fires.

4. For each new violation, pick one of: fix the code, add a rule override,
   file an issue if the rule is too strict for the case.

5. Common overrides:

   ```js
   {
     rules: {
       'no-console': 'off',
       'require-await': 'warn',
       'no-await-in-loop': 'off',
     },
   }
   ```
