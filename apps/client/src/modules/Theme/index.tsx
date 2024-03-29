import React from 'react';
import { Provider } from 'react-native-paper';
import Constants from 'expo-constants';
import { lightTheme } from './lightTheme';

interface IThemeProvider {
  children: React.ReactNode;
  primaryColor?: string;
  accentColor?: string;
}

export function ThemeProvider({
  children,
  primaryColor,
  accentColor,
}: IThemeProvider) {
  if (Constants?.manifest?.extra?.PLATFORM === 'web') {
    document.documentElement.style.setProperty(
      '--primary-color',
      primaryColor ?? lightTheme.colors.primary
    );
    document.documentElement.style.setProperty(
      '--accent-color',
      accentColor ?? lightTheme.colors.accent
    );
  }

  const _lightTheme = JSON.parse(
    JSON.stringify(lightTheme)
  ) as typeof lightTheme;
  _lightTheme.colors = {
    ...lightTheme.colors,
    primary: primaryColor ?? lightTheme.colors.primary,
    accent: accentColor ?? lightTheme.colors.accent,
  };

  return <Provider theme={_lightTheme}>{children}</Provider>;
}
