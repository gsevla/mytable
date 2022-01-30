import { defaultTheme } from './defaultTheme';

const lightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#ff0000',
    accent: '#0000ff',
  },
};

export { lightTheme };
