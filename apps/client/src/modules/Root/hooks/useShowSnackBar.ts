import { useContextSelector } from 'use-context-selector';
import { RootContext } from '../context';

export function useShowSnackBar() {
  return useContextSelector(RootContext, (values) => values.showSnackBar);
}
