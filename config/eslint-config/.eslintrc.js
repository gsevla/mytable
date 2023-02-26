var path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, '..', '..'),
    project: [
      'tsconfig.eslint.json',
      'apps/*/tsconfig.json',
      'lib/*/tsconfig.json',
      'packages/*/tsconfig.json',
    ],
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off'
  },
};
