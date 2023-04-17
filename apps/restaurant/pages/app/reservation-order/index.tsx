import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useCallback, useMemo } from 'react';
import { ReservationOrderStatus } from '@mytable/domain';
import { View } from 'react-native';
import { Icon, SizedBox } from '@mytable/components';
import { useReservationOrder } from '#/hooks/api/reservationOrder/useReservationOrder';
import { Item, Menu } from '#/components/Menu';
import { useUpdateReservationOrder } from '#/hooks/api/reservationOrder/useUpdateReservationOrder';
import { TableColumn, TableRow, TableV2 } from '#/components/TableV2';

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

const statusMap = {
  [ReservationOrderStatus.ACCEPTED]: 'Aceito',
  [ReservationOrderStatus.CANCELED]: 'Cancelado',
  [ReservationOrderStatus.DONE]: 'Finalizado',
  [ReservationOrderStatus.PENDING]: 'Pendente',
  [ReservationOrderStatus.REJECTED]: 'Rejeitado',
};

export default function AppReservationOrderPage() {
  const { data: reservationOrder, isLoading } = useReservationOrder();

  const { mutate } = useUpdateReservationOrder();

  const mountReservationOrderStatusItems = useCallback(
    (reservationOrderId: number) =>
      Object.entries(statusMap).map(([key, value]) => ({
        key,
        label: value,
        action: (item: Item) => {
          mutate({
            id: reservationOrderId,
            status: item.key,
          });
        },
      })),
    []
  );

  const tabulatedReservationOrder = useMemo(() => {
    if (!reservationOrder) return [];

    return reservationOrder.map(
      (order) =>
        ({
          id: order.id.toString(),
          data: {
            clientName: `${order.client.name} ${order.client.surname}`,
            date: `${order.date}\n${order.startTime} ~ ${order.endTime}`,
            state: (
              <Menu items={mountReservationOrderStatusItems(order.id)}>
                <View style={{ flexDirection: 'row' }}>
                  <>{statusMap[order.status as ReservationOrderStatus]}</>
                  <SizedBox w={4} />
                  <Icon
                    name='chevron-down'
                    size={16}
                  />
                </View>
              </Menu>
            ),
            peopleAmount: order.peopleAmount,
          },
        } as TableRow)
    );
  }, [reservationOrder, mountReservationOrderStatusItems]);

  return (
    <AppPageWrapper isLoading={isLoading}>
      <TableV2
        columns={columns}
        data={tabulatedReservationOrder}
        actionButtons={[
          {
            iconName: 'pencil',
            action: (item) => {
              // router.push(`${router.route}/edit/${item.id}`);
            },
          },
        ]}
      />
    </AppPageWrapper>
  );
}
