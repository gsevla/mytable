import React from 'react';
import { Provider } from 'react-native-paper';
import { lightTheme } from './lightTheme';

export function ThemeProvider({ children }) {
  return <Provider theme={lightTheme}>{children}</Provider>;
}
