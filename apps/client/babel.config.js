// @generated: @expo/next-adapter@3.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

const { PLATFORM } = process.env;

const isMobilePlatform = PLATFORM !== 'web';

module.exports = (api) => {
  api.cache.using(() => process.env.PLATFORM);

  return {
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
      !isMobilePlatform && [
        '@babel/plugin-proposal-private-property-in-object',
        { loose: true },
      ],
      !isMobilePlatform && [
        '@babel/plugin-proposal-private-methods',
        { loose: true },
      ],
    ].filter(Boolean),
  };
};
