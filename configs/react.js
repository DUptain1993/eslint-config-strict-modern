'use strict';

let react;
let reactHooks;
try {
  react = require('eslint-plugin-react');
  reactHooks = require('eslint-plugin-react-hooks');
} catch {
  module.exports = [];
  return;
}

module.exports = [
  {
    name: 'strict-modern/react/plugins',
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
  },
  {
    name: 'strict-modern/react/rules',
    files: ['**/*.jsx', '**/*.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',
    },
  },
];
