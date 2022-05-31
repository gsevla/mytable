import { ReservationOrderDto } from '@mytable/dtos';
import { ReservationOrderStatusEnum } from '@mytable/enums';
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface Props {
  children: React.ReactNode;
}

interface Values {
  reservations: Array<ReservationOrderDto.IReservationOrder>;
  reservationsHistory: Array<ReservationOrderDto.IReservationOrder>;
}

export const ReservationContext = createContext({} as Values);

export function ReservationContextProvider({ children }: Props) {
  const [reservations, setReservations] = useState<
    Array<ReservationOrderDto.IReservationOrder>
  >([
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
      status: ReservationOrderStatusEnum.pending,
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
      status: ReservationOrderStatusEnum.pending,
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
      status: ReservationOrderStatusEnum.pending,
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
      status: ReservationOrderStatusEnum.pending,
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
      status: ReservationOrderStatusEnum.accepted,
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
      status: ReservationOrderStatusEnum.accepted,
    },
  ]);
  const [reservationsHistory, setReservationsHistory] = useState<
    Array<ReservationOrderDto.IReservationOrder>
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
      status: ReservationOrderStatusEnum.done,
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
      status: ReservationOrderStatusEnum.rejected,
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
      status: ReservationOrderStatusEnum.cancelled,
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
      status: ReservationOrderStatusEnum.done,
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
      status: ReservationOrderStatusEnum.done,
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
      status: ReservationOrderStatusEnum.cancelled,
    },
  ]);

  return (
    <ReservationContext.Provider value={{ reservations, reservationsHistory }}>
      {children}
    </ReservationContext.Provider>
  );
}
