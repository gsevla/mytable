import React, { useCallback, useMemo, useReducer } from 'react';
import { Snackbar } from 'react-native-paper';
import { createContext } from 'use-context-selector';

type SnackbarContextValues = {
  showSnackbar(message: string, actionLabel?: string): void;
  hideSnackbar(): void;
};

const initialState = {
  isVisible: false,
  message: '',
  actionLabel: 'OK',
};

const reducer = (
  state: typeof initialState,
  { type, payload }: { type: string; payload?: unknown }
) => {
  switch (type) {
    case 'showSnackbar': {
      return {
        ...state,
        isVisible: true,
        message: payload?.message,
        actionLabel: payload?.actionLabel,
      };
    }
    case 'hideSnackbar': {
      return {
        ...state,
        isVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const SnackbarContext = createContext({} as SnackbarContextValues);

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showSnackbar = useCallback((message: string, actionLabel = 'OK') => {
    dispatch({
      type: 'showSnackbar',
      payload: {
        message,
        actionLabel,
      },
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    dispatch({
      type: 'hideSnackbar',
    });
  }, []);

  const value = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
    }),
    [showSnackbar, hideSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        visible={state.isVisible}
        onDismiss={hideSnackbar}
        action={{
          label: state.actionLabel,
          onPress: hideSnackbar,
        }}
      >
        {state.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
