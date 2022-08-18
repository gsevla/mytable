// @generated: @expo/next-adapter@3.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          '~': './src/',
        },
      },
    ],
    process.env.PLATFORM === 'web' && [
      '@babel/plugin-proposal-private-property-in-object',
      { loose: true },
    ],
    process.env.PLATFORM === 'web' && [
      '@babel/plugin-proposal-private-methods',
      { loose: true },
    ],
  ],
};
