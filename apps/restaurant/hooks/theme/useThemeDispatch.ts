import { useContextSelector } from 'use-context-selector';
import { ThemeContext } from '#/providers/ThemeProvider';

export function useThemeDispatch() {
  return useContextSelector(ThemeContext, (value) => value.dispatch);
}
