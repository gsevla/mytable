// @generated: @expo/next-adapter@3.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const withPlugins = require('next-compose-plugins');
const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPWA = require('next-pwa')({
  dest: 'public',
});

const withTM = require('next-transpile-modules')([
  'react-native-web',
  'expo-next-react-navigation',
  '@mytable/api-service',
  '@mytable/storage-service',
  '@mytable/components',
  '@mytable/domain',
]);

module.exports = withPlugins(
  [
    withTM,
    withPWA,
    [
      withExpo,
      {
        projectRoot: __dirname,
      },
    ],
    [withFonts],
    [
      withImages,
      {
        images: {
          disableStaticImages: true,
        },
      },
    ],
  ],
  {}
);
