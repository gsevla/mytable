import React from 'react';
import { ReservationContextProvider } from './context';
import { AppReservationStack } from './navigation';

export function Reservation() {
  return (
    <ReservationContextProvider>
      <AppReservationStack />
    </ReservationContextProvider>
  );
}
