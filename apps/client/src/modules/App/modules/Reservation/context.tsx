import { ReservationOrder } from '@mytable/domain';
import React, { useMemo } from 'react';
import { createContext } from 'use-context-selector';
import { useActiveReservationOrder } from '#hooks/api/reservationOrder/useActiveReservationOrder';
import { useReservationOrderHistory } from '#hooks/api/reservationOrder/useReservationOrderHistory';

interface Props {
  children: React.ReactNode;
}

interface Values {
  reservations: Array<ReservationOrder>;
  reservationsHistory: Array<ReservationOrder>;
}

export const ReservationContext = createContext({} as Values);

export function ReservationContextProvider({ children }: Props) {
  const { data: activeOrders } = useActiveReservationOrder();
  const { data: ordersHistory } = useReservationOrderHistory();

  const reservations = useMemo(() => {
    if (!activeOrders) return [];

    return activeOrders;
  }, [activeOrders]);

  const reservationsHistory = useMemo(() => {
    if (!ordersHistory) return [];

    return ordersHistory;
  }, [ordersHistory]);

  return (
    <ReservationContext.Provider value={{ reservations, reservationsHistory }}>
      {children}
    </ReservationContext.Provider>
  );
}
