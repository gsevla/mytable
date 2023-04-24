import { useContextSelector } from 'use-context-selector';
import { SnackbarContext } from '#providers/SnackbarProvider';

export function useSnackbar() {
  const showSnackbar = useContextSelector(
    SnackbarContext,
    (value) => value.showSnackbar
  );
  const hideSnackbar = useContextSelector(
    SnackbarContext,
    (value) => value.hideSnackbar
  );

  return {
    showSnackbar,
    hideSnackbar,
  };
}
