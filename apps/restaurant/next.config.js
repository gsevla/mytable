// @generated: @expo/next-adapter@3.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');

const withTM = require('next-transpile-modules')(['react-native-web', 'expo-next-react-navigation']);

module.exports = withExpo(
  withTM(
    withFonts(
      withImages({
        projectRoot: __dirname,
        images: {
          disableStaticImages: true,
        },
      }),
    ),
  ),
);
