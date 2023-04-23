// @generated: @expo/next-adapter@3.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          '~': './src/',
          '#services': './src/services/',
          '#providers': './providers/',
          '#hooks': './hooks/',
        },
      },
    ],
    ['@babel/plugin-transform-flow-strip-types'],
    // process.env.PLATFORM === 'web'
    //   ? ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
    //   : undefined,
    // process.env.PLATFORM === 'web'
    //   ? ['@babel/plugin-proposal-private-methods', { loose: true }]
    //   : undefined,
  ],
};
