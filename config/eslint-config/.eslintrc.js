const path = require('path');

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
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   tsconfigRootDir: path.join(__dirname, '..', '..'),
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: 'module',
  //   warnOnUnsupportedTypeScriptVersion: false,
  // },
  parserOptions: {
    tsconfigRootDir: path.join(__dirname, '..', '..'),
    project: [
      'tsconfig.eslint.json',
      'apps/*/tsconfig.json',
      'lib/*/tsconfig.json',
      'packages/*/tsconfig.json',
    ],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     extends: [
  //       // 'plugin:@typescript-eslint/recommended',
  //       'airbnb',
  //       'airbnb-typescript',
  //       'plugin:import/typescript',
  //       // 'plugin:react/recommended',
  //       // 'plugin:react-hooks/recommended',
  //       'plugin:import/recommended',
  //       'prettier',
  //     ],
  //     parserOptions: {
  //       project: [
  //         'tsconfig.json',
  //         'apps/*/tsconfig.json',
  //         'lib/*/tsconfig.json',
  //         'packages/*/tsconfig.json',
  //       ],
  //       tsconfigRootDir: path.join(__dirname, '..', '..'),
  //       sourceType: 'module',
  //     },
  //   },
  // ],
  extends: [
    // 'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:import/typescript',
    // 'plugin:import/recommended',
    'prettier',
  ],
  plugins: [
    // 'react', 'react-hooks', 'jsx-a11y',
    '@typescript-eslint',
    // 'import',
  ],
  rules: {
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/prefer-default-export': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        // project: path.join(__dirname, '..', '..'),

        // Multiple tsconfigs (Useful for monorepos)

        // use a glob pattern
        // "project": "packages/*/tsconfig.json",

        // use an array
        // "project": [
        //   "packages/module-a/tsconfig.json",
        //   "packages/module-b/tsconfig.json"
        // ],

        // use an array of glob patterns
        project: [
          `${path.join(__dirname, '..', '..', 'apps')}/*/tsconfig.json`,
          `${path.join(__dirname, '..', '..', 'packages')}/*/tsconfig.json`,
          `${path.join(__dirname, '..', '..', 'lib')}/*/tsconfig.json`,
        ],
      },
    },
  },
};
