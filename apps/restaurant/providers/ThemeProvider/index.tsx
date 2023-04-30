import React, { useReducer } from 'react';
import { Provider } from 'react-native-paper';
import { createContext } from 'use-context-selector';
import { lightTheme } from './lightTheme';

interface IThemeProvider {
  children: React.ReactNode;
}

const initialState = JSON.parse(
  JSON.stringify(lightTheme)
) as typeof lightTheme;

function reducer(
  state: typeof initialState,
  { type, payload }: { type: string; payload: unknown }
) {
  switch (type) {
    case 'setPrimaryColor': {
      return {
        ...state,
        colors: {
          ...state.colors,
          primary: payload.primaryColor,
        },
      };
    }
    case 'setAccentColor': {
      return {
        ...state,
        colors: {
          ...state.colors,
          accent: payload.accentColor,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export const ThemeContext = createContext({});

export function ThemeProvider({ children }: IThemeProvider) {
  const [theme, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ dispatch }}>
      <Provider theme={theme}>{children}</Provider>
    </ThemeContext.Provider>
  );
}
