'use strict';

const assert = require('assert');

const config = require('..');
const tsConfig = require('../configs/typescript');
const reactConfig = require('../configs/react');

assert.ok(Array.isArray(config), 'base config must be an array');
assert.ok(config.length >= 2, 'base must have at least 2 blocks');
assert.ok(config[0].name, 'blocks must have names');
assert.ok(config[0].languageOptions, 'first block must set languageOptions');

assert.ok(Array.isArray(tsConfig), 'typescript config must be an array');
assert.ok(Array.isArray(reactConfig), 'react config must be an array');

const allRules = Object.assign(
  {},
  ...config.filter(b => b.rules).map(b => b.rules)
);
assert.strictEqual(allRules['no-eval'], 'error');
assert.strictEqual(allRules['no-var'], 'error');
assert.strictEqual(allRules['eqeqeq'][0], 'error');

console.log('[test] all assertions passed');
