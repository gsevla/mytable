import React from 'react';
import { createContext } from 'use-context-selector';

export const ReservationContext = createContext({});

export function ReservationContextProvider({ children }) {
  return (
    <ReservationContext.Provider value={{}}>
      {children}
    </ReservationContext.Provider>
  );
}
