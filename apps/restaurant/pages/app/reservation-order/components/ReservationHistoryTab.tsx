import { ReservationOrderStatus } from '@mytable/domain';
import { reservationOrderStatusMap } from 'constants/reservationOrderStatusMap';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useUpdateReservationOrder } from '#/hooks/api/reservationOrder/useUpdateReservationOrder';
import { TableColumn, TableRow, TableV2 } from '#/components/TableV2';
import { Item } from '#/components/Menu';
import { useReservationOrderHistory } from '#/hooks/api/reservationOrder/useReservationOrderHistory';

const columns: Array<TableColumn> = [
  {
    title: 'Cliente',
    itemNameReference: 'clientName',
  },
  {
    title: 'Data',
    itemNameReference: 'date',
  },
  {
    title: 'Estado',
    itemNameReference: 'state',
  },
  {
    title: 'Qtde. Pessoas',
    itemNameReference: 'peopleAmount',
    isNumeric: true,
    widthMultiplier: 0.6,
    spacing: {
      right: 24,
    },
  },
];

export function ReservationHistoryTab() {
  const { data: reservationOrder, isLoading } = useReservationOrderHistory();

  const tabulatedReservationOrder = useMemo(() => {
    if (!reservationOrder) return [];

    return reservationOrder.map(
      (order) =>
        ({
          id: order.id.toString(),
          data: {
            clientName: `${order.client.name} ${order.client.surname}`,
            date: `${order.date}\n${order.startTime} ~ ${order.endTime}`,
            state:
              reservationOrderStatusMap[order.status as ReservationOrderStatus],
            peopleAmount: order.peopleAmount,
          },
        } as TableRow)
    );
  }, [reservationOrder]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      <TableV2
        columns={columns}
        data={tabulatedReservationOrder}
      />
    </View>
  );
}
