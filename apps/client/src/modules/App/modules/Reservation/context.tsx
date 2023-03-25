import { ReservationOrder, ReservationOrderStatus } from '@mytable/domain';
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface Props {
  children: React.ReactNode;
}

interface Values {
  reservations: Array<ReservationOrder>;
  reservationsHistory: Array<ReservationOrder>;
}

export const ReservationContext = createContext({} as Values);

export function ReservationContextProvider({ children }: Props) {
  const [reservations, setReservations] = useState<Array<ReservationOrder>>([
    {
      id: 1,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.PENDING,
    },
    {
      id: 2,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.PENDING,
    },
    {
      id: 3,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.PENDING,
    },
    {
      id: 4,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.PENDING,
    },
    {
      id: 5,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.ACCEPTED,
    },
    {
      id: 6,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.ACCEPTED,
    },
  ]);
  const [reservationsHistory, setReservationsHistory] = useState<
    Array<ReservationOrder>
  >([
    {
      id: 7,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.DONE,
    },
    {
      id: 8,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.REJECTED,
    },
    {
      id: 9,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.CANCELED,
    },
    {
      id: 10,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.DONE,
    },
    {
      id: 11,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.DONE,
    },
    {
      id: 12,
      restaurantId: 1,
      employeeId: 1,
      clientId: 1,
      date: new Date(),
      startTime: '12:00',
      endTime: '13:00',
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: 1,
      status: ReservationOrderStatus.CANCELED,
    },
  ]);

  return (
    <ReservationContext.Provider value={{ reservations, reservationsHistory }}>
      {children}
    </ReservationContext.Provider>
  );
}
