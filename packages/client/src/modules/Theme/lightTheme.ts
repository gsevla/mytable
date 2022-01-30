import { defaultTheme } from './defaultTheme';

const lightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#128a8a',
    accent: '#8fc9c9',
    background: '#eeeeee',
    surface: '#ffffff',
  },
};

export { lightTheme };
